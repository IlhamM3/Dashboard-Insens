<template>
    <div class="p-4 sm:ml-64 mt-28 md:mt-16">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-medium">Proximity</h1>
                <baterai />
            </div>
            <div class="relative overflow-x-hidden shadow-md sm:rounded-md">
                <table class="w-full font-medium text-left text-gray-900 text-md rtl:text-right dark:text-gray-400">
                    <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-3 py-3">Cycle</th>
                            <th scope="col" class="px-3 py-3">Produk</th>
                            <th scope="col" class="px-3 py-3">Jam</th>
                        </tr>
                    </thead>
                    <tbody id="cycledash">
                        <tr v-if="lengthprox === 0">
                            <td colspan="3" class="p-2 font-semibold text-center bg-white">Tidak ada data yang
                                ditemukan.</td>
                        </tr>
                        <tr v-else v-for="(data, index) in getproxi1.data" :key="index"
                            class="p-4 font-semibold bg-white">
                            <td class="px-3 py-4">{{ data.cycle }}</td>
                            <td class="px-3 py-4">{{ data.cycle * qty_product }}</td>
                            <td class="px-3 py-4">{{ timejakarta(data.timestamp) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex items-center justify-between my-6">
                <h1 class="text-2xl font-medium">Pzem</h1>
                <h3 v-if="selectedMessage === 'Alat: OFF'"
                    class="p-1 px-2 font-medium text-white bg-gray-600 rounded-md shadow shadow-md">
                    {{ selectedMessage }}
                </h3>
                <div v-else class="p-1 px-2 font-medium text-white bg-green-500 rounded-md shadow shadow-md">
                    {{ selectedMessage }}
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-4 mb-4 md:grid md:grid-cols-3">
                <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                    <div class="relative justify-center overflow-x-hidden">
                        <h1 class="text-lg font-bold text-center">R</h1>
                        <hr>
                        <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">V</th>
                                    <th scope="col" class="px-6 py-3">A</th>
                                    <th scope="col" class="px-6 py-3">Energi</th>
                                    <th scope="col" class="px-6 py-3">Hz</th>
                                </tr>
                            </thead>
                            <tbody id="pzemr1">
                                <tr v-if="lengthR === 0">
                                    <td colspan="4" class="p-2 font-semibold text-center bg-white">Tidak ada data yang
                                        ditemukan.</td>
                                </tr>
                                <tr v-else v-for="(data, index) in getpzemr1.data" :key="index"
                                    class="p-4 font-semibold bg-white">
                                    <td class="px-6 py-4">{{ data.tegangan }}</td>
                                    <td class="px-6 py-4">{{ data.arus }}</td>
                                    <td class="px-6 py-4 font-bold text-green-600">{{ data.energi }}</td>
                                    <td class="px-6 py-4">{{ data.frekuensi }}</td>
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
                            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">V</th>
                                    <th scope="col" class="px-6 py-3">A</th>
                                    <th scope="col" class="px-6 py-3">Energi</th>
                                    <th scope="col" class="px-6 py-3">Hz</th>
                                </tr>
                            </thead>
                            <tbody id="pzems1">
                                <tr v-if="lengthS === 0">
                                    <td colspan="4" class="p-2 font-semibold text-center bg-white">Tidak ada data yang
                                        ditemukan.</td>
                                </tr>
                                <tr v-else v-for="(data, index) in getpzems1.data" :key="index"
                                    class="p-4 font-semibold bg-white">
                                    <td class="px-6 py-4">{{ data.tegangan }}</td>
                                    <td class="px-6 py-4">{{ data.arus }}</td>
                                    <td class="px-6 py-4 font-bold text-green-600">{{ data.energi }}</td>
                                    <td class="px-6 py-4">{{ data.frekuensi }}</td>
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
                            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">V</th>
                                    <th scope="col" class="px-6 py-3">A</th>
                                    <th scope="col" class="px-6 py-3">Energi</th>
                                    <th scope="col" class="px-6 py-3">Hz</th>
                                </tr>
                            </thead>
                            <tbody id="pzemt1">
                                <tr v-if="lengthT === 0">
                                    <td colspan="4" class="p-2 font-semibold text-center bg-white">Tidak ada data yang
                                        ditemukan.</td>
                                </tr>
                                <tr v-else v-for="(data, index) in getpzemt1.data" :key="index"
                                    class="p-4 font-semibold bg-white">
                                    <td class="px-6 py-4">{{ data.tegangan }}</td>
                                    <td class="px-6 py-4">{{ data.arus }}</td>
                                    <td class="px-6 py-4 font-bold text-green-600">{{ data.energi }}</td>
                                    <td class="px-6 py-4">{{ data.frekuensi }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dataliststore } from '@/stores/data';
import { mapState, mapActions } from 'pinia';
import baterai from '@/components/components/baterai.vue';

export default {
    components: { baterai },
    data() {
        return {
            selectedMessage: '',
            lengthprox: 0,
            lengthR: 0,
            lengthS: 0,
            lengthT: 0,
            qty_product: ''
        };
    },
    computed: {
        ...mapState(dataliststore, ['getproxi1', 'getpzemr1', 'getpzems1', 'getpzemt1', 'datamesin'])
    },
    async mounted() {
        await this.fetchdash();
        await this.fetchqtymesin();
        setInterval(this.fetchdash, 5000);
    },
    methods: {
        ...mapActions(dataliststore, ['a$pzemr1', 'a$pzems1', 'a$pzemt1', 'a$proxi1', 'a$mesin']),
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
        async fetchdash() {
            try {
                await Promise.all([
                    this.a$pzemr1(),
                    this.a$pzems1(),
                    this.a$pzemt1(),
                    this.a$proxi1()
                ]);
                this.logGetdatadash();
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        },
        logGetdatadash() {
            this.lengthprox = this.getproxi1.data.length;
            this.lengthR = this.getpzemr1.data.length;
            this.lengthS = this.getpzems1.data.length;
            this.lengthT = this.getpzemt1.data.length;
            const messager = this.getpzemr1.message;
            const messages = this.getpzems1.message;
            const messaget = this.getpzemt1.message;

            if (messager === 'Alat: ON' || messages === 'Alat: ON' || messaget === 'Alat: ON') {
                this.selectedMessage = 'Alat: ON';
            } else if (messager === 'Alat: OFF' && messages === 'Alat: OFF' && messaget === 'Alat: OFF') {
                this.selectedMessage = 'Alat: OFF';
            } else {
                this.selectedMessage = '';
            }
        },
        timejakarta(datastamp) {
            return new Date(datastamp).toLocaleTimeString('id-ID', {
                timeZone: 'Asia/Jakarta',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }
};
</script>
