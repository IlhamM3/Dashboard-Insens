<script>
import tableprox from './tableproxi.vue';
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    components: {
        tableprox,
    },
    computed: {
        ...mapState(dataliststore, ['dataHistoriproxi1'])
    },
    async mounted() {
        await this.fetchhistoriproxione()
        setInterval(() => {
            this.fetchhistoriproxione()
        }, 5000);
    },
    methods: {
        ...mapActions(dataliststore, ['a$historiprox1']),
        async fetchhistoriproxione() {
            await this.a$historiprox1();
            this.gethistoriproxi1();
        },
        gethistoriproxi1() {
            const data = this.dataHistoriproxi1.data;
            const jcyclehistori = document.getElementById('jcyclehistori');
            const jprodukhistori = document.getElementById('jprodukhistori');

            jcyclehistori.innerHTML = ''
            jprodukhistori.innerHTML = ''
            if (data.length == 0) {
                const tr = document.createElement('tr');
                const td = document.createElement('tr');
                tr.classList.add('bg-white', 'dark:bg-gray-800');
                td.classList.add('bg-white', 'dark:bg-gray-800');

                tr.innerHTML = `<p>0</p>`
                td.innerHTML = `<p>0</p>`
                jcyclehistori.appendChild(tr)
                jprodukhistori.appendChild(td)
            } else {
                const dataproxijumlahhistori = []
                data.forEach(data => {
                    const timestamp = data.timestamp;
                    if (!dataproxijumlahhistori.includes(timestamp)) {
                        dataproxijumlahhistori.push(timestamp);
                        const datacycle = data.cycle
                        const dataproduk = data.cycle * 4

                        const tr = document.createElement('tr');
                        tr.classList.add('bg-white', 'dark:bg-gray-800');
                        const td = document.createElement('tr');
                        td.classList.add('bg-white', 'dark:bg-gray-800');

                        // const dataproduk = datacycle * 4
                        tr.innerHTML = `<p>${datacycle}</p>`
                        td.innerHTML = `<p>${dataproduk}</p>`
                        jcyclehistori.appendChild(tr)
                        jprodukhistori.appendChild(td)
                    }
                });
            }
        }
    }
}
</script>

<template>
    <h1 class="mb-5 text-2xl font-medium ">Proximity</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-md">
        <table class="w-full text-sm font-medium text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-3 py-3">
                        Proses Injection
                    </th>
                    <th scope="col" class="px-3 py-3">
                        Hari
                    </th>
                    <th scope="col" class="px-3 py-3">
                        Tanggal
                    </th>
                    <th scope="col" class="px-3 py-3">
                        Jam
                    </th>
                </tr>
            </thead>
            <tableprox />
        </table>
        <div id="notfoundphistori">
            <div class="p-2 font-semibold text-center bg-white">
                Tidak memproduksi pada hari itu
            </div>
        </div>
    </div>
    <footer
        class="fixed bottom-2 md:w-[550px] lg:w-[1022px] bg-white rounded-lg shadow dark:bg-gray-800 shadow-md sm:rounded-lg">
        <div class="w-full max-w-screen-xl mx-auto md:flex md:items-center md:justify-between">
            <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                <tbody>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                            Jumlah Cycle:
                        </th>
                        <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jcyclehistori">

                        </td>
                        <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">
                            Jumlah Produk:
                        </td>
                        <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jprodukhistori">

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </footer>
</template>