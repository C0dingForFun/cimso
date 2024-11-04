<template>
    <div>
         <h2>kihviu</h2>
    </div>
</template>
<script>
import axios from 'axios';

const API_BASE_URL = 'https://demo.ix.cimsoweb.com';

const headers = {
  Authorization: JSON.stringify({
    Connection: 'keep-alive',
    allow: 'GET'
  }),
  'Content-Type': 'application/json',
  'Content-Length': 31

};

const getUnitTypes = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/unit_type_info_request`,
    { hg_code: "demo", payload: {} },
    { headers }
  );
  console.log(response.data.payload["Unit Types"]);
  
  return response.data.payload["Unit Types"];
};

export default {
    
}
</script>
<style scoped>
    
</style>