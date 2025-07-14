<template>
  <div>
    00:00
  </div>
</template>

<script setup>
  import { watch, onMounted, onUnmounted, ref } from 'vue'

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
    //  TODO: check if statement should cause us to re-evaluate
    lastCheck = Date.now()
    update()
  })

  update()

  async function update() {
    // time-spent query should check the time between initialized and suspended
    // for given object in given context.
    const [{ time, open }] = await Agent.query('time-spent', [props.user, start, lastCheck, props.object, props.context])
    if (time !== null) timeSpent.value = time
    isOpen.value = open
  }

  let intervalId

  onMounted(() => {
    intervalId = setInterval(() => {
      if (isOpen.value) timeSpent += 1000
    }, 1000)
  })

  onUnmounted(() => clearInterval(intervalId))
</script>

<style scoped>
</style>
