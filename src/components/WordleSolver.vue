<script setup lang="ts">
import { reactive } from 'vue'
import KnownCandidates from './KnownCandidates.vue'
import { WordleSolver } from './WordleSolver'
import GuessedCandidates from './GuessedCandidates.vue'

const wordleSolver = reactive(new WordleSolver())

const resetGame = () => {
  wordleSolver.reset()
}
</script>

<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale" @change="resetGame">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
        {{ locale }}
      </option>
    </select>
  </div>
  <h1>Wordle Solver</h1>
  <KnownCandidates :solver="wordleSolver" />
  <GuessedCandidates :solver="wordleSolver" />
</template>
