<template>
    <div class="markdown">
        <textarea name="markdown" id="editor" ref="editor"></textarea>
    </div>
</template>

<script>
import simpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

export default {
    name: "MarkDown",
    data(){
        return {
            editor:null
        }
    },
    mounted(){
        this.$store.commit('edit/setEditor',new simpleMDE({
            el: this.$refs.editor,
            spellChecker: false,
        }))
    },
    methods:{
        showText(){
            import('marked').then(marked=>{
                console.log(marked.parse(this.$store.state.edit.editor.value()));
            })
        }
    }
}
</script>

<style>
.CodeMirror {
	height: 300px;
}
</style>