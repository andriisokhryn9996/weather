import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import VueApexCharts from "vue3-apexcharts";

import './assets/main.css'

createApp(App).use(router).use(VueApexCharts).use(store).mount('#app')
