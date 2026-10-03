// Payment instructions only: no transfers, attachment uploads or payment confirmation.
(() => {
  const copyButton = document.getElementById('yape-copy');
  if (!copyButton) return;
  const label = document.getElementById('yape-copy-label');
  const status = document.getElementById('yape-status');
  const manual = document.getElementById('yape-manual');
  const manualNumber = document.getElementById('yape-manual-number');
  const receiptLink = document.getElementById('payment-whatsapp');
  const contactLink = document.querySelector('[data-contact="general"][href^="https://wa.me/"]');
  const receiptMessage = 'Hola, acabo de realizar mi pago por Yape. Adjunto la captura de mi comprobante para su verificación.';
  let resetTimer;

  // Reuse the configured business WhatsApp, which differs from the Yape recipient.
  if (contactLink) {
    const contactUrl = new URL(contactLink.href);
    contactUrl.search = `?text=${encodeURIComponent(receiptMessage)}`;
    receiptLink.href = contactUrl.href;
  }

  copyButton.addEventListener('click', async () => {
    clearTimeout(resetTimer);
    copyButton.disabled = true;
    manual.hidden = true;
    try {
      if (!window.isSecureContext || !navigator.clipboard?.writeText) {
        throw new Error('Clipboard unavailable');
      }
      await navigator.clipboard.writeText(copyButton.dataset.copyNumber);
      copyButton.classList.add('is-copied');
      label.textContent = '✓ Número copiado';
      status.textContent = '✓ Número copiado. Abre Yape para realizar tu pago.';
      resetTimer = setTimeout(() => {
        copyButton.classList.remove('is-copied');
        label.textContent = 'Copiar número';
        status.textContent = '';
      }, 2000);
    } catch {
      copyButton.classList.remove('is-copied');
      label.textContent = 'Copiar número';
      status.textContent = 'No se pudo copiar automáticamente. Puedes copiar el número manualmente abajo.';
      manual.hidden = false;
      manualNumber.focus({ preventScroll: true });
      manualNumber.select();
    } finally {
      copyButton.disabled = false;
    }
  });
})();
