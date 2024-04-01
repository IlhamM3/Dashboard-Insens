import { baseApi } from '@/plugins/axios'

const api = '/api'

const login = (body) => baseApi.post(`${api}/login`, body)
const logout = () => baseApi.post(`${api}/logout`)

export { login, logout }
