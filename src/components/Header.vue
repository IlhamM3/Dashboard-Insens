<template>
    <nav class="bg-gray-100 border-gray-200 dark:bg-gray-900 sm:ml-64">
        <div class="max-w-screen-xl flex items-center mx-auto p-4">
            <button id="buttonopen" data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar" type="button"
                class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                    </path>
                </svg>
            </button>
            <div class="ml-3 w-full md:block md:w-auto" id="navbar-default">
                <ul
                    class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <h3>Sistem monitoring sensor di (Merek mesin.....)</h3>
                    </li>
                    <li>
                        <h3 id="tanggal"></h3>
                    </li>
                    <li>
                        <h3 id="waktu"></h3>
                    </li>
                    <li>
                        <h3 id="baterai">{Indikator baterai}</h3>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    mounted() {
        function updateTime() {
            const date = new Date();
            const waktu = padZero(date.getHours()) + ':' + padZero(date.getMinutes()) + ':' + padZero(date.getSeconds());
            document.getElementById('waktu').innerHTML = waktu;
        }

        function updateDate() {
            const date = new Date();
            const options = {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            };
            const tanggal = date.toLocaleDateString('id-ID', options);
            document.getElementById('tanggal').innerHTML = tanggal;
        }

        function padZero(number) {
            return (number < 10 ? '0' : '') + number;
        }
        updateTime();
        updateDate();
        setInterval(updateTime, 1000);
        setInterval(updateDate, 3600000);

        const buttonopen = document.getElementById('buttonopen');
        const target = document.getElementById('targetsidebar');


    }
};
</script>