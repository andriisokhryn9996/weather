<template>
  <SearchInput></SearchInput>
  <div class="card_wrap" v-if="getWeatherData && getWeatherData.length">
    <Card v-for="card in getWeatherData" :key="card.id" :weather="card"/>
  </div>


</template>

<script>
import SearchInput from "@/modules/weather/components/SearchInput.vue";
import Card from "@/modules/weather/components/Card.vue";
import {mapGetters} from "vuex";
import TemperatureChart from "@/modules/weather/components/TemperatureCharts.vue";
export default {
  name: "Weather",
  components: {
    TemperatureChart,
    Card,
    SearchInput
  },
  computed: {
    ...mapGetters(['getWeatherData'])
  },
}
</script>

<style scoped>
.card_wrap {
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px;
}
</style>