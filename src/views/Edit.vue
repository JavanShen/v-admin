<template>
  <div class="edit">
    <mark-down></mark-down>
    <image-preview :images="images"></image-preview>
    <file-upload uploadApi="https://jsonplaceholder.typicode.com/posts/" @change="fileSelect" @remove="fileRemove"></file-upload>
  </div>
</template>

<script>
import { MarkDown, FileUpload, ImagePreview } from "@/components/edit";

export default {
  name: "Edit",
  components: {
    MarkDown,
    FileUpload,
    ImagePreview
  },
  data(){
    return {
      images:[]
    }
  },
  computed: {
    imagesPromise() {
      return this.$store.getters.previewImages
    }
  },
  watch: {
    imagesPromise(val){
      val.then(images=>{
        this.images = images;
      })
    }
  },
  methods:{
    fileSelect(file,fileList){
      this.$store.commit('edit/setFiles',fileList);
    },
    fileRemove(file,fileList){
      this.$store.commit('edit/setFiles',fileList);
    }
  }
};
</script>