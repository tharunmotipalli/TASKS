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
    <v-btn
    :disabled="!valid"
    color="success"
    class="mr-4"
    @click="validate"
  >
    Validate
    </v-btn>
  </v-form>
</v-main>
</v-app>
  
  
</template>

<script>
  export default {
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
      items1: ['city 1','city 2','city 3','city 4'
      
      ],
      gender:'',
      checkbox: false,
    
      items:['fishing','cycling','jogging','reading','cooking'],
      value: [],
      mobile:'',
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
              value:this.form.value
            }
            console.log(JSON.stringify(arr))
    },
  }
}
</script>
