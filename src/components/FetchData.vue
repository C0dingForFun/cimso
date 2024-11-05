<template>
    <div>
      <h1>Unit Types</h1>
      <ul>
        <li v-for="unitType in unitTypes" :key="unitType['Unit Type ID']">
          <h2>{{ unitType['Unit Type Description'] }} ({{ unitType['Unit Type Code'] }})</h2>
          <p>Category: {{ unitType['Unit Type Category'] }}</p>
          <p>Max Occupants: {{ unitType['Maximum Occupants'] }}</p>
          <p>Marketing Description: {{ unitType['Marketing Description'] }}</p>
          <p>Units Available: {{ unitType['Unit Count'] }}</p>
  
          <ul>
            <li v-for="unit in bookingUnits[unitType['Unit Type ID']] || []" :key="unit['Booking Unit ID']">
              <p>Booking Unit Name: {{ unit['Booking Unit Name'] }}</p>
              <p>Room Number: {{ unit['Booking Unit Number'] }}</p>
            </li>
          </ul>
        </li>
      </ul>
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
      };
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
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>
  