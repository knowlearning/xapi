<template>
	<div>
		<div>{{ xapi.length }} statements</div>
		<XapiTable
			:data="[...xapi].reverse()"
			:showOnlyTheseKeys="[ 'authority', 'actor', 'verb', 'object', 'source', 'stored', 'success', 'score_raw', 'embed_path' ]"
		/>
	</div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import XapiTable from './xapi-table.vue'


const DUMBDUMB = 'f74e9cb3-2b53-4c85-9b0c-f1d61b032b3f'
const MATTIE = 'c0f3a481-d4d5-4133-a198-94a325aa4536'
const TEST_SEQUENCE = 'a331fae0-42de-11f0-a7f9-59378a7d0438'
const TEST_EMBED_PATH = [ ]
const TEST_USERS = [ MATTIE, DUMBDUMB]

const xapi = ref([])
let polling = true

pollXapi(TEST_USERS, TEST_EMBED_PATH)

async function pollXapi(users, empath) {
	if (!polling) return
	try { xapi.value = await fetchXapi(users, empath) }
	catch (err) { console.error('Failed to fetch xAPI data:', err.message) }
	setTimeout(() => pollXapi(users, empath), 2000)
}

async function fetchXapi(users, empath) {
	return await Agent.query('statements', [users, empath], 'xapi.knowlearning.systems')
}

onBeforeUnmount(() => { polling = false })

</script>