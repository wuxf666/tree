<template>
  <div class="content">
    <div class="tree"></div>
    <div class="animal"></div>
    <ul>
      <li @click="goAnswer" :class="currentLevel=='4'?'active':'' ">levelD-----</li>
      <li @click="goAnswer" :class="currentLevel=='3'?'active':'' ">levelC-----</li>
      <li @click="goAnswer" :class="currentLevel=='2'?'active':'' ">levelB-----</li>
      <li @click="goAnswer" :class="currentLevel=='1'?'active':'' ">levelA-----</li>
    </ul>
    <i class="edit" @click="goQusetion" ></i>
  </div>
</template>

<script>
import { storage } from "../assets/js/tool";
import { getLevel } from "../assets/js/response";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lid: this.$route.query.lid || "",
      currentLevel: "",
      levels: []
    };
  },
  mounted() {
    this.getLevl();
  },
  methods: {
    getLevl(id) {
      getLevel({
        userId: storage.get("uid"),
        nodeId: this.lid
      }).then(({ data, status }) => {
        if (status == "200") {
          this.currentLevel = data.currentLevel;
          console.log( this.currentLevel);
          
          storage.set('currentLevel',this.currentLevel);
          let oldLevel = storage.get('oldLevel')||'';
          if(oldLevel !=""){
            if(this.currentLevel > oldLevel){
              Toast("晋级了呢！加油！")
               storage.set('oldLevel',this.currentLevel);
            }else{
              Toast("继续努力呦~")
            }
          }
          this.levels = data.questionLevel;
        } else {
           storage.set('oldLevel',this.currentLevel);
        }
      });
    },
    goAnswer() {
      this.$router.push(
          {
            path: "/answer",
            query: {
              lid: this.currentLevel,
              nid:this.lid
            } });
    },
    goQusetion(){
       this.$router.push(
          {
            path: "/question",
            query: {
              lid: this.lid
            } });
    
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  position: relative;
}
.edit{
  width: 2rem;height: 2rem;
  display: block;
  background: url("../assets/img/edits.png");
   background-repeat: no-repeat;
  background-size: 100% 100%;
   position: absolute;
  bottom: 2rem;
  right: 1rem;
}
.tree {
  width: 10rem;
  height: 90%;
  position: absolute;
  top: 10%;
  bottom: 0;
  left: 50%;
  margin-left: -5rem;
  background: url("../assets/img/treeB.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.animal {
  width: 78/40em;
  height: 180/40rem;
  position: absolute;
  bottom: 100/40rem;
  right: 50%;
  margin-right: -1.2rem;
  background: url("../assets/img/animal.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
ul {
  width: 6rem;
  height: 90%;
  position: absolute;
  top: 10%;
  bottom: 0;
  left: 50%;
  margin-left: -6rem;
  li {
    font-size: 1.2rem;
    margin: 70% 0;
    height: 5%;
    text-align: right;
   
    // border:1px solid blue;
  }.active{
      color: #26a2ff;
    }
}
</style>