<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <aside id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <img class="w-48 ml-3 " src="./icons/logocomplate.png" alt="logo">
            <ul class="mt-8 space-y-2 font-medium">
                <li>
                    <RouterLink to="/dashboard" :class="{ 'active': isactive }"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="ms-3">Dashboard</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/proximity" :class="{ 'active': isactiveprox }"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="flex-1 ms-3 whitespace-nowrap">Proximity</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/pzem" :class="{ 'active': isactivepzem }"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="flex-1 ms-3 whitespace-nowrap">Pzem</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/history" :class="{ 'active': isactivehis }"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="flex-1 ms-3 whitespace-nowrap">Histori</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/logout"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-gray-700 group">
                        <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {
    props: {
        isactive: Boolean,
        isactiveprox: Boolean,
        isactivepzem: Boolean,
        isactivehis: Boolean
    }
}
</script>
