<script lang="ts">
export default {
  props: {
    display: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <div
    :class="[
      display ? 'opacity-100 visible' : 'opacity-0 invisible',
      'absolute top-0 left-0 flex items-center justify-center z-1999 loading-continer transition-all',
    ]"
  >
    <div class="spinner-wrapper">
      <div class="atom">
        <div class="center"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="e"></div>
        <div class="e"></div>
        <div class="e"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-continer {
  background-color: #161616;
  width: 100vw;
  height: 100vh;

  .spinner-wrapper {
    transform: scale(0.5);
  }
}

$degrees: 360deg/3;
$move: 130px;
$move-2: 75px;

@mixin center($w, $h) {
  position: absolute;
  top: calc(50% - #{$h/2});
  left: calc(50% - #{$w/2});
}
@keyframes rotate {
  100% {
    transform: rotate(-360deg);
  }
}
.atom {
  animation: rotate 10s linear infinite;
  @include center(0px, 0px);
}

.center {
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  @include center(30px, 30px);
}
.ring {
  width: 50px;
  height: 50px;
  border: 2.5px solid white;
  border-radius: 50%;
  @include center(55px, 55px);
  @for $i from 2 through 5 {
    &:nth-of-type(#{$i}) {
      transform: rotate($i * $degrees) scaleX(5) scaleY(3);
    }
  }
}
.e {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  @include center(20px, 20px);
  @for $i from 4 through 8 {
    &:nth-of-type(#{$i}) {
      transform: rotate($i * $degrees) translate($move);
      animation: move-#{$i} 5s infinite;
    }
  }
}
@for $i from 4 through 8 {
  @keyframes move-#{$i} {
    25% {
      transform: rotate($i * $degrees + 90deg) translate($move-2);
    }
    50% {
      transform: rotate($i * $degrees + 180deg) translate($move);
    }
    75% {
      transform: rotate($i * $degrees + 270deg) translate($move-2);
    }
    100% {
      transform: rotate($i * $degrees + 360deg) translate($move);
    }
  }
}
</style>
