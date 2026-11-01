<template>
  <div>
    <form v-if="!success" @submit.prevent="onSubmit" class="contact">
      <p class="contact__intro">Tell us more about yourself and the right team will contact you.</p>
      <div class="row">
        <label>
          <span class="contact__label">First Name <span class="required">*</span></span>
          <input v-model="firstName" type="text" required />
        </label>
        <label>
          <span class="contact__label">Last Name <span class="required">*</span></span>
          <input v-model="lastName" type="text" required />
        </label>
      </div>
      <div class="row">
        <label>
          <span class="contact__label">Email <span class="required">*</span></span>
          <input v-model="email" type="email" required />
        </label>
        <label>
          <span class="contact__label">Organization / Affiliation</span>
          <input v-model="org" type="text" />
        </label>
      </div>
      <label>
        <span class="contact__label">Which of the following do you identify most closely with?</span>
        <select v-model="profession">
          <option value="" selected disabled></option>
          <option value="IT Professional">IT Professional</option>
          <option value="Computational Chemist">Computational Chemist</option>
          <option value="Structural Biologist">Structural Biologist</option>
          <option value="Medicinal-Chemist">Medicinal Chemist</option>
          <option value="Crystallographer">Crystallographer</option>
          <option value="Protein Engineer">Protein Engineer</option>
          <option value="Educator">Educator</option>
          <option value="Student">Student</option>
          <option value="Press">Press</option>
          <option value="Blockchain Enthusiast">Blockchain Enthusiast</option>
          <option value="Government Employee">Government Employee</option>
          <option value="Philanthropist">Philanthropist</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        <span class="contact__label">How did you hear about Nanome?</span>
        <select v-model="referrer">
          <option value="" selected disabled></option>
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter</option>
          <option value="Instagram">Instagram</option>
          <option value="Reddit">Reddit</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Medium">Medium</option>
          <option value="Friend">Friend</option>
          <option value="Conference">Conference</option>
          <option value="Digital-publication">Digital Publication</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        <span class="contact__label">I'm interested in... <span class="required">*</span></span>
        <textarea v-model="content" cols="30" rows="10" required></textarea>
      </label>
      <div v-if="!success && error" class="error" role="alert">
        {{ error }}
      </div>
      <button type="submit" :disabled="sending" class="btn">
        <span class="contact__send">Send</span>
      </button>
    </form>
    <div v-else>
      <p class="contact__intro">Your request has been sent</p>
      <p>Thanks. The Nanome team will reply to the email you gave.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const org = ref('')
const profession = ref('')
const referrer = ref('')
const content = ref('')
const success = ref(false)
const error = ref('')
const sending = ref(false)

async function onSubmit() {
  error.value = ''
  sending.value = true

  // Posts to the shared contact endpoint on nanome.ai, which emails the
  // submission to support@nanome.ai via Resend (replaces the old Make webhook).
  try {
    const res = await fetch('https://nanome.ai/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact',
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        organization: org.value,
        profession: profession.value,
        referrer: referrer.value,
        source_url: window.location.href,
        message: content.value,
      }),
    })

    if (!res.ok) {
      error.value = `There was an error processing your request. Please try again later.`
      success.value = false
      return
    }

    success.value = true
  }
  catch {
    error.value = `There was an error processing your request. Please try again later.`
    success.value = false
  }
  finally {
    sending.value = false
  }
}
</script>

<style scoped>
/* The intro and field labels look as the page's h2 and h3 do, without being
   headings, so the page's outline and heading list stay its own. */
.contact__intro {
  margin: 56px 0 18px;
  padding: 1rem 0;
  border-top: 1px solid var(--n-border-soft);
  color: var(--n-text);
  font-size: var(--n-text-xl);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: var(--n-tracking-tight);
  text-wrap: balance;
}

.contact .row {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1;
}

@media screen and (min-width: 1000px) {
  .contact .row {
    grid-template-columns: repeat(2, 1fr);
  }
}

.contact label {
  display: block;
  margin-bottom: 1rem;
}

.contact__label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--n-text);
  font-size: var(--n-text-lg);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: var(--n-tracking-tight);
  text-wrap: balance;
}

.contact input,
.contact textarea,
.contact select {
  display: block;
  width: 100%;
  font-size: 1.1rem;
  padding: 0.5rem;
  /* 3:1 against the page in both themes, so the fields read as fields. */
  border: 1px solid color-mix(in srgb, var(--n-text) 45%, transparent);
  box-sizing: border-box;
  border-radius: 4px;
}

/* VitePress turns the outline off on focused fields; put the site's ring back. */
.contact :is(input, select, textarea):focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: 1px;
}

/* The browser arrow is gone (appearance: none), so draw one. Longhands keep
   base.css's transparent background colour. */
.contact select {
  padding-right: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' fill='none' stroke='%238a8a8a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  background-size: 14px;
}

.contact span.required,
.contact .error {
  color: var(--n-bad);
}

.error {
  margin-bottom: 1rem;
  font-weight: bold;
}

.contact button {
  width: 100%;
}

.contact__send {
  display: block;
  font-size: var(--n-text-lg);
  line-height: 1.4;
  letter-spacing: var(--n-tracking-tight);
}
</style>
