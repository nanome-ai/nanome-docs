<template>
  <div class="landing-page">
    <!-- v2.4 Quick Tips — hero carousel style -->
    <h2>Nanome v2.4 Quick Tips</h2>
    <HeroCarousel :slides="data.quickTips" />

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

    <!-- Blog Carousels — below New Updates -->
    <HomeCarousel
      v-for="carousel in data.blogCarousels"
      :key="carousel.title"
      v-bind="carousel"
    />

    <!-- Middle Carousels (v1.24 content, YouTube Channel) -->
    <HomeCarousel
      v-for="carousel in data.carousels"
      :key="carousel.title"
      v-bind="carousel"
    />

    <h2>Featured Sections</h2>
    <div class="featured">
      <a href="/nanome_v2/mainmenus">
        <div class="home-video">
          <img
            src="/assets/original/nanome-v2/display-interactions.gif"
            alt="Cross-entry interaction components in Nanome v2"
          />
        </div>
        <h3>Main Menus</h3>
        <span>Manage structures, representations, and collaboration</span>
      </a>
      <a href="/nanome_v2/sampleworkflows">
        <div class="home-video">
          <img
            src="/assets/original/nanome-v2/align-proteins.gif"
            alt="Aligning proteins in Nanome v2"
          />
        </div>
        <h3>Sample Workflows</h3>
        <span>Align proteins, display interactions, and more</span>
      </a>
      <a href="/mara/overview">
        <div class="home-video">
          <img
            src="/assets/original/mara/mara-chat.png"
            alt="MARA AI assistant for molecular analysis"
          />
        </div>
        <h3>MARA</h3>
        <span>AI-powered molecular analysis and reasoning assistant</span>
      </a>
    </div>

    <!-- Hero Carousel — below Featured Sections -->
    <HeroCarousel :slides="data.hero" />

    <h2>v1.24 Compatible Headsets</h2>
    <div class="text-center">
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
  </div>
</template>

<script setup>
import HeroCarousel from './HeroCarousel.vue'
import HomeCarousel from './HomeCarousel.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
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
  background: var(--vp-c-bg-soft);
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
  color: var(--vp-c-text-1);
}

.landing-page .update-content p {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
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
