<script lang="ts">
const SUFFIX = "**HINT";

export default {
  props: {
    selectedQuestion: {
      type: [Object, null],
      required: true,
    },
    isNeetcodeHint: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    const savedHint = localStorage.getItem(
      this.selectedQuestion.question + SUFFIX
    );

    this.hint = savedHint;
    this.initialHint = savedHint;
  },
  methods: {
    save() {
      localStorage.setItem(this.selectedQuestion.question + SUFFIX, this.hint);
    },
    exit() {
      if (!this.hint) this.hint = "";
      if (!this.initialHint) this.initialHint = "";

      const changed = this.initialHint != this.hint;
      this.$emit("closeHintModal", changed);
    },
  },
  watch: {
    hint() {
      setTimeout(() => this.save(), 2000);
    },
  },
  data() {
    return {
      hint: null as String | null,
      initialHint: null as String | null,
    };
  },
};
</script>

<template>
  <bx-modal @bx-modal-beingclosed="exit" open>
    <bx-modal-header>
      <bx-modal-close-button></bx-modal-close-button>
      <bx-modal-label v-if="isNeetcodeHint">Hint from Neetcode</bx-modal-label>
      <bx-modal-label v-else>Add you own hint</bx-modal-label>
      <div class="flex items-center">
        {{ selectedQuestion.question }}
      </div>
    </bx-modal-header>

    <bx-modal-body class="mx-4 px-2 pb-2 mb-5 bg-gray-200">
      <div v-if="isNeetcodeHint" class="font-semibold">
        {{ selectedQuestion.neetcodeHint }}
      </div>
      <div v-else class="font-semibold">
        <bx-textarea
          v-model="hint"
          placeholder="Add hints or notes..."
          rows="10"
          cols="50"
        >
          <span slot="label-text"><b>Autosave</b> is on</span>
          <span slot="validity-message">Something isn't right</span>
        </bx-textarea>
      </div>
    </bx-modal-body>
  </bx-modal>
</template>
