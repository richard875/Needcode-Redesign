<script lang="js">
import Prism from "prismjs";
import "../../src/style/code/prism-google-theme.css"; // Google code snippet theme
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/plugins/file-highlight/prism-file-highlight.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js";
import TagColor from "../../helper/tagColor"
import GithubCodeLink from "../../helper/githubCodeLink"
import Difficulty from "../../src/enum/difficulty";
import CodeLanguage from "../../src/enum/codeLanguage";

export default {
  props: {
    selectedQuestion: {
      type: Object, // Question type
      required: true,
    },
    selectedCodeLanguage: {
      type: Number, // CodeLanguage enum (with number)
      required: true,
    },
    codeModalOpen: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  methods: {
    TagColor,
    GithubCodeLink,
    closeModal() {
      this.$emit("closeModal");
    }
  },
  updated() {
    if (this.codeModalOpen) Prism.highlightAll();
  },
  watch: {
    selectedQuestion(newValue) {
        if (newValue.pythonUrl !== "" && newValue.pythonUrl !== null) {
            this.rawPythonUrl = this.GithubCodeLink(newValue.pythonUrl);
            this.pythonUrl = newValue.pythonUrl;
            this.componentKey += 1; // Force re-rendering of component by plusing 1 every cycle
        }
    }
  },
  data() {
    return {
      Difficulty,
      CodeLanguage,
      pythonUrl: "",
      rawPythonUrl: "",
      componentKey: 0, // To force re-rendering of the code snippet
    };
  },
};
</script>

<template>
  <bx-modal :open="codeModalOpen" @bx-modal-beingclosed="closeModal">
    <bx-modal-header>
      <bx-modal-close-button></bx-modal-close-button>
      <bx-modal-label>Leetcode Problem</bx-modal-label>

      <div class="flex items-center my-2">
        <bx-tag
          v-if="selectedQuestion"
          class="ml-0"
          :type="TagColor(selectedQuestion.difficulty)"
        >
          {{ Difficulty[selectedQuestion.difficulty] }}
        </bx-tag>
        <bx-tooltip-icon
          alignment="center"
          :body-text="CodeLanguage[selectedCodeLanguage]"
          direction="right"
        >
          <bx-tag v-if="selectedQuestion" class="ml-1" type="cyan">
            <font-awesome-icon
              size="lg"
              :icon="`fa-brands fa-${
                selectedCodeLanguage === CodeLanguage.Python ? 'python' : 'java'
              }`"
            />
          </bx-tag>
        </bx-tooltip-icon>
      </div>
      <div v-if="selectedQuestion" class="flex items-center">
        <bx-modal-heading>
          {{ selectedQuestion.question }}
        </bx-modal-heading>
        <bx-tooltip-icon
          v-if="selectedQuestion.blindQuestion"
          class="ml-2 flex items-center justify-center"
          alignment="center"
          body-text="This problem is in Blind 75"
          direction="right"
        >
          <img
            src="assets/images/team_blind_favicon.ico"
            alt="Team Blind Logo"
            style="height: 18px"
          />
        </bx-tooltip-icon>
      </div>
    </bx-modal-header>

    <!-- Auto focus on this instead of other tooltips -->
    <bx-tooltip-icon alignment="center" direction="bottom"></bx-tooltip-icon>

    <!-- :key="componentKey": remount component when selectedQuestion changes -->
    <bx-modal-body
      v-if="selectedQuestion"
      :key="componentKey"
      class="px-5 mb-5"
    >
      <p>Solution:</p>
      <pre
        ref="code"
        language="python"
        class="line-numbers"
        :data-src="rawPythonUrl"
      ></pre>
    </bx-modal-body>
    <bx-modal-footer>
      <bx-modal-footer-button kind="secondary" data-modal-close>
        Close
      </bx-modal-footer-button>
      <bx-modal-footer-button kind="primary" :href="pythonUrl" target="_blank">
        <span>
          <font-awesome-icon icon="fa-brands fa-github" size="lg" />
          &nbsp;View in GitHub&nbsp;
          <font-awesome-icon
            icon="fa-solid fa-up-right-from-square"
            size="xs"
          />
        </span>
      </bx-modal-footer-button>
    </bx-modal-footer>
  </bx-modal>
</template>
