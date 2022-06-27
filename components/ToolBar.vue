<template>
  <div class="p-7 flex items-center justify-between">
    <!-- Left -->
    <div>
      <bx-btn kind="secondary">Neetcode 150</bx-btn>
      <bx-btn class="ml-3" kind="secondary">Blind 75</bx-btn>
    </div>

    <!-- Right -->
    <div class="flex">
      <bx-search
        label-text="Search"
        placeholder="Search Leetcode"
        size="xl"
      ></bx-search>
      <bx-btn class="ml-3" kind="primary">About</bx-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#input {
  background-color: gray;
}
</style>
