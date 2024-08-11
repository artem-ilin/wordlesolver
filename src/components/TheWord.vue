<script setup lang="ts">
import { Word } from './Word'
import TheLetter from './TheLetter.vue'

const props = defineProps({
  word: {
    type: Word,
    required: true
  }
})
</script>

<template>
  <div class="word-cls">
    <TheLetter
      v-for="letter in props.word.letters"
      :key="letter.id"
      :letter="letter"
      class="item"
    />
  </div>
</template>

<style scoped>
.word-cls {
  display: flex;
  justify-content: space-between;
}
.item {
  flex: 1;
  margin: 2px 2px;
  text-align: center;
  padding: 15px;
  background-color: #f0f0f0;
}
</style>
