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
          const { score, success, completion, response, extensions }  = result || {}
          const flattened_result = {}

          if (success !== undefined) flattened_result.success = success
          if (completion !== undefined) flattened_result.completion = completion
          if (response !== undefined) flattened_result.response = response
          if (extensions !== undefined) flattened_result.extensions = extensions
          if (score !== undefined) {
            if (score.scaled !== undefined) flattened_result.scaled = score.scaled
            if (score.raw !== undefined) flattened_result.score_raw = score.raw
            if (score.min !== undefined) flattened_result.score_min = score.min
            if (score.max !== undefined) flattened_result.score_max = score.max
          }

          active.result = await Agent.create({
            active_type: RESULT_TYPE,
            active: flattened_result
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
