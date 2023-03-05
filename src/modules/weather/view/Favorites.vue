<template>
  <h1>Favorites works</h1>
    <div class="fav_wrap" v-if="getFavList && getFavList.length">
      <Card v-for="card in getFavList" :key="card.id" :weather="card"/>
    </div>

</template>

<script>
import Card from "@/modules/weather/components/Card.vue";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Favorites",
  components: {Card},
  computed: {
    ...mapGetters(['getFavList'])
  },
  methods:{
    ...mapMutations(['updateFavList'])
  },
  mounted() {
    this.updateFavList(JSON.parse(localStorage.getItem('fav')))
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

  @media (max-width: 960px) {
    .fav_wrap {
      padding: 0;
    }
  }
</style>