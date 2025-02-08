<script setup lang="ts">
import { ref } from 'vue';
import { Letter } from './WordleSolver'

const props = defineProps({
  letter: {
    type: Letter,
    required: true
  }
})

const inputRef = ref<HTMLInputElement | null>(null);

const setFocus = () => {
  console.log('SetFocus called')
  inputRef.value?.focus();  // Use ref to set focus
}

props.letter.focus = setFocus;

</script>

<template>
  <input
    ref="inputRef"
    class="letter-box"
    :class="'state-' + props.letter.state"
    v-model="props.letter.value"
    maxlength="1"
    @click="props.letter.nextState"
  /></template>

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
