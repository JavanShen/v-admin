<template>
    <div class="image-preview">
        <el-image v-for="image of images" :key="image.id" :src="image.src" fit="fill" style="height: 100px; width: 100px; margin: 0 10px" :preview-src-list="srcList"></el-image>
    </div>
</template>

<script>
export default {
    name: "ImagePreview",
    props: {
        images: {
            type: Array,
            require: true
        },
    },
    computed:{
        srcList(){
            return this.images.map(image=>image.src)
        }
    }
}
</script>