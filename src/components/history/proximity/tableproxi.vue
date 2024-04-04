<template>
    <tbody id="listproxihistori">
    </tbody>
</template>

<script>
import { dataliststore } from '@/stores/data';
import { mapState, mapActions } from 'pinia';

export default {
    computed: {
        ...mapState(dataliststore, ['dataHistoriproxi'])
    },
    async mounted() {
        await this.fetchhistoriproxi();
        setInterval(() => {
            this.fetchhistoriproxi()
        }, 5000);
    },
    methods: {
        ...mapActions(dataliststore, ['a$historiprox']),
        async fetchhistoriproxi() {
            await this.a$historiprox();
            this.gethistoriproxi();
        },
        gethistoriproxi() {
            const data = this.dataHistoriproxi.data;
            const notfoundhistori = document.getElementById('notfoundphistori');
            const listproxihistori = document.getElementById('listproxihistori');
            listproxihistori.innerHTML = ''

            if (data.length > 0) {
                notfoundhistori.classList.add('hidden');

                const DatahistoriProxi = [];
                data.forEach(data => {
                    const timestamp = data.timestamp;
                    // Jika data belum ditampilkan, tambahkan ke dalam tabel
                    if (!DatahistoriProxi.includes(timestamp)) {
                        const date = new Date(timestamp);
                        DatahistoriProxi.push(timestamp);

                        const hari = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
                        const jam = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
                        const tanggal = date.getDate().toString().padStart('2', '0');
                        const bulan = (date.getMonth() + 1).toString().padStart('2', '0');
                        const tahun = date.getFullYear();
                        const tanggalfull = `${tanggal}/${bulan}/${tahun}`;

                        const tr = document.createElement('tr');
                        tr.classList.add('bg-white', 'dark:bg-gray-800');
                        tr.innerHTML = `
                            <td scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                finished
                            </td>
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
                        listproxihistori.appendChild(tr);
                    }
                });
            } else {
                notfoundhistori.classList.remove('hidden');
            }
        }

    }
}
</script>
