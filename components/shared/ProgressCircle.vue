<script lang="ts">
export default {
  props: {
    percentage: {
      type: Number,
      required: true,
    },
  },
};
</script>

<template>
  <div class="percent">
    <svg>
      <circle cx="10" cy="10" r="8"></circle>
      <circle
        cx="10"
        cy="10"
        r="8"
        :style="{ '--percent': `${percentage}` }"
      ></circle>
    </svg>
  </div>
</template>

<style scoped>
.percent {
  position: relative;
}

svg {
  position: relative;
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);
}

svg circle {
  transition: 0.35s stroke-dashoffset;
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 2;
}

svg circle:last-of-type {
  stroke-dasharray: 50px;
  stroke-dashoffset: calc(50px - (50px * var(--percent)) / 100);
  stroke: #2e62fe;
}
</style>
