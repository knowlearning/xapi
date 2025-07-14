<template>
  <CorrectnessIcon />
  <Suspense>
    <XapiLog />
  </Suspense>
</template>

<script setup>
  import CorrectnessIcon from './package/correctness-icon.vue'
  import XapiLog from './components/xapi-log.vue'
</script>
