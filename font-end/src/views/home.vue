<template>
    <div class="home">
        <div class="container">
            <p>养成记账好习惯</p>
            <p>--王凯</p>
            <img src="../assets/home.jpg" alt="">
        </div>
    </div>
</template>
<script>
// import HeadNav from '../components/HeadNav'
export default {
    name:'home',
    components:{
        // HeadNav
    }
}
</script>
<style  scoped>
.home img{
    width: 100%; height: 100%;
}
.home p {
    color: #ff6b81;
    font-size: 40px;
    display: inline-block;
    position: absolute;
    top:30%;
    left: 50%;
    transform: translateX(-50%);
}
.home p:nth-child(2) {
    color: #ff6b81;
    font-size: 40px;
    display: inline-block;
    position: absolute;
    top:38%;
    left: 64%;
    transform: translateX(-50%);
}
</style>
