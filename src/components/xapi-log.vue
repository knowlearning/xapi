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
import { ref } from 'vue'
import XapiTable from './xapi-table.vue'

const dumbdumb = 'f74e9cb3-2b53-4c85-9b0c-f1d61b032b3f'
const mattie = 'c0f3a481-d4d5-4133-a198-94a325aa4536'

const xapi = ref(null)

await pollXapi()

async function pollXapi() {
	xapi.value = await fetchXapi()
	setTimeout(pollXapi, 2000)
}

async function fetchXapi(users = [mattie, dumbdumb], empath = []) {
	console.log('fetching....')
	return Agent.query('statements', [users, empath], 'xapi.knowlearning.systems').then(result => {
		console.log('got statements....', result)
		return result
	})
}


</script>