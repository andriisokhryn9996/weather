<template>
  <div class="search">
    <label for="cityInput">Enter City:</label>
    <input class="search_input" placeholder="Search City" id="cityInput" type="text" v-model="cityName"
           @input="updateSuggestions(cityName)"/>
    <div class="search_list">
       <ul v-show="getCityList && getCityList.length && !wait">
         <li v-for="city in getCityList" :key="city.id" @click="selectSuggestion(city.name)">
           <span> {{ city.name }}, {{ city.sys.country }}</span>
           <span><img :src="getIcon(city.weather[0].icon)" :alt="city.weather[0].icon"></span>
           <span>{{ Math.round(city.main.temp) }}</span>
         </li>
       </ul>
      <Spinner v-if="wait"></Spinner>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Spinner from "@/modules/weather/components/ui/Spinner.vue";

export default {
  components: {Spinner},
  data() {
    return {
      cityName: '',
      suggestions: [],

      timer: null,
      iconUri: process.env.VUE_APP_API_URL_ICON,
      wait: false

    }
  },
  computed: {
    ...mapGetters(['getCityList']),
  },
  methods: {
    getIcon(icon) {
      return `${this.iconUri}/${icon}.png`
    },
    ...mapMutations(['updateCityList']),
    ...mapActions(['fetchCityList', 'fetchWeatherData']),
    updateSuggestions(x) {
      if (!this.cityName) {
        this.updateCityList(null)
        return;
      }

      if (this.cityName.length >= 3) {

        if (this.timer) {
          clearTimeout(this.timer)
        }

        this.timer = setTimeout(async () => {
          this.wait = true
          await this.fetchCityList({city: x})
          this.wait = false
        }, 300)
      }
    },
    selectSuggestion(suggestion) {
      this.updateCityList(null)
      this.fetchWeatherData({city: suggestion});
      this.cityName = '';
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
  position: relative;
}

.search_input {
  border: 1px solid #86898d;
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: #d4d6da;
}

.search_list {
  position: absolute;
  z-index:5;
  width: 100%;
  top: 110%;
  -webkit-box-shadow: 0 3px 11px -4px rgba(0,0,0,0.74);
  box-shadow: 0 3px 11px -4px rgba(0,0,0,0.74);
  border-radius: 8px;
  background-color: #747984;

  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-repeat: no-repeat;
  padding: 0;
  background-position: right 10px center;
}

.search_list li {
  padding: 8px;
  background: #e6eaed;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms;
}

.search_list li:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.search_list li:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.search_list li span {
  padding: 0 16px;
  font-weight: bold;
}

.search_list li:hover {
  background-color: #747984;
  cursor: pointer;
  padding: 8px;
}

</style>