<template>
  <div class="bg-slate-500 flex justify-between drop-shadow-xl w-screen">
    <h1 class="ml-5 my-auto text-slate-50">MeetingRooms</h1>
    <nav class="grid grid-cols-2 gap-5 pr-5">
      <RouterLink class="my-3 py-2 px-4 border rounded-lg border-gray-700 bg-slate-400 text-white hover:bg-blue-500" to="/">Home</RouterLink>
      <RouterLink class="my-3 py-2 px-4 border rounded-lg border-gray-700 bg-slate-400 text-white hover:bg-blue-500" to="/meeting">Juntas</RouterLink>
    </nav>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>
