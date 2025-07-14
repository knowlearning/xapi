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
    lastCheck: Number,
    object: String,
    embed_path: Array
  })

  let start = 0
  let lastPull = 0
  const statusRef = ref('unknown')

  watch(
    () => props.lastCheck,
    async () => {
      lastPull = props.lastCheck
      const [{ status }] = await Agent.query('correctness', [props.user, start, props.lastCheck, props.object, props.context])
      if (status !== 'unknown') statusRef.value = status
    },
    { immediate: true }
  )
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
