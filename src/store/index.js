import { createStore } from 'vuex';
import axios from 'axios';

const API_BASE_URL = 'https://demo.ix.cimsoweb.com';

const headers = {
  Authorization: JSON.stringify({
    Connection: 'keep-alive',
    allow: 'GET',

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
  
  return response.data.payload["Unit Types"];

}

export default createStore({
  state: {
    client_request:null
  },
  getters: {
  },
  mutations: {
    setClientRequest(state, payload){
      state.client_request = payload
    }
  },
  actions: {

  },
  modules: {
  }
})
