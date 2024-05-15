<script>
import tableprox from './tableproxi.vue';
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    props: ['initDate'],
    components: {
        tableprox,
    },
    data() {
        return {
            valueDate: this.initDate,
            qty_product: ''
        }
    },
    computed: {
        ...mapState(dataliststore, ['dataHistoriproxi1', 'datamesin']),
        cycleHistory() {
            if (!this.dataHistoriproxi1.data || !this.dataHistoriproxi1.data.length) {
                return [{ cycle: 0, produk: 0 }];
            }
            return this.dataHistoriproxi1.data.map(item => ({
                cycle: item.cycle,
                produk: item.cycle * this.qty_product
            }));
        },
        isDataEmpty() {
            return this.cycleHistory.length === 1 && this.cycleHistory[0].cycle === 0;
        }
    },
    watch: {
        initDate() {
            this.valueDate = this.initDate
            this.fetchHistoriProxiOne()
        },
    },
    methods: {
        ...mapActions(dataliststore, ['a$historiprox1', 'a$mesin']),
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
        async fetchHistoriProxiOne() {
            await this.a$historiprox1(this.valueDate);
        }
    },
    async mounted() {
        this.fetchHistoriProxiOne();
        await this.fetchqtymesin();
    }
}
</script>

<template>
    <h1 class="mb-5 text-2xl font-medium">Proximity</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-md">
        <table class="w-full text-sm font-medium text-left text-gray-500 dark:text-gray-400">
            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-3 py-3">Proses Injection</th>
                    <th scope="col" class="px-3 py-3">Hari</th>
                    <th scope="col" class="px-3 py-3">Tanggal</th>
                    <th scope="col" class="px-3 py-3">Jam</th>
                </tr>
            </thead>
            <tableprox :initDate="valueDate" />
        </table>
    </div>
    <footer class="fixed bottom-2 md:w-[550px] lg:w-[1022px] bg-white rounded-lg shadow dark:bg-gray-800">
        <table class="w-full text-left text-gray-500 dark:text-gray-400">
            <tbody>
                <tr class="bg-white dark:bg-gray-800">
                    <th class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">Jumlah Cycle:</th>
                    <td v-for="item in cycleHistory" :key="item.cycle" class="px-3 py-4 font-bold text-gray-900">
                        {{ item.cycle }}
                    </td>
                    <td class="px-3 py-4 font-bold text-gray-900">Jumlah Produk:</td>
                    <td v-for="item in cycleHistory" :key="item.produk" class="px-3 py-4 font-bold text-gray-900">
                        {{ item.produk }}
                    </td>
                </tr>
            </tbody>
        </table>
    </footer>
</template>