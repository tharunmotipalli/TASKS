<template>
    <v-data-table
      :headers="headers"
      :items="details"
      sort-by="age"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Table Details</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                POPUP
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                    <v-form
                    ref="form"
                    v-model="valid"
                      lazy-validation>
                  
                      <v-text-field
                        v-model="editedItem.name"
                        label="name"
                        placeholder="enter name"

                      ></v-text-field>
                    
                      <v-text-field
                        v-model="editedItem.age"
                        label="age"
                        type="number"
                      ></v-text-field>
                    
                    
                      <v-radio-group
                      column
                      v-model="editedItem.gender"
                       label="Gender">
                       <v-radio
                       label="Male"
                       value="male"
                       ></v-radio>
                       <v-radio
                       label="Female"
                       value="female"
                       ></v-radio>
                    </v-radio-group>
                   
                    <v-autocomplete
                    v-model="editedItem.city"
                    :items="editedItem.items"
                    dense
                    :rules="[v => !!v || 'Item is required']"
                    label="City"
                    placeholder="select city"
                    required
                  ></v-autocomplete>
                   
                      <v-text-field
                        v-model="editedItem.email"
                        :rules="[ 
                            v => !!v || 'E-mail is required',
                            v => /.+@.+\..+/.test(v)  || 'E-mail must be valid']"
                        label="email"
                      ></v-text-field>
                      <v-select
                       v-model="editedItem.Hobbies"
                       :items="editedItem.list"
                       label="Select"
                         multiple
                         hint="Pick your favorite hobby"
                         persistent-hint
                         ></v-select>
                         <v-text-field
                        v-model="editedItem.mobile"
                        :rules="[ 
                            v => !!v || 'mobile no  is required',
                            v => (/[0-9]/.test(v)) || 'mobile number must be valid',
                            v =>v && v.length==10|| 'mobile no must be of size 10']" 
                        label="mobile no"
                      ></v-text-field>
                      <v-checkbox
          v-model="editedItem.languages"
            v-for="(option) in editedItem.choice"
            :key="option.id"
            :label="option.name"
            :value="option.name"
            hint="Select the languages you know"
            required
          ></v-checkbox>
                    </v-form>
                    
                  
                      
                 
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="red"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>//eslint-disable-next-line
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'age', value: 'age' },
          { text: 'gender', value: 'gender' },
          { text: 'city', value: 'city' },
          { text: 'email', value: 'email' },
          {text:'Hobbies',value:'Hobbies'},
          {text:'Mobile',value:'mobile'},
          {text:'Languages',value:'languages'},
          { text: 'actions', value: 'actions', sortable: false },
        ],
        details: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          age: 0,
          gender: '',
          city: 0,
          email: '',
          items:['city1','city2','city3','city4'],
          list:['fishing','cooking','reading'],
          Hobbies:[],
          mobile:'',
          choice: [
         {id :1,name:'English'},{id:2,name:'Telugu'},{id:3,name:'Tamil'},{id:4,name:'Hindi'}],
         languages:[],
        },
        defaultItem: {
          name: '',
          age: 0,
          gender:'',
          city: '',
          email: '',
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()
      },
  
      methods: {
        initialize () {
          this.details = [
            {
              name: 'tharun',
              age: 12,
              gender: 'male',
              city: 'city1',
              email: 'motipallitharun@gmail.com',
              Hobbies:['fishing','reading'],
              languages:['English'],
              mobile:8886296465
            },
            {
              name: 'kalyan',
              age: 14,
              gender: 'male',
              city: 'city2',
              email: 'kalyan@gmail.com',
              Hobbies:['reading'],
              languages:['English'],
              mobile:9441600861
            },
            
          ]
        },
  
        editItem (item) {
          this.editedIndex = this.details.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.details.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.details.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
            this.$refs.form.validate()
          if (this.editedIndex > -1) {
            Object.assign(this.details[this.editedIndex], this.editedItem)
          } else {
            
            this.details.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>