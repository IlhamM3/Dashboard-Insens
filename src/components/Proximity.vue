<template>
    <div class="p-4 sm:ml-64">
        <h1 class="font-medium text-2xl mb-5">Proximity</h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-md">
            <table class="w-full font-medium text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-sm text-gray-900 bg-gray-100 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-3 py-3">
                            Proses Injection
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Hari
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Tanggal
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Jam
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Finished
                        </th>
                        <td class="px-3 py-4">
                            Kamis
                        </td>
                        <td class="px-3 py-4">
                            18/05/2024
                        </td>
                        <td class="px-3 py-4">
                            12:23:25
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <footer
            class="fixed bottom-2 w-[300px] md:w-[550px] lg:w-[1050px] bg-white rounded-lg shadow m-4 dark:bg-gray-800 shadow-md sm:rounded-lg">
            <div class="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between">
                <table class="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        <tr class="bg-white dark:bg-gray-800">
                            <th scope="row" class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                Jumlah Cycle:
                            </th>
                            <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">
                                07
                            </td>
                            <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">
                                Jumlah Produk:
                            </td>
                            <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">
                                28
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </footer>
    </div>
</template>