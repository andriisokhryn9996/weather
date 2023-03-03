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
      <div v-if="wait" class="spinner"></div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
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
      this.cityName = suggestion;
      this.updateCityList(null)
      this.fetchWeatherData({city: this.cityName});
    },
  },
  mounted() {
    // this.fetchCityList({city: 'Vinnytsia'})

  }
}
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
}

.search_input {
  border: 2px solid #2d333b;
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 16px;
  color: #f5f8fa;
  background-color: #21262d;
}

.search_input::placeholder {
  color: #6c757d;
}

.search_input:-ms-input-placeholder {
  color: #6c757d;
}

.search_input::-ms-input-placeholder {
  color: #6c757d;
}

.search_input:focus {
  border-color: #1da1f2;
  box-shadow: 0 0 0 2px #1da1f2;
}

.search_input::-webkit-input-placeholder {
  color: #6c757d;
}

.search_list {
  border-radius: 8px;
  background-color: #21262d;
  color: #f5f8fa;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.search_list li span {
  padding: 0 16px;
}

search_list. li:hover {
  background: #6c757d;
  cursor: pointer;
}

/*spinner START*/

.spinner {
  width: 20px;
  height: 20px;
  position: relative;
  margin: 20px auto;
}

.spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: #07d;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: ease-out;
  }
  100% {
    transform: rotate(360deg);
  }
}

/*spinner END*/


</style>