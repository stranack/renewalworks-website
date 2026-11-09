// Sends the contact form to Formspree in the background so visitors stay on the page
// and see a thank-you message. If the send fails, the visitor stays here too and gets
// an error with our email address, rather than being handed off to Formspree's page.
// Without JavaScript the form posts normally and Formspree shows its own confirmation.
const form = document.querySelector('.contact-form');
const thanks = document.getElementById('contact-thanks');
const error = document.getElementById('contact-error');

if (form && thanks) {
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const label = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Sending…';
    if (error) error.hidden = true;

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
    } catch (err) {
      button.disabled = false;
      button.innerHTML = label;
      if (error) {
        error.hidden = false;
      } else {
        form.submit(); // last resort: hand off to Formspree's own page
      }
    }
  });
}
