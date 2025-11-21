<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const { token, setToken, user, setUser, logout } = useAuth()
const config = useRuntimeConfig()

// Handle OAuth callback
if (route.query.token) {
  setToken(route.query.token as string)
  // Remove token from URL without refresh
  const newUrl = window.location.pathname
  window.history.replaceState({}, document.title, newUrl)
}

// Fetch User Profile
const { data: profile, error } = await useFetch('http://localhost:3001/api/user/profile', {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
})

if (profile.value) {
  setUser(profile.value)
}

// Suggest Console Form
const form = ref({
  id: '',
  name: '',
  releaseYear: 1990,
  manufacturer: '',
  topGames: []
})

const successMessage = ref('')

const submitSuggestion = async () => {
  try {
    await $fetch('http://localhost:3001/api/consoles', {
      method: 'POST',
      body: form.value,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    successMessage.value = 'Console suggested successfully!'
    form.value = { id: '', name: '', releaseYear: 1990, manufacturer: '', topGames: [] }
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          Dashboard
        </h1>
        <button @click="logout" class="text-text-muted hover:text-white transition-colors">
          Log Out
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Profile Section -->
        <div class="glass-panel p-8 rounded-2xl">
          <h2 class="text-2xl font-bold mb-6">Your Profile</h2>
          <div v-if="user" class="flex items-center space-x-4">
            <img :src="user.picture" alt="Profile" class="w-16 h-16 rounded-full border-2 border-primary">
            <div>
              <p class="text-xl font-semibold">{{ user.username }}</p>
              <p class="text-text-muted text-sm">ID: {{ user.userId }}</p>
            </div>
          </div>
          <div v-else class="text-text-muted">Loading profile...</div>
        </div>

        <!-- Suggest Console Form -->
        <div class="glass-panel p-8 rounded-2xl">
          <h2 class="text-2xl font-bold mb-6">Suggest a Console</h2>
          <form @submit.prevent="submitSuggestion" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-muted mb-1">ID</label>
              <input v-model="form.id" type="text" class="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-muted mb-1">Name</label>
              <input v-model="form.name" type="text" class="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-muted mb-1">Manufacturer</label>
              <input v-model="form.manufacturer" type="text" class="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-muted mb-1">Release Year</label>
              <input v-model="form.releaseYear" type="number" class="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" required>
            </div>

            <button type="submit" class="btn-primary w-full mt-4">
              Submit Suggestion
            </button>
            <p v-if="successMessage" class="text-green-400 text-center mt-2">{{ successMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
