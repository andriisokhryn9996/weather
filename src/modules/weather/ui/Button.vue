<template>
  <button class="button"><slot></slot></button>
</template>

<script>
export default {
  name: "Button"
}
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 0.7em 1.2em;
  border-radius: 5px;
  border: none;
  background-color: #455869;
  color: #fff;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.button:hover,
.button:focus {
  background-color: #2e4864;
}

.button:active {
  transform: translateY(2px);
}
</style>