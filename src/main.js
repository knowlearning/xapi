import { createApp } from 'vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import AdminQueries from './AdminQueries.vue'
import AdminQueriesAccessDenied from './AdminQueriesAccessDenied.vue'
import Agent from '@knowlearning/agents'

window.Agent = Agent

const vuetify = createVuetify({
  components,
  directives
})

const ADMIN_QUERY_USERS = [
  'f74e9cb3-2b53-4c85-9b0c-f1d61b032b3f',
  'c0f3a481-d4d5-4133-a198-94a325aa4536',
  'aabc6c9c-a4f8-405b-9de3-76588997d52f'
]

async function initialLoad() {
  const {
    auth: { user, provider }
  } = await Agent.environment()

  if (provider === 'anonymous') {
    Agent.login()
    return
  }

  const path = window.location.pathname
  let RootComponent

  if (path === '/') {
    RootComponent = App
  }
  else if (path === '/admin-queries') {
    RootComponent = ADMIN_QUERY_USERS.includes(user)
      ? AdminQueries
      : AdminQueriesAccessDenied
  }
  else {
    RootComponent = App
  }

  createApp(RootComponent)
    .use(vuetify)
    .mount('#app')
}

initialLoad()