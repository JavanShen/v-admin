<template>
    <div class="upload">
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts"
            ref="upload"
            :on-preview="handelPreview"
            :on-remove="handelRemove"
            :on-change="handelChange"
            :auto-upload="false"
            multiple
            :limit="5"
            :on-exceed="handelExceed"
            :file-list="fileList"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary">select file</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">upload to server</el-button>
            <div slot="tip" class="el-upload__tip">files with a size less than 500kb</div>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: "FileUpload",
    data(){
        return {
            fileList:[]
        }
    },
    methods:{
        handelRemove(file){
            console.log(file);
        },
        handelExceed(files,fileList){
            console.log(files,fileList);
        },
        handelPreview(file){
            console.log(file);
        },
        handelChange(file,fileList){
            console.log(file,fileList);
        },
        upload(){
            this.$refs.upload.submit()
        }
    }
}
</script>