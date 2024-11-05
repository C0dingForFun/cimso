<template>
    <div>
      <h1>Welcome to CiMSO INNterchange</h1>
      <button @click="showUnitType()">Show Unit Types</button> <button @click="showBookingUnit()">Show Booking Unit</button>
      <table class="table mt-2" v-show="checkUnitType"> 
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
 
      <table class="table mt-2" v-show="checkBookingUnit"> 
        <thead class="table-dark">
            <tr>
                <th>Booking Unit ID</th>
                <th>Booking Unit Name</th>
                <th>Booking Unit Number</th>
            </tr>
        </thead>
        <tbody  v-for="unitType in unitTypes" :key="unitType['Unit Type ID']">
            <tr v-for="unit in bookingUnits[unitType['Unit Type ID']] || []" :key="unit['Booking Unit ID']">
                <td>{{ unit['Booking Unit ID']}}</td>
                <td>{{ unit['Booking Unit Name'] }}</td>
                <td>{{ unit['Booking Unit Number'] }}</td>
            </tr>
        </tbody>
      </table>  
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
        checkUnitType:false,
        checkBookingUnit:false
      };
    },
    methods: {
        showUnitType(){
            this.checkUnitType = !this.checkUnitType
            this.checkBookingUnit = false;
        },
        showBookingUnit(){
            this.checkBookingUnit = !this.checkBookingUnit
            this.checkUnitType = false;
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
        this.bookingUnits = bookingUnitsData.reduce((book, unit) => {
          if (!book[unit['Unit Type ID']]) {
            book[unit['Unit Type ID']] = [];
          }
          book[unit['Unit Type ID']].push(unit);
          return book;
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
    table td {
        padding: 0.5rem;
        border: 2px solid rgb(190, 215, 57);
    }
    table th {
        padding: 0.5rem;
        border: 2px solid rgb(190, 215, 57);
    }
  </style>
  