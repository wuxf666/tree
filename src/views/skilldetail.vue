<template>
  <div class="content">
    <div class="tree"></div>
    <div class="animal"></div>
    <ul>
      <li @click="goAnswer" v-for="(level,index) in levels" :key="index">level{{level}}-----</li>
    </ul>
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
      currentId: "",
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
          this.currentId = data.currentLevel;
          this.levels = data.questionLevel;
        } else {
          Toast("fds");
        }
      });
    },
    goAnswer() {
      this.$router.push(
          {
            path: "/answer",
            query: {
                 lid: this.currentId,
                 nid:this.lid
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
  }
}
</style>