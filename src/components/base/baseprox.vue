<template>
    <tbody id="listproxi" class="">
    </tbody>
</template>

<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    computed: {
        ...mapState(dataliststore, ['getproxi'])
    },
    async mounted() {
        await this.fetchAndLogProxi();
        setInterval(() => {
            this.fetchAndLogProxi()
        }, 5000);
    },
    methods: {
        ...mapActions(dataliststore, ['a$proxi']),
        async fetchAndLogProxi() {
            await this.a$proxi();
            this.logGetProxi();
        },
        logGetProxi() {
            const data = this.getproxi.data;
            const listproxi = document.getElementById('listproxi');
            const datanotfoundp = document.getElementById('notfoundp');

            // Kosongkan tabel sebelum menambahkan data baru
            listproxi.innerHTML = '';

            if (data.length > 0) {
                datanotfoundp.classList.add('hidden');

                const DataProxi = [];

                data.forEach(data => {
                    const timestamp = data.timestamp;
                    // Jika data belum ditampilkan, tambahkan ke dalam tabel
                    if (!DataProxi.includes(timestamp)) {
                        const date = new Date(timestamp);
                        DataProxi.push(timestamp);
                        const hari = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
                        const jam = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
                        const tanggal = date.getDate().toString().padStart('2', '0');
                        const bulan = (date.getMonth() + 1).toString().padStart('2', '0');
                        const tahun = date.getFullYear();
                        const tanggalfull = `${tanggal}/${bulan}/${tahun}`;
                        const tr = document.createElement('tr');
                        tr.classList.add('bg-white', 'dark:bg-gray-800');
                        tr.innerHTML = `
                            <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                finished
                            </th>
                            <td class="px-3 py-4">
                                ${hari}
                            </td>
                            <td class="px-3 py-4">
                                ${tanggalfull}
                            </td>
                            <td class="px-3 py-4">
                                ${jam}
                            </td>
                        `;
                        listproxi.appendChild(tr);
                    }
                });
            }
        }
    }
}
</script>
