<script setup>
import { ref } from 'vue'

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

  console.log('admin-statements query parameters:', parameters)

  // Eventually:
  // const statements = await Agent.query(
  //   'admin-statements',
  //   parameters
  // )
}
</script>

<template>
  <main class="admin-queries">
    <h1>Admin XAPI Queries</h1>

    <form @submit.prevent="runQuery">
      <label>
        Authorities
        <input
          v-model="authorities"
          type="text"
          placeholder="user-id-1, user-id-2"
        />
      </label>

      <label>
        Actors
        <input
          v-model="actors"
          type="text"
          placeholder="actor-id-1, actor-id-2"
        />
      </label>

      <label>
        Verbs
        <input
          v-model="verbs"
          type="text"
          placeholder="answered, completed"
        />
      </label>

      <label>
        Objects
        <input
          v-model="objects"
          type="text"
          placeholder="object-id-1, object-id-2"
        />
      </label>

      <label>
        Domains
        <input
          v-model="domains"
          type="text"
          placeholder="forms.pilaproject.org"
        />
      </label>

      <label>
        Embed path
        <input
          v-model="embedPath"
          type="text"
          placeholder="class-id, assignment-id"
        />
      </label>

      <label>
        Stored on or after
        <input
          v-model="storedAfter"
          type="datetime-local"
        />
      </label>

      <label>
        Stored before
        <input
          v-model="storedBefore"
          type="datetime-local"
        />
      </label>

      <button type="submit">
        Run Query
      </button>
    </form>
  </main>
</template>

<style scoped>
.admin-queries {
  width: min(640px, calc(100% - 32px));
  margin: 40px auto;
}

form {
  display: grid;
  gap: 16px;
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  font: inherit;
}

button {
  padding: 12px 16px;
  font: inherit;
  cursor: pointer;
}
</style>