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
  } else if (event.code === 'Enter') {
    props.solver.submitWord()
  } else if (event.code === 'Backspace') {
    props.solver.removeLetter()
  }
}

const removeWord = (word_id: number) => {
  props.solver.removeWord(word_id)
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
    <div v-for="word in props.solver.words" :key="word.id" class="container">
      <TheWord @removeWord="removeWord" :word="word" />
    </div>
  </div>
</template>
