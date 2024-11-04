import { createStore } from 'vuex';
import axios from 'axios';

const cimso_api = 'https://demo.ix.cimsoweb.com/'

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
