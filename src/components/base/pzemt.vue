<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['getpzemt'])
    },
    async mounted() {
        await this.fetchpzemt()
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
            const data = this.getpzemt.data
            inputdatat.innerHTML = ''
            if (data.length > 0) {
                notfound.classList.add('hidden')
                const pzemtdata = []
                data.forEach(data => {
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