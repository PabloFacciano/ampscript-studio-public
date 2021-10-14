<template>
  <div class="flex-fill d-flex flex-column">
    <div class="container flex-fill">
      <div class="row h-100">
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
        <div class="col-6 pb-3 h-100" style="overflow:auto;">
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
          <div class="pb-4" v-show="section == 'MARKETINGCLOUD'">
            <h5>Workspace</h5>
            <p>Indicates where the code will run.</p>
            <select class="form-select" v-model="this.marketingcloudSettings.workspaceSelected" @input="updateCodeSettings">
              <option v-for="w in marketingcloudSettings.workspaces" :key="w.id" :value="w.id">{{ w.name }}</option>
            </select>
            <small class="mx-2">
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>Cloudpage:</span>
                <span>{{ selectedWorkspace.cloudpage }}</span>
              </div>
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>Tenant:</span>
                <span>{{ selectedWorkspace.tenant }}</span>
              </div>
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>MID:</span>
                <span>{{ selectedWorkspace.mid }}</span>
              </div>
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>Client ID:</span>
                <span>{{ selectedWorkspace.clientid }}</span>
              </div>
              <div class="d-flex justify-content-between flex-fill mb-2">
                <span>Client Secret:</span>
                <span>{{ selectedWorkspace.clientsecret }}</span>
              </div>
            </small>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-outline-danger">Delete</button>
            </div>
          </div>
          <div class="pb-4" v-if="section == 'MARKETINGCLOUD'">
            <h5>Create Workspace</h5>
            <div class="mb-2">
              <label for="exampleFormControlInput1" class="form-label">Name <span style="color:red;">*</span></label>
              <input type="text" class="form-control" id="exampleFormControlInput1">
            </div>
            <div class="mb-2">
              <label for="exampleFormControlInput1" class="form-label">Cloudpage URL <span style="color:red;">*</span></label>
              <input type="url" class="form-control" id="exampleFormControlInput1">
            </div>
            <div class="mb-2">
              <label for="exampleFormControlInput1" class="form-label">Tenant</label>
              <input type="text" class="form-control" id="exampleFormControlInput1">
            </div>
            <div class="row mb-3">
              <div class="col-4">
                <div class="mb-2">
                  <label for="exampleFormControlInput1" class="form-label">MID</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1">
                </div>
              </div>
              <div class="col-4">
                <div class="mb-2">
                  <label for="exampleFormControlInput1" class="form-label">Client ID</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1">
                </div>
              </div>
              <div class="col-4">
                <div class="mb-2">
                  <label for="exampleFormControlInput1" class="form-label">Client Secret</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1">
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-outline-primary">Create</button>
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
      marketingcloudSettings: {
        workspaceSelected: 'ROCKET',
        workspaces: [
          {
            id: 'ROCKET',
            name: 'Rocket Espresso - Rocket',
            cloudpage: 'https://mcpk8yjlr38c-gnlfdjh-1t51c81.pub.sfmc-content.com/ykjcnrpl0df',
            tenant: 'mcpk8yjlr38c-gnlfdjh-1t51c81',
            mid: 514002369,
            clientid: 'ASDFASDFASDF',
            clientsecret: 'ASDFASDFASDF'
          },
          {
            id: 'NATURA',
            name: 'Natura - Natura CF',
            cloudpage: 'https://mcpk8yjlr38c-gnlfdjh-1t51c81.pub.sfmc-content.com/ykjcnrpl0df',
            tenant: 'asdfasdf-asdf-asdfasdf',
            mid: 1234567890,
            clientid: 'gafsdfgasdf',
            clientsecret: 'asfgasgasdg'
          }
        ]
      }
    };
  },
  computed: {
    selectedWorkspace: function(){
      return this.marketingcloudSettings.workspaces.find(e => e.id == this.marketingcloudSettings.workspaceSelected);
    }
  },
  methods: {
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

