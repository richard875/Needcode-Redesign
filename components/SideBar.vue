<script lang="ts">
import QuestionSet from "src/models/questionSet";

export default {
  emits: ["updateCurrentTab", "updateQuestionMode"],
  props: {
    questions: {
      type: Array<QuestionSet>,
      required: true
    }
  },
  data() {
    return {
      currentTab: 0 as Number,
      blindQuestions: false as Boolean,
      openModal: false as Boolean
    };
  },
  methods: {
    selectTab(index: number) {
      this.currentTab = index;
      this.$emit("updateCurrentTab", this.currentTab);
    },
    changeQuestionMode(blindQuestions: boolean) {
      this.blindQuestions = blindQuestions;
      this.$emit("updateQuestionMode", this.blindQuestions);
    }
  },
  computed: {
    totalNumberOfQuestion() {
      let total: number = 0;
      this.questions.forEach((questionSet: QuestionSet) => total += questionSet.questions.length);
      return total
    },
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
        <SharedProgressCircle
          :percentage="Math.round((10 / totalNumberOfQuestion) * 100)"
        />
        <bx-tag class="ml-2 text-xs text-gray-900" type="blue">
          <p>
            &nbsp;10 / {{ totalNumberOfQuestion }} questions completed&nbsp;
          </p>
        </bx-tag>
      </div>

      <bx-tag
        class="cursor-pointer"
        :class="{ 'bg-gray-800 text-white': blindQuestions }"
        type="gray"
        @click="changeQuestionMode(true)"
      >
        &nbsp;Blind 75&nbsp;
      </bx-tag>
      <bx-tag
        class="cursor-pointer"
        :class="{ 'bg-gray-800 text-white': !blindQuestions }"
        type="gray"
        @click="changeQuestionMode(false)"
      >
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
          Made with &#9829; in
          <a
            href="https://www.youtube.com/watch?v=rMdbVHPmCW0"
            target="_blank"
            class="text-blue-500 hover:text-blue-700"
            >Sydney, Australia &#127462;&#127482;
          </a>
        </p>
        <p>
          Contribute solutions:
          <a
            href="https://github.com/neetcode-gh/leetcode"
            target="_blank"
            class="text-blue-500 hover:text-blue-700"
          >
            Github
          </a>
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
      <bx-btn class="w-full" @click="openModal = true">About</bx-btn>
    </div>
  </div>

  <!-- About modal box -->
  <bx-modal :open="openModal" @bx-modal-beingclosed="openModal = false">
    <bx-modal-header>
      <bx-modal-close-button></bx-modal-close-button>
      <bx-modal-label>About</bx-modal-label>
      <bx-modal-heading>
        <span>
          <b>TLDR</b>
          : A <b>better</b> way to prepare for coding interviews
        </span>
      </bx-modal-heading>
    </bx-modal-header>
    <bx-modal-body class="px-5 mb-5">
      <div class="leading-6">
        <p>
          &#x2022; The <b>Blind 75</b> is a popular list of Algorithm practice
          problems. I created the <b>Neetcode 150</b> by adding 75 more problems
          to make a more beginner friendly and more comprehensive list.
        </p>
        <p>
          &#x2022; Try starting with a few Easy problems from each topic, or
          maybe solve each topic all at once.
        </p>
        <p>
          &#x2022; Get stuck? I've created a <b>thorough</b> &#127909; video
          explanation for each problem.
        </p>
        <p>
          &#x2022; Some of the problems require LC premium (e.g. Meeting Rooms),
          in that case I've linked to a free alternative site instead.
        </p>
      </div>

      <!-- Divider -->
      <bx-side-nav-divider class="my-5"></bx-side-nav-divider>

      <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/aa2ijyWBBIc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </bx-modal-body>
  </bx-modal>
</template>

<style lang="scss" scoped>
.sidebar {
  border-right: 1px solid #e0e0e0;

  bx-side-nav-link {
    border-right: 5px solid transparent;

    &:hover {
      background-color: #e9e9e9 !important;
    }
  }

  .bx-side-nav-link-active {
    border-right-color: #2e62fe;
    background-color: #e9e9e9 !important;
  }
}

// YouTube player in the popup modal
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
