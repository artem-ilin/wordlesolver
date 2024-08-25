<script setup lang="ts">
import { Letter } from './WordleSolver'

const props = defineProps({
  letter: {
    type: Letter,
    required: true
  }
})
</script>

<template>
  <div class="letter-box" :class="'state-' + props.letter.state" @click="props.letter.nextState">
    {{ props.letter.value }}
  </div>
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
  color: #333;
  cursor: pointer;
}
.state-MISS {
  background-color: #dddddd;
}
.state-WRONG_PLACE {
  background-color: #ffffff;
}
.state-HIT {
  background-color: #ffec6d;
}
</style>
