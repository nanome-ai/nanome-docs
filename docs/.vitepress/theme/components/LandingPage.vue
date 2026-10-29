<template>
  <div class="landing-page">
    <!-- Start here: one card per place a reader might be coming from. -->
    <section v-if="data.start" class="start">
      <h1 class="start__title">Nanome Help</h1>
      <p class="start__lede">Pick where you're working.</p>
      <IconGrid :cols="3" label="Start here">
        <IconCard
          v-for="item in data.start"
          :key="item.url"
          :icon="item.icon"
          :title="item.title"
          :href="item.url"
        >{{ item.description }}</IconCard>
      </IconGrid>
    </section>

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

    <!-- Quick Tips videos, below the start cards and what's new -->
    <HeroCarousel :slides="data.quickTips" />

    <!-- Blog Carousels — below New Updates -->
    <HomeCarousel
      v-for="carousel in data.blogCarousels"
      :key="carousel.title"
      v-bind="carousel"
    />

    <!-- Nanome YouTube channel -->
    <HomeCarousel
      v-for="carousel in data.carousels"
      :key="carousel.title"
      v-bind="carousel"
    />

    <!-- Case studies -->
    <HeroCarousel :slides="data.hero" />

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
.landing-page .start {
  margin: 0 0 1rem;
}

.landing-page .start__title {
  margin: 0;
  font-size: var(--n-text-3xl, 2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.landing-page .start__lede {
  margin: 6px 0 0;
  color: var(--n-text-muted);
}

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
  flex-direction: column;
  align-items: stretch;
  gap: 1.25rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.landing-page .update-card img {
  max-width: 100%;
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
  font-size: 1.4rem;
  color: var(--vp-c-text-1);
}

.landing-page .update-content p {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0.5rem 0 1rem;
}

@media (max-width: 768px) {
  .landing-page .update-card {
    flex-direction: column;
  }

  .landing-page .update-card img {
    max-width: 100%;
  }
}

.landing-page .btn {
  font-size: 1rem;
}
</style>
