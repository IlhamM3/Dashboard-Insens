<script setup>
import prox from './components/prox.vue';
import pzem from './components/layoutpzem.vue';
</script>
<template>
    <div class="p-9 sm:ml-64 mt-28 md:mt-16">
        <section class="flex items-center gap-x-5">
            <form>
                <div class="relative">
                    <select id="dropdown"
                        class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center">
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
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input id="datepicker" type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date">
            </div>
        </section>

        <section id="prox" class="mt-2">
            <prox />
        </section>
        <section id="pzem" class="hidden mt-2">
            <pzem />
        </section>
    </div>
</template>

<script>
import Datepicker from 'flowbite-datepicker/Datepicker';

export default {
    mounted() {
        const dropdown = document.getElementById('dropdown');
        const pzem = document.getElementById('pzem');
        const prox = document.getElementById('prox');

        dropdown.addEventListener('change', function () {
            const selectedValue = dropdown.value;
            if (selectedValue === 'proximity') {
                pzem.classList.toggle('hidden');
                prox.classList.toggle('hidden');
            } else if (selectedValue === 'pzem') {
                pzem.classList.toggle('hidden');
                prox.classList.toggle('hidden');
            }
        });

        const datepicker = document.getElementById('datepicker');
        new Datepicker(datepicker);
    }
}
</script>
./components/prox.js