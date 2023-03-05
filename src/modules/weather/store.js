import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL
const apiKey = process.env.VUE_APP_API_KEY

export default {
    state:{
        cityList: null,
        weatherData: [],
        chartsData: new Map(),
        favList: [],
        userCity: null,
        userCityWeather: null,

        waitFindLocation: false,

        showLimitModal: false
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
        updateChartsData(state, data) {
            state.chartsData.set(data.key, data.data)
        },
        updateFavList(state, data) {
           state.favList = data
        },
        updateUserCity(state, data) {
            state.userCity = data
        },
        updateUserCityWeather(state, data) {
            state.userCityWeather = data
        },
        updateWaitFindLocation(state, data) {
            state.waitFindLocation = data
        },
        updateLimitModal(state, data) {
            state.showLimitModal = data
        }
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
                if(data.ip) {
                    commit('updateUserCityWeather', res.data)
                } else  {
                    commit('updateWeatherData', res.data)
                }
            } catch(e){
                console.error(e.message);
            }
        },
        async fetchChartsData({commit}, data){
            try {
                const res = await axios.get(`${baseUrl}/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=metric`)
                //filter by day
                res.data.list = res.data.list.filter((item, index, self) => {
                    return index === self.findIndex((t) => (
                        t.dt_txt.split(' ')[0] === item.dt_txt.split(' ')[0]
                    ));
                });

                // res.data.list = res.data.list.splice(1,5)

                commit('updateChartsData', {key: data.id, data: res.data})
            } catch (e) {
                console.error(e.message)
            }
        },
        addToFavorites({commit}, data){
            let prevData = JSON.parse(localStorage.getItem('fav'))
            if(prevData && prevData.length){
                const idx = prevData.findIndex(el => el.id === data.id && el.name === data.name)
                if(idx === -1 && prevData.length < 5 ){
                    prevData.push(data)
                } else if (idx === -1 && prevData.length === 5 ){
                    commit('updateLimitModal', true)
                } else {
                    prevData.splice(idx,1)
                }
            } else {
                prevData = [data]
            }

            commit('updateFavList', prevData)
            localStorage.setItem('fav', JSON.stringify(prevData))



        },

        async letsFindUserCity({commit, dispatch}){
            try {
                commit('updateWaitFindLocation', true)
                //Find IP and location
                const res = await axios.get('https://api.ipify.org?format=json')
                const resCity = await axios.get(`https://ipapi.co/${res.data.ip}/json/`)

                commit('updateUserCity', resCity.data?.city)
                //request to the weather of the user
                dispatch('fetchWeatherData', {city: resCity.data?.city, ip: true})
                commit('updateWaitFindLocation', false)

            } catch (e) {
                commit('updateWaitFindLocation', false)
                console.error(e.message)
            }


        },

        async updatePrev({commit}){
            try {
                const prev = JSON.parse(localStorage.getItem('fav'))
                const newData = []
                if(prev && prev.length){
                    //?get it by iteration since I don't have an api where I can take all the cities at once
                    for (const el of prev) {
                        const res = await axios.get(`${baseUrl}/data/2.5/weather?q=${el.name}&appid=${apiKey}&units=metric`)
                        newData.push(res.data)
                    }
                }

                commit('updateFavList', newData)
                localStorage.setItem('fav', JSON.stringify(newData))

            } catch(e){
                console.error(e.message);
            }
        },
    },
    getters: {
        getCityList(state){
            return state.cityList
        },
        getWeatherData(state){
            return state.weatherData
        },
        getChartsData(state){
            return state.chartsData
        },
        getFavList(state){
            return state.favList
        },
        getUserCityWeather(state){
            return state.userCityWeather
        },
        getWaitFindLocation(state){
            return state.waitFindLocation
        },
        getShowLimitModal(state){
            return state.showLimitModal
        }
    }
}