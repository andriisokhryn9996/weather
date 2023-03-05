<template>
  <div class="spinner"></div>
</template>

<script>
export default {
  name: "Spinner"
}
</script>

<style scoped>

.spinner {
  width: 20px;
  height: 20px;
  position: relative;
  margin: 20px auto;
}

.spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: black;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
    animation-timing-function: ease-out;
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>