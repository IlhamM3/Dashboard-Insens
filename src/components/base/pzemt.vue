<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['getpzemt'])
    },
    async mounted() {
        await this.fetchpzemt()
        setInterval(() => {
            this.fetchpzemt()
        }, 5000);
    },
    updated() {
        this.logGetpzemt()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$pzemt'
        ]),
        async fetchpzemt() {
            await this.a$pzemt()
            this.logGetpzemt()
        },
        logGetpzemt() {
            const inputdatat = document.getElementById('pzemt')
            const notfound = document.getElementById('notfoundt')
            const messaget = this.getpzemt.message
            const data = this.getpzemt.data
            inputdatat.innerHTML = ''
            if (data.length > 0) {
                notfound.classList.add('hidden')
                const pzemtdata = []
                data.forEach(data => {
                    const infoalatpzemt = document.getElementById('infoalatpzem')
                    infoalatpzemt.innerHTML = `${messaget}`;
                    if (messaget === 'Alat: ON') {
                        infoalatpzemt.classList.add('bg-green-500')
                        infoalatpzemt.classList.remove('bg-gray-600')
                    } else {
                        infoalatpzemt.classList.add('bg-gray-600')
                        infoalatpzemt.classList.remove('bg-green-500')
                    }
                    const timestamp = data.timestamp;
                    if (!pzemtdata.includes(timestamp)) {
                        pzemtdata.push(timestamp);
                        const tr = document.createElement('tr');
                        tr.classList.add('bg-white', 'dark:bg-gray-800');
                        tr.innerHTML +=
                            `<tr class="bg-white text-gray-900 text-center  whitespace-nowrap dark:text-white dark:bg-gray-800">
                                <td
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
                                </td>
                            </tr>`
                        inputdatat.appendChild(tr);
                    }
                });
            }
        }
    }

}
</script>

<template>
    <tbody id="pzemt">

    </tbody>
</template>