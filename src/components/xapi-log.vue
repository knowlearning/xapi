<template>
	<div>
		<uuid-array-input
			@newUuidArray="handleEmbedPathUpdate"
			placeholder="your embed path..."
		/>
		{{ embedPath }}
		<uuid-array-input
			@newUuidArray="handleUserUpdate"
			placeholder="your users..."
		/>
		{{ users }}
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

const embedPath = ref([])
const users = ref([ MATTIE, DUMBDUMB ])

const xapi = ref([])
let polling = true
let pollTimeoutId = null	


function handleEmbedPathUpdate(newEmbedPath) {
	embedPath.value = newEmbedPath
	restartPolling()
}
function handleUserUpdate(newUsers) {
	users.value = newUsers
	restartPolling()
}

function restartPolling() {
	polling = false
	clearTimeout(pollTimeoutId)
	polling = true
	pollXapi()
}

pollXapi()

async function pollXapi() {
	if (!polling) return
	try { xapi.value = await fetchXapi(users.value, embedPath.value) }
	catch (err) { console.error('Failed to fetch xAPI data:', err.message) }
	pollTimeoutId = setTimeout(() => pollXapi(), 2000)
}

async function fetchXapi(users, empath) {
	return await Agent.query('statements', [users, empath], 'xapi.knowlearning.systems')
}

onBeforeUnmount(() => {
	polling = false
	clearTimeout(pollTimeoutId)
})

</script>