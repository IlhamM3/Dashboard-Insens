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
            this.fetchhistoripzem()
        }
    },
    computed: {
        ...mapState(dataliststore, ['gethistoripzemr', 'gethistoripzems', 'gethistoripzemt']),
        datapzemritem() {
            if (!this.gethistoripzemr.data || !this.gethistoripzemr.data.length) {
                return [];
            }
            return this.gethistoripzemr.data.map(item => ({
                tegangan: item.tegangan,
                arus: item.arus,
                energi: item.energi,
                frekuensi: item.frekuensi
            }));
        },
        datapzemsitem() {
            if (!this.gethistoripzems.data || !this.gethistoripzems.data.length) {
                return [];
            }
            return this.gethistoripzems.data.map(item => ({
                tegangan: item.tegangan,
                arus: item.arus,
                energi: item.energi,
                frekuensi: item.frekuensi
            }));
        },
        datapzemtitem() {
            if (!this.gethistoripzemt.data || !this.gethistoripzemt.data.length) {
                return [];
            }
            return this.gethistoripzemt.data.map(item => ({
                tegangan: item.tegangan,
                arus: item.arus,
                energi: item.energi,
                frekuensi: item.frekuensi
            }));
        }
    },
    async mounted() {
        await this.fetchhistoripzem()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$historipzemr', 'a$historipzems', 'a$historipzemt'
        ]),
        async fetchhistoripzem() {
            await this.a$historipzemr(this.valueDate)
            await this.a$historipzems(this.valueDate)
            await this.a$historipzemt(this.valueDate)
        },
    }
}
</script>

<template>
    <h1 class="mb-5 text-2xl font-medium">Pzem</h1>
    <div class="flex flex-wrap items-start justify-center gap-4 mb-4 md:grid md:grid-cols-3">
        <!-- Component Pzemr -->
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative justify-center overflow-x-auto">
                <h1 class="text-lg font-bold text-center">R</h1>
                <hr>
                <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                    <thead class="text-sm text-gray-900 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                V
                            </th>
                            <th scope="col" class="px-6 py-3">
                                A
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Energi
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Hz
                            </th>
                        </tr>
                    </thead>
                    <tbody id="historipzemr">
                        <tr v-if="datapzemritem.length === 0"
                            class="bg-white text-gray-900 text-center font-semibold whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td colspan="5" class="px-12 py-4">
                                Tidak ada data yang ditemukan.
                            </td>
                        </tr>
                        <tr v-else v-for="(item, index) in datapzemritem" :key="index" class="bg-white">
                            <td class="px-6 py-4">{{ item.tegangan }}</td>
                            <td class="px-6 py-4">{{ item.arus }}</td>
                            <td class="px-6 py-4 font-bold text-green-600">{{ item.energi }}</td>
                            <td class="px-6 py-4">{{ item.frekuensi }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Component Pzems -->
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative overflow-x-auto">
                <h1 class="text-lg font-bold text-center">S</h1>
                <hr>
                <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                    <thead class="text-sm text-gray-900 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                V
                            </th>
                            <th scope="col" class="px-6 py-3">
                                A
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Energi
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Hz
                            </th>
                        </tr>
                    </thead>
                    <tbody id="historipzems">
                        <tr v-if="datapzemsitem.length === 0"
                            class="bg-white text-gray-900 text-center font-semibold whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td colspan="5" class="px-12 py-4">
                                Tidak ada data yang ditemukan.
                            </td>
                        </tr>
                        <tr v-else v-for="(item, index) in datapzemsitem" :key="index" class="bg-white">
                            <td class="px-6 py-4">{{ item.tegangan }}</td>
                            <td class="px-6 py-4">{{ item.arus }}</td>
                            <td class="px-6 py-4 font-bold text-green-600">{{ item.energi }}</td>
                            <td class="px-6 py-4">{{ item.frekuensi }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Component Pzemt -->
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative overflow-x-auto">
                <h1 class="text-lg font-bold text-center">T</h1>
                <hr>
                <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                    <thead class="text-sm text-gray-900 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                V
                            </th>
                            <th scope="col" class="px-6 py-3">
                                A
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Energi
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Hz
                            </th>
                        </tr>
                    </thead>
                    <tbody id="historipzemt">
                        <tr v-if="datapzemtitem.length === 0"
                            class="bg-white text-gray-900 text-center font-semibold whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td colspan="5" class="px-12 py-4">
                                Tidak ada data yang ditemukan.
                            </td>
                        </tr>
                        <tr v-else v-for="(item, index) in datapzemtitem" :key="index" class="bg-white">
                            <td class="px-6 py-4">{{ item.tegangan }}</td>
                            <td class="px-6 py-4">{{ item.arus }}</td>
                            <td class="px-6 py-4 font-bold text-green-600">{{ item.energi }}</td>
                            <td class="px-6 py-4">{{ item.frekuensi }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>