export default eventHandler(async (event) => {
  const session = await useAuthSession(event);
  await session.clear();
  return {
    message: "Déconnecté avec succès!",
  };
});
