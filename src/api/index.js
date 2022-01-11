import axios from 'axios'
import router from '@router'

// https://github.com/axios/axios
let token = localStorage.getItem('token') || null
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    Accept: 'application/ld+json',
    'Content-Type': 'application/ld+json',
  },
})

const apiUser = axios.create({
  baseURL: process.env.VUE_APP_USER_API_ENDPOINT,
  headers: {
    Accept: 'application/ld+json',
    'Content-Type': 'application/ld+json',
  },
})

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.message === 'Expired JWT Token'
    ) {
      return new Promise((resolve, reject) => {
        router.push('/auth/logout')
        resolve()
      })
    } else {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
  }
)

export { apiClient, apiUser }
