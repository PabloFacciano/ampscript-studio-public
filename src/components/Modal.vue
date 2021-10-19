<template>
  <div class="modal-mask">
    <div class="modal" style="display: block;" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <h5 class="modal-title">{{ title }}</h5>
            </slot>            
          </div>
          <div class="modal-body">
            <slot name="body">
              <p>Modal body text goes here.</p>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-outline-secondary" @click="$emit('close')">
                Cancel
              </button>
              <button class="btn btn-primary" @click="$emit('ok')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Modal Title goes here.'
    }
  },
  data(){
    return {
      
    }
  }
}
</script>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

</style>