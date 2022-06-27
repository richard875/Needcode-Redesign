<template>
  <div
    class="w-full h-12 pl-3 navbar flex items-center justify-between select-none"
  >
    <!-- Left -->
    <div class="flex items-center justify-center">
      <img
        src="assets/images/assembly_icon.svg"
        alt="Neetcode Logo"
        class="w-5 h-5 mr-3"
      />
      <div>
        <span class="IBMPlexMono-Light text-white">Neetcode</span>
        <span class="IBMPlexMono-SemiBold text-white">.io</span>
      </div>
    </div>

    <!-- Right -->
    <div class="flex h-full">
      <bx-tooltip-icon
        class="icoon-wrapper"
        alignment="center"
        body-text="Patreon"
        direction="bottom"
      >
        <font-awesome-icon icon="fa-solid fa-heart" inverse />
      </bx-tooltip-icon>
      <bx-tooltip-icon
        class="icoon-wrapper"
        alignment="center"
        body-text="YouTube"
        direction="bottom"
      >
        <font-awesome-icon icon="fa-brands fa-youtube" inverse />
      </bx-tooltip-icon>
      <bx-tooltip-icon
        class="icoon-wrapper"
        alignment="center"
        body-text="Discord"
        direction="bottom"
      >
        <font-awesome-icon icon="fa-brands fa-discord" inverse />
      </bx-tooltip-icon>
      <bx-tooltip-icon
        class="icoon-wrapper"
        alignment="center"
        body-text="Twitter"
        direction="left"
      >
        <font-awesome-icon icon="fa-brands fa-twitter" inverse />
      </bx-tooltip-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: #161616;
  border-bottom: 1px solid #393939;

  .icoon-wrapper {
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
</style>
