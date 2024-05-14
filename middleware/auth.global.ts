import { supabase } from "~/supabase";

export default defineNuxtRouteMiddleware((to, from) => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      navigateTo("/dashboard/links");
    } else if (event === "SIGNED_OUT") {
      navigateTo("/login");
    }
  });
});
