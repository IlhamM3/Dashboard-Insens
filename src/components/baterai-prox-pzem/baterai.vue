<template>
    <h3 v-if="baterai === 'Baterai is off'"
        class="p-1 px-2 font-medium text-white bg-gray-600 rounded-md shadow shadow-md">
        {{ infobateraiText }}
    </h3>
    <div v-else class=" p-1 px-2 font-medium text-white bg-green-500 rounded-md shadow shadow-md">
        {{ infobateraiText }}
    </div>
</template>

<script>
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
    data() {
        return {
            infobateraiText: '',
            baterai: ''
        }
    },
    computed: {
        ...mapState(dataliststore, {
            getbaterai: state => state.getbaterai
        })
    },
    methods: {
        ...mapActions(dataliststore, ['a$baterai']),
        async indikatorbaterai() {
            const data = this.getbaterai.data;
            this.baterai = data
            if (data === 'Baterai is off') {
                this.infobateraiText = 'Alat: Off';
            } else {
                const timestamp = data.createdAt;
                if (!this.bateraiindikator || !this.bateraiindikator.includes(timestamp)) {
                    if (!this.bateraiindikator) this.bateraiindikator = [];
                    this.bateraiindikator.push(timestamp);
                    const bateraipersen = data.indikator_baterai * 1;
                    this.infobateraiText = `Baterai: ${bateraipersen}%`;
                }
            }
        },

        async bateraifetch() {
            await this.a$baterai();
            this.indikatorbaterai();
        }
    },
    async mounted() {
        await this.bateraifetch();
    }
}
</script>
