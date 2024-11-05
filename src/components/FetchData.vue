<template>
    <div>
      <h1>Unit Types</h1>
      <button @click="show()">Show Unit Types</button>
      <table class="table mt-2" v-show="check"> 
        <thead class="table-dark">
            <tr>
                <th>Unit Type ID</th>
                <th>Unit Type Description</th>
                <th>Unit Type Code</th>
                <th>Unit Type Category'</th>
                <th>Maximum Occupants</th>
                <th>Marketing Description</th>
                <th>Unit Count</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="unitType in unitTypes" :key="unitType['Unit Type ID']">
                <td>{{ unitType['Unit Type ID']}}</td>
                <td>{{ unitType['Unit Type Description'] }}</td>
                <td>{{ unitType['Unit Type Code'] }}</td>
                <td>{{ unitType['Unit Type Category'] }}</td>
                <td>{{ unitType['Maximum Occupants'] }}</td>
                <td>{{ unitType['Marketing Description'] }}</td>
                <td>{{ unitType['Unit Count'] }}</td>
            </tr>
        </tbody>
      </table>
      <!-- <ul>
        <li v-for="unitType in unitTypes" :key="unitType['Unit Type ID']">
          <h2>{{ unitType['Unit Type Description'] }} ({{ unitType['Unit Type Code'] }})</h2>
          <p>Category: {{ unitType['Unit Type Category'] }}</p>
          <p>Max Occupants: {{ unitType['Maximum Occupants'] }}</p>
          <p>Marketing Description: {{ unitType['Marketing Description'] }}</p>
          <p>Units Available: {{ unitType['Unit Count'] }}</p> -->
  
          <!-- <ul>
            <li v-for="unit in bookingUnits[unitType['Unit Type ID']] || []" :key="unit['Booking Unit ID']">
              <p>Booking Unit Name: {{ unit['Booking Unit Name'] }}</p>
              <p>Room Number: {{ unit['Booking Unit Number'] }}</p>
            </li>
          </ul> -->
        <!-- </li>
      </ul> -->
    </div>
  </template>
  
  <script>
  import { getUnitTypes, getBookingUnits } from '../services/api.js';
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  
  export default {
    data() {
      return {
        unitTypes: [],
        bookingUnits: {},
        check:false
      };
    },
    methods: {
        show(){
            this.check = !this.check
        }
    },
    async created() {
      try {
        const [unitTypesData, bookingUnitsData] = await Promise.all([
          getUnitTypes(),
          getBookingUnits(),
        ]);
  
        this.unitTypes = unitTypesData;
  
        // Organize booking units by Unit Type ID for easy access
        this.bookingUnits = bookingUnitsData.reduce((acc, unit) => {
          if (!acc[unit['Unit Type ID']]) {
            acc[unit['Unit Type ID']] = [];
          }
          acc[unit['Unit Type ID']].push(unit);
          return acc;
        }, {});
      } catch (error) {
        toast("Error fetching data", {
                "theme": "dark",
                "type": "error",
                "dangerouslyHTMLString": true,
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
            })
      }
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    margin-bottom: 1em;
  }
  h2 {
    font-size: 1.5em;
    margin-top: 1em;
  }
  </style>
  