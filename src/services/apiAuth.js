import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.messaeg);
  console.log(data);
  return data;
}

export async function signup({ email, password, fullName }) {
  console.log(email, password, fullName);
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message); // Corrected typo here
  console.log(data);
  return data;
}
export async function getCurrentUser() {
  let { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.messaeg);

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.messaeg);
}

export async function updateProfile({ fullName, avatar, password }) {
  // 1 update password or fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;
  // 2 upload the avatar imgage
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);
  // 3 update avatar inuser

  const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
    data: {
      avatar: ` ${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
