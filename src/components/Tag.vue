<template>
    <div class="tag-group">
        <el-tag
            v-for="tag in tagList"
            :key="tag.name"
            size="normal"
            effect="light"
            :disable-transitions="true"
            :closable="tag.closable === undefined ? true : tag.closable"
            @close="handelClose(tag.name)"
            >{{ tag.name }}</el-tag
        >
        <el-input
            v-if="inputVisible"
            v-model="searchVal"
            size="small"
            ref="saveTagInput"
            class="input-new-tag"
            @keyup.enter.native="handelInputConfirm"
            @blur="handelInputConfirm"
        ></el-input>
        <el-button
            v-else
            type="primary"
            plain
            class="button-new-tag"
            @click="showInput"
            >+ 标签</el-button
        >
    </div>
</template>

<script>
export default {
    name: "Tag",
    props: {
        tagData: {
            type: Array,
            default: () => [],
        },
        tagHistory: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            searchVal: "",
            tagList: [],
            inputVisible: false,
        };
    },
    watch: {
        tagData() {
            this.tagList = [...this.tagList, ...this.tagData];
        },
    },
    methods: {
        handelClose(tag) {
            this.tagList.splice(
                this.tagList.findIndex((item) => item.name === tag),
                1
            );
        },
        handelInputConfirm() {
            const { searchVal } = this;

            if (searchVal !== "") {
                if(this.tagList.findIndex(item=>item.name===searchVal)>-1) return this.$message.error("标签已存在");
                this.tagList.push({
                    name: searchVal,
                    closable: true,
                });
            }

            this.inputVisible = false;
            this.searchVal = "";
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.focus();
            });
        },
    },
};
</script>

<style scoped>
.tag-group {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    width: 100%;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.el-tag{
    margin-top: 5px;
    margin-bottom: 5px;
}
.button-new-tag {
    margin:5px 0 5px 10px;
    height: 32px;
    line-height: 30px;
    padding: 0 14px;
}
.input-new-tag{
    width: 70px;
    margin: 5px 0 5px 10px;
    vertical-align: bottom;
}
</style>