<template>
    <div id="js_appr">
        <!-- <scroller> -->
            <div style="height: 2.15rem"></div>
            <div class="layout" v-if="currIndex == index" v-for="(i,index) in content" :key="index">
                <div class="tit-list">
                    <div class="issue-number">
                        <b>{{index + 1}}</b>
                        <span>/&nbsp;{{content.length}}</span>
                    </div>
                    <div class="issue-tit">{{i.title}}</div>
                </div>
                <div class="issue-up" v-show="currIndex !== 0" @click="issueUpFun(index)">上一题</div>
                <div class="issue-list">
                    <div class="list" v-for="(value,key) of i.options" :key="key">
                        <p @click="answerFun(index,key,i.answer)">
                            <i></i> 
                            <span class="answer">{{value}}</span>
                        </p>
                    </div>
                </div>
            </div>
        <!-- </scroller> -->
    </div>
</template>

<script>

import {storage} from '../assets/js/tool'
import {getQues,getpoint} from '../assets/js/response'
import {Toast} from 'mint-ui'
    export default {
        name: "riskIssue",
        data() {
            return {
                level:this.$route.query.lid || "",
                nodeId:this.$route.query.nid || "",
                prize: "", //分数
                isShowBtn: false, //上一题按钮
                currIndex: 0, //当前第几题
                content: [],
                scoreOptions: {},
                scores: [],
                answer: [],//答案集合
            };
        },
        computed: {
            total() {
                return this.content.length
            },
            totalScores() {
                return this.scores.reduce(function (prev, next) {
                    return Number(prev) + Number(next)
                })
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.getQuestion();
                setTimeout(() => {
                    this.cmtFun()
                }, 5000);
                
                // document.body.addEventListener("touchstart", function () {});
            });
        },
        methods: {
            getQuestion(){
                getQues({
                    level: this.level,
                    nodeId:this.nodeId
                }).then(({data, status}) => {
                    if (status == '200') {
                       this.content = data;
                        // this.scoreOptions = data.score;
                    }else{
                        Toast("fds")
                    }
                })
            },
            escFun() {
                this.answer.pop();
                this.scores.pop();
            },
            cmtFun() {
                getpoint({
                    userId: storage.get("uid"),
                    level: this.level,
                    nodeId:this.nodeId,
                    score: 90
                }).then(({status, data: d}) => {
                    if (status == '200') {
                        this.$router.push({
                            path: "/result",
                            query: {
                                point:90
                            }
                        });
                    }
                });
            },
            answerFun(index, option,answer) {
                
                if (this.scores.length !== this.total) {
                    this.answer.push(option);
                    if((option+1) == parseInt(answer)){
                        this.scores.push(option);
                    }
                }
               
            },
            issueUpFun(index) {
                this.escFun();
                this.currIndex = index - 1;
            }
        }
    }
    ;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @baserem: 40;
     @backgroundColor:#fff;
     @baseBlack:#333;
     @baseRed:red;
    #js_appr {
        width: 100%;
        height: 100%;
        background-color: @backgroundColor;
        overflow: hidden;
    }

    .layout {
        /*display: none;*/
    }

    .issue-number {
        padding: unit(38 / @baserem, rem) 0 unit(18 / @baserem, rem) unit(34 / @baserem, rem);
        b {
            font-weight: 400;
            font-size: unit(90 / @baserem, rem);
            color: @baseBlack;
            line-height: unit(96 / @baserem, rem);
        }
        span {
            font-size: unit(28 / @baserem, rem);
            color: #BCBCBC;
            line-height: unit(28 / @baserem, rem);
        }
    }

    .issue-tit {
        font-weight: 700;
        font-size: unit(44 / @baserem, rem);
        color: @baseBlack;
        padding: 0 unit(42 / @baserem, rem) unit(42 / @baserem, rem) unit(42 / @baserem, rem);
    }

    .issue-up {
        font-size: .75rem;
        color: rgba(85,113,172,1);
        line-height: unit(32 / @baserem, rem);
        padding: 0 0 unit(56 / @baserem, rem) 1.05rem;
    }

    .issue-list {
        width: 100%;
        padding: 0 .6rem;
        box-sizing: border-box;
        /*overflow: hidden;*/
        p {
            min-height: unit(90 / @baserem, rem);
            font-size: unit(28 / @baserem, rem);
            color: #282828;
            background-color: #fcfcfc;
            margin-bottom: unit(24 / @baserem, rem);
            overflow: hidden;
            padding:0.6rem unit(34 / @baserem, rem);
            /*box-sizing: border-box;*/
             //line-height: unit(130 / @baserem, rem);
            display: flex;
            align-items: center;
            -webkit-tap-highlight-color: #e2e2e2;
                        i{
                    display: inline-block;
                    width: .3rem;
                    height: .3rem;
                    background:rgba(85,113,172,.4);
                    border-radius: 50%;
                    margin-right: .4rem;
                }
        }
        p.both {
            line-height: inherit;
            .option {
                margin-top: unit(30 / @baserem, rem);
            }
            .answer {
                margin-top: unit(30 / @baserem, rem);
            }
        }
        span {
            /*float: left;*/
            display: block;
        }
        .option {
            margin-right: unit(16 / @baserem, rem);
        }
        .answer {
            width: unit(600 / @baserem, rem);

        }
    }

    .dialog {
        width: 100%;
        height: 100%;
        background-color: #000;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;

        .cont {
            position: fixed;
            top: 50%;
            left: 50%;
            width: unit(641 / @baserem, rem);
            //min-height:unit(432/@baserem,rem);
            height: auto;
            overflow: hidden;
            margin-top: unit(-216 / @baserem, rem);
            margin-left: unit(-320 / @baserem, rem);
            border-radius: 8px;
            box-shadow: 6px 11px 13px 0;
            .text {
                background-color: #fff;
                color: @baseBlack;
                font-size: unit(38 / @baserem, rem);
                line-height: unit(73 / @baserem, rem);
                padding: unit(76 / @baserem, rem) unit(64 / @baserem, rem) unit(58 / @baserem, rem) unit(58 / @baserem, rem);
            }
            .btns {
                background-color: #f5f5f5;
                padding: unit(34 / @baserem, rem) unit(32 / @baserem, rem);
                overflow: hidden;
            }
            .esc,
            .cmt {
                float: left;
                width: unit(275 / @baserem, rem);
                height: unit(82 / @baserem, rem);
                border-width: 1px;
                border-style: solid;
                line-height: unit(84 / @baserem, rem);
                font-size: unit(34 / @baserem, rem);
                text-align: center;
                border-radius: 5px;
            }
            .esc {
                border-color: #989898;
                color: @baseBlack;
                margin-right: unit(12 / @baserem, rem);
                background-color: #fff;
            }
            .cmt {
                border:1px solid @baseRed;
                color: #fff;
                background-color: @baseRed;
            }
        }
    }

    .show {
        display: block;
    }
</style>
