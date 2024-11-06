<template>
    <div>
        <router-link to="/" class="my-4 back">Back to Home</router-link>
      <h1 class="mt-5">CiMSO INNterchange</h1>
      <div class="my-2">
          <input type="text" placeholder="Search by Unit Type ID, Booking Unit ID, or Unit Type Code..." v-model="searchUnit" class="mx-2 my-2"/>
      </div>
      
      <div class="mt-2">
        <button class="mx-2" @click="showUnitList()">Show Unit List</button> 
        <button class="mx-2" @click="showUnitType()">Show Unit Types</button> 
        <button class="mx-2" @click="showBookingUnit()">Show Booking Unit</button> 
      </div>
      
      <!-- Unit List -->
      <ul class="mt-4 unitList" v-show="checkUnitList">
        <li v-for="unitType in filteredUnitTypes" :key="unitType['Unit Type ID']">
          <h2>{{ unitType['Unit Type Description'] }} ({{ unitType['Unit Type Code'] }})</h2>
          <p>Category: {{ unitType['Unit Type Category'] }}</p>
          <p>Max Occupants: {{ unitType['Maximum Occupants'] }}</p>
          <p>Marketing Description: {{ unitType['Marketing Description'] }}</p>
          <p>Units Available: {{ unitType['Unit Count'] }}</p>
          
          <ul>
            <li class="bookingUnit" v-for="unit in filteredBookingUnits[unitType['Unit Type ID']] || []" :key="unit['Booking Unit ID']">
              <p>Booking Unit Name: {{ unit['Booking Unit Name'] }}</p>
              <p>Room Number: {{ unit['Booking Unit Number'] }}</p>
            </li>
          </ul>
        </li>
      </ul>
  
      <!-- Unit Type Table -->
      <table class="table mt-4 unit-type-table" v-show="checkUnitType">
        <thead class="table-dark">
          <tr>
            <th>Unit Type ID</th>
            <th>Unit Type Description</th>
            <th>Unit Type Code</th>
            <th>Unit Type Category</th>
            <th>Maximum Occupants</th>
            <th>Marketing Description</th>
            <th>Unit Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unitType in filteredUnitTypes" :key="unitType['Unit Type ID']">
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
  
      <!-- Booking Unit Table -->
      <table class="table mt-4 booking-unit-table" v-show="checkBookingUnit">
        <thead class="table-dark">
          <tr>
            <th>Booking Unit ID</th>
            <th>Booking Unit Name</th>
            <th>Booking Unit Number</th>
          </tr>
        </thead>
        <tbody v-for="unitType in filteredUnitTypes" :key="unitType['Unit Type ID']">
          <tr v-for="bookingUnit in filteredBookingUnits[unitType['Unit Type ID']] || []" :key="bookingUnit['Booking Unit ID']">
            <td>{{ bookingUnit['Booking Unit ID']}}</td>
            <td>{{ bookingUnit['Booking Unit Name'] }}</td>
            <td>{{ bookingUnit['Booking Unit Number'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { getUnitTypes, getBookingUnits } from '../store/index.js';
  import SpinnerComp from '../components/SpinnerComp.vue'
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  
  export default {
    data() {
      return {
        unitTypes: [],
        bookingUnits: {},
        checkUnitList: true,
        checkUnitType: false,
        checkBookingUnit: false,
        searchUnit: '',
      };
    },
    components: {
      SpinnerComp
    },
    methods: {
      showUnitList() {
        this.checkUnitList = !this.checkUnitList;
        this.checkUnitType = false;
        this.checkBookingUnit = false;
      },
      showUnitType() {
        this.checkUnitType = !this.checkUnitType;
        this.checkBookingUnit = false;
        this.checkUnitList = false;
      },
      showBookingUnit() {
        this.checkBookingUnit = !this.checkBookingUnit;
        this.checkUnitType = false;
        this.checkUnitList = false;
      }
    },
    computed: {
      filteredUnitTypes() {
        const query = this.searchUnit.toLowerCase();
        return this.unitTypes.filter(unitType => {
          return (
            unitType['Unit Type ID'].toString().includes(query) ||
            unitType['Unit Type Code'].toLowerCase().includes(query) ||
            unitType['Unit Type Description'].toLowerCase().includes(query)
          );
        });
      },
      filteredBookingUnits() {
    const query = this.searchUnit.toLowerCase();
    return Object.keys(this.bookingUnits).reduce((result, unitTypeId) => {
      const filteredUnits = this.bookingUnits[unitTypeId].filter(unit => {
        // Convert the Booking Unit ID to a string before comparison
        return (
          unit['Booking Unit ID'].toString().includes(query) || 
          unit['Booking Unit Name'].toLowerCase().includes(query)
        );
      });

      if (filteredUnits.length > 0) {
        result[unitTypeId] = filteredUnits;
      }
      return result;
    }, {});
  }
    },
    async created() {
      try {
        const [unitTypesData, bookingUnitsData] = await Promise.all([
          getUnitTypes(),
          getBookingUnits(),
        ]);
  
        this.unitTypes = unitTypesData;
  
        // Organizing booking units by Unit Type ID
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
        });
      }
    },
  };
  </script>
  
  <style scoped>
    h1 {
        font-size: 2em;
    }
    .back{
        position: fixed;
        top:0;
        left:0;
        z-index:2;
    }
    .unitList{
        list-style: none;
        padding: 0;
        width:95vw;
        margin:auto;
    }
    .bookingUnit{
        width:90vw;
        list-style: none;
    }
    li{
        width:95vw;
        margin-bottom: 1em;
        /* padding: 1em; */
        border: 3px solid rgb(190, 215, 57);
        border-radius: 5px;
        background-color: rgb(44, 44, 44);
        color:aliceblue;
    }
    table{
        margin:auto;
        width:95vw;
    }
    table td {
        padding: 0.5rem;
        border: 2px solid rgb(190, 215, 57);
        background-color: rgb(44, 44, 44);
        color:aliceblue;
    }
    table th {
        padding: 0.5rem;
        border: 2px solid rgb(190, 215, 57);
    }
    input{
        width:39vw;
        border-radius:20px ;
        padding:0.3em;
    }
    .send{
        width:100px;
        padding:0.5em;
        background-color:aliceblue;
        color:gray;
        border-radius:20px;
        border:solid 1px gray;
        transition:0.6s;
    }
    .send:hover{
        cursor: pointer;
        background-color:rgb(190, 215, 57);
        color:aliceblue;
    }
    a{
        width:170px;
        padding:0.6em;
        background-color:aliceblue;
        color:gray;
        text-decoration: none;
        border-radius:20px;
        border:solid 1px gray;
        transition:0.6s;
    }
    a:hover{
        cursor: pointer;
        background-color:rgb(190, 215, 57);
        color:aliceblue;
    }
    button{
        width:187px;
        padding:0.5em;
        background-color:aliceblue;
        color:gray;
        border-radius:20px;
        border:solid 1px gray;
        transition:0.6s;
    }
    button:hover{
        cursor: pointer;
        background-color:rgb(190, 215, 57);
        color:aliceblue;
    }

/* Responsive Styles for Unit Types Table */
    @media (max-width: 768px) {
    .unit-type-table {
      width: 100%;
      border-collapse: collapse;
    }
    .unit-type-table thead {
      display: none;
    }
    .unit-type-table tr {
      display: block;
      margin-bottom: 10px;
      border-bottom: 3px solid rgb(190, 215, 57);
    }
    .unit-type-table td {
      display: block;
      text-align: right;
      font-size: 13px;
      border-bottom: 1px solid rgb(190, 215, 57);
      padding: 30px;
      position: relative;
    }
    .unit-type-table td:before {
      content: attr(data-label);
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
    .unit-type-table td:last-child {
      border-bottom: 0;
    }
    .unit-type-table td:nth-child(1):before {
      content: "Unit Type ID";
    }
    .unit-type-table td:nth-child(2):before {
      content: "Unit Type Description";
    }
    .unit-type-table td:nth-child(3):before {
      content: "Unit Type Code";
    }
    .unit-type-table td:nth-child(4):before {
      content: "Unit Type Category";
    }
    .unit-type-table td:nth-child(5):before {
      content: "Maximum Occupants";
    }
    .unit-type-table td:nth-child(6):before {
      content: "Marketing Description";
    }
    .unit-type-table td:nth-child(7):before {
      content: "Unit Count";
    }
  }
  /* Responsive Styles for Booking Units Table */
  @media (max-width: 768px) {
    .booking-unit-table {
      width: 100%;
      border-collapse: collapse;
    }
    .booking-unit-table thead {
      display: none;
    }
    .booking-unit-table tr {
      display: block;
      margin-bottom: 10px;
      border-bottom: 3px solid rgb(190, 215, 57);
    }
    .booking-unit-table td {
      display: block;
      text-align: right;
      font-size: 13px;
      border-bottom: 1px solid rgb(190, 215, 57);
      padding: 30px;
      position: relative;
    }
    .booking-unit-table td:before {
      content: attr(data-label);
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
    .booking-unit-table td:last-child {
      border-bottom: 0;
    }
    .booking-unit-table td:nth-child(1):before {
      content: "Booking Unit ID";
    }
    .booking-unit-table td:nth-child(2):before {
      content: "Booking Unit Name";
    }
    .booking-unit-table td:nth-child(3):before {
      content: "Booking Unit Number";
    }
  }

/* Responsive Style for Back To Home button and List*/
@media (max-width: 768px) {
    a{
        width:150px;
        padding:0.1em;
        margin-bottom:10px;
    }
    .bookingUnit{
        /* width:90vw; */
        margin-bottom: 1em;
    }  
}
  </style>
  