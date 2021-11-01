<template>
  <div class="flex-fill d-flex flex-column">
    <div class="flex-fill">
      <div class="row g-0 h-100">
        <div class="col-4 bg-gray-lighter">
          <div class="d-flex bg-white">

          </div>
          <div class="p-4">

            <div class="btn-group mb-3" role="group">
              <label class="btn btn-outline-secondary px-4" :class="{active: operation == 'SELECT'}">
                Select <input type="radio" class="btn-check" name="btnOperation" value="SELECT" v-model="operation">
              </label>
              <label class="btn btn-outline-secondary px-4" :class="{active: operation == 'INSERT'}">
                Insert <input type="radio" class="btn-check" name="btnOperation" value="INSERT" v-model="operation">
              </label>
            </div>

            <div class="mb-3">
              <h5>Object:</h5>
              
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="CustomObject__c" v-model="object">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"></button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </div>
            </div>

            <div class="mb-3">
              <h5>Fields:</h5>
              <div class="mb-2">
                <small>
                  If you add multiple conditions, AND will be used.
                </small>
              </div>
              <div v-for="cond in this.fields" :key="cond.id" class="input-group mb-2">
                <input :value="cond.name" type="text" class="form-control" placeholder="Field API Name">
                <div class="dropdown">
                  <button class="btn btn-secondary rounded-0" type="button" data-bs-toggle="dropdown">
                    {{ this.operation == 'SELECT' ? cond.operator : '=' }}
                  </button>
                  <ul v-show="this.operation == 'SELECT'" class="dropdown-menu dropdown-menu-dark">
                    <li @click="changeFieldOperator(cond.id,'No filter')"><a class="dropdown-item" :class="{ active: cond.operator == 'No filter' }" href="#">No filter</a></li>
                    <li @click="changeFieldOperator(cond.id,'=')"><a class="dropdown-item" :class="{ active: cond.operator == '=' }" href="#"><span class="pe-3">=</span> Equals to</a></li>
                    <li @click="changeFieldOperator(cond.id,'!=')"><a class="dropdown-item" :class="{ active: cond.operator == '!=' }" href="#"><span class="pe-3">!=</span> Not equals to</a></li>
                    <li @click="changeFieldOperator(cond.id,'<')"><a class="dropdown-item" :class="{ active: cond.operator == '<' }" href="#"><span class="pe-3">&lt;</span> Less than</a></li>
                    <li @click="changeFieldOperator(cond.id,'>')"><a class="dropdown-item" :class="{ active: cond.operator == '>' }" href="#"><span class="pe-3">&gt;</span> Greather than</a></li>
                    <li @click="changeFieldOperator(cond.id,'<=')"><a class="dropdown-item" :class="{ active: cond.operator == '<=' }" href="#"><span class="pe-3">&lt;=</span> Less than or equals to</a></li>
                    <li @click="changeFieldOperator(cond.id,'>=')"><a class="dropdown-item" :class="{ active: cond.operator == '>=' }" href="#"><span class="pe-3">&gt;=</span> Greather than or equals to</a></li>
                  </ul>
                </div>
                <input :disabled="this.operation == 'SELECT' && cond.operator == 'No filter'" type="text" class="form-control" placeholder="">
                <button @click="removeField(cond.id)" type="button" class="btn btn-danger">X</button>
              </div>
              <div class="d-flex justify-content-end">
                <button @click="addField" class="btn btn-secondary">Add New Field</button>
              </div>
            </div>
            
            <div class="mb-3">
              <div class="mb-3">
                <div class="d-flex mb-2" v-for="alert in this.alerts" :key="alert.id">
                  <span class="material-icons me-2" style="color:red;">{{ alert.icon }}</span>
                  <span>{{ alert.text }}</span>
                </div>
              </div>
              <button class="btn btn-primary w-100">Run</button>
            </div>

          </div>
        </div>
        <div class="col-8" style="overflow:auto;">

          <div>
            <div class="w-100 h-100 p-1 h1">Hey!</div>
          </div>
        
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { Vue } from 'vue'
import { v4 as uuid } from 'uuid';
export default {
  props: {

  },
  data() {
    return {
      alerts: [
        {
          id: uuid(),
          icon: 'warning',
          text: 'ID cannot be empty.'
        },
        {
          id: uuid(),
          icon: 'error',
          text: 'ID cannot be empty.'
        }
      ],
      operation: 'SELECT',
      object: '',
      fields: [
        {
          id: uuid(),
          name: 'ID',
          operator: 'No filter',
          value: ''
        },
        {
          id: uuid(),
          name: 'Field__c',
          operator: '=',
          value: '1234'
        },
        {
          id: uuid(),
          name: 'Field2__c',
          operator: '<',
          value: '5'
        }
      ]
    };
  },
  methods: {
    changeFieldOperator(id, newOperator){

   //  let fields = this.fields; 

      let objIndex = this.fields.findIndex((obj => obj.id == id));
     // let obj2 = this.fields[objIndex];
      this.fields[objIndex].operator = newOperator;

      this.fields.splice(objIndex, 1, this.fields[objIndex]);

    },
    removeField(id){
      this.fields = this.fields.filter(function(obj) {
        return obj.id !== id;
      });
    },
    addField(){
      this.fields.push({
        id: uuid(),
        name: '',
        operator: '=',
        value: ''
      });
    }
  },
  computed: {
    
  }
};
</script>

<style scoped>

</style>