<template>
    <div class="content">

        <p v-if="score>80">通过</p>
        <p v-else>重新开始</p>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                score:this.$route.query.point||"0",
            }
        },
        methods: {
            selectSkill() { 
            }
        },
        
    }
</script>

<style lang="less" scoped>
.content{
    padding: 2rem .5rem 0;
}

</style>