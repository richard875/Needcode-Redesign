<script lang="ts">
import type { PropType } from "vue";
import Prism from "prismjs";
import "../../src/style/code/prism-google-theme.css"; // Google code snippet theme
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/plugins/file-highlight/prism-file-highlight.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js";
import TagColor from "../../helper/tagColor";
import GithubCodeLink from "../../helper/githubCodeLink";
import Question from "src/models/question";
import Difficulty from "../../src/enum/difficulty";
import CodeLanguage from "../../src/enum/codeLanguage";

export default {
  props: {
    selectedQuestion: {
      type: [Object as PropType<Question>, null],
      required: true,
    },
    selectedCodeLanguage: {
      type: [Number, null], // CodeLanguage enum (with number)
      required: true,
    },
  },
  methods: {
    TagColor,
    GithubCodeLink,
  },
  mounted() {
    Prism.highlightAll();
  },
  data() {
    return {
      Difficulty,
      CodeLanguage,
    };
  },
};
</script>

<template>
  <bx-modal-header>
    <bx-modal-close-button></bx-modal-close-button>
    <bx-modal-label>Leetcode Problem</bx-modal-label>

    <div class="flex items-center my-2">
      <bx-tag class="ml-0" :type="TagColor(selectedQuestion.difficulty)">
        {{ Difficulty[selectedQuestion.difficulty] }}
      </bx-tag>
      <bx-tooltip-icon
        alignment="center"
        :body-text="CodeLanguage[selectedCodeLanguage]"
        direction="right"
      >
        <bx-tag type="cyan">
          <font-awesome-icon
            size="lg"
            :icon="`fa-brands fa-${CodeLanguage[
              selectedCodeLanguage
            ].toLowerCase()}`"
          />
        </bx-tag>
      </bx-tooltip-icon>
    </div>
    <div class="flex items-center">
      <bx-modal-heading>
        {{ selectedQuestion.question }}
      </bx-modal-heading>
      <bx-tooltip-icon
        v-if="selectedQuestion.blindQuestion"
        class="ml-2 flex items-center justify-center"
        alignment="center"
        body-text="This problem is in Blind 75"
        direction="bottom"
      >
        <img
          src="~/assets/img/team_blind_favicon.ico"
          alt="Team Blind Logo"
          style="height: 18px"
        />
      </bx-tooltip-icon>
    </div>
  </bx-modal-header>

  <!-- Auto focus on this instead of other tooltips -->
  <bx-tooltip-icon alignment="center" direction="bottom"></bx-tooltip-icon>

  <bx-modal-body class="px-5 mb-5">
    <p>Solution:</p>
    <pre
      ref="code"
      :language="CodeLanguage[selectedCodeLanguage].toLowerCase()"
      class="line-numbers"
      :data-src="
        GithubCodeLink(
          selectedCodeLanguage === CodeLanguage.Python
            ? selectedQuestion.pythonUrl
            : selectedQuestion.javaUrl
        )
      "
    ></pre>
  </bx-modal-body>
  <bx-modal-footer>
    <bx-modal-footer-button kind="secondary" data-modal-close>
      Close
    </bx-modal-footer-button>
    <bx-modal-footer-button
      kind="primary"
      :href="
        selectedCodeLanguage === CodeLanguage.Python
          ? selectedQuestion.pythonUrl
          : selectedQuestion.javaUrl
      "
      target="_blank"
    >
      <span class="!whitespace-nowrap">
        <font-awesome-icon icon="fa-brands fa-github" size="lg" />
        &nbsp;View in GitHub&nbsp;
        <font-awesome-icon icon="fa-solid fa-up-right-from-square" size="xs" />
      </span>
    </bx-modal-footer-button>
  </bx-modal-footer>
</template>
