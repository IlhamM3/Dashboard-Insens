<script setup>
import baseprox from '@/components/base/baseprox.vue'
import baterai from '@/components/components/baterai.vue'
</script>
<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['getproxi1'])
    },
    async mounted() {
        await this.fetchproxione()
    },
    updated() {
        this.logGetProxione()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$proxi1'
        ]),
        async fetchproxione() {
            await this.a$proxi1()
            this.logGetProxione()
        },
        logGetProxione() {
            // DATA UPDATE
            const data1 = this.getproxi1.data
            const jcycle = document.getElementById('jcycle')
            const jproduk = document.getElementById('jproduk')
            jcycle.innerHTML = ''
            jproduk.innerHTML = ''
            if (data1.length == 0) {
                const tr = document.createElement('tr');
                const td = document.createElement('tr');
                tr.classList.add('bg-white', 'dark:bg-gray-800');
                td.classList.add('bg-white', 'dark:bg-gray-800');

                tr.innerHTML = `<p>0</p>`
                td.innerHTML = `<p>0</p>`
                jcycle.appendChild(tr)
                jproduk.appendChild(td)
            } else {
                const DataProxijumlah = []
                data1.forEach(data => {
                    const timestamp = data.timestamp;
                    if (!DataProxijumlah.includes(timestamp)) {
                        DataProxijumlah.push(timestamp);
                        const datacycle = data.cycle
                        const dataproduk = data.cycle * 4

                        const tr = document.createElement('tr');
                        tr.classList.add('bg-white', 'dark:bg-gray-800');
                        const td = document.createElement('tr');
                        td.classList.add('bg-white', 'dark:bg-gray-800');
                        // const dataproduk = datacycle * 4
                        tr.innerHTML = `<p>${datacycle}</p>`
                        td.innerHTML = `<p>${dataproduk}</p>`
                        jcycle.appendChild(tr)
                        jproduk.appendChild(td)
                    }

                });
            }
        }
    }
}
</script>

<template>
    <div class="flex items-center justify-between mb-5">
        <h1 class="text-2xl font-medium ">Proximity</h1>
        <baterai />
    </div>
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
            <baseprox />
        </table>
        <div id="notfoundp">
            <div class="p-2 font-semibold text-center bg-white">
                Belum ada produksi untuk hari ini
            </div>
        </div>
    </div>
    <footer
        class="fixed bottom-2 md:w-[550px] lg:w-[1022px] bg-white border border-gray-400 shadow dark:bg-gray-800 shadow-md ">
        <div class="w-full max-w-screen-xl mx-auto md:flex md:items-center md:justify-between">
            <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                <tbody>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                            Jumlah Cycle:
                        </th>
                        <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jcycle">

                        </td>
                        <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">
                            Jumlah Produk:
                        </td>
                        <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jproduk">

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </footer>
</template>