<template>
    <tbody id="historipzems">

    </tbody>
</template>

<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['gethistoripzems'])
    },
    async mounted() {
        await this.fetchhistoripzems()
        setInterval(() => {
            this.fetchhistoripzems()
        }, 5000);
    },
    updated() {
        this.logGethistoripzems()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$historipzems'
        ]),
        async fetchhistoripzems() {
            await this.a$historipzems()
            this.logGethistoripzems()
        },
        logGethistoripzems() {
            const inputhistoridatas = document.getElementById('historipzems')
            const notfound = document.getElementById('notfoundhistoris')
            const data = this.gethistoripzems.data
            inputhistoridatas.innerHTML = ''
            if (data.length > 0) {
                notfound.classList.add('hidden')
                const pzemshistoridata = []
                data.forEach(data => {
                    const timestamp = data.timestamp;
                    if (!pzemshistoridata.includes(timestamp)) {
                        pzemshistoridata.push(timestamp);
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
                        inputhistoridatas.appendChild(tr);
                    }
                });
            } else {
                notfound.classList.remove('hidden')
            }
        }
    }
}
</script>