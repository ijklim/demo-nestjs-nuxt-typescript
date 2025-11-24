<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const route = useRoute()
const { token, setToken, user, setUser, logout } = useAuth()

// Handle OAuth callback - save token from query params
if (route.query.token) {
  setToken(route.query.token as string)
}

// Fetch profile client-side after token is set
onMounted(async () => {
  if (token.value) {
    try {
      const profile = await $fetch(`${apiBase}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      setUser(profile)

      // Clean up URL if token was in query
      if (route.query.token) {
        navigateTo('/dashboard', { replace: true })
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err)
    }
  }
})
</script>

<template>
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          Dashboard
        </h1>
        <div class="flex gap-4">
          <button @click="navigateTo('/')" class="text-text-muted hover:text-white transition-colors">
            Home
          </button>
          <button @click="logout" class="text-text-muted hover:text-white transition-colors">
            Log Out
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Profile Section -->
        <div class="glass-panel p-8 rounded-2xl">
          <h2 class="text-2xl font-bold mb-6">Your Profile</h2>
          <div v-if="user" class="flex items-center space-x-4 mb-6">
            <img :src="user.picture" alt="Profile" class="w-20 h-20 rounded-full border-2 border-primary">
            <div>
              <p class="text-2xl font-semibold">{{ user.username }}</p>
              <p class="text-text-muted text-sm">ID: {{ user.userId }}</p>
            </div>
          </div>
          <div v-else class="text-text-muted">Loading profile...</div>
        </div>

        <!-- Quick Actions -->
        <div class="glass-panel p-8 rounded-2xl">
          <h2 class="text-2xl font-bold mb-6">Quick Actions</h2>
          <div class="space-y-4">
            <button @click="navigateTo('/suggest')" class="btn-primary w-full text-lg">
              Suggest a Console
            </button>
            <p class="text-sm text-text-muted/70 text-center">
              Share your favorite retro consoles with the community
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
