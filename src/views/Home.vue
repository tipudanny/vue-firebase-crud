<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
        <label for="name">Name : </label>
        <input type="text" v-model="name" autocomplete="off">
        <br>
        <br>
        <label for="name">Email : </label>
        <input type="text" v-model="email" autocomplete="off">
        <br>
        <br>
        <input type="button" @click="submitName()" value="submit">
    </div>
    <br>
    <div>
        <div  v-for=" (name,index) in result" :key="index">
            <div> Name: <strong>{{name.name}}</strong></div>
            <div> Email: <strong>{{name.email}}</strong></div>
            <br>
        </div>
    </div>
  </div>
</template>

<script>
import {database} from './../firebase';
import axios from 'axios';
export default {
  name: "Home",
  mounted(){
      this.getResult();
  },
  data(){
    return{
        name:'',
        email:'',
        result:[],
    }
  },
  methods:{
      submitName(){
          let dbRef = database.ref('names');
          dbRef.push({ name:this.name, email:this.email })
          .then(()=>{
              console.log(dbRef.toString());
              this.getResult();
          })
      },
      getResult(){
          axios.get('https://vue-firebase-crud-b4226-default-rtdb.firebaseio.com/names.json')
          .then(response=>{
              this.result = response.data
          })
      }
  }
};
</script>
