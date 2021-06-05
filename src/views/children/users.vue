<template>
    <div>
        <el-dialog
                title="添加用户"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item  label="用户名" prop="username">
                    <el-input :disabled="flg=='修改'" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item v-if="flg=='添加'" label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm('ruleForm'),dialogVisible = false" >取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" >确定</el-button>
          </span>
        </el-dialog>
        <el-steps :active="0" simple>
            <el-step title="首页" ></el-step>
            <el-step title="用户管理" ></el-step>
            <el-step title="用户列表" ></el-step>
        </el-steps>
    <div class="tybody">
            <div class="header">
               <div>
                   <el-input class="header_input"
                           placeholder="请输入内容"
                           v-model="value"
                           clearable>
                   </el-input>

                   <div @click="fn()" class="el-icon-search"></div>
               </div>
                    <el-button type="primary" @click="dialogVisible = true,flg='添加'">添加用户</el-button>
            </div>
            <el-table
                    :stripe=true
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="#"
                        type="index"
                >

                </el-table-column>
                <el-table-column
                        label="用户"
                >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.username }}</span>
                        </template>

                </el-table-column>
                <el-table-column
                        label="邮箱"
                >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.email }}</span>
                        </template>

                </el-table-column>
                <el-table-column
                        label="电话"
                >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
                        </template>

                </el-table-column>
                <el-table-column
                        label="角色"
                >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.role_name }}</span>
                        </template>

                </el-table-column>
                <el-table-column
                        label="状态"
                >
                        <template slot-scope="scope">
                            <span  @click="state(scope.row.id,scope.row.mg_state)"   style="margin-left: 10px"><el-switch
                                v-model="scope.row.mg_state"
                                    >
                                    </el-switch>
                                </span>
                        </template>

                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)" class="el-icon-edit"></el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)" class="el-icon-delete"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="sum.pagenum"
                :page-sizes="[2,4]"
                :page-size="2"
                layout="total, sizes, prev, pager, next, jumper"
                :total="length">
        </el-pagination>
    </div>
    </div>
</template>

<script>
    import {ueserstate,list,add,amend,delde,inquire} from '../../api/index'
    export default {
        name: "users",

        data(){
            return{
                value:'',
                //长度
                length:0,
                sum:{
                    pagenum:1,
                    pagesize:2
                },
                id:'',
                ruleForm: {
                    username: '',
                    password:'',
                    email:'',
                    mobile:'',
                },
                delivery: false,
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    mobile: [
                        { required: true, message: '手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入合法手机号', trigger: 'blur' }
                    ],
                },
                dialogVisible: false,
                tableData:[],
                flg:'添加',

            }
        },
        methods:{
            //修改用户状态
            async state(a,b){

            const  res =  await ueserstate({
                uId:a,
                type:b
            })
                switch (res.data.meta.msg) {
                    case "设置状态成功":this.$message({
                        message: '修改成功',
                        type: 'success'
                    });break;
                }
                console.log(res)
            },
          async fn(){
                let res = await inquire(this.value)
                res = res.data.meta
              console.log(res)
              if(res.msg=="pagenum 参数错误"){
                  this.$message.error('pagenum 参数错误')
                  return
              }
              if(res.msg.code==2){
                  this.$message.error('未找到该用户')
                  return
              }

                this.tableData=[{
                  id: res.id,
                  username:res.username,
                  password:res.password,
                  email:res.email,
                  mobile:res.mobile
              }]
              this.sum.pagenum=1
              this.sum.pagesize=1
              this.length=1
            },
            handleEdit(index, row) {
                this.dialogVisible=true
                this.flg='修改'
                this.id=row.id
                this.ruleForm.username=row.username
                this.ruleForm.email=row.email
                this.resetForm.password=row.password
                this.ruleForm.mobile=row.mobile
                console.log(index, row);
            },
          async  handleDelete(index, row) {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  if(a.data.meta.msg=='删除成功'){
                      this.$message({
                          message: '删除成功',
                          type: 'success'
                      });
                      this.hast()
                  }else {
                      this.$message.error('不允许删除admin账户')
                  }
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });
                const a = await delde(row.id)



                console.log(index, row);
            },
            handleSizeChange(val) {
                this.sum.pagesize=val
                this.hast()
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.sum.pagenum=val
                console.log(this.sum)
                this.hast()
                console.log(`当前页: ${val}`);
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$refs.ruleForm.resetFields();
                        done();
                    })
                    .catch(_ => {});
            },
            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.sendadd()
                    } else {
                        switch (this.flg) {
                            case "添加":this.$message.error('添加失败');break;
                            case "修改":this.sendadd();break;
                        }
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
          async  sendadd(){

                switch (this.flg) {
                    case "添加":
                        const  res = await add(this.ruleForm)
                        if(res.data.meta.msg=='创建成功' && res.data.meta.status==201){
                            this.$message({
                                message: '创建成功',
                                type: 'success'
                            });
                            this.hast()
                            this.dialogVisible = false}else {
                            this.$message.error('添加失败');
                        }
                        ;break;
                        case '修改':

                            const ress = await amend({
                                obj:{
                                    email:this.ruleForm.email,
                                    mobile:this.ruleForm.mobile
                                },
                                id:this.id
                            })
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.id=''
                            this.ruleForm.username=''
                            this.ruleForm.email=''
                            this.resetForm.password=''
                            this.ruleForm.mobile=''
                            this.dialogVisible=false
                            this.hast()
                            ;break;
                }

            },
            //获取数据
            async   hast(){
                const res = await  list(this.sum)
                this.tableData = res.data.data.users
                // console.log(res.data)
                this.length =  res.data.data.total
                // console.log(this.tableData)
            },

        },
     created() {
           this.hast()
        },
        watch:{
            value(v){
                if(v==''){
                    this.sum.pagesize=2
                    this.hast()
                }
            },

        }
    }
</script>

<style scoped lang="less">
    .tybody{
        border: 1px solid #e6e8ed;
        padding-top: 20px;
        margin: 0 23px 0 20px;
    }
    /deep/ .el-step__head{
        display: none;
    }
    /deep/ .el-steps{
        width: 205px;
        background-color: #fff;
        padding: 20px 0 16px 20px ;
    }
    /deep/ .el-step__title{
        font-size: 12px!important;
    }
    /deep/ .el-step__arrow::before{
        height: 9px!important;
        transform: rotate(-45deg) translateY(-3px) !important;
    }
    /deep/.el-step.is-simple .el-step__arrow::after{
        height: 9px!important;
        transform: rotate(45deg) translateY(3px);
    }
    /deep/ .el-step__main{
        width: 100%;
    }
    /deep/ .el-step.is-simple:not(:last-of-type) .el-step__title{
        max-width: 70%;
    }
    /deep/ .el-step.is-simple{
        min-width: 50px;
        max-width: 70px;
    }
    /deep/ .el-step__arrow{
        max-width: 30px;
    }
    .header>div{
        display: flex;
        margin-right: 21px;
    }
    .header{
        margin-left: 20px;
        display: flex;
        input{
            height: 40px;
            text-indent: 10px;
            border-radius: 3px 0 0 3px;
            border: 1px solid #dee1e8;
            width: 340px;
        }
        .el-icon-search{
            height: 40px;
            width: 60px;
            text-align: center;
            line-height: 40px;
            font-size: 15px;
            background-color: #f5f7fa;
            border: 1px solid #dee0e7;
            border-left: none;
            border-radius: 0 3px 3px 0 ;
        }
    }
    /deep/ .el-dialog{
        width: 800px!important;

    }
    .header{
        /deep/ .el-input__inner{
            border-right: none;
            border-radius: 3px 0 0 3px;
            height: 42px;
        }
    }

</style>
