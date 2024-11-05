<template>
  <div class="container-fluid">
    <div class="home">
      <div class="request">
        <h1 class="display-4">Welcome To CiMSO INNterchange</h1>
        <div class="mt-5">
          <router-link to="/singleView">Request Units</router-link>
        </div>
      </div>
    </div>
    </div>
</template>

<script>

export default {
}
</script>
<style scoped>
  .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl{
    padding: 0;
  }
  .home{
    width:100vw;
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
  .display-4{
    font-weight:600 !important;
  }
  input{
    border-radius:20px ;
    padding:0.3em;
  }
  .request{
    background-color: rgb(190, 215, 57, 0.6);
    padding:150px;
    border-radius:20px;
  }
  a{
    width:100px;
    padding:1em;
    background-color:aliceblue;
    color:gray;
    text-decoration: none;
    border-radius:20px;
    border:solid 1px gray;
    transition:0.6s;
  }
  a:hover{
    cursor: pointer;
    background-color:rgb(190, 215, 57);
    color:aliceblue;
  }
</style>
