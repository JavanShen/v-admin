<template>
    <i @click="toggleSlideBar">
        <svg t="1649849693119" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2559" width="200" height="200"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z" fill="" p-id="2560"></path></svg>
    </i>
</template>

<script>
export default {
    name: 'SwitchBtn',
    methods:{
        toggleSlideBar(){
            this.$store.commit('toggleSlideBar');
        },
    },
}
</script>

<style scoped>
.icon{
    height: 34px;
    width: 34px;
    cursor: pointer;
    margin-left: 5px;
    fill: rgb(72, 72, 72);
}
</style>