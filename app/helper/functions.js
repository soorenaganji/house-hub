const CDN_BASE = process.env.NEXT_PUBLIC_CDN_BASE;
const BUCKET = process.env.R2_BUCKET;
const POSTS_PREFIX = "Posts/";

const isBrowser = typeof window !== "undefined";

let s3ModulePromise;
const getS3Module = () => {
  if (!s3ModulePromise) {
    s3ModulePromise = import("@aws-sdk/client-s3");
  }
  return s3ModulePromise;
};

let r2ClientPromise;
const getR2Client = () => {
  if (!r2ClientPromise) {
    r2ClientPromise = import("lib/r2Client");
  }
  return r2ClientPromise;
};

const ensureEnv = () => {
  if (!BUCKET || !CDN_BASE) {
    throw new Error("Storage configuration is missing");
  }
};

const normaliseNumberInput = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const randomKey = (extension) => {
  const randomId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID().replace(/-/g, "")
      : Math.random().toString(36).slice(2);
  return `${POSTS_PREFIX}${randomId}.${extension}`;
};

const extractExtension = (fileName) => {
  if (!fileName) return "bin";
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "bin";
};

const toBuffer = async (file) => {
  if (!file) {
    throw new Error("File not provided");
  }

  if (Buffer.isBuffer(file)) {
    return file;
  }

  if (file.arrayBuffer) {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  if (file.stream) {
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }

  throw new Error("Unsupported file type");
};

const extractStorageKey = (input) => {
  if (!input) return null;
  if (input.startsWith(POSTS_PREFIX)) {
    return input;
  }

  const postsIndex = input.indexOf(POSTS_PREFIX);
  if (postsIndex !== -1) {
    return input.slice(postsIndex);
  }

  return null;
};

const uploadViaApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/storage/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const body = await response.json();
  return body.url;
};

const deleteViaApi = async (imageUrlOrKey) => {
  const response = await fetch("/api/storage/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageUrlOrKey }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete image");
  }
};

async function uploadToR2(file) {
  ensureEnv();

  const extension = extractExtension(file?.name);
  const key = randomKey(extension);
  const body = await toBuffer(file);
  const [{ PutObjectCommand }, { r2 }] = await Promise.all([
    getS3Module(),
    getR2Client(),
  ]);

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: file?.type || "application/octet-stream",
    CacheControl: "public, max-age=31536000, immutable",
  });

  await r2.send(command);

  return `${CDN_BASE}/${key}`;
}

async function deleteFromR2(imageUrlOrKey) {
  ensureEnv();

  const key = extractStorageKey(imageUrlOrKey);

  if (!key) {
    throw new Error("Invalid image identifier");
  }

  const [{ DeleteObjectCommand }, { r2 }] = await Promise.all([
    getS3Module(),
    getR2Client(),
  ]);

  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  await r2.send(command);
}

function formatNumber(value) {
  const numeric = normaliseNumberInput(value);

  if (numeric === null) {
    return "";
  }

  if (numeric >= 1000000) {
    return (numeric / 1000000).toFixed(0) + "M";
  }

  if (numeric >= 1000) {
    return (numeric / 1000).toFixed(0) + "k";
  }

  return numeric;
}

function formatNumberWithCommas(number) {
  const value = normaliseNumberInput(number);

  if (value === null) {
    return "";
  }

  const numberStr = value.toString();
  return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const uploadImageToSupabase = async (file) => {
  if (isBrowser) {
    return uploadViaApi(file);
  }

  return uploadToR2(file);
};

const deleteImageFromSupabase = async (imageUrlOrKey) => {
  if (isBrowser) {
    await deleteViaApi(imageUrlOrKey);
    return;
  }

  await deleteFromR2(imageUrlOrKey);
};

export { formatNumber, uploadImageToSupabase, deleteImageFromSupabase, formatNumberWithCommas };
