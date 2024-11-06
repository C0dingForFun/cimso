<template>
    <div>
      <h1 class="mt-5">CiMSO INNterchange</h1>
      <router-link to="/">Back</router-link><input type="text" size="40" placeholder="Request Here..." v-model="search"/><button class="send">Send</button>
      <div class="mt-2">
        <button @click="showUnitList()">Show Unit List</button> <button @click="showUnitType()">Show Unit Types</button> <button @click="showBookingUnit()">Show Booking Unit</button> 
      </div>

    <ul class="mt-2" v-show="checkUnitList">
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

      <table class="table mt-2 unit-type-table" v-show="checkUnitType"> 
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
 
      <table class="table mt-2 booking-unit-table" v-show="checkBookingUnit"> 
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
      
    </div>
  </template>
  
  <script>
  import { getUnitTypes, getBookingUnits } from '../store/index.js';
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  
  export default {
    data() {
      return {
        unitTypes: [],
        bookingUnits: {},
        checkUnitList:true,
        checkUnitType:false,
        checkBookingUnit:false,
        search:''
      };
    },
    methods: {
        showUnitList(){
            this.checkUnitList = !this.checkUnitList
            this.checkUnitType = false;
            this.checkBookingUnit = false;
        },
        showUnitType(){
            this.checkUnitType = !this.checkUnitType
            this.checkBookingUnit = false;
            this.checkUnitList = false;
        },
        showBookingUnit(){
            this.checkBookingUnit = !this.checkBookingUnit
            this.checkUnitType = false;
            this.checkUnitList = false;
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
    }
    ul {
        list-style: none;
        padding: 0;
    }
    li {
        margin-bottom: 1em;
        padding: 1em;
        border: 1px solid rgb(190, 215, 57);
        border-radius: 5px;
    }
    table td {
        padding: 0.5rem;
        border: 2px solid rgb(190, 215, 57);
    }
    table th {
        padding: 0.5rem;
        border: 2px solid rgb(190, 215, 57);
    }
    input{
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
        width:200px;
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
        width:200px;
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
      content: "UserID";
    }
    .unit-type-table td:nth-child(2):before {
      content: "User Name";
    }
    .unit-type-table td:nth-child(3):before {
      content: "Quantity";
    }
    .unit-type-table td:nth-child(4):before {
      content: "Amount";
    }
    .unit-type-table td:nth-child(5):before {
      content: "Category";
    }
    .unit-type-table td:nth-child(6):before {
      content: "Product URL";
    }
    .unit-type-table td:nth-child(7):before {
      content: "Action";
    }
    .unit-type-table td:nth-child(8):before {
      content: "Action";
    }
    .unit-type-table td:nth-child(9):before {
      content: "Action";
    }
  }
  /* Responsive Styles for Products Table */
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
      content: "Product ID";
    }
    .booking-unit-table td:nth-child(2):before {
      content: "Product Name";
    }
    .booking-unit-table td:nth-child(3):before {
      content: "Quantity";
    }
  }
  </style>
  