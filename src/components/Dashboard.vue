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
                        <tr v-else v-for="data in cycle" :key="data.cycle" class="p-4 font-semibold bg-white">
                            <td class="px-3 py-4">{{ data.cycle }}</td>
                            <td class="px-3 py-4">{{ data.cycle * qty_product }}</td>
                            <td class="px-3 py-4">{{ formattime(data.timestamp) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <form method="post" @submit.prevent="() => sendqty()" @reset="() => resetForm()">
                <div class="my-5">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ubah
                        QTY Per Cycle</label>
                    <div class="flex w-60 justify-center items-center">
                        <input type="text" id="base-input" :placeholder="`QTY Per Cycle: ${qty_product}`"
                            v-model="input.qty_product" required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <button type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg ml-2 text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ganti</button>
                    </div>
                </div>
            </form>
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
                                <tr v-if="lengthR === 0"
                                    class="bg-white text-gray-900  font-semibold text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                                    <td colspan="5" class="px-12 py-4">
                                        Belum ada produksi untuk hari ini
                                    </td>
                                </tr>
                                <tr v-else v-for="data in Pzemr" :key="data.id"
                                    class="bg-white text-gray-900 text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
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
                                <tr v-if="lengthS === 0"
                                    class="bg-white text-gray-900  font-semibold text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                                    <td colspan="5" class="px-12 py-4">
                                        Belum ada produksi untuk hari ini
                                    </td>
                                </tr>
                                <tr v-else v-for="data in Pzems" :key="data.id"
                                    class="bg-white text-gray-900 text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
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
                                <tr v-if="lengthT === 0"
                                    class="bg-white text-gray-900  font-semibold text-center whitespace-nowrap dark:text-white dark:bg-gray-800">
                                    <td colspan="5" class="px-12 py-4">
                                        Belum ada produksi untuk hari ini
                                    </td>
                                </tr>
                                <tr v-else v-for="data in Pzemt" :key="data.id" class="p-4 font-semibold bg-white">
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
import baterai from '@/components/baterai-prox-pzem/baterai.vue';

const qtyinput = {
    qty_product: ''
}

export default {
    components: { baterai },
    data() {
        return {
            selectedMessage: '',
            lengthprox: 0,
            lengthR: 0,
            lengthS: 0,
            lengthT: 0,
            qty_product: '',
            input: { ...qtyinput }
        };
    },
    computed: {
        ...mapState(dataliststore, ['getproxi', 'getpzemr', 'getpzems', 'getpzemt', 'datamesin']),
        cycle() {
            const firstItem = this.getproxi.data[0];
            return [{
                cycle: firstItem.cycle,
                produk: firstItem.cycle * this.qty_product,
                timestamp: firstItem.timestamp
            }];
        },
        Pzemr() {
            const firstItem = this.getpzemr.data[0];
            return [{
                id: firstItem.pzem_id,
                tegangan: firstItem.tegangan,
                arus: firstItem.arus,
                energi: firstItem.energi,
                frekuensi: firstItem.frekuensi
            }];
        },
        Pzems() {
            const firstItem = this.getpzems.data[0];
            return [{
                id: firstItem.pzem_id,
                tegangan: firstItem.tegangan,
                arus: firstItem.arus,
                energi: firstItem.energi,
                frekuensi: firstItem.frekuensi
            }];
        },
        Pzemt() {
            const firstItem = this.getpzemt.data[0];
            return [{
                id: firstItem.pzem_id,
                tegangan: firstItem.tegangan,
                arus: firstItem.arus,
                energi: firstItem.energi,
                frekuensi: firstItem.frekuensi
            }];
        },
    },
    async mounted() {
        await this.fetchdash();
        await this.fetchqtymesin();
    },
    methods: {
        ...mapActions(dataliststore, ['a$pzemr', 'a$pzems', 'a$pzemt', 'a$proxi', 'a$mesin', 'a$qtyproduct']),
        resetForm() {
            Object.assign(this.input, qtyinput)
        },
        async sendqty() {
            try {
                await this.a$qtyproduct(this.input)
                this.resetForm()
                await this.fetchqtymesin();
            } catch (error) {
                console.error(error)
            }
        },
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
                    this.a$pzemr(),
                    this.a$pzems(),
                    this.a$pzemt(),
                    this.a$proxi()
                ]);
                this.logGetdatadash();
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        },
        logGetdatadash() {
            this.lengthprox = this.getproxi.data.length;
            this.lengthR = this.getpzemr.data.length;
            this.lengthS = this.getpzems.data.length;
            this.lengthT = this.getpzemt.data.length;
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
        },
        formattime(datastamp) {
            const dateObj = new Date(datastamp);
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const seconds = dateObj.getSeconds();
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
};
</script>
