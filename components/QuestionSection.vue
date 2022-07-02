<script lang="ts">
import Question from "src/models/question";
import QuestionSet from "src/models/questionSet";
import Difficulty from "../src/enum/difficulty";
import CodeLanguage from "../src/enum/codeLanguage";
import Goto from "../helper/goto";
import TagColor from "../helper/tagColor";
import TagColorMobile from "../helper/tagColorMobile";
import NestedObjectLength from "../helper/nestedObjectLength";

// Const value
const NEETCODE_LOCALSTORAGE_QUESTION_LIST = "neetcode_localstorage_question_list";

export default {
  emits: ["totalCompletedQuestion"],
  props: {
    questions: {
      type: Array<QuestionSet>,
      required: true,
    },
    currentTab: {
      type: Number,
      required: false,
    },
    blindQuestions: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      Difficulty,
      CodeLanguage,
      openModal: false as Boolean,
      openNeetcodeHint: false as Boolean,
      selectedProblem: null as Question | null,
      selectedCodeLanguage: null as CodeLanguage | null,
      codeModalOpen: false as Boolean,
      currentSavedQuestions: null as Object | null,
    };
  },
  computed: {
    selectedQuestion() {
      return this.questions[this.currentTab] as QuestionSet;
    },
    setCompletedQuestion() {
      if (this.currentSavedQuestions && this.currentSavedQuestions[this.selectedQuestion.questionSet]) {
        let numberOfCompletedQuestion = 0;

        Object.entries(this.currentSavedQuestions[this.selectedQuestion.questionSet]).forEach((item) => {
          if (this.blindQuestions) {
            if (item[1] == 1) numberOfCompletedQuestion++;
          } else {
            numberOfCompletedQuestion++;
          }
        });

        return numberOfCompletedQuestion;
      }
      return 0;
    },
    totalCompletedQuestion() {
      if (this.currentSavedQuestions) return NestedObjectLength(this.currentSavedQuestions, this.blindQuestions);
      return 0;
    }
  },
  watch: {
    totalCompletedQuestion(newValue: number) {
      this.$emit("totalCompletedQuestion", newValue);
    },
  },
  mounted() {
    const neetCodeLocalStorage = localStorage.getItem(NEETCODE_LOCALSTORAGE_QUESTION_LIST);
    if (!neetCodeLocalStorage) localStorage.setItem(NEETCODE_LOCALSTORAGE_QUESTION_LIST, JSON.stringify({}));
    this.currentSavedQuestions = JSON.parse(neetCodeLocalStorage);;
  },
  methods: {
    Goto,
    TagColor,
    TagColorMobile,
    NestedObjectLength,
    statusChecked(event: any, questionSet: string, questionKey: string, blindQuestion: boolean) {
      const neetCodeLocalStorage = localStorage.getItem(NEETCODE_LOCALSTORAGE_QUESTION_LIST);
      let neetCodeLocalStorageObject = JSON.parse(neetCodeLocalStorage);

      if (neetCodeLocalStorageObject) {
        if (neetCodeLocalStorageObject[questionSet] && (neetCodeLocalStorageObject[questionSet][questionKey] != null)) {
          delete neetCodeLocalStorageObject[questionSet][questionKey];
        } else {
          if (!neetCodeLocalStorageObject[questionSet]) neetCodeLocalStorageObject[questionSet] = {};
          neetCodeLocalStorageObject[questionSet][questionKey] = blindQuestion ? 1 : 2;
        }
      }

      this.currentSavedQuestions = neetCodeLocalStorageObject;
      localStorage.setItem(NEETCODE_LOCALSTORAGE_QUESTION_LIST, JSON.stringify(neetCodeLocalStorageObject));
    },
    triggerModal(codeProblem: Question, codeLanguage: CodeLanguage) {
      this.selectedProblem = codeProblem;
      this.selectedCodeLanguage = codeLanguage;
      this.codeModalOpen = true;
    },
    triggerHint(codeProblem: Question, isNeetcode: boolean) {
      this.selectedProblem = codeProblem;
      this.openNeetcodeHint = true;
    },
    checked(leetcodeUrl: string) {
      return this.currentSavedQuestions &&
             this.currentSavedQuestions[this.selectedQuestion.questionSet] &&
             this.currentSavedQuestions[this.selectedQuestion.questionSet][leetcodeUrl];
    }
  }
};
</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <p class="text-2xl">{{ selectedQuestion.questionSet }}</p>
    <bx-tag
      @click="openModal = true"
      class="md:hidden cursor-pointer select-none whitespace-nowrap"
      type="red"
      title="Clear selection"
    >
      &nbsp;About Neetcode&nbsp;
    </bx-tag>
  </div>
  <div class="mb-4 flex items-center">
    <SharedProgressCircle
      :percentage="
        Math.round(
          (setCompletedQuestion / selectedQuestion.questions.length) * 100
        )
      "
    />
    <bx-tag
      class="ml-2 text-gray-900 select-none whitespace-nowrap"
      type="blue"
    >
      <p>
        &nbsp;{{ setCompletedQuestion }} /
        {{ selectedQuestion.questions.length }} questions completed&nbsp;
      </p>
    </bx-tag>
    <bx-tag
      :class="[
        setCompletedQuestion === selectedQuestion.questions.length
          ? 'opacity-100'
          : 'opacity-0',
        'ml-1 text-xs text-gray-900 transition-all select-none whitespace-nowrap',
      ]"
      type="green"
    >
      All Completed
    </bx-tag>
  </div>

  <bx-data-table>
    <bx-table>
      <bx-table-head class="maxmd:hidden">
        <bx-table-header-row>
          <bx-table-header-cell class="pr-0">Status</bx-table-header-cell>
          <bx-table-header-cell>Problem</bx-table-header-cell>
          <bx-table-header-cell>Difficulty</bx-table-header-cell>
          <bx-table-header-cell>Video Solution</bx-table-header-cell>
          <bx-table-header-cell>Hint</bx-table-header-cell>
          <bx-table-header-cell>Code</bx-table-header-cell>
        </bx-table-header-row>
      </bx-table-head>
      <bx-table-body>
        <bx-table-row
          v-for="(question, index) in selectedQuestion.questions"
          :key="index"
          class="border-b border-gray-300"
        >
          <!-- Status column -->
          <bx-table-cell>
            <bx-checkbox
              :checked="checked(question.leetcodeUrl)"
              @bx-checkbox-changed="
                statusChecked(
                  $event,
                  selectedQuestion.questionSet,
                  question.leetcodeUrl,
                  question.blindQuestion
                )
              "
            ></bx-checkbox>
          </bx-table-cell>
          <!-- Question column -->
          <bx-table-cell
            class="cursor-pointer pr-0"
            @click="Goto(question.leetcodeUrl)"
          >
            <div class="flex items-center">
              <span class="hover:underline mr-2">{{ question.question }}</span>
              <bx-tag
                type="purple"
                :class="[
                  checked(question.leetcodeUrl) ? 'opacity-100' : 'opacity-0',
                  'maxlg:hidden transition-all',
                ]"
              >
                <font-awesome-icon icon="fa-solid fa-check" />
              </bx-tag>
            </div>
          </bx-table-cell>
          <!-- Difficulty column -->
          <bx-table-cell class="maxmd:hidden">
            <bx-tag :type="TagColor(question.difficulty)">
              <span class="select-none whitespace-nowrap">
                {{ Difficulty[question.difficulty] }}
              </span>
            </bx-tag>
          </bx-table-cell>
          <!-- Video column -->
          <bx-table-cell>
            <!-- Only show on large screen -->
            <bx-btn
              v-if="question.videoUrl !== ''"
              class="maxmd:hidden"
              size="sm"
              :href="question.videoUrl"
              target="_blank"
            >
              <span class="text-xs">Video</span>
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                slot="icon"
              >
                <!---->
                <path
                  fill="#ffffff"
                  d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"
                />
                <polygon
                  fill="#ffffff"
                  points="20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2"
                />
              </svg>
            </bx-btn>
            <bx-btn v-else size="sm" class="maxmd:hidden" disabled>
              <span class="text-xs">Video coming soon</span>
            </bx-btn>

            <!-- Only show on small screen -->
            <div class="md:hidden flex-row-reverse flex items-center">
              <bx-overflow-menu size="sm">
                <bx-overflow-menu-body class="mt-2" alignment="end">
                  <bx-modal-label class="w-full pl-4 py-2 !m-0 bg-zinc-200">
                    Code
                  </bx-modal-label>
                  <!-- Python -->
                  <bx-overflow-menu-item
                    v-if="question.pythonUrl !== ''"
                    @click="triggerModal(question, CodeLanguage.Python)"
                  >
                    Python
                  </bx-overflow-menu-item>
                  <!-- Java -->
                  <bx-overflow-menu-item
                    v-if="question.javaUrl !== ''"
                    @click="triggerModal(question, CodeLanguage.Java)"
                  >
                    Java
                  </bx-overflow-menu-item>
                  <bx-modal-label class="w-full pl-4 py-2 !m-0 bg-zinc-200">
                    Hint
                  </bx-modal-label>
                  <!-- Neetcode -->
                  <bx-overflow-menu-item
                    v-if="question.neetcodeHint !== ''"
                    @click="triggerHint(question, true)"
                  >
                    Neetcode
                  </bx-overflow-menu-item>
                  <!-- Customize -->
                  <bx-overflow-menu-item>Add/Edit</bx-overflow-menu-item>
                </bx-overflow-menu-body>
              </bx-overflow-menu>
              <bx-btn
                :disabled="question.videoUrl === ''"
                :href="question.videoUrl"
                class="mr-3"
                kind="primary"
                size="sm"
                icon-layout=""
                target="_blank"
              >
                <svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  slot="icon"
                >
                  <!---->
                  <path
                    fill="#ffffff"
                    d="M7,28a1,1,0,0,1-1-1V5a1,1,0,0,1,1.4819-.8763l20,11a1,1,0,0,1,0,1.7525l-20,11A1.0005,1.0005,0,0,1,7,28ZM8,6.6909V25.3088L24.9248,16Z"
                    transform="translate(0)"
                  />
                </svg>
              </bx-btn>
              <div
                class="mr-3 w-8 h-8 flex items-center justify-center"
                :style="{
                  color: TagColorMobile(question.difficulty).TextColor,
                  backgroundColor: TagColorMobile(question.difficulty)
                    .BackgroundColor,
                }"
              >
                <span class="select-none">
                  {{ TagColorMobile(question.difficulty).Name }}
                </span>
              </div>
            </div>
          </bx-table-cell>
          <!-- Hint column -->
          <bx-table-cell class="maxmd:hidden">
            <div class="flex">
              <!-- Neetcode hint -->
              <bx-tooltip-icon
                class="mr-3"
                alignment="center"
                :body-text="
                  question.neetcodeHint === ''
                    ? 'Not provided, add your own!'
                    : 'From Neetcode'
                "
                direction="bottom"
              >
                <bx-btn
                  kind="secondary"
                  icon-layout=""
                  size="sm"
                  @click="triggerHint(question, true)"
                  :disabled="question.neetcodeHint === ''"
                >
                  <svg
                    class="svg-inline--fa fa-python"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="python"
                    role="img"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    slot="icon"
                  >
                    <path
                      fill="#ffffff"
                      d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM192 0C90.02 .3203 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.8 289.2 .0039 192 0zM288.4 260.1c-15.66 17.85-35.04 46.3-49.05 75.89h-94.61c-14.01-29.59-33.39-58.04-49.04-75.88C75.24 236.8 64 206.1 64 175.1C64 113.3 112.1 48.25 191.1 48C262.6 48 320 105.4 320 175.1C320 206.1 308.8 236.8 288.4 260.1zM176 80C131.9 80 96 115.9 96 160c0 8.844 7.156 16 16 16S128 168.8 128 160c0-26.47 21.53-48 48-48c8.844 0 16-7.148 16-15.99S184.8 80 176 80z"
                    />
                  </svg>
                </bx-btn>
              </bx-tooltip-icon>
              <bx-tooltip-icon
                class="mr-3"
                alignment="center"
                body-text="Add your own"
                direction="bottom"
              >
                <bx-btn kind="secondary" icon-layout="" size="sm">
                  <svg
                    class="svg-inline--fa fa-python"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="python"
                    role="img"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    slot="icon"
                  >
                    <path
                      fill="#ffffff"
                      d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"
                    />
                  </svg>
                </bx-btn>
              </bx-tooltip-icon>
            </div>
          </bx-table-cell>
          <!-- Code column -->
          <bx-table-cell class="maxmd:hidden">
            <div class="flex">
              <!-- Python -->
              <bx-tooltip-icon
                v-if="question.pythonUrl !== ''"
                class="mr-3"
                alignment="center"
                body-text="Python"
                direction="bottom"
              >
                <bx-btn
                  kind="secondary"
                  icon-layout=""
                  size="sm"
                  @click="triggerModal(question, CodeLanguage.Python)"
                >
                  <svg
                    class="svg-inline--fa fa-python"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="python"
                    role="img"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    slot="icon"
                  >
                    <path
                      fill="#ffffff"
                      d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4 .1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3 .1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"
                    ></path>
                  </svg>
                </bx-btn>
              </bx-tooltip-icon>
              <!-- Java -->
              <bx-tooltip-icon
                v-if="question.javaUrl !== ''"
                alignment="center"
                body-text="Java"
                direction="bottom"
              >
                <bx-btn
                  kind="secondary"
                  icon-layout=""
                  size="sm"
                  @click="triggerModal(question, CodeLanguage.Java)"
                >
                  <svg
                    class="svg-inline--fa fa-java"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="java"
                    role="img"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    slot="icon"
                  >
                    <!---->
                    <path
                      fill="#ffffff"
                      d="M277.7 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.8 0 242.8 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.19 12.19 0 0 1 -2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.33 17.33 0 0 0 -8.2 6.3 70.45 70.45 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6 .7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.8 509.4 401 461.3 348 437.4zM124.4 396c-78.7 22 47.9 67.4 148.1 24.5a185.9 185.9 0 0 1 -28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.6 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.37 60.37 0 0 1 -21.1-12.8z"
                    ></path>
                  </svg>
                </bx-btn>
              </bx-tooltip-icon>
            </div>
          </bx-table-cell>
        </bx-table-row>
      </bx-table-body>
    </bx-table>
  </bx-data-table>

  <div class="md:hidden mt-5 text-xs leading-6 text-gray-700 text-center">
    <SharedAppInfo />
  </div>

  <!-- Code modal box -->
  <Transition name="bounce">
    <bx-modal
      v-if="codeModalOpen"
      @bx-modal-beingclosed="codeModalOpen = false"
      open
    >
      <SharedCodePopup
        :selected-question="selectedProblem"
        :selected-code-language="selectedCodeLanguage"
      />
    </bx-modal>
  </Transition>

  <!-- About modal box -->
  <Transition name="bounce">
    <bx-modal v-if="openModal" @bx-modal-beingclosed="openModal = false" open>
      <SharedInfoModal />
    </bx-modal>
  </Transition>

  <!-- Hint modal box -->
  <Transition name="bounce">
    <bx-modal
      v-if="openNeetcodeHint"
      @bx-modal-beingclosed="openNeetcodeHint = false"
      open
    >
      <SharedHintPopup :selected-question="selectedProblem" />
    </bx-modal>
  </Transition>
</template>

<style lang="scss" scoped>
@import "src/style/popup.scss";

bx-table-cell {
  padding-top: 10px;
  padding-bottom: 10px;
}

bx-overflow-menu {
  background-color: #e0e0e0;
}
</style>
