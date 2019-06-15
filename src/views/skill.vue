<template>
    <div class="content">
        <div id="tree-div">
            <div class="cloud"></div>
            <div class="cloud clond1"></div>
            <div class="tree"></div>
            <div class="tree-green"></div>
            <div  class="touch"  @click="getLevl(skill.id)" v-for="(skill,index ) in course" :key="skill.id" :class="index>0?'touch'+index:''">
                {{skill.name}}
            </div>
        </div>

    </div>
</template>

<script>
import {storage} from '../assets/js/tool'
    export default {
        data() {
            return {
                sname:this.$route.query.name||"ABBNB",
                course:[]
            }
        },
        mounted () {
            const skill = JSON.parse( storage.get('tree'));
            for (let obj in skill) {
                if(this.sname == skill[obj].id){
                    this.course = skill[obj].data
                }else{
                    for (const key in  skill[obj].data) {
                        let objA = skill[obj].data[key]
                        if (this.sname == objA.id) {
                           this.course =skill[obj].data
                        }
                    }

                }
                 console.log(this.course);
            }

        },
        methods: {
            getLevl(id) { 
                 this.$router.push({path: '/skilldetail', query:{lid: id}});
                // getLevel().then(({data, status}) => {
                //     if (status == '200') {
                       
                //         this.option.series=data
                //         storage.set('tree',JSON.stringify(data))
                //             // this.$router.push({path: '/course'});
                //     }else{
                //     }
                // })
                
            }
        },
        
    }
</script>

<style lang="less" scoped>
body{
    overflow: hidden;
}
.content{
    padding: 2rem 0;
}
#tree-div{
    width: 100%;
    height: 25rem;
    margin: auto ;
    // border:1px solid red;
    position: relative;
   
    .tree-green{
        width: 100%;
        height: 2rem;
        background: url("../assets/img/green.png");
        background-repeat:no-repeat;
        background-size:100% 100%;
        position: absolute;
        bottom: 0;
        z-index: 2;
    }
    .tree{
        width:14.65rem;
        height: 19.55rem;
        background: url("../assets/img/tree.png");
        background-repeat:no-repeat;
        background-size:100% 100%;
        position: absolute;
        bottom: .5rem;
        left: 50%;
        margin-left: -7.325rem;
        z-index: 1;
    }
    .cloud{
        width:4.6rem;
        height: 3rem;
        background: url("../assets/img/yun.png");
        background-repeat:no-repeat;
        background-size:100% 100%;
        position: absolute;
        top: .5rem;
        left: 10%;
        z-index: 1;
        animation: moveclouds 25s linear infinite;
    }.clond1{
        position: absolute;
        top: 1rem;
       left: 65%;
       transform: scale(0.8);
       animation: movecloud 15s linear infinite;
    }
    .touch{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        position: absolute;
        top: 6.5rem;
        left: 5.5rem;
            font-size: 1.8rem;
        z-index: 3;
        color: #26a2ff;
    }.touch1{
      position: absolute;
    top: 14rem;
    left: 2.5rem;
    }.touch2{
        position: absolute;
        top: 9.5rem;
        left: 10.5rem;
    }.touch3{
        position: absolute;
        top: 15.5rem;
        left: 10.5rem;
    }

}
@keyframes moveclouds {
  0% {left: 0;}
  100% {left: 15%;}
}
@keyframes movecloud {
  0% {left: 75%;}
  100% {left: 65%;}
}
    
</style>