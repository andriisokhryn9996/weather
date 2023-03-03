import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL
const apiKey = process.env.VUE_APP_API_KEY

export default {
    state:{
        cityList: null,
        weatherData: [],
    },
    mutations: {
        updateCityList(state, data){
            state.cityList = data
        },
        updateWeatherData(state, data){

            if(!data){
                //? reset all
                state.weatherData = []
                return
            }

            const idx = state.weatherData.findIndex(el => el.id === data.id)
            if(idx !== -1) {
                state.weatherData.splice(idx,1);
            } else {
                state.weatherData.push(data)
            }

        },
    },
    actions: {
        async fetchCityList({commit}, data){
            try {
                const res = await axios.get(`${baseUrl}/data/2.5/find?q=${data.city}&appid=${apiKey}&units=metric`)
                commit('updateCityList', res.data.list.map(city => city))
            } catch (e) {
                commit('updateCityList', null)
                console.error(e.message);
            }
        },
        async fetchWeatherData({commit}, data){
            try {
                const res = await axios.get(`${baseUrl}/data/2.5/weather?q=${data.city}&appid=${apiKey}&units=metric`)
                commit('updateWeatherData', res.data)
            } catch(e){
                console.error(e.message);
            }
        }
    },
    getters: {
        getCityList(state){
            return state.cityList
        },
        getWeatherData(state){
            return state.weatherData
        },
    }
}