import { baseApi } from '@/plugins/axios'

const sideApi = '/api'

const proximity = () => baseApi.get(`${sideApi}/proximity`)
const deleteproximity = () => baseApi.delete(`${sideApi}/proximity`)
const deleteproximitybyid = (id) => baseApi.delete(`${sideApi}/proximity/${id}`)
const proximity1 = () => baseApi.get(`${sideApi}/proximity1`)

const pzemR = () => baseApi.get(`${sideApi}/pzemr`)
const deletepzemR = () => baseApi.delete(`${sideApi}/pzemr`)
const deletepzemRbyid = (id) => baseApi.delete(`${sideApi}/pzemr/${id}`)
const pzemR1 = () => baseApi.get(`${sideApi}/pzemr1`)

const pzemS = () => baseApi.get(`${sideApi}/pzems`)
const deletepzemS = () => baseApi.delete(`${sideApi}/pzems`)
const deletepzemSbyid = (id) => baseApi.delete(`${sideApi}/pzems/${id}`)
const pzemS1 = () => baseApi.get(`${sideApi}/pzems1`)

const pzemT = () => baseApi.get(`${sideApi}/pzemt`)
const deletepzemT = () => baseApi.delete(`${sideApi}/pzemt`)
const deletepzemTbyid = (id) => baseApi.delete(`${sideApi}/pzemt/${id}`)
const pzemT1 = () => baseApi.get(`${sideApi}/pzemt1`)

const baterai = () => baseApi.get(`${sideApi}/baterai`)
const mesin = () => baseApi.get(`${sideApi}/mesin`)
const qtyproduct = () => baseApi.put(`${sideApi}/mesin`)

// Fungsi untuk memanggil API dengan tanggal yang dipilih
const historipzemr = (selectDate) => baseApi.get(`${sideApi}/pzemrHistory?startDate=${selectDate}&endDate=${selectDate}`);
const historipzems = (selectDate) => baseApi.get(`${sideApi}/pzemsHistory?startDate=${selectDate}&endDate=${selectDate}`);
const historipzemt = (selectDate) => baseApi.get(`${sideApi}/pzemtHistory?startDate=${selectDate}&endDate=${selectDate}`);
const historiprox = (selectDate) => baseApi.get(`${sideApi}/proxHistory?startDate=${selectDate}&endDate=${selectDate}`);
const historiprox1 = (selectDate) => baseApi.get(`${sideApi}/proxHistory1?startDate=${selectDate}&endDate=${selectDate}`);


export {
    proximity, proximity1, pzemR, pzemS, pzemT, pzemR1, pzemS1, pzemT1, baterai,
    historipzemr, historipzems, historipzemt, historiprox, historiprox1, mesin,
    deleteproximity, deleteproximitybyid, deletepzemR, deletepzemRbyid, deletepzemS,
    deletepzemSbyid, deletepzemT, deletepzemTbyid, qtyproduct
}