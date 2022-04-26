<template>
    <el-upload
        :action="uploadApi"
        :on-change="handelChange"
        :on-remove="handelRemove"
        multiple
        :limit="limit"
        :file-list="fileList"
        :auto-upload="false"
        :list-type="listType">
        <el-button slot="trigger" size="small" type="primary">select file</el-button>
        <!-- <el-button style="margin-left: 10px;" size="small" type="success">upload to server</el-button> -->
        <div slot="tip" class="el-upload__tip">files with a size less than 500kb</div>
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
            default: "file",
        },
        limit: {
            type: Number,
            default: 5,
        }
    },
    methods:{
        handelChange(file,fileList){
            this.$emit("change",file,fileList);
        },
        handelRemove(file,fileList){
            this.$emit('remove',file,fileList);
        }
    }
}
</script>