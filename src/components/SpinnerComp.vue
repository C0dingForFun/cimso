<template>
    <div class="spinner">
        <div class="pinwheel">
            <div class="pinwheel__line"></div>
            <div class="pinwheel__line"></div>
            <div class="pinwheel__line"></div>
            <div class="pinwheel__line"></div>
            <div class="pinwheel__line"></div>
            <div class="pinwheel__line"></div>
        </div>
        <h2>Loading...</h2>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .spinner{
        width:100vw;
        height:80vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    h2{
    margin-left:5px;
    }

    .pinwheel {
    --uib-size: 45px;
    --uib-speed: 0.8s;
    --uib-color: #312f2b;
    --uib-line-weight: 4px;
    position: relative;
    height: var(--uib-size);
    width: var(--uib-size);
    }

    .pinwheel__line {
    position: absolute;
    top: calc(50% - var(--uib-line-weight) / 2);
    left: 0;
    height: var(--uib-line-weight);
    width: 100%;
    border-radius: calc(var(--uib-line-weight) / 2);
    background-color: rgb(190, 215, 57);
    animation: rotate81232 var(--uib-speed) ease-in-out infinite;
    }

    .pinwheel__line:nth-child(2) {
    animation-delay: calc(var(--uib-speed) * 0.075);
    opacity: 0.8;
    }

    .pinwheel__line:nth-child(3) {
    animation-delay: calc(var(--uib-speed) * 0.15);
    opacity: 0.6;
    }

    .pinwheel__line:nth-child(4) {
    animation-delay: calc(var(--uib-speed) * 0.225);
    opacity: 0.4;
    }

    .pinwheel__line:nth-child(5) {
    animation-delay: calc(var(--uib-speed) * 0.3);
    opacity: 0.2;
    }

    .pinwheel__line:nth-child(6) {
    animation-delay: calc(var(--uib-speed) * 0.375);
    opacity: 0.1;
    }

    @keyframes rotate81232 {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(180deg);
        }
    }

</style>