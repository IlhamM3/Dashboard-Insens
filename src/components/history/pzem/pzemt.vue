<template>
    <tbody id="historipzemt">

    </tbody>
</template>

<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['gethistoripzemt'])
    },
    async mounted() {
        await this.fetchhistoripzemt()
    },
    updated() {
        this.logGethistoripzemt()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$historipzemt'
        ]),
        async fetchhistoripzemt() {
            await this.a$historipzemt()
            this.logGethistoripzemt()
        },
        logGethistoripzemt() {
            const inputhistoridatat = document.getElementById('historipzemt')
            const notfound = document.getElementById('notfoundhistorit')
            const data = this.gethistoripzemt.data
            inputhistoridatat.innerHTML = ''
            if (data.length > 0) {
                notfound.classList.add('hidden')
                const pzemthistoridata = []
                data.forEach(data => {
                    const timestamp = data.timestamp;
                    if (!pzemthistoridata.includes(timestamp)) {
                        pzemthistoridata.push(timestamp);
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
                        inputhistoridatat.appendChild(tr);
                    }
                });
            } else {
                notfound.classList.remove('hidden')
            }
        }
    }
}
</script>