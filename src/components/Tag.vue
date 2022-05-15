<template>
    <div class="tag-group">
        <el-tag
            v-for="tag in tagData"
            :key="tag.id"
            size="normal"
            effect="light"
            :disable-transitions="true"
            :closable="isEdit?(tag.closable === undefined ? true : tag.closable):false"
            @close="deleteTag(tag.id)"
            >{{ tag.name }}</el-tag
        >
        <el-popover v-if="isEdit" placement="bottom" width="220" trigger="click">
            <el-input
                v-model="newTagName"
                placeholder="新增标签"
                size="small"
                clearable
                @keyup.enter.native="handelInputConfirm"
                @blur="handelInputConfirm"
            ></el-input>
            <el-tag
                v-for="tag in tagHistory"
                :key="tag.id"
                class="tag-history"
                :type="tag.selected ? 'primary' : 'info'"
                size="normal"
                :effect="tag.selected ? 'dark' : 'light'"
                :disable-transitions="true"
                :closable="tag.closable === undefined ? true : tag.closable"
                @close="deleteHistoryTag(tag.id)"
                @click="chooseTag(tag.id)"
                >{{ tag.name }}</el-tag
            >

            <el-button
                type="primary"
                plain
                class="button-new-tag"
                slot="reference"
            >
                + 标签</el-button
            >
        </el-popover>
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
    inject: ['isEdit'],
    data() {
        return {
            newTagName: "",
        };
    },
    methods: {
        deleteTag(id) {
            this.$emit("deleteTag", id);
        },
        deleteHistoryTag(id) {
            this.$emit("deleteHistoryTag", id);
        },
        handelInputConfirm() {
            const { newTagName } = this;

            if (newTagName !== "") {
                if (
                    this.tagData.findIndex((item) => item.name === newTagName) >
                    -1
                )
                    return this.$message.error("标签已存在");

                this.$emit("addTag", [newTagName], true);
            }
            this.newTagName = "";
        },
        chooseTag(id) {
            this.$emit("chooseTag", id);
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

.el-tag ~ .el-tag {
    margin-left: 10px;
}

.el-tag {
    margin-top: 5px;
    margin-bottom: 5px;
}

.button-new-tag {
    margin: 5px 0 5px 10px;
    height: 32px;
    line-height: 30px;
    padding: 0 14px;
}

.tag-history {
    cursor: pointer;
}

.tag-history:hover {
    border: 1px solid #41b883;
}
</style>