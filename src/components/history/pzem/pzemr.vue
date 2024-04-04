<template>
    <tbody id="historipzemr">

    </tbody>
</template>

<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(dataliststore, ['gethistoripzemr'])
    },
    async mounted() {
        await this.fetchhistoripzemr()
        setInterval(() => {
            this.fetchhistoripzemr()
        }, 5000);
    },
    updated() {
        this.logGethistoripzemr()
    },
    methods: {
        ...mapActions(dataliststore, [
            'a$historipzemr'
        ]),
        async fetchhistoripzemr() {
            await this.a$historipzemr()
            this.logGethistoripzemr()
        },
        logGethistoripzemr() {
            const inputhistoridatar = document.getElementById('historipzemr')
            const notfound = document.getElementById('notfoundhistorir')
            const data = this.gethistoripzemr.data
            inputhistoridatar.innerHTML = ''
            if (data.length > 0) {
                notfound.classList.add('hidden')
                const pzemrhistoridata = []
                data.forEach(data => {
                    const timestamp = data.timestamp;
                    if (!pzemrhistoridata.includes(timestamp)) {
                        pzemrhistoridata.push(timestamp);
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
                        inputhistoridatar.appendChild(tr);
                    }
                });
            } else {
                notfound.classList.remove('hidden')
            }
        }
    }
}
</script>