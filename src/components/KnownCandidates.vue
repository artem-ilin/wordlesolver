<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { WordleSolver } from './WordleSolver'
import TheWord from './TheWord.vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const props = defineProps({
  solver: {
    type: WordleSolver,
    required: true
  }
})

const localeMap = {
  en: /^[a-z]$/,
  ru: /^[а-я]$/
}

const onKeyup = (event: KeyboardEvent) => {
  const pattern = localeMap[i18n.locale.value as keyof typeof localeMap]
  const isLetter = pattern.test(event.key)
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
    <div v-for="(word, idx) in props.solver.words" :key="idx" class="container">
      <TheWord @removeWord="removeWord(idx)" :word="word" />
    </div>
  </div>
</template>
