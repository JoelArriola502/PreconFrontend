import { $fetch } from 'ofetch'

const runtimeConfig = useRuntimeConfig()

export const useApi = $fetch.create({
  baseURL: runtimeConfig.urlApi,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
