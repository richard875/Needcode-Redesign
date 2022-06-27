<script lang="ts" setup>
import "carbon-web-components/es/components/tooltip/index.js";
import "carbon-web-components/es/components/search/index.js";
import "carbon-web-components/es/components/button/index.js";
import "carbon-web-components/es/components/ui-shell/index.js";
import "carbon-web-components/es/components/tag/index.js";
import "carbon-web-components/es/components/data-table/index.js";
import "carbon-web-components/es/components/notification/index.js";
import data from "./assets/data/questions.json";
import QuestionSet from "src/models/questionSet";

const questions: QuestionSet[] = data;
</script>

<template>
  <div>
    <!-- Top bar -->
    <NavBar />

    <!-- Left side -->
    <SideBar :questions="questions" />

    <!-- Right side -->
    <div class="ml-80 p-10">
      <p class="mb-2 text-xl">Arrays & Hashing</p>
      <div class="mb-4 flex items-center">
        <SharedProgressCircle />
        <bx-tag class="ml-2 text-xs text-gray-900" type="blue">
          <p>&nbsp;7 / 9 questions completed&nbsp;</p></bx-tag
        >
      </div>

      <bx-data-table>
        <bx-table>
          <bx-table-head>
            <bx-table-header-row>
              <bx-table-header-cell>Status</bx-table-header-cell>
              <bx-table-header-cell>Problem</bx-table-header-cell>
              <bx-table-header-cell>Difficulty</bx-table-header-cell>
              <bx-table-header-cell>Video Solution</bx-table-header-cell>
              <bx-table-header-cell>Code</bx-table-header-cell>
            </bx-table-header-row>
          </bx-table-head>
          <bx-table-body>
            <bx-table-row>
              <bx-table-cell>Foo1</bx-table-cell>
              <bx-table-cell>Bar1</bx-table-cell>
              <bx-table-cell>Baz1</bx-table-cell>
              <bx-table-cell>Baz1</bx-table-cell>
              <bx-table-cell>Baz1</bx-table-cell>
            </bx-table-row>
            <bx-table-row>
              <bx-table-cell>Foo2</bx-table-cell>
              <bx-table-cell>Bar2</bx-table-cell>
              <bx-table-cell>Baz2</bx-table-cell>
              <bx-table-cell>Baz2</bx-table-cell>
              <bx-table-cell>Baz2</bx-table-cell>
            </bx-table-row>
            <bx-table-row>
              <bx-table-cell>Foo3</bx-table-cell>
              <bx-table-cell>Bar3</bx-table-cell>
              <bx-table-cell>Baz3</bx-table-cell>
              <bx-table-cell>Baz3</bx-table-cell>
              <bx-table-cell>Baz3</bx-table-cell>
            </bx-table-row>
          </bx-table-body>
        </bx-table>
      </bx-data-table>
    </div>
  </div>
</template>
