<script lang="ts">
import type { PropType } from "vue";
import QuestionSet from "src/models/questionSet";

export default {
  emits: ["updateCurrentTab", "updateQuestionMode"],
  props: {
    questions: {
      type: Object as PropType<Array<QuestionSet>>,
      required: true,
    },
    totalCompletedQuestions: {
      type: Number,
      required: true,
    },
    menuOpen: {
      type: Boolean,
    },
  },
  data() {
    return {
      currentTab: 0 as Number,
      blindQuestions: false as Boolean,
      openModal: false as Boolean,
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
    },
  },
  computed: {
    totalNumberOfQuestion() {
      let total: number = 0;
      this.questions.forEach(
        (questionSet: QuestionSet) => (total += questionSet.questions.length)
      );
      return total;
    },
  },
};
</script>

<template>
  <div
    :class="[
      menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
      'lg:opacity-100 lg:visible fixed w-80 mb-44 maxmd:mb-0 top-12 bottom-0 left-0 bg-white overflow-y-auto sidebar sidebar-border z-999 shadow transition-all',
    ]"
  >
    <div class="fixed top-12 w-80 z-50 bg-white sidebar-border">
      <bx-search
        label-text="Search"
        placeholder="Search Questions"
        size="xl"
      ></bx-search>

      <!-- Tags -->
      <div class="p-3 select-none">
        <div class="mb-1 ml-2 flex items-center">
          <SharedProgressCircle
            :percentage="
              Math.round(
                (totalCompletedQuestions / totalNumberOfQuestion) * 100
              )
            "
          />
          <bx-tag class="ml-2 text-xs text-gray-900" type="blue">
            <p>
              &nbsp;{{ totalCompletedQuestions }}
              &nbsp;/&nbsp;
              {{ totalNumberOfQuestion }}&nbsp; questions completed
            </p>
          </bx-tag>
        </div>

        <bx-tag
          :class="[
            { 'bg-gray-800 text-white': blindQuestions },
            'cursor-pointer',
          ]"
          type="gray"
          @click="changeQuestionMode(true)"
        >
          &nbsp;Blind 75&nbsp;
        </bx-tag>
        <bx-tag
          :class="[
            { 'bg-gray-800 text-white': !blindQuestions },
            'cursor-pointer',
          ]"
          type="gray"
          @click="changeQuestionMode(false)"
        >
          &nbsp;Neetcode 150&nbsp;
        </bx-tag>
      </div>

      <!-- Divider above the question list -->
      <bx-side-nav-divider class="mt-0"></bx-side-nav-divider>
    </div>

    <div style="margin-top: 150px">
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
    <div class="maxmd:hidden fixed bottom-0 bg-white w-80 sidebar-border">
      <!-- Divider above the question list -->
      <bx-side-nav-divider></bx-side-nav-divider>

      <div class="p-3 !pt-1 text-xs leading-6 text-gray-700">
        <SharedAppInfo />
      </div>
      <bx-btn class="w-full" @click="openModal = true">About</bx-btn>
    </div>
  </div>

  <!-- About modal box -->
  <Transition name="bounce">
    <bx-modal v-if="openModal" @bx-modal-beingclosed="openModal = false" open>
      <SharedInfoModal />
    </bx-modal>
  </Transition>
</template>

<style lang="scss" scoped>
@import "src/style/popup.scss";

.sidebar {
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

.sidebar-border {
  border-right: 1px solid #e0e0e0;
}
</style>
