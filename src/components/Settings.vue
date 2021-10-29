<template>
  <div class="flex-fill d-flex flex-column" style="overflow:hidden;">
    <div class="container h-100">
      <div class="row" style="overflow:auto;">
        <div class="col-12 py-3">
          <h2>Settings</h2>
        </div>
        <div class="col-3">
          <div class="me-3">
            <div class="list-group list-group-flush">
              <button class="list-group-item list-group-item-action border-0 p-0" :class="{ 'bg-gray' : section === 'CODEEDITOR'}" @click="openSection('CODEEDITOR')">
                <div class="d-flex align-items-stretch">
                  <div class="px-1" :class="{ 'bg-primary' : section === 'CODEEDITOR'}"></div>
                  <div class="px-3 py-2">Code Editor</div>
                </div>
              </button>
              <button class="list-group-item list-group-item-action border-0 p-0" :class="{ 'bg-gray' : section === 'MARKETINGCLOUD'}" @click="openSection('MARKETINGCLOUD')">
                <div class="d-flex align-items-stretch">
                  <div class="px-1" :class="{ 'bg-primary' : section === 'MARKETINGCLOUD'}"></div>
                  <div class="px-3 py-2">Marketing Cloud</div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="col-6 pb-4">
          <div class="pb-4" v-if="section == 'CODEEDITOR'">
            <h5>Log mode</h5>
            <p>Indicates how the execution logs will be generated.</p>
            <select class="form-select mb-3" v-model="codeSettings.logSelected" @input="updateCodeSettings">
              <option value="NONE">None</option>
              <option value="LINE">All lines</option>
              <option value="CODE">Code block</option>
              <option value="CUSTOM">Custom</option>
            </select>
            <small>
              <div v-if="codeSettings.logSelected == 'NONE'">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>Faster than any other type of log!</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:red;">close</span>
                  <span>No debug.</span>
                </div>
              </div>
              <div v-if="codeSettings.logSelected == 'LINE'">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>Good to know the code executed.</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>It also shows the html-only lines.</span>
                </div>
              </div>
              <div v-if="codeSettings.logSelected == 'CODE'">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>Good to know the code executed.</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>Exclude lines that only have html.</span>
                </div>
              </div>
              <div v-if="codeSettings.logSelected == 'CUSTOM'">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>It allows to choose which sections are going to be logged.</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>Type <code>&#123;&#123;log.start&#125;&#125;</code> and <code>&#123;&#123;log.stop&#125;&#125;</code> to define the sections.</span>
                </div>
              </div>
            </small>
          </div>
          <div class="pb-4" v-if="section == 'CODEEDITOR'">
            <h5>Run as</h5>
            <p>Indicates in which context the code is executed. Learn more <a target="_blank" href="https://help.salesforce.com/s/articleView?id=000351478&type=1">here</a>.</p>
            <select class="form-select mb-3" v-model="codeSettings.runAs" @input="updateCodeSettings">
              <option value="AUTOMATION">Automation</option>
              <option value="CLOUDPAGE">Cloudpage</option>
              <option value="SMS" disabled>SMS</option>
              <option value="EMAILPREVIEW" disabled>Email Preview</option>
              <option value="EMAILSEND" disabled>Email Send</option>
            </select>
            <small>
              <div v-if="['AUTOMATION','CLOUDPAGE','SMS'].includes(codeSettings.runAs)">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>The code is compatible with Automation and Cloudpage!</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:red;">close</span>
                  <span>Be careful, the code may not be compatible with SMS, Email Preview or Email Send.</span>
                </div>
              </div>
              <div v-if="['EMAILPREVIEW','EMAILSEND'].includes(codeSettings.runAs)">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>The code is compatible with Email Preview or Email Send!</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:red;">close</span>
                  <span>Be careful, the code may not be compatible with SMS, Automation or Cloudpage.</span>
                </div>
              </div>
            </small>
          </div>
          <div class="pb-4" v-if="section == 'CODEEDITOR'">
            <h5>Live Preview</h5>
            <p>Indicates when the code will run automatically.</p>
            <select class="form-select mb-3" v-model="codeSettings.livePreview" @input="updateCodeSettings">
              <option value="DISABLED">Disabled</option>
              <option value="HTML">Only HTML</option>
              <option value="AUTO">Near real-time</option>
            </select>
            <small>
              <div v-if="codeSettings.livePreview == 'DISABLED'">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>No problem! You will have a button to execute the code.</span>
                </div>
              </div>
              <div v-if="codeSettings.livePreview == 'HTML'">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>Editing and previewing in real time.</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>You will have a button to execute the code.</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:red;">close</span>
                  <span>AMPScript and SSJS code will not run in real time.</span>
                </div>
              </div>
              <div v-if="codeSettings.livePreview == 'AUTO'">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>The code will execute after a few seconds after you stop typing.</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>The AMPScript and SSJS code will run in near real time.</span>
                </div>
              </div>
            </small>
          </div>
          <div class="pb-4" v-if="section == 'CODEEDITOR' && false">
            <h5>Auto Save</h5>
            <p>Indicates when the code will be auto saved.</p>
            <select class="form-select mb-3" v-model="codeSettings.autoSave" @input="updateCodeSettings">
              <option value="DISABLED">Disabled</option>
              <option value="AUTO">Near real-time</option>
            </select>
            <small>
              <div v-if="codeSettings.autoSave == 'DISABLED'">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>No problem! You will have a button to save the code.</span>
                </div>
              </div>
              <div v-if="codeSettings.autoSave == 'AUTO'">
                <div class="d-flex align-items-center mb-2">
                  <span class="material-icons me-2" style="color:green;">done</span>
                  <span>The code will be saved after a few seconds after you stop typing.</span>
                </div>
              </div>
            </small>
          </div>
          <div class="pb-4" v-show="section == 'MARKETINGCLOUD' && selectedWorkspaceId != 'none'">
            <h5>Workspace</h5>
            <p>Indicates where the code will run.</p>
            <select class="form-select" :value="selectedWorkspaceId" @change="changeWorkspace" :disabled="creatingWorkspace">
              <option v-if="this.$store.state.workspaces.length == 0" value='none'>Add a Workspace first.</option>
              <option v-for="w in this.$store.state.workspaces" :key="w.id" :value="w.id">{{ w.name }}</option>
            </select>
            <small class="mx-2">
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>Cloudpage:</span>
                <span class="ms-2 text-end">{{ selectedWorkspace.cloudpageurl }}</span>
              </div>
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>Tenant:</span>
                <span class="ms-2 text-end">{{ selectedWorkspace.tenant }}</span>
              </div>
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>MID:</span>
                <span class="ms-2 text-end">{{ selectedWorkspace.mid }}</span>
              </div>
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>Client ID:</span>
                <span class="ms-2 text-end">**********</span>
              </div>
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>Client Secret:</span>
                <span class="ms-2 text-end">**********</span>
              </div>
            </small>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-outline-danger" @click="deleteWorkspace" :disabled="creatingWorkspace">Delete</button>
            </div>
          </div>
          <div class="pb-4" v-if="section == 'MARKETINGCLOUD'">
            <h5>Create Workspace</h5>
            <div class="mb-2">
              <label for="Name" class="form-label">Name <span style="color:red;">*</span></label>
              <input type="text" class="form-control" id="Name" v-model="newWorkspace.name" :disabled="creatingWorkspace">
            </div>
            <div class="mb-2">
              <label for="CloudpageURL" class="form-label">Cloudpage URL <span style="color:red;">*</span></label>
              <input type="url" class="form-control" id="CloudpageURL" v-model="newWorkspace.cloudpageurl" :disabled="creatingWorkspace">
            </div>
            <div class="mb-2">
              <label for="CloudpageToken" class="form-label">Cloudpage Token <span style="color:red;">*</span></label>
              <input type="text" class="form-control" id="CloudpageToken" v-model="newWorkspace.cloudpagetoken" :disabled="creatingWorkspace">
            </div>
            <div class="mb-2">
              <label for="Tenant" class="form-label">Tenant</label>
              <input type="text" class="form-control" id="Tenant" v-model="newWorkspace.tenant" :disabled="creatingWorkspace">
            </div>
            <div class="row mb-3">
              <div class="col-4">
                <div class="mb-2">
                  <label for="MID" class="form-label">MID <span style="color:red;">*</span></label>
                  <input type="number" class="form-control" id="MID" v-model="newWorkspace.mid" :disabled="creatingWorkspace">
                </div>
              </div>
              <div class="col-4">
                <div class="mb-2">
                  <label for="ClientID" class="form-label">Client ID</label>
                  <input type="text" class="form-control" id="ClientID" v-model="newWorkspace.clientid" :disabled="creatingWorkspace">
                </div>
              </div>
              <div class="col-4">
                <div class="mb-2">
                  <label for="ClientSecret" class="form-label">Client Secret</label>
                  <input type="text" class="form-control" id="ClientSecret" v-model="newWorkspace.clientsecret" :disabled="creatingWorkspace">
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-primary" @click="createNewWorkspace" :disabled="creatingWorkspace">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      section: 'CODEEDITOR',
      codeSettings: this.$store.state.codeSettings,
      creatingWorkspace: false,
      newWorkspace: {
        name: '',
        cloudpageurl: '',
        cloudpagetoken: '',
        tenant: '',
        mid: '',
        clientid: '',
        clientsecret: ''
      }     
    };
  },
  computed: {
    selectedWorkspaceId(){
      return this.selectedWorkspace.id;
    },
    selectedWorkspace(){
      let ws = this.$store.getters.selectedWorkspace;
      if (ws == null){
        ws = {
          id: 'none',
          name: '-',
          cloudpageurl: '-',
          cloudpagetoken: '-',
          tenant: '-',
          mid: '-',
          clientid: '',
          clientsecret: ''
        };
      }
      return ws;
    }
  },
  methods: {
    validateNewWorkspace(){

      let ws = this.newWorkspace;
      if (ws.name == ''){
        alert('Workspace Name is required.');
        return false;
      }
      if (ws.cloudpageurl == ''){
        alert('Cloudpage URL is required.');
        return false;
      }
      if (ws.cloudpagetoken == ''){
        alert('Cloudpage Token is required.');
        return false;
      }
      if (ws.mid == ''){
        alert('MID is required.');
        return false;
      }

      return true;
    },
    createNewWorkspace(){
      if (!this.validateNewWorkspace()){ return; }
      this.creatingWorkspace = true;
      this.$store.dispatch('newWorkspace',this.newWorkspace).then(()=>{
        this.newWorkspace = {
          name: '',
          cloudpageurl: '',
          cloudpagetoken: '',
          tenant: '',
          mid: '',
          clientid: '',
          clientsecret: ''
        };
        this.$store.dispatch('loadWorkspaces');
        this.creatingWorkspace = false;
      });      
    },
    deleteWorkspace(){
      let continuar = confirm('Are you sure?');
      if (!continuar){ return; }

      this.creatingWorkspace = true;
      this.$store.dispatch('deleteWorkspace',this.selectedWorkspaceId).then(()=>{
        this.$store.dispatch('loadWorkspaces');
        this.creatingWorkspace = false;
      });
      
    },
    changeWorkspace(e){
      this.$store.commit('changeWorkspace', e.target.value);
    },
    openSection(section){
      this.section = section;
    },
    updateCodeSettings(){
      this.$store.commit('updateCodeSettings', this.codeSettings);
    }
  }
}
</script>

<style scoped>
.bg-gray {
  background-color: #f8f9fa;
}
.bg-gray:hover {
  background-color: #eee;
}
.bg-gray:active {
  background-color: #ccc;
}
</style>

