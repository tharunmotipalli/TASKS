<template>
    <v-app>
      <h1>FORM</h1>
      <v-main>
      <v-form
      ref="form"
      v-model="valid"
        lazy-validation>
        
        <v-text-field
        label="Name"
        v-model="form.name"
        :counter="10"
        placeholder="enter name"
        :rules="form.nameRules"
        required
        >
        </v-text-field>
        <v-text-field
        v-model="form.age"
        :rules="form.ageRules"
        label="Age"
        type="number"
        placeholder="enter age"
        >
        </v-text-field>
        <v-autocomplete
        v-model="form.city"
        :items="form.items1"
        dense
        :rules="[v => !!v || 'Item is required']"
        label="City"
        placeholder="select city"
        required
      ></v-autocomplete>
      <v-text-field
        v-model="form.email"
        :rules="form.emailRules"
        label="E-mail"
        placeholder="enter email"
        required
      ></v-text-field>
      <v-radio-group
        column
        v-model="form.gender"
        label="Gender"
      >
        <v-radio
          label="Male"
          value="male"
        ></v-radio>
        <v-radio
          label="Female"
          value="female"
        ></v-radio>
      </v-radio-group>
      <v-text-field
      label="mobile_no"
      v-model="form.mobile"
      placeholder="enter mobile number"></v-text-field>
      <p>Hobbies or Interests</p>
      <v-select
            v-model="form.value"
            :items="form.items"
            :menu-props="{ maxHeight: '400' }"
            label="Select"
            multiple
            hint="Pick your favorite hobby"
            persistent-hint
          ></v-select>
          
          <v-checkbox
          v-model="form.languages"
            v-for="(option) in form.choice"
            :key="option.id"
            :label="option.name"
            :value="option.name"
            hint="Select the languages you know"
            required
          ></v-checkbox>
      <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
      </v-btn>
    </v-form>
    <v-dialog v-model="dialog" width="1000px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="red " dark v-bind="attrs" v-on="on">
                Pop UP
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                Form Data
            </v-card-title>

            <v-card-text>
                <v-data-table :headers="form.headers" :items="form.desserts" sort-by="name">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            New Item
                        </v-btn>
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="validate">
                            Reset
                        </v-btn>
                    </template>

                </v-data-table>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                    I accept
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-main>
  </v-app>
  </template>
  
  <script>
    export default {
      name:'SubmitForm',
      data:(()=>{
      return{
        valid: true,
        
       form:{
          
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        age:'',
        ageRules:[
          v =>!!v || 'Age is Required',
          v =>(v>0 && v<=100) || 'Age  must be between 0 and 100'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        city:'',
        select: null,
        items1: ['city1','city2','city3','city4'],
        choice: [
         {id :1,name:'English'},{id:2,name:'Telugu'},{id:3,name:'Tamil'},{id:4,name:'Hindi'}],
         languages:[],
        gender:'',
        checkbox: false,
      
        items:['fishing','cycling','jogging','reading','cooking'],
        value: [],
        mobile:'',
        headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Age', value: 'age' },
        { text: 'Gender', value: 'gender' },
        { text: 'email', value: 'email' },
        { text: 'mobile', value: 'mobile' },
        {text:'City',value:'city'},
        {text:'hobbies',value:'hobbies'},
        {text:'languages',value:'languages'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      }
      }
    }),
    methods: {
          validate () {
            this.$refs.form.validate()
                const arr = {
                name : this.form.name,
                age:this.form.age,
                city:this.form.city,
                email : this.form.email,
                gender :this.form.gender,
                mobile: this.form.mobile,
                value:this.form.value,
                languages:this.form.languages
              }
              this.desserts = [
          {
            name: this.form.name,
            age: this.form.age,
            gender:this.form.gender,
            email:this.form.email,
            mobile:this.form.mobile,
            city:this.form.city,
            hobbies:this.form.value ,
            languages:this.form.language,
        }
        ]
              console.log(JSON.stringify(arr))
      }
      
    }
  }
  </script>
  