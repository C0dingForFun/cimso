<template>
  <div id="app">
    <FetchData />
  </div>
</template>

<script>
import FetchData from '../components/FetchData.vue'

export default {
  components: {
    FetchData,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  margin: 20px;
}
</style>
