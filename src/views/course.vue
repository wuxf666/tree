<template>
  <div>
    <div class="content">
      <div :id="id" class="chart-div" :option="option"></div>
    </div>
    <div class="search-div">
      <div class="linklist">
        <a >宇宙第一美PHP培训班</a><a >宇宙第一帅PHP提高班</a>
      </div>
      
      <div class="mint-searchbar">
        <div class="mint-searchbar-inner">
          <i class="mintui mintui-search"></i> 
          <input type="search" placeholder="搜索" class="mint-searchbar-core" v-model="searchtxt">
        </div>
        <a class="mint-searchbar-cancel" :style="searchtxt==''?'display:none':''">取消</a>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts/highcharts";
import HighchartsMore from "highcharts/highcharts-more";
// import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsOldie from "highcharts/modules/oldie";
HighchartsMore(Highcharts)
// HighchartsExporting(Highcharts);
HighchartsOldie(Highcharts);
import {getTree} from '../assets/js/response'
import {storage} from '../assets/js/tool'
import {Search,Toast} from 'mint-ui'
export default {
  data() {
    return {
      searchtxt:'',
      id: "pop",
      uid: storage.get('uid'),
      option: {
        chart: {
          type: "packedbubble",
          height: "100%"
        },
        title: {
          text: "职业技能列表"
        },
        tooltip: {
          useHTML: true,
        //   pointFormat: "<b>{point.name}:</b> {point.y}m CO<sub>2</sub>"
        },
        plotOptions: {
            series: {
			cursor: 'pointer',
			events: {
				click: (e)=> {
                    this.$router.push({path: '/skill', query:{name:  e.point.id}});
				}
			},
		},
          packedbubble: {
            minSize: "30%",
            maxSize: "120%",
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
              splitSeries: false,
              gravitationalConstant: 0.02
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
              filter: {
                property: "y",
                operator: ">",
                value: 150
              },
              style: {
                color: "black",
                textOutline: "none",
                fontWeight: "normal"
              }
            }
          }
        },
        series: []
      },
    };
  },
  created () {
       this.getTree();
  },
  mounted() {
    setTimeout(() => {
         Highcharts.chart(this.id, this.option,function(chart) { // 图表渲染完毕后的回调函数
            let xAxis = chart.xAxis[0];
        })
    }, 500);
   
   
  },
  
  methods: {
    selectSkill(str) {
         this.$router.push({path: '/skill', query:{name: str}});
    },
    getTree(){
         getTree().then(({data, status}) => {
            if (status == '200') {
               this.option.series=data
               storage.set('tree',JSON.stringify(data))
                // this.$router.push({path: '/course'});
            }else{
            }
        })
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 2rem 0;
}
.highcharts-exporting-group{display: none;}
label {
  width: 2.5rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
  color: aqua;
  display: inline-block;
}
.chart-div {
  width: 100%;
  min-width: 50%;
  max-width: 100%;
  height: 100%;
}
.search-div {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  input,a{
    font-size:0.8rem;
  }
  .linklist{
    text-align: left;
    padding: .5rem;
    a{
      color: #26a2ff;
      font-size: .6rem;padding-right:.5rem;
    }
  }
}
</style>