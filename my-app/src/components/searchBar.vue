<template>
<div>
<h4>Search </h4>
<v-text-field type="text" v-model="searchInput" v-thousand="searchInput" @receive="directiveData($event)" placeholder="searchbar" v-on:keydown="search(searchInput)" bold></v-text-field> 

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
  async search(value){
    if(this.searchInput.length!=0){
  await setTimeout(() => {
    Vue.axios.post(this.searchLink,{value:value})
     .then((res)=>{
      this.$emit('searchdata',res)
     })
  }, 1000);
      
     
    }
    },
    directiveData(value){
      console.log(value)
    this.searchInput=value
    },
    }
}//child
</script>