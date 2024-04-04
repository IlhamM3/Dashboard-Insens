<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['getpzems'])
    },
    async mounted() {
        await this.fetchpzems()
    },
    updated() {
        this.logGetpzems()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$pzems'
        ]),
        async fetchpzems() {
            await this.a$pzems()
            this.logGetpzems()
        },
        logGetpzems() {
            const notfound = document.getElementById('notfounds')
            const inputdatas = document.getElementById('pzems')
            const messagess = this.getpzems.message
            const infoalatpzems = document.getElementById('infoalatpzem')
            infoalatpzems.innerHTML = `${messagess}`;
            if (messagess === 'Alat: ON') {
                infoalatpzems.classList.add('bg-green-500')
                infoalatpzems.classList.remove('bg-gray-600')
            } else {
                infoalatpzems.classList.add('bg-gray-600')
                infoalatpzems.classList.remove('bg-green-500')
            }
            const data = this.getpzems.data
            inputdatas.innerHTML = ''
            if (data.length > 0) {
                notfound.classList.add('hidden')
                const pzemsdata = []
                data.forEach(data => {

                    const timestamp = data.timestamp;
                    if (!pzemsdata.includes(timestamp)) {
                        pzemsdata.push(timestamp);
                        const tr = document.createElement('tr');
                        tr.classList.add('bg-white', 'text-center', 'text-gray-900', 'dark:bg-gray-800');
                        tr.innerHTML +=
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
                                </td>
                            `
                        inputdatas.appendChild(tr);
                    }
                });
            }
        }
    }

}
</script>

<template>
    <tbody id="pzems">

    </tbody>
</template>