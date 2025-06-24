<template>
	<div>
		<uuid-array-input
			@newUuidArray="handleEmbedPathUpdate"
		/>
		{{ embedPath }}
		<div>{{ xapi.length }} statements</div>
		<xapi-table
			:data="[...xapi].reverse()"
			:showOnlyTheseKeys="[ 'authority', 'actor', 'verb', 'object', 'source', 'stored', 'success', 'score_raw', 'embed_path' ]"
		/>
	</div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import UuidArrayInput from './uuid-array-input.vue'
import XapiTable from './xapi-table.vue'


const DUMBDUMB = 'f74e9cb3-2b53-4c85-9b0c-f1d61b032b3f'
const MATTIE = 'c0f3a481-d4d5-4133-a198-94a325aa4536'
const embedPath = ref([ 'a331fae0-42de-11f0-a7f9-59378a7d0438' ])

const TEST_USERS = [ MATTIE, DUMBDUMB]

const xapi = ref([])
let polling = true
let pollTimeoutId = null	


function handleEmbedPathUpdate(newEmbedPath) {
	embedPath.value = newEmbedPath
	restartPolling()
}

function restartPolling() {
	polling = false
	clearTimeout(pollTimeoutId)
	polling = true
	pollXapi(TEST_USERS, embedPath.value)
}

pollXapi(TEST_USERS, embedPath.value)

async function pollXapi(users, empath) {
	if (!polling) return
	try { xapi.value = await fetchXapi(users, empath) }
	catch (err) { console.error('Failed to fetch xAPI data:', err.message) }
	pollTimeoutId = setTimeout(() => pollXapi(users, empath), 2000)
}

async function fetchXapi(users, empath) {
	return await Agent.query('statements', [users, empath], 'xapi.knowlearning.systems')
}

onBeforeUnmount(() => {
	polling = false
	clearTimeout(pollTimeoutId)
})

</script>