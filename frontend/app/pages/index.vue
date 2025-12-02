<script setup lang="ts">
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const consoles = ref([])
const { token, user, setUser } = useAuth()
const showDeleteModal = ref(false)
const consoleToDelete = ref(null)
const explodingConsoleId = ref(null)

// Set page title dynamically
usePageTitle('Home')

// Fetch consoles and user profile client-side
onMounted(async () => {
  try {
    consoles.value = await $fetch(`${apiBase}/consoles`)
  } catch (err) {
    console.error('Failed to fetch consoles:', err)
  }

  // Fetch user profile if logged in
  if (token.value && !user.value) {
    try {
      const profile = await $fetch(`${apiBase}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      setUser(profile)
    } catch (err) {
      console.error('Failed to fetch user profile:', err)
    }
  }
})

const login = () => {
  navigateTo(`${apiBase}/auth/github`, { external: true })
}

const goToDashboard = () => {
  navigateTo('/dashboard')
}

const confirmDelete = (consoleId: string, consoleName: string) => {
  consoleToDelete.value = { id: consoleId, name: consoleName }
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
  consoleToDelete.value = null
}

const deleteConsole = async () => {
  if (!consoleToDelete.value) return

  try {
    await $fetch(`${apiBase}/consoles/${consoleToDelete.value.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    // Trigger explosion animation
    explodingConsoleId.value = consoleToDelete.value.id
    showDeleteModal.value = false

    // Wait for animation to complete, then remove from list
    setTimeout(() => {
      consoles.value = consoles.value.filter(c => c.id !== consoleToDelete.value.id)
      explodingConsoleId.value = null
      consoleToDelete.value = null
    }, 800)
  } catch (err: any) {
    console.error('Failed to delete console:', err)
    const errorMsg = err?.data?.message || 'Failed to delete console. Please try again.'
    alert(errorMsg)
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px]"></div>
    </div>

    <h1 class="text-5xl md:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 animate-pulse">
      {{ config.public.title }}
    </h1>

    <p class="text-xl text-text-muted mb-12 max-w-2xl text-center text-balance">
      Discover the golden age of gaming. Explore classic consoles and their legendary titles.
    </p>

    <button v-if="!token" @click="login" class="btn-primary mb-3 text-lg">
      Log In with GitHub
    </button>
    <button v-else @click="goToDashboard" class="btn-primary mb-16 text-lg">
      Go to Dashboard
    </button>

    <p v-if="!token" class="text-sm text-text-muted mb-16 text-center">
      Sign in to suggest your favorite retro consoles to the collection
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
      <div
        v-for="console in consoles"
        :key="console.id"
        :class="[
          'glass-panel p-6 rounded-2xl transition-all duration-300',
          explodingConsoleId === console.id ? 'exploding' : 'hover:transform hover:-translate-y-2'
        ]"
      >
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-white">{{ console.name }}</h2>
          <span class="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">{{ console.releaseYear }}</span>
        </div>
        <p class="text-text-muted mb-4">{{ console.manufacturer }}</p>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold text-text-muted uppercase tracking-wider">Top Games</h3>
          <ul class="space-y-1">
            <li v-for="game in console.topGames" :key="game.gameName" class="text-sm flex justify-between">
              <span>{{ game.gameName }}</span>
              <span class="text-text-secondary">{{ game.year }}</span>
            </li>
          </ul>
        </div>

        <!-- Delete button (only for consoles created by current user) -->
        <div v-if="token && user && console.createdBy === user.userId" class="flex justify-end mt-4">
          <button
            @click="confirmDelete(console.id, console.name)"
            class="text-xs text-red-400/60 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="cancelDelete">
      <div class="glass-panel p-8 rounded-2xl max-w-md mx-4" @click.stop>
        <h3 class="text-2xl font-bold mb-4">Confirm Delete</h3>
        <p class="text-text-muted mb-6">
          Are you sure you want to delete <span class="text-white font-semibold">"{{ consoleToDelete?.name }}"</span>?
          This action cannot be undone.
        </p>
        <div class="flex gap-4">
          <button @click="cancelDelete" class="flex-1 bg-surface hover:bg-surface/80 text-white px-4 py-2 rounded-lg transition-colors">
            Cancel
          </button>
          <button @click="deleteConsole" class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes explode {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.2) rotate(5deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.3) rotate(15deg);
    opacity: 0;
  }
}

.exploding {
  animation: explode 0.8s ease-out forwards;
  pointer-events: none;
}

.exploding::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%);
  animation: flash 0.3s ease-out;
}

@keyframes flash {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
