<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="username">
                <el-input prefix-icon="el-icon-user-solid"  style="margin-left:0;" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
                <el-input  prefix-icon="el-icon-lock"  v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <img :src="require('/src/assets/imgs/1登录_r2_c2.png')">
    </div>

</template>
<script>
    import {login} from '.././api/index'
    export default {
        data() {
            return {
                ruleForm: {
                    username: 'admin',
                    password:'123456'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, message: '请按正确格式输入', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            async request(){
                const res = await  login(this.ruleForm)
                console.log(res)
                sessionStorage.setItem('token',res.data.data.token)

                if(res.data.meta.msg==='登录成功'&&res.data.meta.status===200){
                    this.$router.push('/index')
                }else {
                    this.$message.error('登录失败');
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       this.request()
                    } else {
                        this.$message.error('登录失败');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

        }
    }
</script>
<style scoped lang="less">

    #app>div{
        width: 500px;
        height: 330px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        background-color: #fff;
        border-radius: 3px;
       /deep/ .el-form-item__content{
           margin-left: 12px!important;
           margin-right: 12px;
        }
        /deep/ .el-form-item is-required{
            margin-bottom: 26px;
        }
        /deep/ .el-form{
            margin-top: 114px;
        }
        /deep/ .el-form-item:nth-last-of-type(1){
            display: flex;
            justify-content: flex-end;
        }
        img{
            position: absolute;
            top: -92px;
            left: 160px;
        }
    }
</style>
