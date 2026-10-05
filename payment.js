// Payment instructions only: no transfers, attachment uploads or payment confirmation.
window.initializePayment = (root) => {
  const copyButton = root.querySelector('#yape-copy');
  if (!copyButton) return () => {};
  const label = root.querySelector('#yape-copy-label');
  const status = root.querySelector('#yape-status');
  const manual = root.querySelector('#yape-manual');
  const manualNumber = root.querySelector('#yape-manual-number');
  const receiptLink = root.querySelector('#payment-whatsapp');
  const contactLink = document.querySelector('[data-contact="general"][href^="https://wa.me/"]');
  const receiptMessage = 'Hola, acabo de realizar mi pago por Yape. Adjunto la captura de mi comprobante para su verificación.';
  let resetTimer;
  let disposed = false;

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
      if (disposed) return;
      copyButton.classList.add('is-copied');
      label.textContent = '✓ Número copiado';
      status.textContent = '✓ Número copiado. Abre Yape para realizar tu pago.';
      resetTimer = setTimeout(() => {
        copyButton.classList.remove('is-copied');
        label.textContent = 'Copiar número';
        status.textContent = '';
      }, 2000);
    } catch {
      if (disposed) return;
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
  return () => { disposed = true; clearTimeout(resetTimer); };
};
