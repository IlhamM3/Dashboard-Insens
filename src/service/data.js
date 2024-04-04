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

let selectDate = [];

function updateSelectedDate() {
    const tanggal = sessionStorage.getItem('tanggal');
    if (tanggal && tanggal.length > 0) {
        selectDate = [tanggal];
        historipzemr();
        historipzems();
        historipzemt();
        historiprox();
        historiprox1();
    }
}

// Fungsi untuk memanggil API dengan tanggal yang dipilih
const historipzemr = () => baseApi.get(`${api}/pzemrHistory?startDate=${selectDate[0]}&endDate=${selectDate[0]}`);
const historipzems = () => baseApi.get(`${api}/pzemsHistory?startDate=${selectDate[0]}&endDate=${selectDate[0]}`);
const historipzemt = () => baseApi.get(`${api}/pzemtHistory?startDate=${selectDate[0]}&endDate=${selectDate[0]}`);
const historiprox = () => baseApi.get(`${api}/proxHistory?startDate=${selectDate[0]}&endDate=${selectDate[0]}`);
const historiprox1 = () => baseApi.get(`${api}/proxHistory1?startDate=${selectDate[0]}&endDate=${selectDate[0]}`);

export {
    proximity, proximity1, pzemR, pzemS, pzemT, pzemR1, pzemS1, pzemT1, baterai,
    historipzemr, historipzems, historipzemt, historiprox, historiprox1
}
