<script setup lang="ts">
import { onMounted } from 'vue'
import { Word } from './WordleSolver'
import TheLetter from './TheLetter.vue'

const props = defineProps({
  word: {
    type: Word,
    required: true
  }
})

const emit = defineEmits(['removeWord'])

const emitRemove = () => {
  if (props.word.isFull()) {
    emit('removeWord')
  }
}

onMounted(() => {
  props.word.letters[0].focus()
});

</script>

<template>
  <div class="word-cls">
    <TheLetter
      v-for="letter in props.word.letters"
      :key="letter.id"
      :letter="letter"
      class="item"
    />
    <div @click="emitRemove" class="delete-button">X</div>
  </div>
</template>

<style scoped>
.word-cls {
  display: flex;
  justify-content: space-between;
}
.item {
  flex: 1;
  margin: 1px;
  text-align: center;
  padding: 2px;
}
.delete-button {
  width: 50px;
  height: 50px;
  margin: 1px 8px;
  text-align: center;
  padding: 3px 0;
  border: 2px solid #000;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  background-color: #f0f0f0;
  color: #333;

  background-color: #ff33332d;
  cursor: pointer;
}
</style>
