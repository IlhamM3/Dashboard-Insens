<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    data() {
        return {
            selectedMessage: '',
            messagedel: '',
            checkdel: false,
            pzemrlength: '',
            pzemslength: '',
            pzemtlength: '',

        }
    },
    computed: {
        ...mapState(dataliststore, ['getpzemr', 'getpzems', 'getpzemt', 'getdelmessagepzemr'])
    },
    async mounted() {
        await this.fetchdash();
    },
    methods: {
        ...mapActions(dataliststore, ['a$pzemr', 'a$pzems', 'a$pzemt', 'del$pzemr', 'del$pzems', 'del$pzemt', 'del$pzemrbyid', 'del$pzemsbyid', 'del$pzemtbyid']),
        async deletedatabytoday() {
            try {
                await this.del$pzemr();
                await this.del$pzems();
                await this.del$pzemt();
                const response = this.getdelmessagepzemr
                this.messagedel = response;
                this.checkdel = true;
                await this.fetchdash();
                setInterval(() => {
                    this.checkdel = false
                }, 5000);
            } catch (error) {
                console.error(error)
            }
        },
        async deletedatarbyid(id) {
            await this.del$pzemrbyid(id);
            const response = this.getdelmessagepzemr
            this.messagedel = response;
            this.checkdel = true;
            await this.fetchdash();
            setInterval(() => {
                this.checkdel = false
            }, 5000);
        },
        async deletedatasbyid(id) {
            await this.del$pzemsbyid(id);
            const response = this.getdelmessagepzemr
            this.messagedel = response;
            this.checkdel = true;
            await this.fetchdash();
            setInterval(() => {
                this.checkdel = false
            }, 5000);
        },
        async deletedatatbyid(id) {
            await this.del$pzemtbyid(id);
            const response = this.getdelmessagepzemr
            this.messagedel = response;
            this.checkdel = true;
            await this.fetchdash();
            setInterval(() => {
                this.checkdel = false
            }, 5000);
        },
        async fetchdash() {
            try {
                await Promise.all([
                    this.a$pzemr(),
                    this.a$pzems(),
                    this.a$pzemt()
                ]);
                this.logGetdatadash();
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        },
        logGetdatadash() {
            this.pzemrlength = this.getpzemr.data.length;
            this.pzemslength = this.getpzems.data.length;
            this.pzemtlength = this.getpzemt.data.length;
            const messager = this.getpzemr.message;
            const messages = this.getpzems.message;
            const messaget = this.getpzemt.message;

            if (messager === 'Alat: ON' || messages === 'Alat: ON' || messaget === 'Alat: ON') {
                this.selectedMessage = 'Alat: ON';
            } else if (messager === 'Alat: OFF' && messages === 'Alat: OFF' && messaget === 'Alat: OFF') {
                this.selectedMessage = 'Alat: OFF';
            } else {
                this.selectedMessage = '';
            }
        }
    }
}
</script>

<template>
    <div class="flex items-center justify-between mb-5">
        <h1 class="text-2xl font-medium">Pzem</h1>
        <div class="flex items-center justify-center gap-x-3">
            <button type="button" data-modal-target="popup-modal" data-modal-toggle="popup-modal"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path
                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg></button>
            <h3 v-if="selectedMessage === 'Alat: OFF'"
                class="p-1 px-2 font-medium text-white bg-gray-600 rounded-md shadow shadow-md">
                {{ selectedMessage }}
            </h3>
            <div v-else class=" p-1 px-2 font-medium text-white bg-green-500 rounded-md shadow shadow-md">
                {{ selectedMessage }}
            </div>
        </div>
    </div>
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
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative justify-center overflow-x-hidden">
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
                    <tbody id="pzemr">
                        <tr v-if="pzemrlength === 0"
                            class="bg-white text-gray-900 font-semibold text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td colspan="5" class="px-12 py-3">
                                Belum ada produksi untuk hari ini
                            </td>
                        </tr>
                        <tr v-else v-for="data in getpzemr.data" :key="data.pzem_id"
                            class="bg-white text-gray-900 text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td class="px-2 py-3">{{ data.tegangan }}</td>
                            <td class="px-2 py-3">{{ data.arus }}</td>
                            <td class="px-2 py-3 font-bold text-green-600">{{ data.energi }}</td>
                            <td class="px-2 py-3">{{ data.frekuensi }}</td>
                            <td class="px-2 py-3">
                                <button type="button" @click="deletedatarbyid(data.pzem_id)"
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
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative overflow-x-hidden">
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
                    <tbody id="pzems">
                        <tr v-if="pzemslength === 0"
                            class="bg-white text-gray-900 font-semibold text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td colspan="5" class="px-12 py-3">
                                Belum ada produksi untuk hari ini
                            </td>
                        </tr>
                        <tr v-else v-for="data in getpzems.data" :key="data.pzem_id"
                            class="bg-white text-gray-900 text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td class="px-2 py-3">{{ data.tegangan }}</td>
                            <td class="px-2 py-3">{{ data.arus }}</td>
                            <td class="px-2 py-3 font-bold text-green-600">{{ data.energi }}</td>
                            <td class="px-2 py-3">{{ data.frekuensi }}</td>
                            <td class="px-2 py-3">
                                <button type="button" @click="deletedatasbyid(data.pzem_id)"
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
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative overflow-x-hidden">
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
                    <tbody id="pzemt">
                        <tr v-if="pzemtlength === 0"
                            class="bg-white text-gray-900 font-semibold text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td colspan="5" class="px-12 py-3">
                                Belum ada produksi untuk hari ini
                            </td>
                        </tr>
                        <tr v-else v-for="data in getpzemt.data" :key="data.pzem_id"
                            class="bg-white text-gray-900 text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                            <td class="px-2 py-3">{{ data.tegangan }}</td>
                            <td class="px-2 py-3">{{ data.arus }}</td>
                            <td class="px-2 py-3 font-bold text-green-600">{{ data.energi }}</td>
                            <td class="px-2 py-3">{{ data.frekuensi }}</td>
                            <td class="px-2 py-3">
                                <button type="button" @click="deletedatatbyid(data.pzem_id)"
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
    </div>
    <div id="popup-modal" tabindex="-1"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                    class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah Anda yakin Ingin
                        Menghapus Data
                        produksi hari ini?</h3>
                    <button data-modal-hide="popup-modal" type="button" @click="deletedatabytoday"
                        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                        Iya
                    </button>
                    <button data-modal-hide="popup-modal" type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Batal</button>
                </div>
            </div>
        </div>
    </div>
</template>