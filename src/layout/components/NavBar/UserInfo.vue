<template>
    <el-dropdown placement="bottom" @command="handelCommand">
        <el-avatar icon="el-icon-user-solid" size="medium" shape="circle" fit="fill"></el-avatar>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in items"
                :key="item.key" :command="item.command">
                {{item.title}}
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    name: 'UserInfo',
    data() {
        return {
            items: [
                {
                    key: '1',
                    title: '个人中心',
                    command: 'user'
                },
                {
                    key: '2',
                    title: '退出登录',
                    command: 'logout'
                }
            ]
        }
    },
    methods: {
        handelCommand(command) {
            this.$emit(command);
        }  
    }
}
</script>