import { createStore } from 'vuex';
import axios from 'axios';

const cimso_API = '/api';

const headers = {
  Authorization: JSON.stringify({
    "Client Login ID":"CiMSO.dev",
    "Client Password":"CiMSO.dev",
    "hg_pass":"nGXUF1i^57I^ao^o",
  }),
  'Content-Type': 'application/json',
};

export const getUnitTypes = async () => {
  const response = await axios.post(
    `${cimso_API}/unit_type_info_request`,
    { hg_code: "demo", payload: {} },
    { headers }
  );
  
  console.log(response.data.payload["Unit Types"]);
  return response.data.payload["Unit Types"];
};

export const getBookingUnits = async () => {
  const response = await axios.post(
    `${cimso_API}/get_booking_units_request`,
    { hg_code: "demo", payload: {} },
    { headers }
  );
  return response.data.payload["Booking Units"];
};

export const getImage = async () => {
  const response = await axios.post(
    `${cimso_API}/get_booking_units_request`,
    { hg_code: "demo", payload: {} },
    { headers }
  );
  return response.data.payload["Booking Units"];
};

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
