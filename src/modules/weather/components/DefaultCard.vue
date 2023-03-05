<template>
  <Card v-if="getUserCityWeather" :weather="getUserCityWeather" :isDefault="true"></Card>
  <Spinner v-if="getWaitFindLocation"></Spinner>
</template>

<script>
import Card from "@/modules/weather/components/Card.vue";
import {mapGetters} from "vuex";
import Spinner from "@/modules/weather/ui/Spinner.vue";

export default {
  name: "DefaultCard",
  components: {Spinner, Card},
  computed: {
    ...mapGetters(['getUserCityWeather', 'getWaitFindLocation'])
  }
}
</script>

<style scoped>

</style>