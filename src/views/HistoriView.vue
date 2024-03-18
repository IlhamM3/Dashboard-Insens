<script setup>
import SideBar from '@/components/sidebar.vue'
import Header from '@/components/Header.vue'
import historyVue from '@/components/History.vue'
</script>

<template>
    <main>
        <Header />
        <SideBar :isactivehis="isSidebarActive" />
        <historyVue />
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
