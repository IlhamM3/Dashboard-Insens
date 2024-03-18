<script setup>
import SideBar from '@/components/sidebar.vue'
import Header from '@/components/Header.vue'
import PzemVue from '@/components/Pzem.vue'
</script>

<template>
    <main>
        <Header />
        <SideBar :isactivepzem="isSidebarActive" />
        <pzemVue />
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