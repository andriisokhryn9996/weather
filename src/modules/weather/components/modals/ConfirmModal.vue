<template>
  <div>
    <div @click="openModal">&times;</div>

    <teleport to="body">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>Confirm the deletion</h2>
          <img class="trash-icon" src="../../assets/images/trash-solid.svg" width="100" height="100" alt="trash-"/>
          <div class="button-wrap">
            <Button @click="remove">Confirm</Button>
            <Button @click="closeModal">Cancel</Button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";
import {mapMutations} from "vuex";
import Button from "@/modules/weather/components/ui/Button.vue";

export default {
  components: {Button},
  props:['data'],
  setup() {
    const showModal = ref(false);

    function openModal() {
      showModal.value = true;
    }

    function closeModal() {
      showModal.value = false;
    }

    return {
      showModal,
      openModal,
      closeModal,
    };
  },
  methods:{
    ...mapMutations(['updateWeatherData']),
    remove(){
      this.updateWeatherData(this.data)
      this.closeModal()
    }
  }
};
</script>

<style>



</style>
