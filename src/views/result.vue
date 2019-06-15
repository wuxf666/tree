<template>
    <div class="con">
       <scroller>
          <p class="h4">问题列表</p>
          <DIV v-if="qlist.length>0">
             <mt-cell v-for="qes in qlist" :key=qes.id :title=qes.question :label=qes.name is-link></mt-cell>
          </DIV>
          <P v-else>暂无问题~你来添加吧</P>
       
       </scroller>
       <div class="txt-div">
         <mt-field label="你的问题" placeholder="回车即提交" type="textarea" rows="3" v-model="question" @keyup.enter.native="postQues"></mt-field>

       </div>
      
    </div>
</template>

<script>
import {getAsksList,setAsk} from '../assets/js/response'
import {storage} from '../assets/js/tool'
import {Button,Toast,Cell,Field } from 'mint-ui'
    export default {
        data() {
            return {
                question: '',
                qlist:[]
            }
        },
        mounted () {
          this.getaList();
        },
        methods: {
          getaList(){
            getAsksList().then(({data, status}) => {
                    if (status === '200') {
                        this.qlist = data.list;
                    }else{
                        Toast(data)
                    }
                })
          },
            postQues() {
                if(this.question == ""){
                    Toast("请输入问题^_^")
                    return;
                }
                 setAsk({
                   userId:storage.get('uid'),
                    title: this.question,
                    question: this.question,
                 }).then(({data, status}) => {
                    if (status === '200') {
                        this.$router.push({path: '/skilldetail',
                        query:{
                          lid:this.$route.query.lid || ""
                        }});
                    }else{
                        Toast(data)
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
.mint-cell{
      text-align: left;

}
.con{
    padding-top:2rem;
}
p.h4{
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    padding-top:1rem;
    margin-bottom: 1rem;
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
.txt-div{
  width: 100%;
  height: 4rem;
  position: fixed;
  bottom:0;
}
</style>