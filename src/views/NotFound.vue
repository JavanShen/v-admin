<template>
    <img style="width: 70%" :src="bg" alt="不好!你想要的页面找不到了">
</template>

<script>
import bg from '@/assets/404/404.svg';
export default {
    name: 'NotFound',
    data() {
        return {
            bg
        };
    },
}
</script>