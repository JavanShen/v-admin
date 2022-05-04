<template>
    <el-dialog
        title=""
        :visible="visible"
        width="40%"
        @close="$emit('update:visible', false)"
    >
        <el-form
            :model="form"
            ref="form"
            :rules="rules"
            label-width="80px"
            :inline="false"
            size="normal"
        >
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="生日" size="normal" required>
                <el-col :span="11" :offset="0">
                    <el-date-picker
                        v-model="form.birthday"
                        value-format="yyyy-MM-dd"
                        type="date"
                        size="normal"
                        placeholder="选择日期时间"
                    >
                    </el-date-picker>
                </el-col>
                <el-col :span="13" :offset="0"></el-col>
            </el-form-item>
            <el-form-item label="地址" size="normal" required>
                <el-col :span="12" :offset="0">
                    <regions-picker v-model="form.address"></regions-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="电话" size="normal" prop="phone">
                <el-input v-model="form.phone" size="normal" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" size="normal" prop="email">
                <el-input v-model="form.email" size="normal" clearable></el-input>
            </el-form-item>
            
        </el-form>
        <span slot="footer">
            <el-button type="primary" @click="submit">提交</el-button>
        </span>
    </el-dialog>
</template>

<script>
import RegionsPicker from "@/components/picker/RegionsPicker.vue";
import { isSameObject} from "@/utils/validate"

export default {
    name: "user-edit",
    components: {
        RegionsPicker,
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        formData: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        const checkPhone=(rule,value,callback) => {
            if(!(/^1[3456789]\d{9}$/.test(value))){
                callback(new Error('手机号码格式错误'));
            }else{
                callback();
            }
        }
        const checkEmail=(rule,value,callback) => {
            if(!(/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(value))){
                callback(new Error('邮箱格式错误'));
            }else{
                callback();
            }
        }
        return {
            form: {
                name: "",
                birthday: "",
            },
            rules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    {
                        min: 2,
                        max: 5,
                        message: "长度在 2 到 5 个字符",
                        trigger: "blur",
                    },
                ],
                phone: [
                    { required: true, message: "请输入电话", trigger: "blur" },
                    { validator: checkPhone, trigger: "blur" },
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { validator: checkEmail, trigger: "blur" },
                ],
            }
        };
    },
    watch: {
        visible(val) {
            if (val) {
                this.form = Object.assign({}, this.formData);
            }
        },
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if(isSameObject(this.form, this.formData)) return this.$message.error("没有任何修改");
                    this.$emit("submit", this.form);
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>