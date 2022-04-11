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
                    <div class="seat" @click="select" data-value="00"></div>
                    <div class="seat"  @click="select" data-value="01"></div>
                    <div class="seat"  @click="select" data-value="02"></div>
                    <div class="seat"  @click="select" data-value="03"></div>
                    <div class="seat"  @click="select" data-value="04"></div>
                    <div class="seat"  @click="select" data-value="05"></div>
                    <div class="seat"  @click="select" data-value="06"></div>
                    <div class="seat" @click="select" data-value="07"></div>
                </div>

                <div class="row">
                    <div class="seat" @click="select" data-value="10"></div>
                    <div class="seat" @click="select" data-value="11"></div>
                    <div class="seat" @click="select" data-value="12"></div>
                    <div class="seat sold" data-value="13"></div>
                    <div class="seat sold" data-value="14"></div>
                    <div class="seat" @click="select" data-value="15"></div>
                    <div class="seat" @click="select" data-value="16"></div>
                    <div class="seat" @click="select" data-value="17"></div>
                </div>
                <div class="row">
                    <div class="seat" @click="select" data-value="20"></div>
                    <div class="seat" @click="select" data-value="21"></div>
                    <div class="seat" @click="select" data-value="22"></div>
                    <div class="seat" @click="select" data-value="23"></div>
                    <div class="seat" @click="select" data-value="24"></div>
                    <div class="seat" @click="select" data-value="25"></div>
                    <div class="seat sold" @click="select"  data-value="26"></div>
                    <div class="seat sold" @click="select"  data-value="27"></div>
                </div>
                <div class="row">
                    <div class="seat" @click="select" data-value="30"></div>
                    <div class="seat" @click="select"  data-value="31"></div>
                    <div class="seat" @click="select"  data-value="32"></div>
                    <div class="seat" @click="select"  data-value="33"></div>
                    <div class="seat" @click="select"  data-value="34"></div>
                    <div class="seat" @click="select"  data-value="35"></div>
                    <div class="seat" @click="select" data-value="36"></div>
                    <div class="seat" @click="select" data-value="37"></div>
                </div>
                <div class="row">
                    <div class="seat" @click="select"  data-value="40"></div>
                    <div class="seat" @click="select" data-value="41"></div>
                    <div class="seat" @click="select" data-value="42"></div>
                    <div class="seat sold" data-value="43"></div>
                    <div class="seat sold" data-value="44"></div>
                    <div class="seat" @click="select" data-value="45"></div>
                    <div class="seat" @click="select" data-value="46"></div>
                    <div class="seat" @click="select" data-value="47"></div>
                </div>
                <div class="row">
                    <div class="seat" @click="select" data-value="50"></div>
                    <div class="seat" @click="select" data-value="51"></div>
                    <div class="seat" @click="select" data-value="52"></div>
                    <div class="seat" @click="select" data-value="53"></div>
                    <div class="seat sold" data-value="54"></div>
                    <div class="seat sold" data-value="55"></div>
                    <div class="seat sold" data-value="56"></div>
                    <div class="seat" @click="select" data-value="57"></div>
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
            total: 0,
            user:{},
            price:6.0,
            newReservation:{user:{},tickets:[]},
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
                    this.selectedSeat = {seatNumber: seatNum, isAvailable: "false"}
                    console.log("selectedSeat: "+ JSON.stringify(this.selectedSeat))
                    this.selectedSeats.push(this.selectedSeat)
                    console.log(this.selectedSeats.length)
                    this.count +=1;
                    this.total = this.count * 30;
                    
                }
         },
         addNewOrder(){
            
              this.selectedScreen = JSON.parse(sessionStorage.getItem("selectedScreen"))
              //1. creste seats
              this.selectedSeats.forEach(
                (s)=>{
                  http.post("/seats", s)
                  .then((response)=>{
                    console.log("add seat:" + response.data)
                  }).catch((e)=>{
                    console.log("add seat error:" + e.response.data)
                  })
                }
              )

              //2. create tickes
              
          






              //3. add new reservation
                // http.post("/reservations",this.newReservation)
                // .then((response)=>{
                //   sessionStorage.setItem("newOrderId",JSON.stringify(response.data.reservationId));
                //   // alert("welcome to meta beta!")
                //   this.$router.push({name: "OrderDetail"});
                // }).catch((err)=>{
                //   console.log(err.response.data)
                // });

             
            


           
         }
        

    },
    mounted(){

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