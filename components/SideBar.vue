<script lang="ts">
import QuestionSet from "src/models/questionSet";

export default {
  props: {
    questions: {
      type: Array<QuestionSet>,
      required: true
    }
  },
  data() {
    return {
      currentTab: 0 as Number,
    };
  },
  methods: {
    selectTab(index: number) {
      this.currentTab = index;
      this.$emit("updateCurrentTab", this.currentTab);
    }
  },
};
</script>

<template>
  <div class="fixed w-80 top-12 bottom-0 left-0 bg-white sidebar">
    <bx-search
      label-text="Search"
      placeholder="Search Questions"
      size="xl"
    ></bx-search>

    <!-- Tags -->
    <div class="p-3 select-none">
      <div class="mb-1 ml-2 flex items-center">
        <SharedProgressCircle />
        <bx-tag class="ml-2 text-xs text-gray-900" type="blue">
          <p>&nbsp;75 / 150 questions completed&nbsp;</p></bx-tag
        >
      </div>

      <bx-tag class="cursor-pointer bg-gray-800 text-white" type="gray">
        &nbsp;Blind 75&nbsp;
      </bx-tag>
      <bx-tag class="cursor-pointer" type="gray">
        &nbsp;Neetcode 150&nbsp;
      </bx-tag>
    </div>

    <!-- Divider -->
    <bx-side-nav-divider class="mt-0"></bx-side-nav-divider>

    <div style="height: 70%; overflow: auto">
      <bx-side-nav-link
        v-for="(question, index) in questions"
        :key="index"
        :class="{ 'bx-side-nav-link-active': currentTab == index }"
        href="javascript:void(0)"
        @click="selectTab(index)"
        >{{ question.questionSet }}</bx-side-nav-link
      >
    </div>

    <!-- Fixed at bottom -->
    <div class="fixed bottom-0 w-full">
      <div class="p-3 text-xs leading-6 text-gray-700">
        <p>
          Contribute solutions:
          <a
            href="https://github.com/neetcode-gh/leetcode"
            target="_blank"
            class="text-blue-500 hover:text-blue-700"
            >Github</a
          >
        </p>
        <p>
          Contact:
          <a
            href="mailto:neetcodebusiness@gmail.com"
            target="_blank"
            class="text-blue-500 hover:text-blue-700"
            >neetcodebusiness@gmail.com</a
          >
        </p>
        <p>
          Copyright © {{ new Date().getFullYear() }}
          <a
            href="https://neetcode.io/"
            target="_blank"
            class="text-blue-500 hover:text-blue-700"
            >NeetCode.io</a
          >
          All rights reserved
        </p>
      </div>
      <bx-btn class="w-full">About</bx-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  border-right: 1px solid #e0e0e0;

  button {
    padding-left: 12px;
    height: 50px;
    width: 50%;
    font-size: 15px;
    text-align: left;
  }

  bx-side-nav-link {
    transition: 0.1s;
    border-left: 5px solid transparent;

    &:hover {
      background-color: #e9e9e9 !important;
    }
  }

  .bx-side-nav-link-active {
    border-left-color: #2e62fe;
  }
}
</style>
