<template>
  <div class="flex-fill d-flex flex-column">
    <CodeEditorHeader/>
    <CodeEditorContent :editorId="editorId" />
    <CodeEditorFooter :editorId="editorId" />
  </div>
</template>

<script>
import CodeEditorHeader from './CodeEditorHeader.vue';
import CodeEditorContent from './CodeEditorContent.vue';
import CodeEditorFooter from './CodeEditorFooter.vue';
export default {
  props: {
    editorId: String
  },
  components: { CodeEditorHeader,CodeEditorContent, CodeEditorFooter },
   data() {
    return {
      
    };
  },
};
</script>
