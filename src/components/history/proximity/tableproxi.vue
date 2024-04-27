<template>
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
</template>

<script>
import { dataliststore } from '@/stores/data';
import { mapState, mapActions } from 'pinia';

export default {
    props: ['initDate'],
    data() {
        return {
            valueDate: this.initDate
        }
    },
    computed: {
        ...mapState(dataliststore, ['dataHistoriproxi']),
        dataproxiitem(){
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
            this.fetchhistoriproxi();
        }
    },
    async mounted() {
        await this.fetchhistoriproxi();
    },
    methods: {
        ...mapActions(dataliststore, ['a$historiprox']),
        async fetchhistoriproxi() {
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
        }
    }
}
</script>