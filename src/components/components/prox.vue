<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-medium">Proximity</h1>
      <baterai />
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-md">
      <table class="w-full text-sm font-medium text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead class="text-gray-900 uppercase bg-gray-100 text-md dark:text-gray-400">
          <tr>
            <th scope="col" class="px-3 py-3">Proses Injection</th>
            <th scope="col" class="px-3 py-3">Hari</th>
            <th scope="col" class="px-3 py-3">Tanggal</th>
            <th scope="col" class="px-3 py-3">Jam</th>
          </tr>
        </thead>
        <!-- Gunakan komponen <baseprox> di sini -->
        <baseprox />
      </table>
    </div>
    <footer
      class="fixed bottom-2 md:w-[550px] lg:w-[1022px] bg-white border border-gray-400 shadow dark:bg-gray-800 shadow-md">
      <div class="w-full max-w-screen-xl mx-auto md:flex md:items-center md:justify-between">
        <table class="w-full text-left text-gray-500 text-md rtl:text-right dark:text-gray-400">
          <tbody>
            <tr v-if="lengthprox1 === 0" class="bg-white dark:bg-gray-800">
              <th scope="row" class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">Jumlah Cycle:
              </th>
              <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jcycle">0</td>
              <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">Jumlah Produk:</td>
              <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jproduk">0</td>
            </tr>
            <tr v-else v-for="(data, index) in getproxi1.data" :key="index" class="bg-white dark:bg-gray-800">
              <th scope="row" class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">Jumlah Cycle:
              </th>
              <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jcycle">{{ data.cycle }}</td>
              <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap">Jumlah Produk:</td>
              <td class="px-3 py-4 font-bold text-gray-900 whitespace-nowrap" id="jproduk">{{ data.cycle * 4 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  </div>
</template>

<script>
import baseprox from '@/components/base/baseprox.vue'
import baterai from '@/components/components/baterai.vue'
import { dataliststore } from '@/stores/data'
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      lengthprox1: ''
    }
  },
  components: {
    baseprox,
    baterai
  },
  computed: {
    ...mapState(dataliststore, ['getproxi1']),
  },
  async mounted() {
    await this.fetchtabproxi();
    setInterval(this.fetchtabproxi, 5000)
  },
  methods: {
    ...mapActions(dataliststore, ['a$proxi1']),
    async fetchtabproxi() {
      await this.a$proxi1()
      this.fetchproxi1();
    },
    fetchproxi1() {
      this.lengthprox1 = this.getproxi1.data.length;
    }
  }
}
</script>
