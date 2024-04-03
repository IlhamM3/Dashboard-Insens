<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['getpzems'])
    },
    async mounted() {
        await this.fetchpzems()
        setInterval(() => {
            this.fetchpzems()
        }, 5000);
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