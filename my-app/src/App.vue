<template>
  <v-app>
    <v-main>
     
      <FormTable/>
   
    </v-main>
  </v-app>
</template>

<script>
//import SubmitForm from './components/SubmitForm.vue';
import FormTable from './components/FormTable.vue'



export default {
  name: 'App',

  components: {
   // SubmitForm,
    FormTable,
  },

  data: () => ({
  }),
};
</script>
