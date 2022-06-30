<script lang="ts">
import social from "assets/data/social.json";
import Social from "src/models/social";
import Goto from "../helper/goto";

export default {
  data() {
    return {
      socialLinks: social as Social,
    };
  },
  methods: {
    Goto,
    triggerMenu() {
      this.$emit("triggerMenu");
    },
  },
};
</script>

<template>
  <div
    class="fixed w-full h-12 pl-3 navbar flex items-center justify-between z-50 select-none"
  >
    <!-- Left -->
    <div class="flex items-center justify-center">
      <button
        @click="triggerMenu"
        class="block md:hidden mr-3"
        aria-label="Mobile menu"
        tabindex="0"
        type="button"
      >
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="20"
          height="20"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M14 4H18V8H14zM4 4H8V8H4zM24 4H28V8H24zM14 14H18V18H14zM4 14H8V18H4zM24 14H28V18H24zM14 24H18V28H14zM4 24H8V28H4zM24 24H28V28H24z"
          ></path>
        </svg>
      </button>

      <img src="/assembly_icon.svg" alt="Neetcode Logo" class="w-5 h-5 mr-3" />
      <div>
        <span class="IBMPlexMono-Light text-white">Neetcode</span>
        <span class="IBMPlexMono-SemiBold text-white">.io</span>
      </div>
    </div>

    <!-- Right -->
    <div class="flex h-full">
      <bx-tooltip-icon
        class="icon-wrapper"
        alignment="center"
        body-text="Patreon"
        direction="bottom"
        @click="Goto(socialLinks.patreon)"
      >
        <font-awesome-icon icon="fa-solid fa-heart" inverse />
      </bx-tooltip-icon>
      <bx-tooltip-icon
        class="icon-wrapper"
        alignment="center"
        body-text="YouTube"
        direction="bottom"
        @click="Goto(socialLinks.youtube)"
      >
        <font-awesome-icon icon="fa-brands fa-youtube" inverse />
      </bx-tooltip-icon>
      <bx-tooltip-icon
        class="icon-wrapper"
        alignment="center"
        body-text="Discord"
        direction="bottom"
        @click="Goto(socialLinks.discord)"
      >
        <font-awesome-icon icon="fa-brands fa-discord" inverse />
      </bx-tooltip-icon>
      <bx-tooltip-icon
        class="icon-wrapper"
        alignment="center"
        body-text="Twitter"
        direction="left"
        @click="Goto(socialLinks.twitter)"
      >
        <font-awesome-icon icon="fa-brands fa-twitter" inverse />
      </bx-tooltip-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Small tablets and large smartphones (landscape view)
$screen-sm: 576px;

.navbar {
  background-color: #161616;
  border-bottom: 1px solid #393939;

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    svg {
      padding-left: 16px;
      padding-right: 16px;
    }

    &:hover {
      cursor: pointer;
      background-color: #363636;
    }
  }
}

@media (max-width: #{$screen-sm}) {
  .navbar {
    .icon-wrapper {
      svg {
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
    }
  }
}
</style>
