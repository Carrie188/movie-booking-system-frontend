<template>
    <div>
        <input type="text">
        <select v-model="selected">
            <option disabled value="">select location</option>
            <option>New Westminster</option>
            <option>Burnaby</option>
            <option>North Vancouver</option>
        </select>
        <button type="button">Search</button>
    </div>
    
</template>
<script>
// import DatePick from './DatePicker.vue'

export default {
    name: "SearchBar",
    components:{
        // DatePick
    },
    data(){
        return {
            movies: []
        };

    },methods(){
       

    },mounted(){
        
    }


    
}
</script>

<style scoped>

</style>