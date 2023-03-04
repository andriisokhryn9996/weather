<template>
  <header class="header">
    <div class="container">
      <h1>
        <router-link to="/">Logo</router-link>
      </h1>
      <ul class="nav">
        <li>
          <router-link active-class="active" to="/">Weather card</router-link>
        </li>
        <li>
          <router-link active-class="active" to="/favorites">Favorites</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.header {
  background: var(--secondary-color);
  -webkit-box-shadow: 0 12px 66px -14px rgba(0,0,0,0.75);
  -moz-box-shadow: 0 12px 66px -14px rgba(0,0,0,0.75);
  box-shadow: 0 12px 66px -14px rgba(0,0,0,0.75);
  border-radius: 8px;
  width: 90%;
  margin: 20px auto;
}
.container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}
.header a{
  /*color: white;*/
  font-weight: bold;
}

.header a:hover{
  color: #6c757d;
}

.active{
  color: #6c757d!important;
}

.nav{
  display: flex;
}

.nav li:first-child{
  margin-right: 30px;
}
</style>