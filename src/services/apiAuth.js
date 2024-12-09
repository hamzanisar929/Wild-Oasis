import supabase from "./supabase";

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) null;

  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
