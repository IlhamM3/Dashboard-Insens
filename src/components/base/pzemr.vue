<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['getpzemr', 'getpzemt', 'getpzems'])
    },
    async mounted() {
        await this.fetchpzemr()
    },
    updated() {
        this.logGetpzemr()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$pzemr'
        ]),
        async fetchpzemr() {
            await this.a$pzemr()
            this.logGetpzemr()
        },
        logGetpzemr() {
            const inputdatar = document.getElementById('pzemr')
            const notfound = document.getElementById('notfoundr')
            const messageer = this.getpzemr.message;
            const messagees = this.getpzems.message;
            const messageet = this.getpzemt.message;
            let selectMessage = ''
            if (messageer === 'Alat: ON' || messagees === 'Alat: ON' || messageet === 'Alat: ON') {
                selectMessage = 'Alat: ON';
            } else if (messageer === 'Alat: OFF' && messagees === 'Alat: OFF' && messageet === 'Alat: OFF') {
                selectMessage = 'Alat: OFF'
            }

            if (selectMessage) {
                const infoalatpzem = document.getElementById('infoalatpzem');
                infoalatpzem.innerHTML = selectMessage;
                if (selectMessage === 'Alat: ON') {
                    infoalatpzem.classList.add('bg-green-500')
                    infoalatpzem.classList.remove('bg-gray-600')
                } else {
                    infoalatpzem.classList.add('bg-gray-600')
                    infoalatpzem.classList.remove('bg-green-500')
                }
            }
            const data = this.getpzemr.data
            inputdatar.innerHTML = ''
            if (data.length > 0) {
                notfound.classList.add('hidden')
                const pzemrdata = []
                data.forEach(data => {
                    const timestamp = data.timestamp;
                    if (!pzemrdata.includes(timestamp)) {
                        pzemrdata.push(timestamp);
                        const tr = document.createElement('tr');
                        tr.className = 'bg-white text-gray-900 text-center  whitespace-nowrap dark:text-white dark:bg-gray-800';
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
                            `;
                        inputdatar.appendChild(tr);
                    }
                });
            }
        }
    }

}
</script>

<template>
    <tbody id="pzemr">

    </tbody>
</template>