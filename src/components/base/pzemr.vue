<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    computed: {
        ...mapState(dataliststore, ['getpzemr', 'getpzemt', 'getpzems'])
    },
    async mounted() {
        await this.fetchpzemr()
        setInterval(() => {
            this.fetchpzemr()
        }, 5000);
    },
    updated() {
        this.logGetpzemr()
    },
    methods: {
        ...mapActions(dataliststore, ['a$pzemr']),
        async fetchpzemr() {
            await this.a$pzemr()
            this.logGetpzemr()
        },
        logGetpzemr() {
            const inputdatar = document.getElementById('pzemr')
            const notfound = document.getElementById('notfoundr')
            const data = this.getpzemr.data
            const messageer = this.getpzemr.message;
            const messagees = this.getpzems.message;
            const messageet = this.getpzemt.message;
            let selectMessage = 'Alat: OFF';

            if (messageer === 'Alat: ON' || messagees === 'Alat: ON' || messageet === 'Alat: ON') {
                selectMessage = 'Alat: ON';
            }

            const infoalatpzem = document.getElementById('infoalatpzem');
            infoalatpzem.innerHTML = selectMessage;
            infoalatpzem.classList.toggle('bg-green-500', selectMessage === 'Alat: ON');
            infoalatpzem.classList.toggle('bg-gray-600', selectMessage === 'Alat: OFF');

            inputdatar.innerHTML = '';
            if (data.length > 0) {
                notfound.classList.add('hidden');
                const pzemrdata = new Set();
                data.forEach(data => {
                    const timestamp = data.timestamp;
                    if (!pzemrdata.has(timestamp)) {
                        pzemrdata.add(timestamp);
                        const tr = document.createElement('tr');
                        tr.className = 'bg-white text-gray-900 text-center  whitespace-nowrap dark:text-white dark:bg-gray-800';
                        tr.innerHTML +=
                            `<td class="px-6 py-4">${data.tegangan}</td>
                             <td class="px-6 py-4">${data.arus}</td>
                             <td class="px-6 py-4 font-bold text-green-600">${data.energi}</td>
                             <td class="px-6 py-4">${data.frekuensi}</td>`;
                        inputdatar.appendChild(tr);
                    }
                });
            } else {
                notfound.classList.remove('hidden');
            }
        }
    }
}
</script>

<template>
    <tbody id="pzemr">
    </tbody>
</template>
