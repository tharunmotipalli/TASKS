<template>
    <div>
<h1>parent</h1>
<searchBar :searchLink="'http://127.0.0.1:3333/search'" @searchdata="inputChanged($event)"></searchBar>
<input type="search"  placeholder="search" v-model="searchInput" v-on:keydown="search(searchInput)">
<v-simple-table fixed-header>

    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Age</th>
        <th class="text-left">Gender</th>
        <th class="text-left">Mobile</th>
        <th class="text-left">E-mail</th>
        <th class="text-left">Edit</th>
        <th class="text-left">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list" v-bind:key="item.id" >
        <td>{{ item.name | trim-text}}
        </td>
        <td>{{ item.age | trim-text}}</td>
        <td>{{ item.gender}}</td>
        <td>{{ item.mobile | trim-text}}</td>
        <td>{{ item.email | trim-text}}</td>
        <td>
            <v-btn color="red" class="mr-2" @click="editItem(item)">edit
              <v-icon small class="mr-2">
                mdi-pencil
              </v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn color="green" class="mr-2"  @click="deleteItem(item.id)">delete
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
          </td>
    </tr>
      </tbody>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Table Details</v-toolbar-title>
          <v-divider inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" dark v-bind="attrs"  @click="popup" v-on="on">
                POPUP
              </v-btn>
            </template>
            <v-card>
                <v-card-text>
                   <v-container>
                    <v-form
                    ref="form">
                        <v-text-field  label="name" v-model='name' placeholder="enter name" :rules="[
                            v => !!v || 'Name is required',
                        
                          ]"></v-text-field>
                          <v-text-field  label="age"  v-model="age" type="number" :rules="[
                            v =>!!v || 'Age is Required',
                            v =>(v>0 && v<=100) || 'Age  must be between 0 and 100'
                          ]"></v-text-field>
                          <v-radio-group  v-model='gender' column :rules="[ 
                            v => !!v || 'Gender is required']" label="Gender"
                          >
                            <v-radio label="Male" value="male"></v-radio>
                            <v-radio label="Female" value="female"></v-radio>
                          </v-radio-group>
                          <v-text-field  v-model='email' :rules="[ 
                          v => !!v || 'E-mail is required',
                          v => /.+@.+\..+/.test(v)  || 'E-mail must be valid']" label="email"></v-text-field>
                          <v-text-field v-model='mobile' :rules="[ 
                          v => !!v || 'mobile no  is required',
                        
                          ]" :counter="10" label="mobile no">
                          </v-text-field>
                    </v-form>
                   </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="cancel" text>
                      Cancel
                    </v-btn>
                    <v-btn color="red" v-model="saveb" @click='insert' v-if="rand" >
                      Save
                    </v-btn>
                    <v-btn color="red" v-model="editb" @click='edit(list.id)' v-if="!rand">
                        edit
                      </v-btn>
                  </v-card-actions>

            </v-card>
            </v-dialog>
        
        </v-toolbar></template>   
      
      
</v-simple-table>   

</div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
var test;
Vue.use(VueAxios, axios)
export default{
name:'TableData',

data(){
return{
    list:[],
    dialog:false,
    tempObj:{},
    editedIndex:-1,
   name:'', 
   age:'',
   gender:'',
   email:'',
   mobile:'',
   saveb:true,
   editb:false,
   key:0,
   rand:true,
   searchitem:undefined,
   input:'',
   searchInput:'',
   
}
},
mounted(){
    Vue.axios.get(`http://127.0.0.1:3333/`)
    .then((response)=>{
        console.log(response)
        this.list=(response.data)
        console.warn(response.data.data)
    })
},
methods:
{
   async getdata(){
   await Vue.axios.get(`http://127.0.0.1:3333/`)
    .then((response)=>{
        console.log(response)
        this.list=(response.data)
        console.warn(response.data.data)
    })
},
async insert(){
  
  this.$refs.form.validate()
  await  Vue.axios.post(`http://127.0.0.1:3333/`,{
   name:this.name, 
   age:this.age,
   gender:this.gender,
   email:this.email,
   mobile:this.mobile,
})
     .then(function (response) {
    console.log(response);
    
  })
  .catch(function (error) {
    console.log(error);
 });
 this.$refs.form.reset()
 this.getdata()
 this.dialog=false

},
cancel(){
    this.dialog=false
},
popup(){
  this.rand=true
},
async deleteItem(id) {
       await axios.delete(`http://127.0.0.1:3333/${id}`)
             .then(response => {
                 console.log(response);
             });
            this.getdata()
    },
  editItem(item){
    this.rand=false
     test=item
        this.name = item.name
        this.age=item.age
        this.gender=item.gender
        this.email=item.email
        this.mobile=item.mobile
        this.dialog=true
        this.saveb=false
        
  },


async edit(){
    test.name=this.name
    test.age=this.age
    test.gender=this.gender
    test.email=this.email
    test.mobile=this.mobile
    await axios.put(`http://127.0.0.1:3333/${test.id}`,{
        name:test.name,
        age:test.age,
        gender:test.gender,
        email:test.email,
        mobile:test.mobile
    })
        .then(response => {
                 console.log(response);
             });
             console.log(test.name)
             this.$refs.form.reset()
             this.getdata()
             this.dialog=false
             
    },
    inputChanged(value){
      console.log(value)
      this.list=value.data
    },
    search(){
      if(this.searchInput.length!=0){
      Vue.axios.post('http://127.0.0.1:3333/search',{value:this.searchInput})
     .then((res)=>{
      this.list=res.data
     })
    }
  }
  
   
  }


}
</script>