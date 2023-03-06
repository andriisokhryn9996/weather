<template>
  <h1>Favorites</h1>
    <div class="fav_wrap" v-if="getFavList && getFavList.length">
      <Card v-for="card in getFavList" :key="card.id" :weather="card"/>
    </div>
    <div class="nothing" v-else>
      <h2>Oops, Nothing here:(</h2>
      <Button @click="$router.push('/')">Back to list</Button>
    </div>

</template>

<script>
import Card from "@/modules/weather/components/Card.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";
import Button from "@/modules/weather/ui/Button.vue";

export default {
  name: "Favorites",
  components: {Button, Card},
  computed: {
    ...mapGetters(['getFavList'])
  },
  methods:{
    ...mapMutations(['updateFavList']),
    ...mapActions(['updatePrev'])
  },
  mounted() {
    this.updateFavList(JSON.parse(localStorage.getItem('fav')))

    //? we update the data, as there may be incorrect weather data in the local storage
    this.updatePrev()
  }
}
</script>

<style scoped>
  .fav_wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 20px;
  }

  .nothing{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 3em auto;
  }

  .nothing h2{
    margin-bottom: 1.5em;
    font-weight: 600;
  }

  @media (max-width: 960px) {
    .fav_wrap {
      padding: 0;
    }
  }
</style>