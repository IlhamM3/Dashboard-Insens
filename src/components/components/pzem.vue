<script>
import pzemr from '@/components/base/pzemr.vue'
import pzems from '@/components/base/pzems.vue'
import pzemt from '@/components/base/pzemt.vue'
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'
export default {
    components: {
        pzemr,
        pzems,
        pzemt
    },
    data() {
        return {
            selectedMessage: '',
        }
    },
    computed: {
        ...mapState(dataliststore, ['getpzemr', 'getpzems', 'getpzemt'])
    },
    async mounted() {
        await this.fetchdash();
        setInterval(this.fetchdash, 5000);
    },
    methods: {
        ...mapActions(dataliststore, ['a$pzemr', 'a$pzems', 'a$pzemt',]),
        async fetchdash() {
            try {
                await Promise.all([
                    this.a$pzemr(),
                    this.a$pzems(),
                    this.a$pzemt()
                ]);
                this.logGetdatadash();
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        },
        logGetdatadash() {
            const messager = this.getpzemr.message;
            const messages = this.getpzems.message;
            const messaget = this.getpzemt.message;

            if (messager === 'Alat: ON' || messages === 'Alat: ON' || messaget === 'Alat: ON') {
                this.selectedMessage = 'Alat: ON';
            } else if (messager === 'Alat: OFF' && messages === 'Alat: OFF' && messaget === 'Alat: OFF') {
                this.selectedMessage = 'Alat: OFF';
            } else {
                this.selectedMessage = '';
            }
        }
    }
}
</script>

<template>
    <div class="flex items-center justify-between mb-5">
        <h1 class="text-2xl font-medium">Pzem</h1>
        <h3 v-if="selectedMessage === 'Alat: OFF'"
            class="p-1 px-2 font-medium text-white bg-gray-600 rounded-md shadow shadow-md">
            {{ selectedMessage }}
        </h3>
        <div v-else class=" p-1 px-2 font-medium text-white bg-green-500 rounded-md shadow shadow-md">
            {{ selectedMessage }}
        </div>
    </div>
    <div class="flex flex-wrap items-start justify-center gap-4 mb-4 md:grid md:grid-cols-3">
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative justify-center overflow-x-auto">
                <h1 class="text-lg font-bold text-center">R</h1>
                <hr>
                <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                    <thead class="text-sm text-gray-900 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                V
                            </th>
                            <th scope="col" class="px-6 py-3">
                                A
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Energi
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Hz
                            </th>
                        </tr>
                    </thead>
                    <pzemr />
                </table>
            </div>
        </div>
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative overflow-x-auto">
                <h1 class="text-lg font-bold text-center">S</h1>
                <hr>
                <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                    <thead class="text-sm text-gray-900 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                V
                            </th>
                            <th scope="col" class="px-6 py-3">
                                A
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Energi
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Hz
                            </th>
                        </tr>
                    </thead>
                    <pzems />
                </table>
            </div>
        </div>
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <div class="relative overflow-x-auto">
                <h1 class="text-lg font-bold text-center">T</h1>
                <hr>
                <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
                    <thead class="text-sm text-gray-900 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                V
                            </th>
                            <th scope="col" class="px-6 py-3">
                                A
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Energi
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Hz
                            </th>
                        </tr>
                    </thead>
                    <pzemt />
                </table>
            </div>
        </div>
    </div>
</template>