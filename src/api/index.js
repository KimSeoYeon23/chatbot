import axios from 'axios'

let baseUrl = 'http://localhost:5175'
const env = import.meta.env

if (env.VITE_APP_API_URL) {
  baseUrl = env.VITE_APP_API_URL
}

const httpClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false
})

function isApiUrl (url) {
  if (url.charAt(0) === '/') {
    return true
  }
  return url.indexOf(baseUrl) === 0
}

function normalizeRequest (data) {
  if (isPlainObject(data)) {
    for (const key of Object.keys(data)) {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim()
      } else {
        normalizeRequest(data[key])
      }
    }
  } else if (isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] === 'string') {
        data[i] = data[i].trim()
      } else {
        normalizeRequest(data[i])
      }
    }
  }
}

httpClient.interceptors.request.use((config) => {
  if (isApiUrl(config.url)) {
    // normalizeRequest(config.data)

    if (config.method === 'get') {
      if (!config.params) {
        config.params = {}
      }
      config.params.t = new Date().getTime()
    }

  }
  return config
}, (error) => {

  console.log('error', error)
  return Promise.reject(error)
})

httpClient.interceptors.response.use((config) => {
  return config
})


export default httpClient
