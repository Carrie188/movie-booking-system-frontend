<template>
    <div class="wrap">
        <div class="search">
            <select class="loaction" v-model="location">
                <option disabled value="">select location</option>
                <option>New Westminster</option>
                <option>Burnaby</option>
                <option>North Vancouver</option>
            </select>
            <input type="text" class="searchTerm" placeholder="What are you looking for?" v-model="movieTitle">
            <button type="submit" class="searchButton" @click="getMoviesByParams()">
                  &#128270;
            </button>
        </div>
    </div>
    
</template>
<script>
// import DatePick from './DatePicker.vue'
import http from '../http-common.js'
export default {
    name: "SearchBar",
    components:{
        // DatePick
    },
    data(){
        return {
            movies: [],
            movieTitle: "",
            location: ""
        };

    },methods:{
       
        getMoviesByParams(){
         console.log("title: "+ this.movieTitle)
         if(this.movieTitle !== ""){
            http.get(`/movies?title=${this.movieTitle}`).then((response) => {
            this.movies = response.data;
            sessionStorage.setItem("movies",JSON.stringify(this.movies))
            console.log("movies: " + JSON.stringify(this.movies));
            
          })
          .catch((e) => {
            console.log(e.response.data);
          });
         }else{
           http.get("/movies")
                            .then((response)=>{
                                this.movies = response.data;
                                console.log(this.movies);
                            }).catch((e)=>{
                                console.log(e.response.data);
                            })
          sessionStorage.setItem("movies",JSON.stringify(this.movies))
         }
         
       }

    },mounted(){
        
    }


    
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 50%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid #8edbc4;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: #8edbc4;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #8edbc4;
  background: #8edbc4;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/* Resize the wrap to see the search bar change! */
.wrap{
  width: 100%;
  position: relative;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  
}

.loaction{
     width: 80px;
     border: 3px solid #8edbc4;
}
</style>