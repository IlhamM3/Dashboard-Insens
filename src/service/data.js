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

// Fungsi untuk memanggil API dengan tanggal yang dipilih
const historipzemr = (selectDate) => baseApi.get(`${api}/pzemrHistory?startDate=${selectDate}&endDate=${selectDate}`);
const historipzems = (selectDate) => baseApi.get(`${api}/pzemsHistory?startDate=${selectDate}&endDate=${selectDate}`);
const historipzemt = (selectDate) => baseApi.get(`${api}/pzemtHistory?startDate=${selectDate}&endDate=${selectDate}`);
const historiprox = (selectDate) => baseApi.get(`${api}/proxHistory?startDate=${selectDate}&endDate=${selectDate}`);
const historiprox1 = (selectDate) => baseApi.get(`${api}/proxHistory1?startDate=${selectDate}&endDate=${selectDate}`);


export {
    proximity, proximity1, pzemR, pzemS, pzemT, pzemR1, pzemS1, pzemT1, baterai,
    historipzemr, historipzems, historipzemt, historiprox, historiprox1
}