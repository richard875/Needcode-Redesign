<template>
  <div class="percent">
    <svg>
      <circle cx="10" cy="10" r="8"></circle>
      <circle cx="10" cy="10" r="8" style="--percent: 50"></circle>
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
