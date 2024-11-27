import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  let { data: Cabin, error } = await supabase.from("cabins").select("*");

  if (error) return error;
  return Cabin;
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) return error;
}
export async function addCabin(newCabin) {
  let image;
  if (newCabin.image instanceof File) {
    const uniqueName = generateUniqueName(newCabin.image.name);
    let imagePath = await uploadImage(uniqueName, newCabin.image);
    if (imagePath instanceof Error) return imagePath; // Handle image upload failure
    image = imagePath;
  } else image = newCabin.image;

  const { data, error: createError } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image }])
    .select();

  if (createError) return new Error("Failed To create A cabin");

  return data;
}
function generateUniqueName(imageName) {
  const timestamp = Date.now();
  const randomStr = Math.random().toString().slice(2, 8); // Generates a 6-digit random string
  const sanitizedImageName = imageName.replace(/[^a-zA-Z0-9.\-_]/g, "");

  return `${timestamp}-${randomStr}-${sanitizedImageName}`;
}

async function uploadImage(imageName, image) {
  let uploadQuery = supabase.storage.from("cabin-image");

  // Await the upload and destructure the response
  const { data, error } = await uploadQuery.upload(imageName, image, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("Error uploading image:", error);
    return new Error("Image upload failed.");
  }

  console.log("Image uploaded:", data);
  return `${supabaseUrl}/storage/v1/object/public/cabin-image/${imageName}`;
}

export async function patchCabin({ editId, newCabin }) {
  try {
    if (!editId || !newCabin) {
      console.error("Invalid input: editId or newCabin is missing.");
      return null;
    }

    // Image upload logic (if necessary)
    let imagePath = newCabin.image;
    if (newCabin.image instanceof File) {
      const uniqueName = generateUniqueName(newCabin.image.name);
      imagePath = await uploadImage(uniqueName, newCabin.image);
      if (imagePath instanceof Error) return imagePath; // Handle image upload failure
    }

    // Ensure `newCabin` contains the updated image path
    const updatedCabinData = { ...newCabin, image: imagePath };
    console.log("Updating cabin with data:", updatedCabinData);

    // Update the record
    const { data, error } = await supabase
      .from("cabins")
      .update(updatedCabinData)
      .eq("id", editId)
      .select();

    if (error) {
      console.error("Error updating cabin:", error);
      return null;
    }

    console.log("Update successful:", data);
    return data;
  } catch (error) {
    console.error("Error in patchCabin function:", error);
    return null;
  }
}
