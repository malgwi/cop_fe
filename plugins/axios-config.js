import { retrieve, TOKEN_KEY } from '~/helpers/storage'

export default function ({ $axios}) {
  $axios.onRequest(function(config){    
    const token = retrieve(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  })
}