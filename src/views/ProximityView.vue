<script setup>
import SideBar from '@/components/sidebar.vue'
import Header from '@/components/Header.vue';
import ProximityVue from '@/components/Proximity.vue';
</script>

<template>
    <main>
        <Header />
        <SideBar :isactiveprox="isSidebarActive" />
        <proximityVue />
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