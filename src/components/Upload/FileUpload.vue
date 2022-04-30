<template>
    <el-upload
        :action="uploadApi"
        ref="upload"
        :on-change="handelChange"
        :on-remove="handelRemove"
        :on-exceed="handelExceed"
        multiple
        :limit="limit"
        :file-list="fileList"
        :auto-upload="false"
        :list-type="listType">
        <el-button slot="trigger" size="small" icon="el-icon-document-add" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip">文件数量不能超过{{limit}}个,单个文件体积不能超过{{size}}M</div>
    </el-upload>
</template>

<script>
export default {
    name: "FileUpload",
    props: {
        fileList: {
            type: Array,
            default: () => [],
        },
        uploadApi: {
            type: String,
            default: "",
        },
        listType: {
            type: String,
            default: "text",
        },
        limit: {
            type: Number,
            default: 5,
        },
        size: {
            type: Number,
            default: 100,
        },
    },
    computed:{
        sizeLimit(){
            return this.size * 1024 * 1024
        }
    },
    methods:{
        handelChange(file,fileList){
            if(file.size>this.sizeLimit){
                file.status = "out of size";
            }
            this.$emit("change",file,fileList);
        },
        handelRemove(file,fileList){
            this.$emit('remove',file,fileList);
        },
        handelExceed(files,fileList){
            this.$message.error(`文件数量不能超过${this.limit}个`);
        },
        clearFiles(){
            this.$refs.upload.clearFiles();
        },
    }
}
</script>