import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newData, id) {
  const hasImagePath = newData.image?.startsWith?.(supabaseUrl);
  console.log(id);

  const imageName = `${Math.random()}-${newData.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newData.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  let query = supabase.from("cabins");

  //edit cabin
  if (id) {
    query = query.update({ ...newData, image: imagePath }).eq("id", id);
  }

  //Create cabin
  if (!id) {
    query = query.insert([{ ...newData, image: imagePath }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newData.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded therefor cabin could not be created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
