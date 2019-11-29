<template>
  <div class="return-btn" :class="white=='white'?'white':'gray'">
    <span class="icon-return" @click="$router.go(-1)"></span>
  </div>
</template>

<script>
export default {
  props: ["white"]
};
</script>

<style lang="scss" scoped>
.return-btn {
  position: absolute;
  left: 1rem;
  top: 1.3rem;
  font-size: 2.6rem;
  &.white {
    z-index: 300;
    span.icon-return {
      color: #fff !important;
    }
  }
  &.gray {
    z-index: 300;
    span.icon-return {
      color: #a0a0a0 !important;
    }
  }
}
</style>

