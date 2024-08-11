<script setup lang="ts">
import { Letter } from './Word'

const props = defineProps({
  letter: {
    type: Letter,
    required: true
  }
})
</script>

<template>
  <div class="letter-box">{{ props.letter.value ?? '' }}</div>
</template>

<style scoped>
.letter-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  background-color: #f0f0f0;
  color: #333;
}
</style>
