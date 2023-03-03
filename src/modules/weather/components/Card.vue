<template>
  <div class="card_box">
    <div class="card">
      <div class="card_top">
        <div class="card_top_left">
          <img :src="`${this.iconUri}/${weather.weather[0].icon}.png`" width="80" height="80"/>
        </div>
        <div class="card_top_left">
          <p>{{ weather.weather[0].main }}</p>
          <p>{{ Math.round(weather.main.temp) }}°C</p>
          <h2>{{ weather.name }}</h2>
        </div>
      </div>
      <div class="card_bottom">
        {{letsFindDay(weather.dt)}}
        <div>
          <ul>
            <li>Wind</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>N 8 mph</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: ['weather'],
  data() {
    return {
      iconUri: process.env.VUE_APP_API_URL_ICON,
    };
  },
  methods:{
    letsFindDay(dt){
      console.log(dt)
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

  mounted() {

  }
};
</script>

<style scoped>
.card_box {
  /*min-width: 200px;*/
  width: 50%;
  height: 250px;
  padding: 8px;
}

.card {
  background-color: #015E69;
  padding: 16px;
  border-radius: 6px;
}

.card_top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px solid grey;

  padding: 20px;
}

.card_bottom{
}

@media (max-width: 960px) {
  .card_box {
    width: 100%;
    padding: 16px;
  }
}

</style>
