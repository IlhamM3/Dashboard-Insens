<template>
    <tbody>
        <tr v-for="(data, index) in uniqueTimestamps(getpzemr.data)" :key="index" class="bg-white text-gray-900 text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
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
    computed: {
        ...mapState(dataliststore, ['getpzemr', 'getpzemt', 'getpzems'])
    },
    async mounted() {
        await this.fetchpzemr()
        setInterval(() => {
            this.fetchpzemr()
        }, 5000);
    },
    methods: {
        ...mapActions(dataliststore, ['a$pzemr']),
        async fetchpzemr() {
            await this.a$pzemr()
        },
        isToolOn() {
            return this.getpzemr.message === 'Alat: ON' || this.getpzems.message === 'Alat: ON' || this.getpzemt.message === 'Alat: ON';
        },
        toolStatusMessage() {
            return this.isToolOn() ? 'Alat: ON' : 'Alat: OFF';
        },
        uniqueTimestamps(dataList) {
            const uniqueTimestamps = new Set();
            return dataList.filter(data => {
                const timestamp = data.timestamp;
                if (!uniqueTimestamps.has(timestamp)) {
                    uniqueTimestamps.add(timestamp);
                    return true;
                }
                return false;
            });
        }
    }
}
</script>
