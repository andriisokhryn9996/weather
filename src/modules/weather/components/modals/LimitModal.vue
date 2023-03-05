<template>
  <teleport to="body">
    <div class="modal" v-if="getShowLimitModal">
      <div class="modal-content">
        <h2>Oops!</h2>
        <p>You can't have more than 5 favorites, <br> you should delete something</p>
        <Button @click="updateLimitModal(false)">Close</Button>
      </div>
    </div>
  </teleport>
</template>

<script>

import {mapMutations, mapGetters} from 'vuex'
import Button from "@/modules/weather/ui/Button.vue";

export default {
  components: {Button},
  computed: {
    ...mapGetters(['getShowLimitModal'])
  },
  methods: {
    ...mapMutations(['updateLimitModal'])
  }
}
</script>
