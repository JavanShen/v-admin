<template>
    <div class="tag-group">
        <el-tag
            v-for="tag in tagData"
            :key="tag.id"
            size="normal"
            effect="light"
            closable="tag.closable===undefined?true:tag.closable"
            @close="handelClose"
        >{{tag.name}}</el-tag>
        
    </div>
</template>

<script>
export default {
    name: "Tag",
    props: {
        tagData: {
            type: Array,
            require: true,
        },
    },
    methods: {
        handelClose() {
            this.$emit("close");
        },
    },
};
</script>