'use client'

import './../style/ContactForm.css'; 
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xpwdrogl");

  if (state.succeeded) {
    return <p>Thanks for your submission! I'll be in touch.</p>;
  }

  return (
    <form className="ContactForm" onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email Address:
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        required
        placeholder="your@email.com"

      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />

      <label htmlFor="message">
        Message:
      </label>
      <textarea
        id="message"
        name="message"
        required
        placeholder="Type your message here..."
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />

      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}
