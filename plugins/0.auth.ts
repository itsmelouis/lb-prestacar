import type { AuthSession } from "~/server/utils/session";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return {};
  }

  const { data: session, refresh: updateSession } = await useFetch<AuthSession>('/api/auth/session');

  const loggedIn = computed(() => !!session.value?.email);

  // Create a ref to know where to redirect the user when logged in
  const redirectTo = useState("authRedirect")

  /**
   * Add global route middleware to protect pages using:
   * 
   * definePageMeta({
   *  auth: true
   * })
   */

  addRouteMiddleware(
    "auth",
    (to) => {
      // Check if the route requires auth or is under /admin/
      if ((to.meta.auth || to.path.startsWith('/admin')) && !loggedIn.value) {
        redirectTo.value = to.path;
        return "/";
      }
    },
    { global: true }
  );

  const currentRoute = useRoute();

  if (process.client) {
    watch(loggedIn, async (loggedIn) => {
      if (!loggedIn && (currentRoute.meta.auth || currentRoute.path.startsWith('/admin'))) {
        redirectTo.value = currentRoute.path;
        await navigateTo("/");
      }
    });
  }

  if (loggedIn.value && currentRoute.path === "/admin") {
    await navigateTo(redirectTo.value || "/");
  }

  return {
    provide: {
      auth: {
        loggedIn,
        session,
        redirectTo,
        updateSession,
      },
    },
  };
});
