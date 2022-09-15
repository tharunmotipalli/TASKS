<template>
<div>
<h4>Search </h4>
<v-text-field type="text" v-thousand v-model="searchInput" placeholder="searchbar" v-on:keydown="search(searchInput)" bold></v-text-field> 

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