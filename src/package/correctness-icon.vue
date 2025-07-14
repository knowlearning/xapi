<template>
  <div :class="`circle ${statusRef}`">
    <div v-if="statusRef === 'unknown'">
      -
    </div>
    <div v-else-if="statusRef === 'complete'">
      ✔
    </div>
    <div v-else-if="statusRef === 'correct'">
      ✔
    </div>
    <div v-else-if="statusRef === 'incorrect'">
      ✕
    </div>
  </div>
</template>

<script setup>
  import { watch, ref } from 'vue'

  const props = defineProps({
    user: String,
    onNewStatement: Function,
    object: String,
    embed_path: Array
  })

  let start = 0
  let lastCheck = 0
  const statusRef = ref('unknown')

  props.onNewStatement(statement => {
    //  TODO: check if statement should cause us to re-evaluate correctness query
    //        make sure to debounce the checks
    lastCheck = Date.now()
    update()
  })

  update()

  async function update() {
    const [{ status }] = await Agent.query('correctness', [props.user, start, lastCheck, props.object, props.context])
    if (status !== 'unknown') statusRef.value = status
  }
</script>

<style scoped>
  .circle {
    width: 1.5em;
    height: 1.5em;
    border-radius: 0.75em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle.unknown {
    background: grey;
  }

  .circle.complete {
    background: purple;
  }

  .circle.correct {
    background: green;
  }

  .circle.incorrect {
    background: red;
  }
</style>
