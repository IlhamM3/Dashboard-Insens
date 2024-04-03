import { baseApi } from '@/plugins/axios'

const api = '/api'

const proximity = () => baseApi.get(`${api}/proximity`)
const proximity1 = () => baseApi.get(`${api}/proximity1`)

const pzemR = () => baseApi.get(`${api}/pzemr`)
const pzemR1 = () => baseApi.get(`${api}/pzemr1`)

const pzemS = () => baseApi.get(`${api}/pzems`)
const pzemS1 = () => baseApi.get(`${api}/pzems1`)

const pzemT = () => baseApi.get(`${api}/pzemt`)
const pzemT1 = () => baseApi.get(`${api}/pzemt1`)

const baterai = () => baseApi.get(`${api}/baterai`)

export { proximity, proximity1, pzemR, pzemS, pzemT, pzemR1, pzemS1, pzemT1, baterai }
