<script lang="ts">
import "carbon-web-components/es/components/tooltip/index.js";
import "carbon-web-components/es/components/search/index.js";
import "carbon-web-components/es/components/button/index.js";
import "carbon-web-components/es/components/ui-shell/index.js";
import "carbon-web-components/es/components/tag/index.js";
import "carbon-web-components/es/components/data-table/index.js";
import "carbon-web-components/es/components/checkbox/index.js";
import "carbon-web-components/es/components/modal/index.js";
import data from "assets/data/questions.json";
import Question from "src/models/question";
import QuestionSet from "src/models/questionSet";
import DeepCopy from "./helper/deepCopy";

export default {
  data() {
    return {
      currentTab: 0 as Number,
      blindQuestions: false as Boolean,
      questions: DeepCopy(data) as Array<QuestionSet>,
    };
  },
  methods: {
    updateCurrentTab(index: number) {
      this.currentTab = index;
    },
    updateBlindQuestions(blindQuestions: boolean) {
      this.blindQuestions = blindQuestions;
      this.questions = DeepCopy(data) as Array<QuestionSet>;

      if (this.blindQuestions) {
        this.questions.forEach((questionSet: QuestionSet) => {
          questionSet.questions = questionSet.questions.filter(
            (question: Question) => question.blindQuestion
          );
        });
      }
    },
  },
  head() {
    const colorMode = useColorMode();
    const favicon: string = `assets/images/assembly_icon${
      colorMode.value === "dark" ? "" : "_light"
    }.svg`;

    return {
      link: [
        {
          hid: "icon",
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <!-- Top bar -->
    <NavBar />

    <!-- Left side -->
    <SideBar
      :questions="questions"
      @updateCurrentTab="updateCurrentTab"
      @updateQuestionMode="updateBlindQuestions"
    />

    <!-- Right side -->
    <div class="ml-80 !pt-20 p-10">
      <QuestionSection
        :questions="questions"
        :current-tab="currentTab"
        :blind-questions="blindQuestions"
      />
    </div>
  </div>
</template>
