<template>
  <div class="home">
    <div>
      <h1>Welcome</h1>
      <input type="text" size="30" placeholder="Request Here..."/> 
    </div>
  </div>
</template>

<script>

export default {
}
</script>
<style scoped>
  .home{
    width:100%;
    height:100vh;
    background-image: url('https://www.cimso.com/wp-content/uploads/2020/03/cimso-management-software-2-scaled.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  h1{
    color:aliceblue;
  }
  input{
    border-radius:20px ;
    padding:0.3em;
  }
</style>
