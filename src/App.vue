<template>
  <CorrectnessIcon :onNewStatement="() => {}" />
  <TimeSpent :onNewStatement="() => {}"  />
  <Suspense>
    <XapiLog />
  </Suspense>
</template>

<script setup>
  import CorrectnessIcon from './package/correctness-icon.vue'
  import TimeSpent from './package/time-spent.vue'
  import XapiLog from './components/xapi-log.vue'
</script>
