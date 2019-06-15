<template>
    <div class="con">
        <h4>Welcome</h4>
        <mt-field label="昵称：" placeholder="请输入昵称" v-model="uname"></mt-field>
       <i class="icons"></i>
        <!-- <mt-radio
            title="radio list"
            v-model="value"
            :options="['金蝉', '小蜜蜂', 'optionC']">
        </mt-radio> -->
        <div class="links">
            <!-- <p>系统会暂时默认一个金蝉的小动物呦</p> -->
             <!-- <router-link :to="{ name: 'course', query: { plan: 'private' }}"> -->
            <mt-button type="primary"  size="large" @click="goLogin">下一步</mt-button>
            <!-- </router-link> -->
        </div>
        <!-- <div  class="links" >
             <router-link :to="{ name: 'course', query: { plan: 'private' }}">
              <mt-button type="primary">小金蟾</mt-button>
            </router-link>
        </div> -->
       
        
      
    </div>
</template>

<script>
import {login} from '../assets/js/response'
import {storage} from '../assets/js/tool'
import {Button,Toast,Field} from 'mint-ui'
    export default {
        data() {
            return {
                uname: ''
            }
        },
        methods: {
            goLogin() {
                if(this.uname == ""){
                    Toast("请随便输入一个昵称^_^")
                    return;
                }
                 login({
                    userName: this.uname,
                 }).then(({data, status}) => {
                    if (status === '200') {
                        storage.set('uid',data.id)
                        this.$router.push({path: '/course'});
                    }else{
                        Toast(data)
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
.con{
    padding-top:2rem;
}
h4{
    font-size: 1rem;
    margin-bottom: 2rem;
}
.links{
    width: 90%;
    position: absolute;
    bottom:0;
    padding: .8rem 5%;
}
.icons{
    width:1rem;
}
</style>