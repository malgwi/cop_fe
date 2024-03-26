<template>
    <div id="editor">
    <div class="quill-editor"
        :content="content"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        v-quill:myQuillEditor="editorOption"></div>
    </div>
</template>

<script>

  export default {
    data () {
      return {
        content: '',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean'],
                ['link', 'image'],
                [{ 'direction': 'rtl' }]
            ]
          }
        }
      }
    },
    methods: {
      onEditorBlur(editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        // console.log('editor ready!', editor)

      },
      onEditorChange({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.content = html
        this.$emit('editorContent', html)
      }
    }
  }
</script>

<style scoped>
    #editor .ql-toolbar.ql-snow{
        border-top-left-radius: 8px !important;
        border-top-right-radius: 8px !important;
    }
    #editor .ql-editor.ql-blank{
        height: 500px !important;
    }
</style>
