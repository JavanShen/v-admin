<template>
  <el-form
    :model="userInfo"
    ref="form"
    :rules="rules"
    label-width="80px"
    :inline="false"
    size="normal"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="userInfo.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="userInfo.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登 录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'login-form',
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
            { required: true, message: "请输入密码", trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if(!valid) return this.$message.error('请检查表单');
        try{
          const token=await this.$store.dispatch('login', this.userInfo);
          await this.$store.dispatch('getUserInfo',token);
          this.$router.push({name:'Home'}).catch(err => {
            console.log(err);
          });
        }catch(e){
          this.$message.error(e);
        }
      });
    },
  },
};
</script>