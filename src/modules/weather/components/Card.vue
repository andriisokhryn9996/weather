<template>
  <div :class="!isDefault ? 'card_box' : 'card_box_default'">
    <div class="card">

      <div v-if="!isDefault" class="hearts" :class="isFavorites ? 'active-f': ''" @click="addToFavorites(weather)"> &hearts;</div>
      <ConfirmModal v-if="!isDefault && $route.name !== 'Favorites' " class="card-close-button" :data="weather"></ConfirmModal>
      <LimitModal></LimitModal>
      <div class="blink" v-if="isDefault">Your city</div>

      <div class="card_top">
        <div class="card_top_left">
          <h2>{{letsFindDay(weather.dt)}}</h2>
          <img :src="`${this.iconUri}/${weather.weather[0].icon}.png`" width="100" height="100" alt="weather_icon"/>
        </div>
        <div class="card_top_right">
          <p class="card_desc">{{ weather.weather[0].main }}</p>
          <p class="card_temp">{{ Math.round(weather.main.temp) }}°C</p>
          <h3 class="card_city">{{ weather.name }}, {{weather.sys.country}}</h3>
        </div>
      </div>
      <div class="button-block" v-if="!isDefault">
        <Button style="margin-right: 5px" @click="fetchChartsData({id: this.weather.id, coord: this.weather.coord, perDays: true})">Days</Button>
        <Button style="margin-right: 5px"  @click="fetchChartsData({id: this.weather.id, coord: this.weather.coord, perDays: false})">Hours</Button>
      </div>
      <div v-if="!isDefault" class="card_bottom">
        <TemperatureChart :data="getChartsData.get(this.weather.id)"></TemperatureChart>
      </div>
    </div>
  </div>
</template>

<script>

import TemperatureChart from "@/modules/weather/components/TemperatureCharts.vue";
import {mapActions, mapGetters} from "vuex";
import ConfirmModal from "@/modules/weather/components/modals/ConfirmModal.vue";
import LimitModal from "@/modules/weather/components/modals/LimitModal.vue";
import Button from "@/modules/weather/ui/Button.vue";

export default {
  name: 'Card',
  components: {Button, LimitModal, ConfirmModal, TemperatureChart},
  props: ['weather', 'isDefault'],
  data() {
    return {
      iconUri: process.env.VUE_APP_API_URL_ICON,
    };
  },
  computed:{
    ...mapGetters(['getChartsData', 'getFavList']),
    isFavorites(){
      if(this.getFavList){
        return this.getFavList.find(el => el.id === this.weather.id && el.name === this.weather.name)
      }
    }
  },
  methods:{
    ...mapActions(['fetchChartsData', 'addToFavorites']),
    letsFindDay(dt){
      let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]
      const milliseconds = dt * 1000;
      const date = new Date(milliseconds);
      const dayOfWeek = date.getDay();
      return days[dayOfWeek]
    }
  },

  async mounted() {
   await this.fetchChartsData({id: this.weather.id, coord: this.weather.coord, perDays: true})
  }
};
</script>

<style scoped>
.card_box {
  /*min-width: 200px;*/
  width: 50%;
  padding: 8px;
}
.card_box_default {
  width: 100%;
  padding: 8px;
}

.card {
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(127,127,190,1) 0%, rgba(14,183,255,1) 100%);
  padding: 16px;
  border-radius: 6px;
}

.card_top{
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
}

.card_top_right{
  text-align: right;
}
.card_top_left{
  display: flex;
  flex-direction: column;
  font-size: 2em;
}

.card_city {
  font-size: 1.6em;
}
.card_desc{
  font-size: 1.3em;
}

.card_temp{
  font-size: 3.3em;
  font-weight: 500;
}

.card_bottom{
}

.card-close-button {
  font-size: 2em;
  font-weight: bold;
  cursor: pointer;
  color: #999;
  position: absolute;
  top: 0;
  right: 0;
  width: 1em;
  height: 2em;
  z-index: 3;
}

.card-close-button:hover {
  color: #000;
}

.hearts {
  font-size: 1.4em;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  position: absolute;
  width: 2em;
  height: 2em;
  z-index: 3;
}

.active-f{
  color: #000 !important;
}

@keyframes blink {
  50% {
    color: #fff;
  }
}

.blink {
  font-size: 1.1em;
  font-weight: bold;
  animation: blink 0.8s step-end infinite;
}

@media (max-width: 960px) {
  .card_box {
    width: 100%;
  }
}

@media screen and (max-width: 575px) {
  .card {
    padding: 6px;
  }
}

.button-block {
  display: flex;
  align-items: center;
  justify-content: end;
}

</style>
