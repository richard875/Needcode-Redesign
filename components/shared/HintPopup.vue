<script lang="js">
export default {
    props: {
        selectedQuestion: {
            type: [Object, null],
            required: true,
        },
    },
}
</script>

<template>
  <bx-modal-header>
    <bx-modal-close-button></bx-modal-close-button>
    <bx-modal-label>Hint from Neetcode</bx-modal-label>
    <div class="flex items-center">
      {{ selectedQuestion.question }}
    </div>
  </bx-modal-header>

  <bx-modal-body class="mx-4 px-2 pb-2 mb-5 bg-gray-200">
    <div class="font-semibold">
      {{ selectedQuestion.neetcodeHint }}
    </div>
  </bx-modal-body>
</template>
