<template>
    <tbody id="pzemr">
        <tr v-if="pzemrlength === 0" >
            <td colspan="4" class="p-2 font-semibold text-center bg-white">
                Belum ada produksi untuk hari ini
            </td>
        </tr>
        <tr v-else v-for="data in getpzemr.data" :key="data.timestamp"
            class="bg-white text-gray-900 text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
            <td class="px-6 py-4">{{ data.tegangan }}</td>
            <td class="px-6 py-4">{{ data.arus }}</td>
            <td class="px-6 py-4 font-bold text-green-600">{{ data.energi }}</td>
            <td class="px-6 py-4">{{ data.frekuensi }}</td>
        </tr>
    </tbody>
</template>

<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    data(){
        return{
            pzemrlength:'',
        }
    },
    computed: {
        ...mapState(dataliststore, ['getpzemr']),
    },
    async mounted() {
        await this.fetchpzemr()
        this.interval = setInterval(() => {
            this.fetchpzemr()
        }, 5000);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        ...mapActions(dataliststore, ['a$pzemr']),
        async fetchpzemr() {
            await this.a$pzemr();
            await this.pzemrfetch();
        },
        async pzemrfetch() {
            this.pzemrlength = this.getpzemr.data.length;
        }
    }
}
</script>
