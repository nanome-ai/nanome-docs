<template>
  <div class="toggle-section">
    <button @click="open = !open">
      <div tabindex="-1">
        {{ open ? "&#9660;&nbsp; collapse" : "&#9654;&nbsp; expand" }} section
      </div>
    </button>
    <div v-show="open" class="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<style scoped>
.toggle-section {
  margin-top: 1em;
  background: #f7f7f7;
  border-radius: 4px;
}

.toggle-section > button {
  width: 100%;
  border: 0;
  background: unset;
  font: unset;
  text-align: left;
  appearance: none;
  cursor: pointer;
}

.toggle-section > button > div {
  padding: 1em;
}

.toggle-section > button > div:focus {
  outline: 0;
}

.toggle-section > .content {
  margin-left: 0.5em;
  padding: 0.5em;
}
</style>
