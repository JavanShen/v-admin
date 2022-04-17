<template>
<div class="main" :style="{backgroundImage:'url('+bg+')'}">
    <div class="container">
        <div class="decoration"></div>
        <div class="form">
            <login-form></login-form>
        </div>
    </div>
</div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import bg from '@/assets/login/login-bg.jpg';
export default {
    name: 'Login',
    components: {
        LoginForm,
    },
    data(){
        return {
            bg
        }
    },
};
</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    z-index: 1;
}

.main::before{
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1.1);
    background: inherit;
    filter: blur(12px);
    z-index: 2;
}

.container{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 800px;
    height: 500px;
    background-color: rgb(252, 252, 252);
    border-radius: 25px;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    z-index: 12;
}

.decoration{
    flex: 0.4;
}

.form{
    flex: 0.6;
    padding: 50px;
}
</style>