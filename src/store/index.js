import { createStore } from 'vuex';
import axios from 'axios';

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
