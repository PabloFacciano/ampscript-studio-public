<template>
  <Modal @close="$emit('close')" @ok="ok" title="Feedback">
    <template v-slot:body>
      <div class="dropdown mb-3">
        <button :disabled="sendingFeedback" class="btn btn-light border dropdown-toggle" type="button" data-bs-toggle="dropdown">
          <span class="pe-2">{{ selectedFeedbackType.title }}</span>
        </button>
        <ul class="dropdown-menu">
          <li v-for="fb in this.feedbackTypes" :key="fb.type" class="d-flex align-items-stretch my-2">
            <div class="ps-1" :class="{ 'bg-primary': feedbackType == fb.type}"></div>
            <button class="dropdown-item" type="button" @click="this.feedbackType = fb.type">
              <div><b>{{ fb.title }}</b></div>
              <div class="text-muted">{{ fb.description }}</div>
            </button>
          </li>      
        </ul>
      </div>
      <div class="mb-3">
        <textarea v-model.trim="feedbackMessage" :disabled="sendingFeedback" class="form-control" rows="5" maxlength="300"></textarea>
      </div>

    
    </template>
    <template v-slot:footer>
      <button :disabled="sendingFeedback" class="btn btn-light border" @click="cancel">
        Cancel
      </button>
      <button :disabled="sendingFeedback || this.feedbackMessage == ''" class="btn btn-primary" @click="ok">
        Send
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  data() {
    return {
      feedbackType: 'feedback',
      feedbackMessage: '',
      sendingFeedback: false
      
    };
  },
  components: {
    Modal,
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    ok() {
      // send
      this.sendingFeedback = true;
      this.$store.dispatch('sendFeedback',{
        feedbackType: this.feedbackType,
        feedbackMessage: this.feedbackMessage
      }).then(()=>{
        //this.feedbackMessage = '';
        this.sendingFeedback = false;
        // close
        this.$emit("close");
      });      
    },
  },
  computed: {
    selectedFeedbackType(){
      return this.feedbackTypes.filter((e) => (e.type == this.feedbackType))[0];
    },
    feedbackTypes(){
      return [
        {
          type: 'feedback',
          title: '💬 Feedback',
          description: 'Ideas on how to improve this page'
        },
        {
          type: 'bug',
          title: '💥 Report bug',
          description: 'Anything not working as it should'
        },
        {
          type: 'question',
          title: '❔ Question',
          description: 'Not sure how to do something?'
        },
        {
          type: 'feature',
          title: '💙 Feature Request',
          description: 'Anything new you would like?'
        },
      ]
    }
  }
};
</script>

<style></style>
