<script setup>
import { ref } from 'vue'

const emit = defineEmits(['run-query'])

const authorities = ref('')
const actors = ref('')
const verbs = ref('')
const objects = ref('')
const domains = ref('')
const embedPath = ref('')
const storedAfter = ref('')
const storedBefore = ref('')

function toArray(value) {
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
}

function toTimestamp(value) {
  return value
    ? new Date(value).toISOString()
    : null
}

function runQuery() {
  const parameters = [
    toArray(authorities.value),
    toArray(actors.value),
    toArray(verbs.value),
    toArray(objects.value),
    toArray(domains.value),
    toArray(embedPath.value),
    toTimestamp(storedAfter.value),
    toTimestamp(storedBefore.value)
  ]

  emit('run-query', parameters)
}
</script>

<template>
  <v-sheet class="query-panel">
    <v-container>
      <form @submit.prevent="runQuery">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="authorities"
              label="Authorities"
              placeholder="user-id-1, user-id-2"
              hint="Separate multiple values with commas"
              persistent-hint
              clearable
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="actors"
              label="Actors"
              placeholder="actor-id-1, actor-id-2"
              hint="Separate multiple values with commas"
              persistent-hint
              clearable
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="verbs"
              label="Verbs"
              placeholder="answered, completed"
              hint="Separate multiple values with commas"
              persistent-hint
              clearable
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="objects"
              label="Objects"
              placeholder="object-id-1, object-id-2"
              hint="Separate multiple values with commas"
              persistent-hint
              clearable
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="domains"
              label="Domains"
              placeholder="forms.pilaproject.org"
              hint="Separate multiple values with commas"
              persistent-hint
              clearable
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="embedPath"
              label="Embed path"
              placeholder="class-id, assignment-id"
              hint="Enter the path in order, separated by commas"
              persistent-hint
              clearable
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="storedAfter"
              label="Stored on or after"
              type="datetime-local"
              clearable
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="storedBefore"
              label="Stored before"
              type="datetime-local"
              clearable
            />
          </v-col>

          <v-col
            cols="12"
            class="d-flex justify-end"
          >
            <v-btn
              type="submit"
              color="primary"
              size="large"
            >
              Run Query
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </v-container>
  </v-sheet>
</template>

<style scoped>
.query-panel {
  min-height: calc(100vh - 64px);
  padding: 32px 0;
}
</style>