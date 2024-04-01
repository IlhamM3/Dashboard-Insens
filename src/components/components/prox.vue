<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    computed: {
        ...mapState(dataliststore, ['getproxi'])
    },
    async mounted() {
        await this.a$proxi()
        this.logGetProxi()
    },
    updated() {
        this.logGetProxi()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$proxi',
        ]),
        logGetProxi() {
            const data = this.getproxi.data
            const listproxi = document.getElementById('listproxi');
            data.forEach(data => {
                const timestamp = data.timestamp
                const date = new Date(timestamp)
                const hari = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date)
                const jam = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)
                const tanggal = date.getDate().toString().padStart('0')
                const bulan = (date.getMonth() + 1).toString().padStart('0')
                const tahun = date.getFullYear()
                const tanggalfull = `0${tanggal}/0${bulan}/${tahun}`
                listproxi.innerHTML +=
                    `<tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        finished
                    </th>
                    <td class="px-3 py-4">
                        ${hari}
                    </td>
                    <td class="px-3 py-4">
                        ${tanggalfull}
                    </td>
                    <td class="px-3 py-4">
                        ${jam}
                    </td>
                </tr>`
            });
        }
    }
}
</script>

<template>
    <h1 class="mb-5 text-2xl font-medium">Proximity</h1>
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
            <tbody id="listproxi">

            </tbody>
        </table>
    </div>
    <footer
        class="fixed bottom-2 md:w-[550px] lg:w-[1050px] bg-white rounded-lg shadow dark:bg-gray-800 shadow-md sm:rounded-lg">
        <div class="w-full max-w-screen-xl mx-auto md:flex md:items-center md:justify-between">
            <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                <tbody>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                            Jumlah Cycle:
                        </th>
                        <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jcycle">
                            07
                        </td>
                        <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">
                            Jumlah Produk:
                        </td>
                        <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jproduk">
                            28
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </footer>
</template>