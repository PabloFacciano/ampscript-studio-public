<template>
  <div class="flex-fill d-flex flex-column">
      <div class="container h-100">
      <div class="row" style="overflow:auto;">

        <div class="col-12 py-3">
          <h2>Help</h2>
        </div>

        <div class="col-3">
          <div class="me-3">
            <div class="list-group list-group-flush">
              <button v-for="tab in this.sections" :key="tab.id" class="list-group-item list-group-item-action border-0 p-0" :class="{ 'bg-gray' : tab.id == this.section}" @click="this.section = tab.id">
                <div class="d-flex align-items-stretch">
                  <div class="px-1" :class="{ 'bg-primary' : tab.id == this.section}"></div>
                  <div class="px-3 py-2">{{ tab.title }}</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="col-6 pb-4">
          
          <div class="pb-4" v-if="section == 'howworks'">
            <p></p>            
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
      section: 'howworks',
      sections: [
        {
          id: 'howworks',
          title: 'How AMPScript Studio works'
        },
        {
          id: 'techstack',
          title: 'Tech Stack'
        }
      ]
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