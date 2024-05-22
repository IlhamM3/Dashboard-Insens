<script>
import { RouterView } from 'vue-router'
import intervaalConfig from '@/service/interval.js'

export default {
  components: {
    RouterView,
  },
  methods: {
    ...intervaalConfig(this).actions,
    async intervalSetting() {
      await intervaalConfig(this).intervalSetting();
    },
  },
  async mounted() {
    this.intervalId = setInterval(() => {
      this.intervalSetting();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
}
</script>

<template>
  <RouterView />
</template>