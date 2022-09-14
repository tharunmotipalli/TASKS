<template>
<div>
<h1>searchbar </h1>
<input type="text" v-model="searchInput" placeholder="searchbar">
<button @click="search(searchInput)">search</button>
</div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios)
export default {
    name:'searchBar',
    input:'',
    props: {
    searchLink: String
  },
    
    data:function(){
        return {
            searchInput:'',
            list:undefined,

        }
    },
    methods:{
        inputChanged:function(value){
            value=this.searchInput
            this.$emit('search:input',value)
        },
    search(value){
      if(this.searchInput.length!=0){
      Vue.axios.post(this.searchLink,{value:value})
     .then((res)=>{
      this.$emit('searchdata',res)
     })
    }
    }
    }
}//child
</script>