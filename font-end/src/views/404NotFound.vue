<template>
    <div class="NotFound">
        <p> 404 NotFound</p>
    </div>
</template>
<script>
export default {
    name:'index',
    components:{}
}
</script>
<style  scoped>
    .NotFound {
        width: 100%;
        height: 100%;
        background: url(../assets/404.jpg);
    }
    p{
        font-size: 40px;
        color: red;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>
