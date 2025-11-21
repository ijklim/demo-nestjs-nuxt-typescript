<script setup lang="ts">
const { data: consoles } = await useFetch('http://localhost:3001/api/consoles')

const login = () => {
  window.location.href = 'http://localhost:3001/api/auth/github'
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
      Retro Console Explorer
    </h1>

    <p class="text-xl text-text-muted mb-12 max-w-2xl text-center">
      Discover the golden age of gaming. Explore classic consoles and their legendary titles.
    </p>

    <button @click="login" class="btn-primary mb-16 text-lg">
      Log In with GitHub
    </button>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
      <div v-for="console in consoles" :key="console.id" class="glass-panel p-6 rounded-2xl hover:transform hover:-translate-y-2 transition-all duration-300">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-white">{{ console.name }}</h2>
          <span class="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">{{ console.releaseYear }}</span>
        </div>
        <p class="text-text-muted mb-4">{{ console.manufacturer }}</p>

        <div class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Top Games</h3>
          <ul class="space-y-1">
            <li v-for="game in console.topGames" :key="game.gameName" class="text-sm flex justify-between">
              <span>{{ game.gameName }}</span>
              <span class="text-gray-500">{{ game.year }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
