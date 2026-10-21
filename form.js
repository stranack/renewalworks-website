// Sends the contact form to Formspree in the background so visitors stay on the page
// and see a thank-you message. Without JavaScript, or if the background send fails,
// the form falls back to a normal submission and Formspree shows its own page.
const form = document.querySelector('.contact-form');
const thanks = document.getElementById('contact-thanks');

if (form && thanks) {
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const label = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);

      form.hidden = true;
      thanks.hidden = false;
      thanks.focus();
    } catch (error) {
      button.disabled = false;
      button.innerHTML = label;
      form.submit(); // does not fire the submit event again, so no loop
    }
  });
}
