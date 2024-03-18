<script setup>
import Sidebar from '@/components/sidebar.vue'
import Header from '@/components/Header.vue';
import Dashboard from '@/components/Dashboard.vue'
</script>

<template>
    <main>
        <Header />
        <Sidebar :isactive="isSidebarActive" />
        <Dashboard />
    </main>
</template>

<script>
export default {
    data() {
        return {
            isSidebarActive: true
        };
    }
}
</script>
