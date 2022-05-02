<template>
    <div class="image-preview">
        <transition-group name="image-preview">
            <el-image v-for="image of images" :key="image.id" :src="image.src" fit="fill" style="height: 80px; width: 80px; margin: 0 5px" :preview-src-list="srcList"></el-image>
        </transition-group>
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