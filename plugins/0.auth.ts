import type { AuthSession } from "~/server/utils/session";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (nuxtApp.payload.error) {
    return {};
  }

  const { data: session, refresh: updateSession } = await useFetch<AuthSession>('/api/auth/session');
  const loggedIn = computed(() => !!session.value?.email);
  const redirectTo = useState("authRedirect");

  addRouteMiddleware(
    "auth",
    (to) => {
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
