<script setup lang="ts">
const config = useRuntimeConfig()

onMounted(() => {
  // Debug logging to verify environment configuration
  console.log('[Debug Only] Frontend Config:', {
    apiBase: config.public.apiBase,
    env: config.public.env,
    version: config.public.version
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow">
      <NuxtPage />
    </div>
    <footer class="p-4 text-right text-sm text-gray-500">
      v{{ config.public.version }} ({{ config.public.env }})
    </footer>
  </div>
</template>
