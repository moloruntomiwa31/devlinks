import { auth } from '~/firebaseInit';

export default defineNuxtRouteMiddleware(async (to, from) => {
    return new Promise((resolve) => {
      auth.onAuthStateChanged((user) => {
        if (!user && to.meta.requiresAuth) {
          resolve(navigateTo('/login'));
        } else {
          resolve();
        }
      });
    });
  });