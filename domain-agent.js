  import Agent from 'npm:@knowlearning/agents/deno.js'

  const XAPI_TYPE = 'application/json;type=xapi-statement'
  const RESULT_TYPE = 'application/json;type=xapi-result'
  const CONTEXT_TYPE = 'application/json;type=xapi-context'
  const AUTHORITY_TYPE = 'application/json;type=xapi-authority'

  Agent.on('child', child => {
    const { environment: { user } } = child
    Agent.log(`GOT CHILD CONNECTION!!!!!!!! ${user}`)

    child.on('mutate', async ({ scope, id, patch }) => {
      if (scope.startsWith('xapi/')) {
        const { origin, verb, object, result, context, authority } = await Agent.state(id)
        const actor = await Agent.metadata(origin).then(md => md.owner)

        const active = { origin, verb, object }

        if (result) {
          active.result = await Agent.create({
            active_type: RESULT_TYPE,
            active: result
          })
        }
        if (context) {
          active.context = await Agent.create({
            active_type: CONTEXT_TYPE,
            active: context
          })
        }
        if (authority) {
          active.authority = await Agent.create({
            active_type: AUTHORITY_TYPE,
            active: authority
          })
        }

        await Agent.create({
          active_type: XAPI_TYPE,
          active
        })
      }
    })
  })
