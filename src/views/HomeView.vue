<template>
  <div class="container-fluid">
    <div class="home">
      <div class="request">
        <h1>Welcome</h1>
        <input type="text" size="30" placeholder="Request Here..."/><button>Send</button>
      </div>
    </div>
    </div>
</template>

<script>

export default {
}
</script>
<style scoped>
  .container-fluid{
    padding-left: none !important;
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
  input{
    border-radius:20px ;
    padding:0.3em;
  }
  .request{
    background-color: rgb(190, 215, 57, 0.6);
    padding:150px;
    border-radius:20px;
  }
  button{
    width:100px;
    padding:0.5em;
    background-color:aliceblue;
    color:black;
    border-radius:20px;
    border:solid 1px rgb(190, 215, 57);
    transition:0.6s;
  }
  button:hover{
    cursor: pointer;
    background-color:rgb(190, 215, 57);
    color:aliceblue;
  }
</style>
