import { defineNuxtPlugin } from '#app';
import { auth } from '~/firebaseInit';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);
});