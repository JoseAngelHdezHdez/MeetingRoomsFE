<template>
  <div class="w-screen h-screen bg-slate-100">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'
</script>