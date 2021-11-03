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
                Select <input type="radio" class="btn-check" name="btnOperation" value="SELECT" v-model="operation" @change="updateAlerts">
              </label>
              <label class="btn btn-outline-secondary px-4" :class="{active: operation == 'INSERT'}">
                Insert <input type="radio" class="btn-check" name="btnOperation" value="INSERT" v-model="operation" @change="updateAlerts">
              </label>
            </div>

            <div class="mb-3">
              <h5>Object:</h5>
              
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="CustomObject__c" v-model.trim="object" @input="updateAlerts">
                <button v-if="false" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"></button>
                <ul v-if="false" class="dropdown-menu dropdown-menu-end w-100">
                  <li><a class="dropdown-item" href="#">Action</a></li>
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
                <input @input="changeField(cond.id,'name',$event.target.value)" :value="cond.name" type="text" class="form-control" placeholder="Field API Name">
                <div class="dropdown">
                  <button class="btn btn-secondary rounded-0" type="button" data-bs-toggle="dropdown">
                    {{ this.operation == 'SELECT' ? cond.operator : '=' }}
                  </button>
                  <ul v-show="this.operation == 'SELECT'" class="dropdown-menu dropdown-menu-dark">
                    <li @click="changeField(cond.id,'operator','No filter')"><a class="dropdown-item" :class="{ active: cond.operator == 'No filter' }" href="#">No filter</a></li>
                    <li @click="changeField(cond.id,'operator','=')"><a class="dropdown-item" :class="{ active: cond.operator == '=' }" href="#"><span class="pe-3">=</span> Equals to</a></li>
                    <li @click="changeField(cond.id,'operator','!=')"><a class="dropdown-item" :class="{ active: cond.operator == '!=' }" href="#"><span class="pe-3">!=</span> Not equals to</a></li>
                    <li @click="changeField(cond.id,'operator','<')"><a class="dropdown-item" :class="{ active: cond.operator == '<' }" href="#"><span class="pe-3">&lt;</span> Less than</a></li>
                    <li @click="changeField(cond.id,'operator','>')"><a class="dropdown-item" :class="{ active: cond.operator == '>' }" href="#"><span class="pe-3">&gt;</span> Greather than</a></li>
                    <li @click="changeField(cond.id,'operator','<=')"><a class="dropdown-item" :class="{ active: cond.operator == '<=' }" href="#"><span class="pe-3">&lt;=</span> Less than or equals to</a></li>
                    <li @click="changeField(cond.id,'operator','>=')"><a class="dropdown-item" :class="{ active: cond.operator == '>=' }" href="#"><span class="pe-3">&gt;=</span> Greather than or equals to</a></li>
                  </ul>
                </div>
                <input @input="changeField(cond.id,'value',$event.target.value)" :value="cond.value" :disabled="this.operation == 'SELECT' && cond.operator == 'No filter'" type="text" class="form-control" placeholder="">
                <button @click="removeField(cond.id)" type="button" class="btn btn-danger">X</button>
              </div>
              <div class="d-flex justify-content-end">
                <button @click="addField" class="btn btn-secondary">Add New Field</button>
              </div>
            </div>
            
            <div class="mb-3">
              <div class="mb-3">
                <div class="d-flex mb-2" v-for="alert in this.alerts" :key="alert.id">
                  <span class="material-icons me-2" style="color:gray;">error</span>
                  <span>{{ alert.text }}</span>
                </div>
              </div>
              <button @click="runCode" :disabled="this.alerts.length > 0 || this.loading" class="btn btn-primary w-100">
                <div v-if="this.loading" class="d-flex align-items-center">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  <span>Running</span>
                </div>
                <div v-if="!this.loading">Run</div>
              </button>
            </div>

            <div class="mb-3 bg-gray card-body card" style="white-space: pre-wrap;">{{ this.getAmpscript }}</div>

          </div>
        </div>
        <div class="col-8 p-3" style="overflow:auto;">
          <div class="card table-responsive">
            <table v-if="this.result.length > 0" class="table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th v-for="(cell,cellIndex) in this.fields" :key="cellIndex">{{ cell.name }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in this.result" :key="rowIndex">
                  <th scope="row">{{ rowIndex+1 }}</th>
                  <td v-for="(cell,cellIndex) in row" :key="cellIndex" class="text-nowrap">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="this.result.length == 0 && this.error == null && this.loading == false" class="text-center card-body">Nothing to see here.</div>
            <div v-if="this.error != null" class="card-body text-wrap">
              <h3>😥 Error</h3>
              <p>{{ this.error.message }}</p>
              <hr>
              <p style="white-space: pre-line;">{{ this.error.description }}</p>
            </div>
            <div v-if="this.loading">
              <div class="d-flex align-items-center m-3">
                <div class="spinner-border text-primary me-3" role="status"></div>
                <div>Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { v4 as uuid } from 'uuid';
import shared from '@/shared.js'
export default {
  props: {

  },
  data() {
    return {
      alerts: [],
      operation: 'SELECT',
      object: 'Contact',
      fields: [{"id":"6e6f38ea-934e-4f5f-93f9-d1b65074141f","name":"ID","operator":"=","value":"0035a00002m3c3ZAAQ"}],
      result: [],
      loading: false,
      error: null
    };
  },
  mounted(){
    this.updateAlerts();
  },
  methods: {
    getFields(){
      let fields = '';
      this.fields.forEach(e => fields += ',' + e.name);
      fields = fields.substring(1);
      return fields;
    },
    updateAlerts(){
      let newAlerts = [];

      // Object name missing
      if (this.object == '') {
        newAlerts.push({
          id: uuid(),
          text: 'The object name is missing.'
        })
      }
      // Field or condition without name
      if (this.fields.some(e => e.name.trim() === '')) {
        newAlerts.push({
          id: uuid(),
          text: 'There is a field with no name. Add one or remove the field.'
        })
      }
      if (this.operation == 'SELECT'){
        // ID Field missing
        if (!this.fields.some(e => e.name.toLowerCase() == 'id' )) {
          newAlerts.push({
            id: uuid(),
            text: 'The "ID" field needs to be added.'
          })
        }
        // Some filter is missing
        if (!this.fields.some(e => e.operator != 'No filter')) {
          newAlerts.push({
            id: uuid(),
            text: 'There is no filter, you must create one.'
          })
        }
        // Field condition without value
        if (this.fields.some(e => e.operator != 'No filter' && e.value == '' )) {
          newAlerts.push({
            id: uuid(),
            text: 'There is a field with no value. Add one or remove the filter.'
          })
        }
      }
      if (this.operation == 'INSERT'){
        //  
        if (this.fields.length == 0) {
          newAlerts.push({
            id: uuid(),
            text: 'It is necessary to add some field.'
          })
        }
        // Field condition without value
        if (this.fields.some(e => e.value == '' )) {
          newAlerts.push({
            id: uuid(),
            text: 'There is a field with no value. Add one or remove the filter.'
          })
        }
      }

      this.alerts = newAlerts;
    },
    changeField(id, field, value){

      let objIndex = this.fields.findIndex((obj => obj.id == id));
      this.fields[objIndex][field] = value;

      this.fields.splice(objIndex, 1, this.fields[objIndex]);
      this.updateAlerts();
    },
    removeField(id){
      this.fields = this.fields.filter(function(obj) {
        return obj.id !== id;
      });
      this.updateAlerts();
    },
    addField(){
      this.fields.push({
        id: uuid(),
        name: '',
        operator: '=',
        value: ''
      });
      this.updateAlerts();
    },
    async runCode(){

      this.error = null;
      this.loading = true;
      
      let data = {
        action: 'run-code',
        executionId: uuid(),
        code: this.getAmpscript,
        timming: true,
        logs: false
      }
      shared.code.executeCode(data)
      .then((result) => {
        if (result.status == 'ok'){
          this.result = JSON.parse(result.result);
        } else {
          this.result = [];
          this.error = result.error;
        }
        console.log('Resultado', result);
        this.loading = false;
      })
      .catch(error => {
        this.error = error;
        this.loading = false;
      })

    },
  },
  computed: {
   
    getAmpscript(){
      let code = '';
      
      if (this.operation == 'SELECT'){
        
        code += '<'+'script runat=\'server\'>';
        code += 'var result = [];';
        code += '</'+'script>';
        code += '%%[';
        
        code += 'set @sf = RetrieveSalesforceObjects(';
        code += '"' + this.object + '",';
        code += '"' + this.getFields() + '"';
        this.fields.filter(r => { return r.operator != 'No filter'; }).forEach(e => {
          code += ',"' + e.name + '"';
          code += ',"' + e.operator + '"';
          code += ',"' + e.value + '"';
        });
        code += ') ';

        code += 'set @sfCount = RowCount(@sf) ';
        code += 'if @sfCount > 0 then ';
        code += 'for @i = 1 to @sfCount do ';
        code += 'set @sfRow= Row(@sf, @i) ';

        this.fields.forEach(e => {
          code += 'set @sfField_'+e.name+' = Field(@sfRow, "'+e.name+'") ';
        });

        code += ']%%';
        code += '<script runat=\'server\'>';
        code += 'result.push({';

        this.fields.forEach(e => {
          code += e.name+': Variable.GetValue("@sfField_'+e.name+'"),';
        });
        code = code.substring(0, code.length - 1);

        code += '})';
        code += '</'+'script>';
        code += '%%[ next @i endif ]%%';
        code += '<'+'script runat=\'server\'>';
        code += 'Platform.Response.Write(Platform.Function.Stringify(result));';
        code += '</'+'script>';

      } else if (this.operation == 'INSERT'){

      } else if (this.operation == 'UPDATE'){

      }
      
     
      return code;
    },
  }
};
</script>

<style scoped>

</style>