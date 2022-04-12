<template>
    <div>
        <NavBar/>
    </div>
    
  <div id="invoice-POS">
    
    <center id="top">
      <div class="logo"></div>
      <div class="info"> 
        <h2>Movie Tickes Invoice</h2>
      </div><!--End Info-->
    </center><!--End InvoiceTop-->
    
    <div id="mid">
      <div class="info">
        <h2>Contact Info</h2>
        <p> Customer name: {{user.userName}}<br>Phone Number: {{user.userPhoneNumber}}<br>Email : {{user.userEmail}}<br></p>
      </div>
    </div><!--End Invoice Mid-->
    
    <div id="bot">

        <div id="table">
            <table>
              <thead>
                <tr class="tabletitle">
                    <td class="item"><h2>Order ID</h2></td>
                    <td class="Hours"><h2>Seat ID</h2></td>
                    <td class="Rate"><h2>Sub Total</h2></td>
                </tr>
              </thead>
               <tbody v-for="ticket in tickets" :key="ticket.id">
                <tr class="service" >
                    <td class="tableitem"><p class="itemtext">{{newOrderId}}</p></td>
                    <td class="tableitem"><p class="itemtext">{{ticket.seatNumber}}</p></td>
                    <td class="tableitem"><p class="itemtext">${{ticket.price}}</p></td>
                </tr>
               </tbody>
               <tr class="tabletitle">
                    <td></td>
                    <td class="Rate"><h2>Total</h2></td>
                    <td class="payment"><h2>${{totalCost}}</h2></td>
                </tr>
            </table>
        </div><!--End Table-->

        <div id="legalcopy">
            <p class="legal"><strong>Thank you for your business!</strong><br>Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices. 
            </p>
        </div>
    
    </div><!--End InvoiceBot-->
        <div>
            <!-- <button type="submit" class="log-out" @click="logout()">Logout</button>            -->
            <button type="submit" class="view-order" @click="getOrderList()">View Orders</button>
           
        </div>
  </div><!--End Invoice-->

</template>

<script>
import NavBar from './NavBar.vue'
import http from "../http-common";
export default {
    name: "OrderDetail",
    components: {
        NavBar
    },data(){
      return {
          newOrderId:"",
          user:{},
          tickets:[],
          totalCost:0.0,
          tNum: 0
      };
    },methods:{
      getOrderList(){
        this.$router.push({name: "OrderList"});
       
      }
      
    },mounted(){
        var oId = sessionStorage.getItem("newOrderId")
        this.newOrderId = oId;
        this.user = JSON.parse(sessionStorage.getItem("user"));
        console.log("new order id: "+oId)
         http.get(`/reservations/${oId}`).then((response)=>{
                    this.tickets = response.data.tickets;
                    this.totalCost = response.data.totalCost;
                    this.tNum = response.data.numberOfTickets;
                    console.log("get all tickets: "+JSON.stringify(this.tickets))
                  }).catch((e)=>{
                    console.log("get tickets failed");
                    console.log(e.response.data);
                  })


    }

    
}
</script>
<style scoped>
#invoice-POS{
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding:2mm;
  margin: 0 auto;
  width: 204mm;
  background: #FFF;
}
h1{
  font-size: 1.5em;
  color: #222;
}
h2{font-size: .9em;}
h3{
  font-size: 1.2em;
  font-weight: 300;
  line-height: 2em;
}
p{
  font-size: .7em;
  color: #666;
  line-height: 1.2em;
}
 
#top, #mid,#bot{ /* Targets all id with 'col-' */
  border-bottom: 1px solid #EEE;
}

#top{min-height: 100px;}
#mid{min-height: 80px;} 
#bot{ min-height: 50px;}

#top .logo{

	height: 60px;
	width: 60px;
	background: url(../assets/logo.png) no-repeat;
	background-size: 60px 60px;
}
.clientlogo{
  float: left;
	height: 60px;
	width: 60px;
	background: url(../assets/logo.png) no-repeat;
	background-size: 60px 60px;
  border-radius: 50px;
}
.info{
  display: block;

  margin-left: 0;
}
.title{
  float: right;
}
.title p{text-align: right;} 
table{
  width: 100%;
  border-collapse: collapse;
  position: center;
}

.tabletitle{
  /* //padding: 5px; */
  font-size: .5em;
  background: #EEE;
}
.service{border-bottom: 1px solid #EEE;}
.item{width: 24mm;}
.itemtext{font-size: .5em;}

#legalcopy{
  margin-top: 5mm;
}

button{
    margin: 20px;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    border-color: #EEE;
}
.view-order{
    background: #4FC3A1;
}

</style>