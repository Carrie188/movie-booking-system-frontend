<template>
    <div>
        <NavBar/>
    </div>

     <div class="table-wrapper">
        <h1>Your Reservations</h1>
        <table class="fl-table">
            <thead>
            <tr>
                <th>Movie</th>
                <th>Screen</th>
                <th>Tickets</th>
                <th>Total Cost</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody  v-for="order in orders" :key="order.reservationId">
            <tr>
                <!--suggestion: move the show_id property to the reservation class in order to get movie info for the order  -->
                <td>{{order.reservationId}}</td>
                <td>{{order.reservationId}}</td>
                <td>{{order.numberOfTickets}}</td>
                <td>{{order.totalCost}}</td>
                <td>
                    <div class="edit-button"> 
                    <button type="submit" class="view-detail" @click="getOrderDetail()">View Details</button>
                    <form action="#">
                    <button type="button" class="cancle">Cancle</button>
                    </form>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import NavBar from './NavBar.vue'
import http from '../http-common.js'

export default {
    name: "OrderList",
    components: {
        NavBar
    },
    data(){
        return {
            orders: []
        };

    },methods:{
        getOrderDetail(){
            this.$router.push({name: "OrderDetail"});
        }
       

    },mounted(){
        http
        .get("/reservations")
        .then((response)=>{
            this.orders = response.data;
            console.log(this.orders);
        }).catch((e)=>{
            console.log(e.response.data);
        })
        
    }


    
}
</script>
<style scoped>
*{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
body{
    font-family: Helvetica;
    -webkit-font-smoothing: antialiased;
    background: rgba( 71, 147, 227, 1);
}
h2{
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    padding: 30px 0;
}

/* Table Styles */

.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: rgb(224, 219, 219);
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table thead th {
    color: #ffffff;
    background: #4FC3A1;
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}

.fl-table tr:nth-child(even) {
    background: #F8F8F8;
}

/* Responsive */

@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}


button{
    /* display: flex; */
    margin: 10px;
    width: 100px;
    height: 30px;
    border-radius: 8px;
    border-color: #EEE;
}
.view-detail{
    background: #4FC3A1;
}
.cancle{
    background: #c5c9c8;
}
</style>