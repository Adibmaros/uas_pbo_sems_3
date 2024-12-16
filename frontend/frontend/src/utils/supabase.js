import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qrvvpwszfqjlmwmpvpun.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydnZwd3N6ZnFqbG13bXB2cHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1ODc4ODUsImV4cCI6MjA0NzE2Mzg4NX0.ht6o0HO4Z_LbiYsMmjaiLofdI4MvhYSmWaqhyjzj35U";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadFile = async (file, path = "files") => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  await supabase.storage.from("image").upload(`public/${path}/${fileName}`, file, {
    cacheControl: "3600",
    // menimpan file = false ( upsert )
    upsert: false,
  });
  return fileName;
};

export const getFile = (name) => {
  const { data } = supabase.storage.from("image").getPublicUrl(`public/files/${name}`);
  return data.publicUrl;
};

export const deleteFile = async (fileName, path = "files") => {
  await supabase.storage.from("image").remove([`public/${path}/${fileName}`]);
};
