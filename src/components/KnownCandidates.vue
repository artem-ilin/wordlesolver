<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { WordleSolver } from './Word'
import TheWord from './TheWord.vue'

const props = defineProps({
  solver: {
    type: WordleSolver,
    required: true
  }
})

const onKeyup = (event: KeyboardEvent) => {
  const isLetter = /^[a-z]$/.test(event.key)
  if (isLetter) {
    props.solver.addLetter(event.key.toUpperCase())
  }
}

onMounted(() => {
  window.addEventListener('keyup', onKeyup)
})

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup)
})
</script>

<template>
  <div>
    <TheWord v-for="word in props.solver.words" :key="word.id" :word="word" />
  </div>
</template>
