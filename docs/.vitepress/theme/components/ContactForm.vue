<template>
  <div>
    <form v-if="!success" @submit.prevent="onSubmit" class="contact">
      <h2>Tell us more about yourself and the right team will contact you.</h2>
      <div class="row">
        <label>
          <h3>First Name <span class="required">*</span></h3>
          <input v-model="firstName" type="text" required />
        </label>
        <label>
          <h3>Last Name <span class="required">*</span></h3>
          <input v-model="lastName" type="text" required />
        </label>
      </div>
      <div class="row">
        <label>
          <h3>Email <span class="required">*</span></h3>
          <input v-model="email" type="email" required />
        </label>
        <label>
          <h3>Organization / Affiliation</h3>
          <input v-model="org" type="text" />
        </label>
      </div>
      <label>
        <h3>Which of the following do you identify most closely with?</h3>
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
        <h3>How did you hear about Nanome?</h3>
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
        <h3>I'm interested in... <span class="required">*</span></h3>
        <textarea v-model="content" cols="30" rows="10" required></textarea>
      </label>
      <div v-if="!success && error" class="error">
        {{ error }}
      </div>
      <button type="submit" :disabled="sending" class="btn">
        <h3>Send</h3>
      </button>
    </form>
    <div v-else>
      <h3>Your request has been sent!</h3>
      <p>
        Your request was received by our staff, we will get back to you shortly
        by the email you've provided.
      </p>
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
.contact h2 {
  padding: 1rem 0;
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

.contact h3 {
  margin: 0;
  margin-bottom: 0.5rem;
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
  color: #f04040;
}

.error {
  margin-bottom: 1rem;
  font-weight: bold;
}

.contact button {
  width: 100%;
}

.contact button h3 {
  margin-bottom: 0;
  color: inherit;
}
</style>
