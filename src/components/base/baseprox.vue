<template>
    <tbody id="listproxi" class="">
        <tr id="notfoundp" v-if="datanull">
            <td colspan="4" class="p-2 font-semibold text-center bg-white">
                Belum ada produksi untuk hari ini
            </td>
        </tr>
        <tr v-for="item in getproxi.data" :key="item.timestamp" class="bg-white dark:bg-gray-800">
            <td scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                finished
            </td>
            <td class="px-3 py-4">{{ formatDate(item.timestamp, 'weekday') }}</td>
            <td class="px-3 py-4">{{ formatDate(item.timestamp, 'date') }}</td>
            <td class="px-3 py-4">{{ formatDate(item.timestamp, 'time') }}</td>
        </tr>
    </tbody>
</template>

<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    computed: {
        ...mapState(dataliststore, ['getproxi']),
        datanull() {
            return !this.getproxi.data || !this.getproxi.data.length;
        }
    },
    async mounted() {
        await this.fetchAndLogProxi();
        this.startFetching();
    },
    methods: {
        ...mapActions(dataliststore, ['a$proxi']),
        startFetching() {
            this.interval = setInterval(async () => {
                await this.fetchAndLogProxi();
            }, 5000);
        },
        async fetchAndLogProxi() {
            await this.a$proxi();
        },
        formatDate(timestamp, format) {
            const date = new Date(timestamp);
            switch (format) {
                case 'weekday':
                    return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
                case 'date':
                    return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
                case 'time':
                    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
                default:
                    return '';
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>