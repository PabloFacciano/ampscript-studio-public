<template>
  <Modal @close="$emit('close')" @ok="ok" title="Query String">
    <template v-slot:body>
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="url"/>
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="copy(this.url)"
        >
          Copy
        </button>
      </div>
    </template>
    <template v-slot:footer>
      <button class="btn btn-primary" @click="ok">
        Close
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  data() {
    return {
      url: this.value
    };
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  watch: {
    url (newValue) {
      this.$emit('input', newValue);
    },
    value (newValue) {
      console.log('watch', this.value)
      this.url = this.value;
    }
  },
  components: {
    Modal,
  },
  methods: {
    copy(c) {
      window.navigator.clipboard.writeText(c);
    },
    inputChanged() {
      this.$emit('input', this.url);
    },
    ok() {
      this.$emit("edit", this.url);
      this.$emit("close");
    },
  },
  computed: {

  }
};
</script>

<style></style>
