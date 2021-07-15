<template>
  <div class="landing-page">
    <HeroCarousel :slides="data.hero" />
    <HomeCarousel
      v-for="carousel in data.carousels"
      :key="carousel.title"
      v-bind="carousel"
    />

    <!-- <p>
      Collaborative virtual reality tools for nanoscale design. Nanome is
      available for Windows and the Oculus Quest (closed beta). Please contact
      us at
      <a href="mailto:support@nanome.ai">support@nanome.ai</a> to be added to
      the Quest beta.
    </p> -->

    <h2>Featured Sections</h2>
    <div class="featured">
      <a href="/navigation/menus.html">
        <div class="home-video">
          <video
            src="https://media.giphy.com/media/jq6CX2eDIckqP47Bk3/giphy.mp4"
            loop
            muted
            autoplay
            playsinline
          ></video>
        </div>
        <h3>Main Menus</h3>
        <span>All the menus of Nanome</span>
      </a>
      <a href="/navigation/toolsmenu.html">
        <div class="home-video">
          <video
            src="https://media.giphy.com/media/mIyglT252D52nxnXAH/giphy.mp4"
            loop
            muted
            autoplay
            playsinline
          ></video>
        </div>
        <h3>Tools Menu</h3>
        <span>All the tools of Nanome</span>
      </a>
      <a href="/plugins/overview.html">
        <div class="home-video">
          <video
            src="https://media.giphy.com/media/XbOZ8ZJiLGeobFiwxt/giphy.mp4"
            loop
            muted
            autoplay
            playsinline
          ></video>
        </div>
        <h3>Nanome Stacks</h3>
        <span>An overview of the plugin system</span>
      </a>
    </div>

    <h2>Compatible Headsets</h2>
    <div class="text-center">
      <!-- <a class="btn" href="https://home.nanome.ai/setup" target="_blank">
        Download Nanome
      </a> -->
      <img
        class="headsets"
        src="/assets/original/gettingStarted-page/supportedheadsets2.png"
        alt="headsets"
      />
    </div>

    <h2>Requirements</h2>
    <div class="requirements">
      <div>
        <h3>
          <a href="https://docs.nanome.ai/help/hardwarerequirements.html">
            Minimum Requirements
          </a>
        </h3>
        <div><b>Operating System:</b> Windows 10</div>
        <div><b>Processor:</b> i5-4590</div>
        <div><b>Memory:</b> 4 GB RAM</div>
        <div><b>Graphics:</b> NVIDIA GTX 780 (or AMD R9 290)</div>
        <div><b>Storage:</b> 2 GB</div>
      </div>

      <div>
        <h3>
          <a href="https://docs.nanome.ai/help/hardwarerequirements.html">
            Recommended Requirements
          </a>
        </h3>
        <div><b>Operating System:</b> Windows 10</div>
        <div><b>Processor:</b> Intel i7</div>
        <div><b>Memory:</b> 8 GB RAM</div>
        <div><b>Graphics:</b> NVIDIA GTX 1070 (or AMD RX Vega 56)</div>
        <div><b>Storage:</b> 256 GB SSD</div>
      </div>
    </div>

    <!-- <div class="home-video">
      <iframe
        width="900"
        height="500"
        src="https://www.youtube.com/embed/gCNbuH9Y6hU"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ['data'],
}
</script>

<style>
.landing-page h2 {
  font-size: 1.5em;
  border: unset;
  font-weight: unset;
  margin: 2em 0 1em;
}

.landing-page .featured {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-columns: 1fr;
  grid-gap: 1rem;
}

.landing-page .featured > a {
  text-align: center;
  margin: 0 0 1rem;
}

.landing-page .featured h3,
.landing-page .headsets {
  margin: 1rem 0 0;
}

.landing-page .requirements {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 2em;
}

.landing-page .requirements > div {
  display: inline-block;
  padding: 1em;
}

.landing-page .btn {
  font-size: 1.5rem;
}
</style>
