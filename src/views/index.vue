<template>
        <div>
            <el-container>
<!--              左边-->
                <el-aside width="">
                    <el-menu text-color="#fff" router  :default-active="index"active-text-color="#ffd04b"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                        <el-submenu  v-for="(item,index) in list" :key="index"  :index="item.path">
                            <template slot="title">
                                <i :class="ic[index]"></i>
                                <span slot="title">{{item.authName}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-for="(ite,index) in item.children" :key="index"  :index="'/index/'+ite.path" @click="fn('/index/'+ite.path)">用户列表</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                    </el-menu>
              </el-aside>
<!--                头部-->
                <el-main>

                    <el-header>
                        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                            <el-radio-button v-show="isCollapse" key="1" :label="false">
                                <span class="el-icon-s-unfold"  ></span>
                            </el-radio-button>
                            <el-radio-button v-show="!isCollapse" :label="true" key="2">
                                <span class="el-icon-s-fold"  ></span>
                            </el-radio-button>
                        </el-radio-group>
                        <el-button type="info" @click="back()">退出</el-button>

                    </el-header>
                    <!--                表单部分-->
                    <div class="go" v-if="$route.path=='/index'">Welcome</div>
                    <router-view></router-view>
                </el-main>
        </el-container>
        </div>
</template>

<script>
    import {leftlist} from '@/api/index'
    export default {
        name:'index',
        // props:['obj'],
        // inject:['text','obj'],
        inject:{
            text:{
                from:'text',
                default:'aaa'
            },
        },
        data() {
            return {
                index:sessionStorage.getItem('index')||'/index/users',
                isCollapse: false,
                list:[],
                ic:['el-icon-user-solid','el-icon-s-release','el-icon-s-goods','el-icon-s-order','el-icon-collection']
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            back(){
                sessionStorage.removeItem('token')
                this.$router.replace('/home')
            },
            fn(v){
                sessionStorage.setItem('index',v)
                console.log(v)
            }
        },
      async  created() {
            const res = await  leftlist()
          this.list=res.data.data
          console.log(this.text)
          console.log(res.data.data)
        }
    }
</script>

<style scoped lang="less">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }
    /deep/ .el-radio-button__inner{
        border-radius: 3px !important;
        color: #fff;
    }
    /deep/ aside{

    }

    #app{
        height: 100%;

    }
    #app>div{
        height: 100%;
    }
    /deep/ .el-container{
        height: 100%;
        .el-aside{
            background-color: #2f4050;
        }
        .el-menu{
            background-color: #2f4050;
            border-right: 0;
        }
    }
    /deep/ .el-main,.el-header{
        background-color: #fff;
        padding: 0;
    }
    /deep/ .el-header{
        height: 66px!important;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dddddd;
    }
    /deep/ .el-radio-group{
        margin-bottom: 0!important;
        margin-left: 22px!important;
    /*    67c23a*/
    }
    /deep/ .el-radio-button__inner{
        background-color: #67c23a;
        border: none;
    }
    /deep/ .el-radio-button:first-child{
        border: none;
    }
    .go{
        font-size: 17px;
        font-weight: bold;
        margin-left: 22px;
        margin-top: 28px;
    }
    /deep/ .el-button--info{
        margin-right: 22px;
    }
</style>
