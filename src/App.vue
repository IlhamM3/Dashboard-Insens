<script>
import { RouterView } from 'vue-router'
import intervaalConfig from '@/service/interval.js'
import { getCookies } from './plugins/cookies';

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
    const token = getCookies('CERT');
    if (token) {
      this.intervalId = setInterval(() => {
        this.intervalSetting();
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
}
</script>

<template>
  <RouterView />
</template>