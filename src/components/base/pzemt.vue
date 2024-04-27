<template>
    <tbody id="pzemt">
        <tr v-if="pzemtlength === 0" >
            <td colspan="4" class="p-2 font-semibold text-center bg-white">
                Belum ada produksi untuk hari ini
            </td>
        </tr>
        <tr v-else v-for="data in getpzemt.data" :key="data.timestamp"
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
            pzemtlength:'',
        }
    },
    computed: {
        ...mapState(dataliststore, ['getpzemt']),
    },
    async mounted() {
        await this.fetchpzemt()
        this.interval = setInterval(() => {
            this.fetchpzemt()
        }, 5000);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        ...mapActions(dataliststore, ['a$pzemt']),
        async fetchpzemt() {
            await this.a$pzemt();
            await this.pzemtfetch();
        },
        async pzemtfetch() {
            this.pzemtlength = this.getpzemt.data.length;
        }
    }
}
</script>
