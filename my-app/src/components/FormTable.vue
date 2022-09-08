<template>
  <v-simple-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Age</th>

        <th class="text-left">Gender</th>
        <th class="text-left">Mobile</th>
        <th class="text-left">E-mail</th>
        <th class="text-left">City</th>
        <th class="text-left">Interests</th>
        <th class="txtt-left">Languages</th>
        <th class="text-left">Edit</th>
        <th class="text-left">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in details" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.gender}}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.mobile }}</td>
        <td>{{ item.email }}</td>
        <td >{{ item.Hobbies }}</td>
        <td>{{ item.languages }}</td>
        <td>
          <v-btn color="red" class="mr-2" @click="editItem(item)">edit
            <v-icon small class="mr-2">
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
            <v-btn color="red" dark v-bind="attrs" v-on="on">
              POPUP
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span>{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>

                  <v-text-field v-model="editedItem.name" label="name" placeholder="enter name" :rules="[
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                  ]"></v-text-field>

                  <v-text-field v-model="editedItem.age" label="age" type="number" :rules="[
                    v =>!!v || 'Age is Required',
                    v =>(v>0 && v<=100) || 'Age  must be between 0 and 100'
                  ]"></v-text-field>
                  <v-radio-group column v-model="editedItem.gender" label="Gender">
                    <v-radio label="Male" value="male"></v-radio>
                    <v-radio label="Female" value="female"></v-radio>
                  </v-radio-group>

                  <v-autocomplete v-model="editedItem.city" :items="editedItem.items" dense
                    :rules="[v => !!v || 'Item is required']" label="City" placeholder="select city" required>
                  </v-autocomplete>

                  <v-text-field v-model="editedItem.email" :rules="[ 
                  v => !!v || 'E-mail is required',
                  v => /.+@.+\..+/.test(v)  || 'E-mail must be valid']" label="email"></v-text-field>
                  <v-select v-model="editedItem.Hobbies" :items="editedItem.list" label="Select" multiple
                    hint="Pick your favorite hobby" persistent-hint></v-select>
                  <v-text-field v-model="editedItem.mobile" :rules="[ 
                  v => !!v || 'mobile no  is required',
                  v => (/[0-9]/.test(v)) || 'mobile number must be valid',
                  v =>v && v.length==10|| 'mobile no must be of size 10']" :counter="10" label="mobile no">
                  </v-text-field>
                  <p>Select Languages</p>
                  <v-checkbox v-model="editedItem.languages" v-for="(option) in editedItem.choice" :key="option.id"
                    :label="option.name" :value="option.name" hint="Select the languages you know" required>
                  </v-checkbox>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="red" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="Dialogfill" max-width="500px">
          <v-card>
            <v-card-title>please fill all the fields correctly</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="fillclose">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    Dialogfill:false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Age', value: 'age' },
      { text: 'Gender', value: 'gender' },
      { text: 'City', value: 'city' },
      { text: 'Email', value: 'email' },
      { text: 'Hobbies', value: 'Hobbies' },
      { text: 'Mobile', value: 'mobile' },
      { text: 'Languages', value: 'languages' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    details: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      age: '',
      gender: '',
      city: 0,
      email: '',
      items: ['city1', 'city2', 'city3', 'city4'],
      list: ['fishing', 'cooking', 'reading', 'jogging'],
      Hobbies:[],
      mobile: '',
      choice: [
        { id: 1, name: 'English' }, { id: 2, name: 'Telugu' }, { id: 3, name: 'Tamil' }, { id: 4, name: 'Hindi' }],
      languages: [],
    },
    defaultItem: {
      name: '',
      age: '',
      gender: '',
      city: '',
      email: '',
      items: ['city1', 'city2', 'city3', 'city4'],
      list: ['fishing', 'cooking', 'reading', 'jogging'],
      mobile: '',
      choice: [
        { id: 1, name: 'English' }, { id: 2, name: 'Telugu' }, { id: 3, name: 'Tamil' }, { id: 4, name: 'Hindi' }],
      languages: [],

    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Entry' : 'Edit Details'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.details.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.details.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.details.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {

      if (this.editedIndex > -1) {

        Object.assign(this.details[this.editedIndex], this.editedItem)
      } else if (this.$refs.form.validate()) {

        this.details.push(this.editedItem)
      }else{
        this.Dialogfill=true
      }
      this.$refs.form.resetValidation()
      this.close()

    },
    fillclose(){
      this.Dialogfill=false
      this.dialog=true
    }
  },
}
</script>