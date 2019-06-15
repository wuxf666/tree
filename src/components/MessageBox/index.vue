<template>
    <div class="pop" v-if="show">
        <div class="dialog">
            <p class="d-close" :class="{'d-close-bottom':title}">
                {{title}}
                <i v-if="isShowClose" @click="hideDialog"></i>
            </p>
            <div class="d-inf">
                <p class="d-tip" v-html="errorTip"></p>
            </div>
            <div class="d-btn" v-if="btnTxt">
                <p class="d-a" @click="forword">{{btnTxt}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "message-box",
        data() {
            return {
                show: false,
                isShowClose:true,
                errorTip: "",
                btnTxt: "",
                title: ""
            };
        },
        methods: {
            hideDialog() {
                this.show = false;
            }
        }
    };
</script>

<style lang="less" scoped>
    .vertical-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .pop {
        font-size: 18/20rem;
        color: #333333;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        z-index: 100000;
    }

    .dialog {
        border-radius: 5px;
        background-color: #fff;
        position: absolute;
        width: 292/20rem;
        .vertical-center;
    }
    .d-inf {
        padding: 0.85rem 1rem;
    }

    .d-tip {
        line-height: 25/20rem;
        text-align: left;
        font-size: 0.7rem;
        color: #959595;
        font-weight: normal;
    }

    .d-tip b {
        color: #ee4634;
        font-weight: normal;
    }

    .d-btn {
        padding: 25/20rem 16/20rem;
        height: auto;
        border-top: solid 1px #e5e5e5;
    }

    .d-a {
        line-height: 44/20rem;
        width: 260/20rem;
        text-align: center;
        background-color: #ff3746;
        border-radius: 5px;
        color: #f6f6f6;
    }

    .d-close {
        position: relative;
        line-height: 2.625rem;
        height: 2.625rem;
        text-align: center;
        font-size: 0.9rem;
    }

    .d-close-bottom {
        border-bottom: 1px solid #e5e5e5;
    }

    .d-close i {
        .vertical-center;
        background: url(../../assets/img/close.png) center;
        background-size: 100%;
        display: inline-block;
        width: 16/20rem;
        height: 16/20rem;
        right: 1rem;
        left: auto;
    }
</style>
