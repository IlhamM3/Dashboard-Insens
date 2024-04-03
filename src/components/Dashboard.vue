<script setup>
import baterai from '@/components/components/baterai.vue'
</script>
<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    computed: {
        ...mapState(dataliststore, ['getproxi1', 'getpzemr1', 'getpzems1', 'getpzemt1'])
    },
    async mounted() {
        await this.fetchdash()
        setInterval(() => {
            this.fetchdash()
        }, 5000);
    },
    updated() {
        this.logGetdatadash()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$pzemr1', 'a$pzems1', 'a$pzemt1', 'a$proxi1'
        ]),
        async fetchdash() {
            await this.a$pzemr1()
            await this.a$pzems1()
            await this.a$pzemt1()
            await this.a$proxi1()
            this.logGetdatadash()
        },
        logGetdatadash() {
            const messager = this.getpzemr1.message
            const messages = this.getpzems1.message
            const messaget = this.getpzemt1.message

            let selectedMessage;
            if (messager) {
                selectedMessage = messager;
            } else if (messages) {
                selectedMessage = messages;
            } else if (messaget) {
                selectedMessage = messaget;
            }
            if (selectedMessage) {
                const infoalatpzemdash = document.getElementById('infoalatpzemdash');
                infoalatpzemdash.innerHTML = selectedMessage;
                if (selectedMessage === 'Alat: ON') {
                    infoalatpzemdash.classList.add('bg-green-500')
                    infoalatpzemdash.classList.remove('bg-gray-600')
                } else {
                    infoalatpzemdash.classList.add('bg-gray-600')
                    infoalatpzemdash.classList.remove('bg-green-500')
                }
            }
            const dashdatar1 = this.getpzemr1.data
            const dashdatas1 = this.getpzems1.data
            const dashdatat1 = this.getpzemt1.data
            const dashproxi1 = this.getproxi1.data

            const dashinputdataR = document.getElementById('pzemr1')
            const dashinputdataS = document.getElementById('pzems1')
            const dashinputdataT = document.getElementById('pzemt1')
            const dashcycledash = document.getElementById('cycledash')
            const dashnotfoundp = document.getElementById('notfoundp')
            const dashnotfoundr = document.getElementById('notfoundr')
            const dashnotfounds = document.getElementById('notfounds')
            const dashnotfoundt = document.getElementById('notfoundt')

            dashcycledash.innerHTML = ''
            dashinputdataR.innerHTML = ''
            dashinputdataS.innerHTML = ''
            dashinputdataT.innerHTML = ''
            if (dashproxi1.length > 0) {
                dashnotfoundp.classList.add('hidden')
                const proxi1datadash = []
                dashproxi1.forEach(data => {
                    const dashdatacycle = data.cycle
                    const dashdataproduk = data.cycle * 4

                    const dashtimestamp = data.timestamp
                    const date = new Date(dashtimestamp);
                    const jam = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
                    if (!proxi1datadash.includes(dashtimestamp)) {
                        proxi1datadash.push(dashtimestamp);
                        const trdash = document.createElement('tr');
                        trdash.classList.add('bg-white', 'dark:bg-gray-800');
                        trdash.innerHTML =
                            `
                                <td class="px-3 py-4">
                                    ${dashdatacycle}
                                </td>
                                <td class="px-3 py-4">
                                    ${dashdataproduk}
                                </td>
                                <td class="px-3 py-4">
                                    ${jam}
                                </td>
                            `
                        dashcycledash.appendChild(trdash)
                    }
                });
            }
            if (dashdatar1.length === 0 && dashdatas1.length === 0 && dashdatat1.length === 0) {

            } else {
                const dashpzemDatar = []
                const dashpzemDatas = []
                const dashpzemDatat = []
                dashnotfoundr.classList.add('hidden');
                dashnotfounds.classList.add('hidden');
                dashnotfoundt.classList.add('hidden');
                dashdatar1.forEach(data => {
                    const dashtimestamp = data.timestamp;
                    if (!dashpzemDatar.includes(dashtimestamp)) {
                        dashpzemDatar.push(dashtimestamp);
                        const dashtr = document.createElement('tr');
                        dashtr.classList.add('bg-white', 'dark:bg-gray-800');
                        dashtr.innerHTML =
                            `<td
                                    class="px-6 py-4 ">
                                    ${data.tegangan}
                                </td>
                                <td class="px-6 py-4">
                                    ${data.arus}
                                </td>
                                <td class="px-6 py-4 font-bold text-green-600">
                                    ${data.energi}
                                </td>
                                <td class="px-6 py-4">
                                    ${data.frekuensi}
                                </td>`
                        dashinputdataR.appendChild(dashtr)
                    }
                });
                dashdatas1.forEach(data => {
                    const timestamp = data.timestamp;
                    if (!dashpzemDatas.includes(timestamp)) {
                        dashpzemDatas.push(timestamp);
                        const trpzems = document.createElement('tr');
                        trpzems.classList.add('bg-white', 'dark:bg-gray-800');
                        trpzems.innerHTML =
                            `<td
                                    class="px-6 py-4 ">
                                    ${data.tegangan}
                                </td>
                                <td class="px-6 py-4">
                                    ${data.arus}
                                </td>
                                <td class="px-6 py-4 font-bold text-green-600">
                                    ${data.energi}
                                </td>
                                <td class="px-6 py-4">
                                    ${data.frekuensi}
                                </td>`
                        dashinputdataS.appendChild(trpzems)
                    }
                });
                dashdatat1.forEach(data => {
                    const timestamp = data.timestamp;
                    if (!dashpzemDatat.includes(timestamp)) {
                        dashpzemDatat.push(timestamp);
                        const trpzemt = document.createElement('tr');
                        trpzemt.classList.add('bg-white', 'dark:bg-gray-800');
                        trpzemt.innerHTML =
                            `   <td
                                    class="px-6 py-4 ">
                                    ${data.tegangan}
                                </td>
                                <td class="px-6 py-4">
                                    ${data.arus}
                                </td>
                                <td class="px-6 py-4 font-bold text-green-600">
                                    ${data.energi}
                                </td>
                                <td class="px-6 py-4">
                                    ${data.frekuensi}
                                </td>`
                        dashinputdataT.appendChild(trpzemt)
                    }
                });
            }


        }
    }
}
</script>


<template>
    <div class="p-4 sm:ml-64 mt-28 md:mt-16">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div class="flex items-center justify-between mb-6">
                <h1 class="font-medium text-2xl">Proximity</h1>
                <baterai />
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-md">
                <table class="w-full font-medium text-md text-left rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead class="text-md text-gray-900 bg-gray-100 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-3 py-3">
                                Cycle
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Produk
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Jam
                            </th>
                        </tr>
                    </thead>
                    <tbody id="cycledash">

                    </tbody>
                </table>
                <div id="notfoundp">
                    <div class="text-center p-2 bg-white font-semibold">
                        Belum ada produksi untuk hari ini
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between my-6">
                <h1 class="text-2xl font-medium">Pzem</h1>
                <div id="infoalatpzemdash" class="p-1 px-2 font-medium text-white rounded-md shadow shadow-md">
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-4 mb-4 md:grid md:grid-cols-3">
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
                            <tbody id="pzemr1">

                            </tbody>
                        </table>
                        <div id="notfoundr">
                            <div class="text-center p-2 bg-white font-semibold">
                                Belum ada produksi untuk hari ini
                            </div>
                        </div>
                    </div>
                </div>
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
                            <tbody id="pzems1">

                            </tbody>
                        </table>
                        <div id="notfounds">
                            <div class="text-center p-2 bg-white font-semibold">
                                Belum ada produksi untuk hari ini
                            </div>
                        </div>
                    </div>
                </div>
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
                            <tbody id="pzemt1">

                            </tbody>
                        </table>
                        <div id="notfoundt">
                            <div class="text-center p-2 bg-white font-semibold">
                                Belum ada produksi untuk hari ini
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>