<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    props: ['initDate'],
    data() {
        return {
            valueDate: this.initDate,
            messagedel: '',
            checkdel: false
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
                frekuensi: item.frekuensi,
                pzem_id: item.pzem_id
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
                frekuensi: item.frekuensi,
                pzem_id: item.pzem_id
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
                frekuensi: item.frekuensi,
                pzem_id: item.pzem_id
            }));
        }
    },
    async mounted() {
        await this.fetchhistoripzem()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$historipzemr', 'a$historipzems', 'a$historipzemt', 'del$pzemrbyid', 'del$pzemsbyid', 'del$pzemtbyid'
        ]),
        async deletedatarbyid(id) {
            await this.del$pzemrbyid(id);
            this.messagedel = "Data Berhasil Dihapus";
            this.checkdel = true;
            await this.fetchhistoripzem();
            setInterval(() => {
                this.checkdel = false
            }, 5000);
        },
        async deletedatasbyid(id) {
            await this.del$pzemsbyid(id);
            this.messagedel = "Data Berhasil Dihapus";
            this.checkdel = true;
            await this.fetchhistoripzem();
            setInterval(() => {
                this.checkdel = false
            }, 5000);
        },
        async deletedatatbyid(id) {
            await this.del$pzemtbyid(id);
            this.messagedel = "Data Berhasil Dihapus";
            this.checkdel = true;
            await this.fetchhistoripzem();
            setInterval(() => {
                this.checkdel = false
            }, 5000);
        },
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
                            class="bg-white text-gray-900 font-semibold text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td colspan="5" class="px-12 py-4">
                                Tidak ada data yang ditemukan.
                            </td>
                        </tr>
                        <tr v-else v-for="(item, index) in datapzemritem" :key="index"
                            class=" bg-white text-gray-900 text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td class="px-2 py-3">{{ item.tegangan }}</td>
                            <td class="px-2 py-3">{{ item.arus }}</td>
                            <td class="px-2 py-3 font-bold text-green-600">{{ item.energi }}</td>
                            <td class="px-2 py-3">{{ item.frekuensi }}</td>
                            <td class="px-2 py-3">
                                <button type="button" @click="deletedatarbyid(item.pzem_id)"
                                    class="text-center items-center bg-red-800 text-white rounded-md p-1.5"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg></button>
                            </td>
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
                            <td class="px-2 py-3">{{ item.tegangan }}</td>
                            <td class="px-2 py-3">{{ item.arus }}</td>
                            <td class="px-2 py-3 font-bold text-green-600">{{ item.energi }}</td>
                            <td class="px-2 py-3">{{ item.frekuensi }}</td>
                            <td class="px-2 py-3"><button type="button" @click="deletedatasbyid(item.pzem_id)"
                                    class="text-center items-center bg-red-800 text-white rounded-md p-1.5"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg></button></td>
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
                            <td class="px-2 py-3">{{ item.tegangan }}</td>
                            <td class="px-2 py-3">{{ item.arus }}</td>
                            <td class="px-2 py-3 font-bold text-green-600">{{ item.energi }}</td>
                            <td class="px-2 py-3">{{ item.frekuensi }}</td>
                            <td class="px-2 py-3"><button type="button" @click="deletedatatbyid(item.pzem_id)"
                                    class="text-center items-center bg-red-800 text-white rounded-md p-1.5"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>