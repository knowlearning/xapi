<template>
  <div>
    <input
      v-model="userInput"
      @input="handleInput"
      type="text"
      :class="{
        invalid: error
      }"

    />
    <p v-if="error" style="color: red; font-size: 0.6rem; margin: 2px 0 0 2px;">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validate as isValidUUID } from 'uuid'
import debounce from 'lodash.debounce'

const userInput = ref('your uuid path here...')
const outputArray = ref([ ])
const error = ref(null)

const emit = defineEmits([ 'newUuidArray' ])

const debouncedHandleInput = debounce((e) => {
  const parsedPathSegs = e.target.value
    .split(',')
    .map(str => str.trim())
    .filter(str => str.length > 0)

  if (parsedPathSegs.length === 0) {
    error.value = null
    emit('newUuidArray', [])
  } else if (allValidUuids(parsedPathSegs)) {
    error.value = null
    emit('newUuidArray', parsedPathSegs)
  } else {
    error.value = 'invalid'
  }
}, 300)

function handleInput(e) { debouncedHandleInput(e) }
function allValidUuids(arr) { return arr.every(isValidUUID) }

</script>

<style scoped>
input {
  border-radius: 4px;
  width: 95%;
  margin: 2px;
}
input.invalid {
  border-color: lightcoral;
/*  outline-color: lightcoral;*/
}
</style>