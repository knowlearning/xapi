import { createApp } from 'vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import AdminQueries from './AdminQueries.vue'
import Agent from '@knowlearning/agents'

window.Agent = Agent

const vuetify = createVuetify({
  components,
  directives
})

async function initialLoad() {
  const {
    auth: { provider }
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
    RootComponent = AdminQueries
  }
  else {
    RootComponent = App
  }

  createApp(RootComponent)
    .use(vuetify)
    .mount('#app')
}

initialLoad()