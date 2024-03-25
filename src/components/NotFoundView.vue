<template>
    <div class=" lg:mx-40 mt-5 max-w-5xl flex flex-col justify-center items-center ">
        <img class=" h-auto max-w-full" src="../assets/image/404.png" alt="">
        <button @click="goBack">
            <figcaption class="mt-2 text-lg text-center text-gray-500 dark:text-gray-400">Back</figcaption>
        </button>
    </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>