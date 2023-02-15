export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (useState("isLoggedIn", () => false).value) {
    return navigateTo("/");
  }
});
