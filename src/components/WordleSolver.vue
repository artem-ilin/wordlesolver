<script setup lang="ts">
import { reactive } from 'vue'
import KnownCandidates from './KnownCandidates.vue'
import { WordleSolver } from './WordleSolver'

const wordleSolver = reactive(new WordleSolver())
</script>

<template>
  <h1>Wordle Solver</h1>
  <KnownCandidates :solver="wordleSolver" />
</template>
