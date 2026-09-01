import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AdminQueries from './AdminQueries.vue'
import Agent from '@knowlearning/agents'

window.Agent = Agent

async function initialLoad() {
  const { auth: { provider } } = await Agent.environment()

  if (provider === 'anonymous') {
    Agent.login()
    return
  }

  const RootComponent =
    window.location.pathname === '/admin-queries'
      ? AdminQueries
      : App

  createApp(RootComponent).mount('#app')
}

initialLoad()