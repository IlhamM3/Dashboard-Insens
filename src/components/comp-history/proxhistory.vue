<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    props: ['initDate'],
    data() {
        return {
            valueDate: this.initDate,
            qty_product: ''
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
                timestamp: item.timestamp,
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
    <div class="relative overflow-x-auto shadow-md sm:rounded-md">
        <table class="w-full text-sm font-medium text-left text-gray-500 dark:text-gray-400">
            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-3 py-3">Proses Injection</th>
                    <th scope="col" class="px-3 py-3">Hari</th>
                    <th scope="col" class="px-3 py-3">Tanggal</th>
                    <th scope="col" class="px-3 py-3">Jam</th>
                </tr>
            </thead>
            <tbody id="listproxihistori">
                <tr v-if="dataproxiitem.length === 0">
                    <td colspan="4" class="p-2 font-semibold text-center bg-white">
                        Tidak ada data yang ditemukan.
                    </td>
                </tr>
                <tr v-else v-for="(item, index) in dataproxiitem" :key="index" class="bg-white">
                    <td scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Finished
                    </td>
                    <td class="px-3 py-4">{{ formatDate(item.timestamp) }}</td>
                    <td class="px-3 py-4">{{ formatTanggal(item.timestamp) }}</td>
                    <td class="px-3 py-4">{{ formatJam(item.timestamp) }}</td>
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
