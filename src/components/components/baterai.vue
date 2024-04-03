<template>
    <h3 id="baterai" class="hidden py-1 px-2 text-center font-medium text-gray-900 rounded-md shadow shadow-md">
    </h3>
    <div id="notfoundb" class="p-1 text-center font-medium text-gray-900 rounded-md shadow shadow-md">Not found
    </div>
</template>
<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    computed: {
        ...mapState(dataliststore, ['getbaterai'])
    },
    updated() {
        this.indikatorbaterai()
    },
    methods: {
        ...mapActions(dataliststore, ['a$baterai']),
        indikatorbaterai() {
            const data = this.getbaterai.data
            const baterai = document.getElementById('baterai');
            const notfoundb = document.getElementById('notfoundb');
            baterai.innerHTML = ''
            const bateraiindikator = []
            if (data === 'Baterai is off') {
                notfoundb.innerHTML = 'Alat: Off'
                notfoundb.classList.remove('hidden')
                baterai.classList.add('hidden')
            } else {
                baterai.classList.remove('hidden')
                notfoundb.classList.add('hidden')
                const timestamp = data.createdAt;
                if (!bateraiindikator.includes(timestamp)) {
                    bateraiindikator.push(timestamp);
                    const bateraipersen = data.indikator_baterai * 1
                    const div = document.createElement('div');
                    div.innerHTML += `Baterai: ${bateraipersen}%`
                    baterai.appendChild(div)
                }
            }
        },
        async bateraifetch() {
            await this.a$baterai();
            this.indikatorbaterai();
        }
    },
    async mounted() {
        await this.bateraifetch()
        setInterval(() => {
            this.bateraifetch()
        }, 5000);
    }

}
</script>