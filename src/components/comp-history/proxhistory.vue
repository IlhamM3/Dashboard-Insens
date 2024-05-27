<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    props: ['initDate'],
    data() {
        return {
            valueDate: this.initDate,
            qty_product: '',
            messagedel: '',
            checkdel: false
        }
    },
    computed: {
        ...mapState(dataliststore, ['dataHistoriproxi', 'datamesin']),
        cycleHistory() {
            if (!this.dataHistoriproxi.data || !this.dataHistoriproxi.data.length) {
                return [{ cycle: 0, produk: 0 }];
            }
            const firstItem = this.dataHistoriproxi.data[0];
            return [{
                cycle: firstItem.cycle,
                produk: firstItem.cycle * this.qty_product
            }];
        },
        isDataEmpty() {
            return this.cycleHistory.length === 1 && this.cycleHistory[0].cycle === 0;
        },
        dataproxiitem() {
            if (!this.dataHistoriproxi.data || !this.dataHistoriproxi.data.length) {
                return [];
            }
            return this.dataHistoriproxi.data.map(item => ({
                cycle: item.cycle,
                timestamp: item.timestamp,
                proximity_id: item.proximity_id
            }));
        }
    },
    watch: {
        initDate() {
            this.valueDate = this.initDate;
            this.fetchHistoriProxi();
        },
    },
    methods: {
        ...mapActions(dataliststore, ['a$historiprox', 'a$mesin', 'del$proxibyid']),
        async deletehistoryproxbyid(id) {
            await this.del$proxibyid(id);
            this.messagedel = "Data Berhasil Dihapus";
            this.checkdel = true;
            await this.fetchHistoriProxi();
            setInterval(() => {
                this.checkdel = false
            }, 5000);

        },
        getqtymesin(data) {
            return data.map(item => ({
                qty_product: item.qty_product,
            }));
        },
        async fetchqtymesin() {
            await this.a$mesin();
            const data = this.datamesin.data;
            const qtyMesinArray = this.getqtymesin(data);
            if (qtyMesinArray.length > 0) {
                this.qty_product = qtyMesinArray[0].qty_product;
            }
        },
        async fetchHistoriProxi() {
            await this.a$historiprox(this.valueDate);
        },
        formatDate(timestamp) {
            if (!timestamp) return '';
            const date = new Date(timestamp);
            return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
        },
        formatTanggal(timestamp) {
            if (!timestamp) return '';
            const date = new Date(timestamp);
            const tanggal = date.getDate().toString().padStart(2, '0');
            const bulan = (date.getMonth() + 1).toString().padStart(2, '0');
            const tahun = date.getFullYear();
            return `${tanggal}/${bulan}/${tahun}`;
        },
        formatJam(timestamp) {
            if (!timestamp) return '';
            const date = new Date(timestamp);
            const jam = ('0' + date.getHours()).slice(-2);
            const menit = ('0' + date.getMinutes()).slice(-2);
            const detik = ('0' + date.getSeconds()).slice(-2);
            return `${jam}:${menit}:${detik}`;
        },
    },
    async mounted() {
        this.fetchHistoriProxi();
        await this.fetchqtymesin();
    }
}
</script>

<template>
    <h1 class="mb-5 text-2xl font-medium">Proximity</h1>
    <div v-if="checkdel"
        class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium">{{ messagedel }}!</span>
        </div>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-md">
        <table class="w-full text-sm font-medium text-left text-gray-500 dark:text-gray-400">
            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-3 py-3">Proses Injection</th>
                    <th scope="col" class="px-3 py-3">Hari</th>
                    <th scope="col" class="px-3 py-3">Tanggal</th>
                    <th scope="col" class="px-3 py-3">Jam</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="listproxihistori">
                <tr v-if="dataproxiitem.length === 0">
                    <td colspan="5" class="p-2 font-semibold text-center bg-white">
                        Tidak ada data yang ditemukan.
                    </td>
                </tr>
                <tr v-else v-for="(item, index) in dataproxiitem" :key="index" class="bg-white">
                    <td scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Selesai ( Cycle: {{ item.cycle }} )
                    </td>
                    <td class="px-3 py-4">{{ formatDate(item.timestamp) }}</td>
                    <td class="px-3 py-4">{{ formatTanggal(item.timestamp) }}</td>
                    <td class="px-3 py-4">{{ formatJam(item.timestamp) }}</td>
                    <td><button @click="deletehistoryproxbyid(item.proximity_id)"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg></button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <footer class="fixed bottom-2 md:w-[550px] lg:w-[1022px] bg-white rounded-lg shadow dark:bg-gray-800">
        <table class="w-full text-left text-gray-500 dark:text-gray-400">
            <tbody>
                <tr class="bg-white dark:bg-gray-800">
                    <th class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">Jumlah Cycle:</th>
                    <td v-for="item in cycleHistory" :key="item.cycle" class="px-3 py-4 font-bold text-gray-900">
                        {{ item.cycle }}
                    </td>
                    <td class="px-3 py-4 font-bold text-gray-900">Jumlah Produk:</td>
                    <td v-for="item in cycleHistory" :key="item.produk" class="px-3 py-4 font-bold text-gray-900">
                        {{ item.produk }}
                    </td>
                </tr>
            </tbody>
        </table>
    </footer>
</template>
