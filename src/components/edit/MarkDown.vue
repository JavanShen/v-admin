<template>
    <div class="markdown">
        <textarea name="markdown" id="editor" ref="editor"></textarea>
        <el-button type="primary" size="default" @click="showText">提交</el-button>
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
    computed:{

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