<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['getpzemr'])
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
                            </tr>`;
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