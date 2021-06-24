<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
        <span>
            <label for="name">Name : </label>
            <input type="text" v-model="name" autocomplete="off">
        </span>
        <br>
        <br>
        <label for="name">Email : </label>
        <input type="text" v-model="email" autocomplete="off">
        <br>
        <br>
        <input v-if="!isEditable" class="btn btn-primary" type="button" @click="submitName()" value="submit">
        <input v-else class="btn btn-primary" type="button" @click="submitNewName()" value="update">
    </div>
    <br>
    <div class="content">
        <div  v-for=" (name,index) in result" :key="index" >
            <div class="show-data">
                <div> <label>Name</label> <strong>{{name.name}}</strong></div>
                <div> <label>Email</label> <strong>{{name.email}}</strong></div>
            </div>
            <div class="option">
                <div @click="updateName(index)" class="btn btn-info">Edit</div>
                <div class="btn btn-danger">Delete</div>
            </div>
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
        key:'',
        isEditable:false,
    }
  },
  methods:{
        submitName(){
            let dbRef = database.ref('names');
            dbRef.push({ name:this.name, email:this.email })
            .then(()=>{
                //console.log(dbRef.toString());
                this.getResult();
            })
        },
        getResult(){
            //   axios.get('https://vue-firebase-crud-b4226-default-rtdb.firebaseio.com/names.json')
            //   .then(response=>{
            //       this.result = response.data
            //   })
            database.ref('names').on( 'value',(snapshot)=>{
                this.result = snapshot.val();
                //console.log(Object.getOwnPropertyNames(snapshot.val()).length);
            })
        },
        submitNewName(){
            database.ref('names/'+this.key).set({name:this.name,email:this.email})
            .then(()=>{
                this.name = ""
                this.email = ""
                this.isEditable = false;
                this.getResult();
            })
            
        },
        updateName(key){
            this.isEditable = true;
            this.key = key;
        }
  }
};
</script>

<style scoped lang="scss">
.home{
    margin-top: 15px;
    & > div{
        margin: auto;
        width: 50%;
        text-align: center;
    }
    img{
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: 100px;
    }
    .content{
        & > div{
            border-bottom: 1px solid #ededed;
            display: flex;
            justify-content: center;
            padding: 20px;
            .show-data{
                width: 350px;
                text-align: left;
                & > div{
                    label{
                        width: 60px;
                        display: inline-flex;
                    }
                }
            }
            .option{
                display: flex;
                align-items: center;
                & > div{
                    padding: 10px;
                }
            }
        }
    }
    .btn{
        padding: 6px 12px !important;
        border: none;
        color: #FFFFFF;
        border-radius: 3px;
        margin: 5px;
        font-size: 14px;
        
    }
    .btn-primary{
        background: #089254f0;
        &:hover{
            background: #0da05ef0;
            cursor: pointer;
        }
    }
    .btn-danger{
        background: #c20912f0;
        &:hover{
            background: #e71010f0;
            cursor: pointer;
        }
    }
    .btn-info{
        background: #208dccf0;
        &:hover{
            background: #1d9be4f0;
            cursor: pointer;
        }
    }
}

</style>