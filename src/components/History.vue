<template>
    <div class="p-9 sm:ml-64 my-28 md:my-16">
        <section class="flex gap-x-5">
            <form>
                <div class="relative">
                    <select id="dropdown"
                        class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                        v-model="selectedView">
                        <option value="proximity">Proximity</option>
                        <option value="pzem">Pzem</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg class="w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </div>
                </div>
            </form>

            <div class="relative max-w-sm">
                <input type="date"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="valueDate">
            </div>
        </section>

        <section v-if="selectedView === 'proximity'" class="mt-2">
            <prox :initDate="valueDate" />
        </section>
        <section v-if="selectedView === 'pzem'" class="mt-2">
            <pzem :initDate="valueDate" />
        </section>
    </div>
</template>

<script>
import prox from '@/components/history/proximity/prox.vue'
import pzem from '@/components/history/pzem/pzem.vue'
export default {
    components: {
        prox,
        pzem
    },
    data() {
        return {
            valueDate: '',
            selectedView: 'proximity'
        }
    },
}
</script>
