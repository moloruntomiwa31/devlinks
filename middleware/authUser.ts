import { supabase } from "~/supabase";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = supabase.auth.getUser();
  if (!user) {
    return navigateTo("/login");
  }
});
