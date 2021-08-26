<template>
  <Weather v-if="data" :report="data" />
</template>

<script lang="ts">
import Weather from './components/Weather.vue'
import axios from 'axios'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Weather
  },
  setup () {
    const apiKey = ref('e06102b119b0c37ffc2b2eaf47f3fae4')
    const url = ref(
      `https://api.openweathermap.org/data/2.5/onecall?lon=2.159&lat=41.3888&uniots=metric&appid=${apiKey.value}`
    )
    const data = ref()
    const loading = ref(true)

    function fetchReport () {
      axios(url.value)
        .then((res) => {
          data.value = res.data
        })
        .catch(() => {
          alert('Failed to fetch weather report.')
        })
        .finally(() => {
          loading.value = false
        })
    }

    onMounted(() => {
      fetchReport()
    })
    return {
      loading,
      data,
      fetchReport
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 15px;
  font-weight: normal;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    margin-bottom: 5px;
    font-weight: normal;
  }
}
</style>
