<template>
    <div>
        <NavBar/>
        <div class="seats">
            <ul class="showcase">
                <li>
                    <div class="seat"></div>
                    <small>Available</small>
                </li>
                <li>
                    <div class="seat selected"></div>
                    <small>Selected</small>
                </li>
                <li>
                    <div class="seat sold"></div>
                    <small>Sold</small>
                </li>
            </ul>
            <div class="container">
                <div class="screen"></div>
                <div class="row" >
                    <div class="seat" @click="select" data-value="A00"></div>
                    <div class="seat"  @click="select" data-value="A01"></div>
                    <div class="seat"  @click="select" data-value="A02"></div>
                    <div class="seat"  @click="select" data-value="A03"></div>
                    <div class="seat"  @click="select" data-value="A04"></div>
                    <div class="seat"  @click="select" data-value="A05"></div>
                    <div class="seat"  @click="select" data-value="A06"></div>
                    <div class="seat" @click="select" data-value="A07"></div>
                </div>

                <div class="row">
                    <div class="seat" @click="select" data-value="B10"></div>
                    <div class="seat" @click="select" data-value="B11"></div>
                    <div class="seat" @click="select" data-value="B12"></div>
                    <div class="seat sold" data-value="B13"></div>
                    <div class="seat sold" data-value="B14"></div>
                    <div class="seat" @click="select" data-value="B15"></div>
                    <div class="seat" @click="select" data-value="B16"></div>
                    <div class="seat" @click="select" data-value="B17"></div>
                </div>
                <div class="row">
                    <div class="seat" @click="select" data-value="C20"></div>
                    <div class="seat" @click="select" data-value="C21"></div>
                    <div class="seat" @click="select" data-value="C22"></div>
                    <div class="seat" @click="select" data-value="C23"></div>
                    <div class="seat" @click="select" data-value="C24"></div>
                    <div class="seat" @click="select" data-value="C25"></div>
                    <div class="seat sold" @click="select"  data-value="C26"></div>
                    <div class="seat sold" @click="select"  data-value="C27"></div>
                </div>
                <div class="row">
                    <div class="seat" @click="select" data-value="D30"></div>
                    <div class="seat" @click="select"  data-value="D31"></div>
                    <div class="seat" @click="select"  data-value="D32"></div>
                    <div class="seat" @click="select"  data-value="D33"></div>
                    <div class="seat" @click="select"  data-value="D34"></div>
                    <div class="seat" @click="select"  data-value="D35"></div>
                    <div class="seat" @click="select" data-value="D36"></div>
                    <div class="seat" @click="select" data-value="D37"></div>
                </div>
                <div class="row">
                    <div class="seat" @click="select"  data-value="E40"></div>
                    <div class="seat" @click="select" data-value="E41"></div>
                    <div class="seat" @click="select" data-value="E42"></div>
                    <div class="seat sold" data-value="E43"></div>
                    <div class="seat sold" data-value="E44"></div>
                    <div class="seat" @click="select" data-value="E45"></div>
                    <div class="seat" @click="select" data-value="E46"></div>
                    <div class="seat" @click="select" data-value="E47"></div>
                </div>
                <div class="row">
                    <div class="seat" @click="select" data-value="F50"></div>
                    <div class="seat" @click="select" data-value="F51"></div>
                    <div class="seat" @click="select" data-value="F52"></div>
                    <div class="seat" @click="select" data-value="F53"></div>
                    <div class="seat sold" data-value="F54"></div>
                    <div class="seat sold" data-value="F55"></div>
                    <div class="seat sold" data-value="F56"></div>
                    <div class="seat" @click="select" data-value="F57"></div>
                </div>
                </div>
            <p class="text">You have selected <span id="count">{{count}}</span> seat for a price of RS.<span id="total">{{total}}</span></p>
           <button type="submit" @click="addNewOrder()">Buy Tickets</button>
        </div>

    </div>
    

</template>

<script>
import NavBar from './NavBar.vue'
import http from "../http-common";

export default {
    name: "SeatPage",
    components: {
        NavBar,

    },
    data(){
        return {
            selectedMovie:{},
            selectedShow:{},
            selectedSeat: {seatNumber:"", isAvailable:""},
            selectedSeats: [],
            selectedScreen:{},
            count: 0,
            total: 0.0,
            user:{},
            price:6.0,
            newReservation:{},
            tickets:[]

        };
    },
    methods:{
        select(e) {
                if (
                    e.target.classList.contains("seat") &&
                    !e.target.classList.contains("sold")
                ) {
                    e.target.classList.toggle("selected");
                    // this.getElementById("count").innerText =  8888;
                    var seatNum = e.target.getAttribute("data-value")
                    console.log("selectedSeat: "+seatNum)
                    this.selectedSeat = {seatNumber: seatNum, isAvailable: false}
                    console.log("selectedSeat: "+ JSON.stringify(this.selectedSeat))
                    this.selectedSeats.push(this.selectedSeat)
                    console.log(JSON.stringify(this.selectedSeats))
                    this.count +=1;
                    this.total = this.count * 6.5;
                    
                }
         },
         addNewOrder(){
              // 1. create seats
              this.selectedSeats.forEach((s)=>{
                http.post("/seats",s).then((response)=>{
                    console.log("add seat: "+ JSON.stringify(response.data));
                }).catch((err)=>{
                  console.log(err.response.data)
                })
              })

              //2. create tickes
              this.selectedSeats.forEach(
                (s)=>{
                  var seatNum = s.seatNumber;
                  
                  var newTicket = {price: 6.5, seatNumber: seatNum};
                  console.log("newTicket:"+JSON.stringify(newTicket))
                  this.tickets.push(newTicket);
                  http.post("/tickets",newTicket)
                  .then((response)=>{
                    console.log("add ticket:" + JSON.stringify(response.data))
                  }).catch((e)=>{
                    console.log("add tickets error:" + e.response.data)
                  })

                }
              )
              sessionStorage.setItem("tickets", this.tickets);
                
               //3. add new reservation
               

               
                // console.log("new reservstion:" + JSON.stringify(this.newReservation));
                http.post("/reservations",this.newReservation)
                .then((response)=>{
                  sessionStorage.setItem("curentOrder",response.data);
                  this.newOrderId = response.data.reservationId;
                  sessionStorage.setItem("newOrderId",this.newOrderId);
                  this.setUserandTicket();
                  // console.log("new reservstion:" + JSON.stringify(this.newReservation));
                  // console.log("the new order: " + this.newOrderId)
                  this.$router.push({name: "OrderDetail"});
                }).catch((e)=>{
                  console.log(e.response.data)
                })
             
                

             
            


           
         },
         setUserandTicket(){
           var oId = sessionStorage.getItem("newOrderId")
           console.log("the new order: " + oId)

           //can not get the orderId?????
           // 4. set user to the order



            http.put(`/reservations/${oId}/setuser`, this.user).then((response)=>{
                    console.log("set user for the new order: " + JSON.stringify(response.data))
                  }).catch((e)=>{
                    console.log("failed adding order");
                    console.log(e.response.data);
                  })


          // 4. set user to the order
            this.tickets.forEach((t)=>{
                http.put(`/reservations/${oId}/setticket`, t).then((response)=>{
                                    console.log("set tickets for the new order: " + JSON.stringify(response.data))
                                  }).catch((e)=>{
                                    console.log("failed adding order");
                                    console.log(e.response.data);
                                  })
            })
            
         }
        

    },
    mounted(){
        var id = sessionStorage.getItem("LoginUserId");
           http.get(`/users/${id}`)
           .then((response) => {
                this.user =response.data;
                sessionStorage.setItem("user",JSON.stringify(this.user))
                console.log(JSON.stringify(this.user));
            }).catch(
                (e) => {
                    console.log(e.response.data);
                }
            );
    }

    
}
</script>
<style scoped>
.seats {
  box-sizing: border-box;
}

.seats {
  background-color: rgb(155, 150, 150);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Lato", sans-serif;
  margin-top: 80px;
  box-sizing: border-box;
  border-radius: 50px;
}

.movie-container {
  margin: 10px 0;
}

.movie-container select {
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: 16px;
  margin-left: 10px;
  padding: 5px 15px 5px 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

.container {
  perspective: 1000px;
  margin-bottom: 30px;
}

.seat {
  background-color: #444451;
  height: 26px;
  width: 32px;
  margin: 3px;
  font-size: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  
}

.seat.selected {
  background-color: green;
}

.seat.sold {
  background-color: #fff;
}

.seat:nth-of-type(2) {
  margin-right: 18px;
}

.seat:nth-last-of-type(2) {
  margin-left: 18px;
}

.seat:not(.sold):hover {
  cursor: pointer;
  transform: scale(1.2);
}

.showcase .seat:not(.sold):hover {
  cursor: default;
  transform: scale(1);
}

.showcase {
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  color: #777;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
}

.showcase li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}
.showcase li small {
  margin-left: 2px;
}

.row {
  display: flex;
}

.screen {
  background-color: #fff;
  height: 120px;
  width: 100%;
  margin: 15px 0;
  transform: rotateX(-48deg);
  box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
}

p.text{
    margin: 5px 0;
}

p.text span{
    color: green;
}

button {
    text-decoration: none;
    margin-top: 20px;
    border-radius: 20px;
    height: 40px;
    width: 200px;
    border-color: rgb(216, 213, 213);
    background: #4FC3A1;
  

}
</style>