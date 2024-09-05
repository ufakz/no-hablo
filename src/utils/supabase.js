import { createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);