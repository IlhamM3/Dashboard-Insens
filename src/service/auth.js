import { baseApi } from '@/plugins/axios'

const api = '/api'

const login = (body) => baseApi.post(`${api}/login`, body)

export { login }
