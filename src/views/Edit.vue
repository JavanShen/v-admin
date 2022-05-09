<template>
  <div class="edit">
    <mark-down></mark-down>

    <div class="upload">
      <image-preview :images="images"></image-preview>

      <transition name="progress" mode="out-in">
        <Progress v-if="fileState==='uploading'||fileState==='pause'" :percent="percent">
          <el-button slot="tail" type="primary" size="mini" circle @click="changeState">
            <svg-icon :icon-class="fileState==='pause'?'continue':'pause'"></svg-icon>
          </el-button>
          <span slot="info">{{progressInfo}}</span>
        </Progress>
      </transition>

      <file-upload
        ref="upload"
        :file-list="fileList"
        :size="sizeLimit"
        @change="fileSelect"
        @remove="fileRemove"
      ></file-upload>
    </div>

    <div class="save">
      <el-button type="warning" plain icon="el-icon-document" @click="save"
        >保存文章</el-button
      >
      <el-button
        type="primary"
        plain
        icon="el-icon-upload2"
        style="margin-left: 30px"
        :loading="isRunning"
        @click="submit"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import { MarkDown, FileUpload, ImagePreview, Progress } from "@/components/Upload";
import { mapGetters } from "vuex";
import { setStore, getStore } from "@/utils/storage";
import { isSpecifedSize } from "@/utils/validate"
import { splitFileBySize} from "@/utils/file"

import {uploadFile, submitArticle} from "@/api/upload"

export default {
  name: "Edit",
  components: {
    MarkDown,
    FileUpload,
    ImagePreview,
    Progress
  },
  data() {
    return {
      images: [],
      sizeLimit: 500,

      isRunning: false,
      currentFile: {name:'初始化中',index:0},

      splitFiles: []
    };
  },
  mounted(){
    let content = getStore("editorContent");
    if(content) this.$store.commit("edit/setEditorContent", content);
  },
  computed: {
    progressInfo() {
      return `${this.currentFile.name} ${this.currentFile.index}/${this.splitFiles.length}`;
    },
    percent() {
      let done=0,total=0
      this.splitFiles.forEach(file=>{
        file.files.forEach(f=>{
          if(f.state==='done') done++
          total++
        })
      })
      return total===0?0:Math.floor(done/total*100)
    },
    ...mapGetters({
      imagesPromise: "previewImages",
      fileList: "fileList",
      editorContent: "editorContent",
      fileState: "fileState",
    })
  },
  watch: {
    imagesPromise(val) {
      val.then((images) => {
        this.images = images;
      });
    },
    fileState(val) {
      if(val==='uploading'){
        this.uploadFiles()
      }else if(val==='finish'){
        this.finishUpload()
      }
    },
    percent(val){
      if(val===100){
        this.$store.commit('edit/finishUpload')
      }
    }
  },
  methods: {
    fileSelect(file, fileList) {
      this.$store.commit("edit/setFiles", fileList);
    },
    fileRemove(file, fileList) {
      this.$store.commit("edit/setFiles", fileList);
    },
    save() {
      try{
        setStore({
          "editorContent": this.editorContent,
        });
        this.$message.success("保存成功");
      }catch(e){
        this.$message.error("保存失败");
      }
    },
    changeState(){
      if(this.fileState==="uploading"){
        this.$store.commit('edit/pauseUpload');
      }else if(this.fileState==="pause"){
        this.$store.commit('edit/continueUpload');
      }
    },
    async submit() {
      if(this.isRunning) return this.$message.warning('正在上传中...');

      let fileList=this.fileList,
      sizeLimit=this.sizeLimit*1024*1024

      for(let file of fileList){
        if(!isSpecifedSize(file,sizeLimit)) return this.$message.error(`文件${file.name}体积超过${this.sizeLimit}M`);
      }
        
      this.isRunning=true

      try{
        await this.submitArticle()

        if(fileList.length>0){
          this.$store.commit('edit/startUpload');
        }else{
          this.isRunning=false
        }
      }catch(e){
        this.$message.error('提交失败')
        this.isRunning=false
      }
    },
    async splitAllFile(files){
      let splitFiles=[]

      for(let file of files){
        let splitFile=await splitFileBySize(file.raw)
        splitFiles.push({
          name: file.name,
          files:splitFile.map(buffer=>{
            return {
              raw: buffer,
              state: 'ready'
            }
          }),
        })
      }

      return splitFiles
    },
    async submitArticle(){
      try {
        const marked=await import('marked')
        const {data:res}=await submitArticle({
          content: marked.parse(this.editorContent),
        })
        if(res.code===0){
          this.$message.success('文章提交成功')
        }else{
          this.$message.error(res.msg)
        }
      } catch (error) {
        this.$message.error("文章提交失败")
      }
    },
    async uploadFiles(splitFiles=this.splitFiles){
      if(splitFiles.length===0) {
        this.splitFiles=await this.splitAllFile(this.fileList)
        splitFiles=this.splitFiles
      }
      
      for(let i=0,len=splitFiles.length;i<len;i++){
        let {name,files}=splitFiles[i],
            index=i+1

        this.currentFile={name,index}

        for(let file of files){
          if(this.fileState==='uploading'){
            if(file.state==='done') continue
            await this.uploadFile(file,name,index)
          }else{
            return
          }
        }
      }
    },
    async uploadFile(file,name,index){
      let data=new FormData()

      data.append('file',file.raw)
      data.append('name',name)
      data.append('index',index)

      let {data:res}=await uploadFile(data)
      file.state=res.code===0?'done':'error'
      return res
    },
    finishUpload(){
      this.$message.success('文件上传完成')
      this.$refs.upload.clearFiles()
      this.$store.commit('edit/clearFiles')
      this.splitFiles=[]
      this.currentFile={name:'初始化中',index:0}
      this.isRunning=false
    }
  },
};
</script>

<style scoped>
.upload {
  float: left;
  width: 40vw;
  height: auto;
}

.save {
  float: right;
}
</style>