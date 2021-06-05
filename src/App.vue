<template>
  <div id="app">


    <router-view />
  </div>
</template>
<script>
  // import cz from './views/cz'
  export default {
    data(){
      return{
        Obj:{
          name:'aaaa'
        },
        as:'1'
      }
    },
    components:{
      // cz
    },
      provide(){
        return  {
          text:this.as,
          obj:this.Obj
        }
      },
    methods:{
      a(){
        this.as='2'
        // this.Obj.name='bbb'
      }
    }
  }
</script>
<style lang="less">
      body,html{
        width: 100%;
        height: 100%;
        background-color: #2b4b6b!important;
      #app{
        height: 100%;
      }
      }
</style>
