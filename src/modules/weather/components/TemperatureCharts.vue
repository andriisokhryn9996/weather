<template>
  <div>
    <apexchart ref="chart" type="line"  height="200" :options="chartOptions" :series="chartSeries" />
  </div>
</template>

<script>

export default {
  name: 'TemperatureChart',
  props:['data'],
  data() {
    return {
      chart: null,
      chartOptions: {
        chart: {
          type: 'line',
          toolbar: {
            show: false,
          },
        },
        colors: ['#e1b228'],
        stroke: {
          curve: "straight",
        },
        xaxis: {
          categories: ['Day 1']
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return +value.toFixed(2) + '°C';
            },
          }
        }
      },
      chartSeries: [{
        name: 'Temperature',
        data: [25]
      }]
    }
  },
  watch:{
    data(x){
      if(x){
        this.updateChart(x)
      }
    }
  },
  methods:{
    dateFormatter(seconds){
      //? DATE formatting START
      const date = new Date(seconds * 1000);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${day.toString().padStart(2, '0')}-${months[month.toString()]}`;
    },


    updateChart(dates) {
      const newOptions = {...this.chartOptions}
      const chartSeries = {...this.chartSeries}
      if(dates){
        newOptions.xaxis.categories = dates.list.map(x => this.dateFormatter(x.dt))
        chartSeries[0].data = dates.list.map(x => x.main.temp)
      }

      this.chart.updateOptions(newOptions)
    }
  },
  mounted() {
    this.chart = this.$refs.chart

  }
}
</script>
