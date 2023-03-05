<template>
  <SearchInput></SearchInput>
  <DefaultCard></DefaultCard>
  <div class="card_wrap" v-if="getWeatherData && getWeatherData.length">
    <Card v-for="card in getWeatherData" :key="card.id" :weather="card"/>
  </div>


</template>

<script>
import SearchInput from "@/modules/weather/components/SearchInput.vue";
import Card from "@/modules/weather/components/Card.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";
import TemperatureChart from "@/modules/weather/components/TemperatureCharts.vue";
import DefaultCard from "@/modules/weather/components/DefaultCard.vue";
export default {
  name: "Weather",
  components: {
    DefaultCard,
    TemperatureChart,
    Card,
    SearchInput
  },
  computed: {
    ...mapGetters(['getWeatherData', 'getUserCityWeather'])
  },
  methods:{
    ...mapMutations(['updateFavList']),
    ...mapActions(['letsFindUserCity'])
  },
  mounted() {
    this.updateFavList(JSON.parse(localStorage.getItem('fav')))
    if(!this.getUserCityWeather){
      this.letsFindUserCity()
    }

  }
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

@media (max-width: 960px) {
  .card_wrap {
    padding: 0;
  }
}
</style>