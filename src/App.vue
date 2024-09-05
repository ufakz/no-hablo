<template>
  <div class="max-w-md mx-auto p-4">
    <Header />

    <router-view />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style>
body {
  @apply bg-gray-100 text-gray-800;
}
</style>
