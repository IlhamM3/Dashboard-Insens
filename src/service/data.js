import { baseApi } from '@/plugins/axios'

const api = '/api'

const proximity = () => baseApi.get(`${api}/proximity`)
const pzemR = () => baseApi.get(`${api}/pzemr`)
const pzemS = () => baseApi.get(`${api}/pzems`)
const pzemT = () => baseApi.get(`${api}/pzemt`)
const baterai = () => baseApi.get(`${api}/baterai`)

export { proximity, pzemR, pzemS, pzemT, baterai }
