<template>
    <tbody id="historipzemr">
        <tr v-if="datapzemritem.length === 0" class="bg-white text-gray-900 text-center  whitespace-nowrap dark:text-white dark:bg-gray-800">
            <td colspan="4" class="p-2 font-semibold text-center bg-white">
                Tidak ada data yang ditemukan.
            </td>
        </tr>
        <tr v-else v-for="(item, index) in datapzemritem" :key="index" class="bg-white">
            <td class="px-6 py-4">{{ item.tegangan}}</td>
            <td class="px-6 py-4">{{ item.arus}}</td>
            <td class="px-6 py-4 font-bold text-green-600">{{ item.energi }}</td>
            <td class="px-6 py-4">{{ item.frekuensi }}</td>
        </tr>
    </tbody>
</template>

<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    props: ['initDate'],
    data() {
        return {
            valueDate: this.initDate
        }
    },
    watch: {
        initDate() {
            this.valueDate = this.initDate;
            this.fetchhistoripzemr()
        }
    },
    computed: {
        ...mapState(dataliststore, ['gethistoripzemr']),
        datapzemritem(){
            if (!this.gethistoripzemr.data || !this.gethistoripzemr.data.length) {
                return [];
            }
            return this.gethistoripzemr.data.map(item => ({
                tegangan: item.tegangan,
                arus: item.arus,
                energi: item.energi,
                frekuensi: item.frekuensi
            }));
        }
    },
    async mounted() {
        await this.fetchhistoripzemr()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$historipzemr'
        ]),
        async fetchhistoripzemr() {
            await this.a$historipzemr(this.valueDate)
        },
    }
}
</script>