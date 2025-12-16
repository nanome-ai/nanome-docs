<template>
  <div class="landing-page">
    <HeroCarousel :slides="data.hero" />

    <!-- New Updates Section -->
    <div v-if="data.newUpdates" class="new-updates">
      <h2>New Updates</h2>
      <div class="update-card">
        <a :href="data.newUpdates.url">
          <img :src="data.newUpdates.img" :alt="data.newUpdates.title" />
        </a>
        <div class="update-content">
          <h3>{{ data.newUpdates.title }}</h3>
          <p>{{ data.newUpdates.description }}</p>
          <a :href="data.newUpdates.url" class="btn">Learn More</a>
        </div>
      </div>
    </div>

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
      <a href="/nanome1x/navigation/menus.html">
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
      <a href="/nanome1x/navigation/toolsmenu.html">
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
      <a href="/nanome1x/plugins/overview.html">
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
        src="/assets/original/gettingStarted-page/SupportedHeadsets2023-2.png"
        alt="headsets"
      />
    </div>

    <h2>Requirements</h2>
    <div class="requirements">
      <div>
        <h3>
          <a href="https://docs.nanome.ai/help/pchardware.html">
            Please see minimum and recommended PC requirements here.
          </a>
        </h3>
        
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

.landing-page .new-updates {
  margin: 2rem 0 3rem;
}

.landing-page .update-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.landing-page .update-card img {
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: 4px;
  transition: transform 0.3s ease;
}

.landing-page .update-card img:hover {
  transform: scale(1.02);
}

.landing-page .update-content {
  flex: 1;
}

.landing-page .update-content h3 {
  margin-top: 0;
  font-size: 1.8rem;
  color: #2c3e50;
}

.landing-page .update-content p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 1rem 0 1.5rem;
}

@media (max-width: 768px) {
  .landing-page .update-card {
    flex-direction: column;
  }

  .landing-page .update-card img {
    max-width: 100%;
  }
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
