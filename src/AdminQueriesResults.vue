<script setup>
defineProps({
  statements: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const headers = [
  {
    title: 'Stored',
    key: 'stored',
    sortable: true
  },
  {
    title: 'Authority',
    key: 'authority',
    sortable: true
  },
  {
    title: 'Actor',
    key: 'actor',
    sortable: true
  },
  {
    title: 'Verb',
    key: 'verb',
    sortable: true
  },
  {
    title: 'Object',
    key: 'object',
    sortable: true
  },
  {
    title: 'Domain',
    key: 'domain',
    sortable: true
  },
  {
    title: 'Embed Path',
    key: 'embed_path',
    sortable: false
  },
  {
    title: 'Success',
    key: 'success',
    sortable: true
  },
  {
    title: 'Completion',
    key: 'completion',
    sortable: true
  },
  {
    title: 'Response',
    key: 'response',
    sortable: true
  },
  {
    title: 'Score',
    key: 'score_scaled',
    sortable: true
  },
  {
    title: 'Extensions',
    key: 'extensions',
    sortable: false
  }
]

function formatStored(value) {
  if (!value) return ''

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString()
}

function formatEmbedPath(value) {
  if (!Array.isArray(value)) {
    return value || ''
  }

  return value.join(' → ')
}

function formatExtensions(value) {
  if (!value) return ''

  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(value, null, 2)
}
</script>

<template>
  <v-container
    fluid
    class="results"
  >
    <v-card>
      <v-card-title class="d-flex align-center">
        Query Results

        <v-spacer />

        <span class="result-count">
          {{ statements.length }}
          {{ statements.length === 1 ? 'statement' : 'statements' }}
        </span>
      </v-card-title>

      <v-divider />

      <v-data-table
        :headers="headers"
        :items="statements"
        :loading="loading"
        :items-per-page="10"
        :items-per-page-options="[10, 25, 50, 100]"
        loading-text="Loading XAPI statements..."
        no-data-text="No statements found"
        class="statements-table"
      >
        <template #item.stored="{ value }">
          <span class="stored">
            {{ formatStored(value) }}
          </span>
        </template>

        <template #item.embed_path="{ value }">
          <span class="embed-path">
            {{ formatEmbedPath(value) }}
          </span>
        </template>

        <template #item.success="{ value }">
          <span v-if="value === true">Yes</span>
          <span v-else-if="value === false">No</span>
        </template>

        <template #item.completion="{ value }">
          <span v-if="value === true">Yes</span>
          <span v-else-if="value === false">No</span>
        </template>

        <template #item.extensions="{ value }">
          <pre
            v-if="value"
            class="extensions"
          >{{ formatExtensions(value) }}</pre>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style scoped>
.results {
  padding: 24px;
}

.result-count {
  font-size: 0.875rem;
  font-weight: 400;
  opacity: 0.7;
}

.statements-table {
  white-space: nowrap;
}

.stored {
  white-space: nowrap;
}

.embed-path {
  display: inline-block;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.extensions {
  max-width: 400px;
  max-height: 120px;
  margin: 8px 0;
  overflow: auto;
  white-space: pre-wrap;
  font-size: 0.75rem;
}
</style>