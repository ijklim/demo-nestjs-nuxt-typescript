<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const route = useRoute()
const { token, user, logout } = useAuth()

// Suggest Console Form
const form = ref({
  id: '',
  name: '',
  releaseYear: 1990,
  manufacturer: '',
  topGames: []
})

const successMessage = ref('')
const errorMessage = ref('')
const existingConsoles = ref([])

// Fetch existing consoles for duplicate checking
onMounted(async () => {
  try {
    existingConsoles.value = await $fetch(`${apiBase}/consoles`)
  } catch (err) {
    console.error('Failed to fetch consoles:', err)
  }
})

const submitSuggestion = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Check for duplicate ID
  const duplicateId = existingConsoles.value.find(c => c.id.toLowerCase() === form.value.id.toLowerCase())
  if (duplicateId) {
    errorMessage.value = `Console ID "${form.value.id}" already exists!`
    return
  }

  // Check for duplicate name
  const duplicateName = existingConsoles.value.find(c => c.name.toLowerCase() === form.value.name.toLowerCase())
  if (duplicateName) {
    errorMessage.value = `Console name "${form.value.name}" already exists!`
    return
  }

  try {
    await $fetch(`${apiBase}/consoles`, {
      method: 'POST',
      body: form.value,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    successMessage.value = `"${form.value.name}" has been added successfully!`
    // Add to local list to prevent duplicate submissions
    existingConsoles.value.push({ ...form.value })
    form.value = { id: '', name: '', releaseYear: 1990, manufacturer: '', topGames: [] }
  } catch (e) {
    console.error(e)
    errorMessage.value = 'Failed to submit console. Please try again.'
  }
}

const goHome = () => {
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen p-8 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px]"></div>
    </div>

    <div class="max-w-2xl mx-auto">
      <!-- Header with navigation -->
      <div class="flex justify-between items-center mb-12">
        <button @click="goHome" class="flex items-center text-text-muted hover:text-white transition-colors group">
          <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Home
        </button>
        <div class="flex gap-4">
          <button @click="navigateTo('/dashboard')" class="text-text-muted hover:text-white transition-colors">
            Dashboard
          </button>
          <button @click="logout" class="text-text-muted hover:text-white transition-colors">
            Log Out
          </button>
        </div>
      </div>

      <!-- Page Title -->
      <h1 class="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 leading-normal pb-1">
        Suggest a Console
      </h1>
      <p class="text-lg text-text-muted mb-12">
        Share your favorite retro console with the community
      </p>

      <!-- Suggest Console Form -->
      <div class="glass-panel p-8 rounded-2xl">
        <form @submit.prevent="submitSuggestion" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-text-muted mb-2">Console ID</label>
            <input
              v-model="form.id"
              type="text"
              placeholder="e.g., n64, genesis, dreamcast"
              class="w-full bg-surface border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              required
            >
            <p class="text-xs text-text-muted/60 mt-1">A unique identifier (lowercase, no spaces)</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-text-muted mb-2">Console Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g., Nintendo 64"
              class="w-full bg-surface border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              required
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-text-muted mb-2">Manufacturer</label>
            <input
              v-model="form.manufacturer"
              type="text"
              placeholder="e.g., Nintendo, Sega, Sony"
              class="w-full bg-surface border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              required
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-text-muted mb-2">Release Year</label>
            <input
              v-model="form.releaseYear"
              type="number"
              placeholder="e.g., 1996"
              min="1970"
              max="2030"
              class="w-full bg-surface border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              required
            >
          </div>

          <button type="submit" class="btn-primary w-full mt-6 text-lg">
            Submit Suggestion
          </button>

          <div v-if="successMessage" class="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mt-4">
            <p class="text-green-400 text-center">{{ successMessage }}</p>
          </div>

          <div v-if="errorMessage" class="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mt-4">
            <p class="text-red-400 text-center">{{ errorMessage }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
