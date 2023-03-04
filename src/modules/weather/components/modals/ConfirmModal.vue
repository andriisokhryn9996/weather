<template>
  <div>
    <div @click="openModal">&times;</div>

    <teleport to="body">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>Confirm the deletion</h2>
          <img class="trash-icon" src="src/assets/images/trash-solid.svg" width="100" height="100"/>
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}
.modal-content {
  width: 600px;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 16px;
  text-align: center;
}
.modal h2 {
  margin-top: 0;
}
.modal p {
  margin-bottom: 16px;
}
.button-wrap{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.trash-icon{
  margin: 40px 0;
}


</style>
