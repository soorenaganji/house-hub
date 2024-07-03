import supabase from "lib/supabaseClient";
function formatNumber(num) {
  if (typeof num === "string") return ""
  if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M';
  } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
  }
  return num;
}
function formatNumberWithCommas(number) {
  // Convert the number to a string
  let numberStr = number.toString();

  // Use a regular expression to add commas
  numberStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberStr;
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
    return urlData.data.publicUrl
  };

  const deleteImageFromSupabase = async (imageUrl) => {
    try {
      // Extract file path after 'HouseHub/'
      const filePath = imageUrl.split('/HouseHub/')[1];
      console.log('File path:', filePath); // Debug log
  
      if (!filePath) {
        throw new Error('Invalid image URL');
      }
  
      const { error } = await supabase.storage
        .from('HouseHub')
        .remove([filePath]);
  
      if (error) {
        throw error;
      }
  
      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error.message);
      throw new Error('Error deleting image');
    }
  };
  


export {formatNumber , uploadImageToSupabase , deleteImageFromSupabase , formatNumberWithCommas}