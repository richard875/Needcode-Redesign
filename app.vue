<script lang="ts">
import "carbon-web-components/es/components/tooltip/index.js";
import "carbon-web-components/es/components/search/index.js";
import "carbon-web-components/es/components/button/index.js";
import "carbon-web-components/es/components/ui-shell/index.js";
import "carbon-web-components/es/components/tag/index.js";
import "carbon-web-components/es/components/data-table/index.js";
import "carbon-web-components/es/components/checkbox/index.js";
import data from "assets/data/questions.json";
import QuestionSet from "src/models/questionSet";

export default {
  data() {
    return {
      currentTab: 0 as Number,
      questions: data as Array<QuestionSet>,
    };
  },
  methods: {
    updateCurrentTab(index: number) {
      this.currentTab = index;
    },
  },
};
</script>

<template>
  <div>
    <!-- Top bar -->
    <NavBar />

    <!-- Left side -->
    <SideBar :questions="questions" @updateCurrentTab="updateCurrentTab" />

    <!-- Right side -->
    <div class="ml-80 p-10">
      <QuestionSection :current-tab="currentTab" />
    </div>
  </div>
</template>
