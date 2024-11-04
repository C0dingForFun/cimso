import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    client:null
  },
  getters: {
  },
  mutations: {
    setClients(state, payload){
      state.client = payload
    }
  },
  actions: {

  },
  modules: {
  }
})
