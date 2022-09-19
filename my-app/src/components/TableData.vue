<template>
  <div>
    <searchBar @searchItem="inputValue($event)" ></searchBar>
  
    <v-simple-table fixed-header>

      <thead>
        <tr>
          <th class="text-left">Name <v-icon @click="iconchange('name')" small class="mr-2">
               {{icon}}
            </v-icon>
          </th>
          <th class="text-left">Age <v-icon  @click="iconchange('age')" small class="mr-2">
             {{icon}}
            </v-icon>
          </th>
          <th class="text-left">Gender <v-icon  @click="iconchange('gender')" small class="mr-2">
              {{icon}}
            </v-icon>
          </th>
          <th class="text-left">Mobile <v-icon  @click="iconchange('mobile')" small class="mr-2">
           {{icon}}
            </v-icon>
          </th>
          <th class="text-left">E-mail <v-icon @click="iconchange('email')" small class="mr-2">
               {{icon}}
            </v-icon>
          </th>
          <th class="text-left">Edit</th>
          <th class="text-left">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" v-bind:key="item.id">
          <td>{{ item.name | trim-text}}

          </td>
          <td>{{ item.age | trim-text}}</td>
          <td>{{ item.gender}}</td>
          <td>{{ item.mobile | trim-text}}</td>
          <td>{{ item.email | trim-text}}</td>
          <td>
            <v-btn color="red" class="mr-2" @click="editItem(item)">edit
              <v-icon  small class="mr-2">
                mdi-pencil
              </v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn color="green" class="mr-2" @click="deleteItem(item)">delete
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
              <v-btn color="red" dark v-bind="attrs" @click="popup" v-on="on">
                POPUP
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-form ref="form">
                    <v-text-field label="name" v-model='formData.name' placeholder="enter name" :rules="[
                      v => !!v || 'Name is required',
                                            
                    ]"></v-text-field>
                    <v-text-field label="age" v-model="formData.age" type="number" :rules="[
                      v =>!!v || 'Age is Required',
                      v =>(v>0 && v<=100) || 'Age  must be between 0 and 100'
                    ]"></v-text-field>
                    <v-radio-group v-model='formData.gender' column :rules="[ 
                    v => !!v || 'Gender is required']" label="Gender">
                      <v-radio label="Male" value="male"></v-radio>
                      <v-radio label="Female" value="female"></v-radio>
                    </v-radio-group>
                    <v-text-field v-model='formData.email' :rules="[ 
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v)  || 'E-mail must be valid']" label="email"></v-text-field>
                    <v-text-field v-model='formData.mobile' :rules="[ 
                    v => !!v || 'mobile no  is required',
                                            
                    ]" label="mobile no">
                    </v-text-field>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" @click="cancel" text>
                  Cancel
                </v-btn>
                <v-btn color="red" v-model="saveb" @click='insert' v-if="rand">
                  Save
                </v-btn>
                <v-btn color="red" v-model="editb" @click='edit(list.id)' v-if="!rand">
                  edit
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>


    </v-simple-table>

  </div>
</template>
<script>
import API from '../services/api'
var test;
export default {
  name: 'TableData',

  data() {
    return {
      list: [],
      dialog: false,
      tempObj: {},
      editedIndex: -1,
      formData: {
        id: '',
        name: '',
        age: '',
        gender: '',
        email: '',
        mobile: '',
      },
      saveb: true,
      editb: false,
      key: 0,
      rand: true,
      searchitem: undefined,
      input: '',
      searchInput: '',
      option:'',
      icon:'mdi-arrow-up',
      VUE_APP_READ_DATA: process.env.VUE_APP_READ_DATA,

    }
  },
  mounted() {
    this.getdata()
    console.warn(this.VUE_APP_READ_DATA)
  },
  methods:
  {
    async getdata() {
      await API.get(`${this.VUE_APP_READ_DATA}/read`)
        .then((response) => {
          console.warn(response)
          this.list = (response.data)
          console.warn(response.data.data)
        })
    },
    async insert() {

      this.$refs.form.validate()
      await API.post(`${this.VUE_APP_READ_DATA}/insert`, this.formData

      )
        .then((response)=> {
          console.log(response);

        })
        .catch(function (error) {
          console.log(error);
        });
      this.$refs.form.reset()
      this.getdata()
      this.dialog = false

    },
    cancel() {
      this.dialog = false
    },
    popup() {
      this.rand = true
    },
    async deleteItem(item) {
      this.formData = Object.assign({}, item)
      await API.delete(`${this.VUE_APP_READ_DATA}/delete/${this.formData.id}`)
        .then(response => {
          console.log(response);
        });
      this.getdata()
    },
    editItem(item) {
      test = item
      this.rand = false
      this.editedIndex = this.list.indexOf(item)
      this.formData = Object.assign({}, item)
      this.dialog = true
      this.saveb = false

    },


    async edit() {
      await API.put(`${this.VUE_APP_READ_DATA}/update/${this.formData.id}`,
        this.formData
      )
        .then(response => {
          console.log(response);
        });
      console.log(test.name)
      this.$refs.form.reset()
      this.getdata()
      this.dialog = false

    },
   
  async inputValue(input){
    this.searchInput=input
       let searchpromise=await API.post(`${this.VUE_APP_READ_DATA}/search`,{value:this.searchInput})
      this.list=searchpromise.data

    },
    
    sortasc(value){
      API.post(`${this.VUE_APP_READ_DATA}/sortasc`,{sortItem:value})
      .then((res) => {
            this.list = res.data
      })
      
    },
    sortdesc(value){
      API.post(`${this.VUE_APP_READ_DATA}/sortdesc`,{sortItem:value})
      .then((res) => {
            this.list = res.data
      })
},
iconchange(value)
{
  if(this.icon=='mdi-arrow-down'){
    this.icon='mdi-arrow-up'
    this.sortasc(value)
    
  }else if(this.icon=='mdi-arrow-up'){
    this.sortdesc(value)
    this.icon='mdi-arrow-down'
  }
}
}
}

</script>