import supabase from "lib/supabaseClient";
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}
const uploadImageToSupabase = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `Posts/${fileName}`; // Ensure this path matches your Supabase bucket structure

    let { data, error } = await supabase.storage
      .from("HouseHub")
      .upload(filePath, file);
    if (error) {
      console.log("Error uploading file:", error);
      return null;
    }

    // Generate the public URL
    const urlData = supabase.storage.from("HouseHub").getPublicUrl(filePath);
    console.log(urlData.data.publicUrl);
    return urlData.data.publicUrl;
  };

export {formatNumber , uploadImageToSupabase}