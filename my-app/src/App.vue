<template>
  <v-app>
    <v-main>
    
      <TableData/>
   
    </v-main>
  </v-app>
</template>

<script>
//import FormTable from './components/FormTable.vue';
import TableData from './components/TableData.vue';

//import TableData from './components/TableData.vue';



export default {
  name: 'App',

  components: {
  //  FormTable,
    TableData
},

  data: () => ({
  }),
};
</script>
