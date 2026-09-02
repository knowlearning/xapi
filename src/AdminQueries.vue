<script setup>
import { computed, nextTick, ref } from 'vue'
import Agent from '@knowlearning/agents'
import AdminQueriesControls from './AdminQueriesControls.vue'
import AdminQueriesResults from './AdminQueriesResults.vue'

const queryOpen = ref(true)
const hasRunQuery = ref(false)
const loading = ref(false)
const statements = ref([])
const validationError = ref('')

const title = computed(() =>
  queryOpen.value
    ? 'Admin XAPI Queries'
    : 'XAPI Query Results'
)

async function runQuery(parameters) {
  const hasNonDateFilter = parameters
    .slice(0, 6)
    .some(value => Array.isArray(value) && value.length > 0)

  if (!hasNonDateFilter) {
    validationError.value =
      'Enter at least one non-date filter before running the query.'
    return
  }

  validationError.value = ''
  hasRunQuery.value = true
  loading.value = true
  statements.value = []

  // Render the results underneath before sliding the controls away.
  await nextTick()
  queryOpen.value = false

  try {
    statements.value = await Agent.query(
      'admin-statements',
      parameters
    ) || []
  }
  catch (error) {
    console.error('admin-statements query failed:', error)
    statements.value = []
  }
  finally {
    loading.value = false
  }
}

function showQuery() {
  validationError.value = ''
  queryOpen.value = true
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        {{ title }}
      </v-app-bar-title>

      <v-btn
        v-if="hasRunQuery && !queryOpen"
        variant="text"
        prepend-icon="mdi-filter"
        @click="showQuery"
      >
        Show Query
      </v-btn>
    </v-app-bar>

    <v-main>
      <AdminQueriesResults
        v-if="hasRunQuery"
        :statements="statements"
        :loading="loading"
      />

      <v-slide-y-reverse-transition>
        <div
          v-if="queryOpen"
          :class="{
            'query-controls': true,
            'query-controls--overlay': hasRunQuery
          }"
        >
          <v-alert
            v-if="validationError"
            type="warning"
            variant="tonal"
            closable
            class="validation-alert"
            @click:close="validationError = ''"
          >
            {{ validationError }}
          </v-alert>

          <AdminQueriesControls
            @run-query="runQuery"
          />
        </div>
      </v-slide-y-reverse-transition>
    </v-main>
  </v-app>
</template>

<style scoped>
.query-controls--overlay {
  position: fixed;
  z-index: 1000;
  top: 64px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  background: rgb(var(--v-theme-background));
}

.validation-alert {
  margin: 16px auto 0;
  max-width: 1200px;
}
</style>