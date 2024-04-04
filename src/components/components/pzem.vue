<script setup>
import pzemr from '@/components/base/pzemr.vue'
import pzems from '@/components/base/pzems.vue'
import pzemt from '@/components/base/pzemt.vue'
</script>

<template>
    <div class="flex items-center justify-between mb-5">
        <h1 class="text-2xl font-medium">Pzem</h1>
        <div id="infoalatpzem" class="p-1 px-2 font-medium text-white rounded-md shadow shadow-md">
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
                <div id="notfoundr">
                    <div class="p-2 font-semibold text-center bg-white">
                        Belum ada produksi untuk hari ini
                    </div>
                </div>
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
                <div id="notfounds">
                    <div class="p-2 font-semibold text-center bg-white">
                        Belum ada produksi untuk hari ini
                    </div>
                </div>
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
                <div id="notfoundt">
                    <div class="p-2 font-semibold text-center bg-white">
                        Belum ada produksi untuk hari ini
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>