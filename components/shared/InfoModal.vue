<template>
  <bx-modal-header>
    <bx-modal-close-button></bx-modal-close-button>
    <bx-modal-label>About</bx-modal-label>
    <bx-modal-heading>
      <span>
        <b>TLDR</b>
        : A <b>better</b> way to prepare for coding interviews
      </span>
    </bx-modal-heading>
  </bx-modal-header>
  <bx-modal-body class="px-5 mb-5">
    <div class="leading-6">
      <p>
        &#x2022; The <b>Blind 75</b> is a popular list of Algorithm practice
        problems. I created the <b>Neetcode 150</b> by adding 75 more problems
        to make a more beginner friendly and more comprehensive list.
      </p>
      <p>
        &#x2022; Try starting with a few Easy problems from each topic, or maybe
        solve each topic all at once.
      </p>
      <p>
        &#x2022; Get stuck? I've created a <b>thorough</b> &#127909; video
        explanation for each problem.
      </p>
      <p>
        &#x2022; Some of the problems require LC premium (e.g. Meeting Rooms),
        in that case I've linked to a free alternative site instead.
      </p>
    </div>

    <!-- Divider -->
    <bx-side-nav-divider class="my-5"></bx-side-nav-divider>

    <div class="video-container">
      <iframe
        src="https://www.youtube.com/embed/aa2ijyWBBIc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </bx-modal-body>
</template>

<style lang="scss" scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
