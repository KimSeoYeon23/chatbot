const env = import.meta.env

let baseUrl = 'http://localhost:3002'
if (env.VITE_APP_API_URL) {
  baseUrl = env.VITE_APP_API_URL
}
let aborter = new AbortController()

export default {
  abortRendering: () => {
    try {
      aborter.abort()
    } catch (e) {
      console.log(e)
    }
  },
  askQuestion: (data, onStart, onDataCallback, onEnd) => {
    aborter.abort()
    aborter = new AbortController()

    let headers = {
      'Content-Type': 'application/json'
    }


    fetch(`${baseUrl}/chatbot/ask`, {
      credentials: 'include',
      signal: aborter.signal,
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw response
        }

        return response
      })
      .then(async (response) => {
        onStart()

        const loopRunner = true
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (loopRunner) {
          const { done, value } = await reader.read()

          if (done) {
            onEnd(response)
            break
          }

          const decoded = decoder.decode(value, { stream: true })
          onDataCallback(decoded)
        }
      })
      .catch((e) => {
        if (aborter.signal.aborted) {
          console.log('Abort generation')
        }

        onEnd(null, e)
        console.log(e)
      })
  },
}
