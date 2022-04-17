<template>
    <div class="nav">
        <switch-btn></switch-btn>
        <user-info class="avatar"></user-info>
    </div>
</template>

<script>
import UserInfo from './UserInfo.vue';
import SwitchBtn from './SwitchBtn.vue';

export default {
    name: 'NavBar',
    components: {
        UserInfo,
        SwitchBtn
    }
}
</script>

<style scoped>
.nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 0;
    box-shadow: 0 2px 3px rgba(204, 204, 204, 0.67);
}

.avatar{
    margin-right: 20px;
}
</style>