<template>
  <div
    class="flex flex-col sm:flex-row sm:justify-between sm:items-center bottom-0 py-10 px-4 sm:px-52 space-y-5">
    <div class="mb-6 sm:mb-0 self-center">
      <img src="/logo-white.svg" alt="Logo de PrestaCar" width="150" />
    </div>
    <div class="space-y-2 sm:ml-16">
      <h3>Entreprise</h3>
      <ul class="flex flex-row sm:flex-col gap-5 sm:gap-0 text-slate-900">
        <NuxtLink to="/conditions-generales" class="transition hover:text-slate-600 duration-300">
          <li>Conditions générales</li>
        </NuxtLink>
      </ul>
    </div>
    <div class="space-y-2 sm:ml-16">
      <h3>Réseaux sociaux</h3>
      <ul class="flex flex-row sm:flex-col gap-5 sm:gap-0 text-slate-900">
        <a href="https://www.facebook.com/lbprestacar" target="_blank"
          class="transition hover:text-slate-600 duration-300">
          <li>Facebook</li>
        </a>
        <a href="https://www.instagram.com/lbprestacar/" target="_blank"
          class="transition hover:text-slate-600 duration-300">
          <li>Instagram</li>
        </a>
      </ul>
    </div>
  </div>
</template>
