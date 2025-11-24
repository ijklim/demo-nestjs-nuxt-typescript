<script setup lang="ts">
const config = useRuntimeConfig()
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
