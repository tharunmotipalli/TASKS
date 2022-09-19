<template>
<div>
<h4>Search </h4>
<v-text-field type="text" v-model="searchItem" v-thousand="searchItem"  placeholder="searchbar" @keydown="inputChanged" bold></v-text-field> 

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
            searchItem:'',
            list:undefined,

        }
    },
    methods:{
        inputChanged:function(){
            if( this.searchItem.length!=0){
            this.$emit('searchItem', this.searchItem)
            }
        },
  async search(value){
    if(this.searchItem.length!=0){
  await setTimeout(() => {
    Vue.axios.post(this.searchLink,{value:value})
     .then((res)=>{
      this.$emit('searchdata',res)
     })
  }, 1000);
      
     
    }
    },
   
    }
}//child
</script>