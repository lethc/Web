const video = document.getElementById('intro-video');
const cover = document.getElementById('video-cover');
const soundToggle = document.getElementById('video-sound-toggle');
const floatingClose = document.getElementById('video-floating-close');
const videoDialog = document.getElementById('video-dialog');
const videoHome = video.parentElement;
const videoAnchor = document.querySelector('.hero-visual');
const player = videoDialog.querySelector('.video-dialog-player');
let previousOverflow = '';
let heroVideoIsVisible = true;
let soundEnabled = false;
let floatingDismissed = false;

const updateSoundButton = () => {
  const soundOn = !video.muted;
  soundToggle.setAttribute('aria-pressed', String(soundOn));
  soundToggle.setAttribute('aria-label', soundOn ? 'Silenciar video' : 'Activar sonido del video');
  soundToggle.querySelector('.sound-icon').textContent = soundOn ? '🔊' : '🔇';
  soundToggle.querySelector('.sound-label').textContent = soundOn ? 'Sonido activo' : 'Activar sonido';
};

const startVideo = async () => {
  video.muted = false;
  try {
    await video.play();
    soundEnabled = true;
  } catch {
    // Browsers usually require one user gesture before autoplay with sound.
    if (!soundEnabled) {
      video.muted = true;
      await video.play().catch(() => {});
    }
  }
  updateSoundButton();
};

startVideo();

soundToggle.addEventListener('click', async () => {
  soundEnabled = soundToggle.getAttribute('aria-pressed') !== 'true';
  video.muted = !soundEnabled;
  await video.play().catch(() => {});
  updateSoundButton();
});

if ('IntersectionObserver' in window) {
  const floatingObserver = new IntersectionObserver(([entry]) => {
    heroVideoIsVisible = entry.isIntersecting;
    if (heroVideoIsVisible) floatingDismissed = false;
    videoHome.classList.toggle('is-floating', !heroVideoIsVisible && !videoDialog.open && !floatingDismissed);
  }, { threshold: .18 });
  floatingObserver.observe(videoAnchor);
}

floatingClose.addEventListener('click', () => {
  floatingDismissed = true;
  videoHome.classList.remove('is-floating');
});


cover.addEventListener('click', async () => {
  if (videoDialog.open) return;
  previousOverflow = document.documentElement.style.overflow;
  videoHome.classList.remove('is-floating');
  player.append(video);
  video.controls = true;
  soundEnabled = true;
  video.muted = false;
  videoDialog.showModal();
  document.documentElement.style.overflow = 'hidden';
  try {
    await video.play();
  } catch {
    // Native controls remain available if the browser requires another tap.
  }
});
videoDialog.querySelector('.video-dialog-close').addEventListener('click', () => videoDialog.close());
videoDialog.addEventListener('click', event => {
  if (event.target !== videoDialog) return;
  const bounds = videoDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) videoDialog.close();
});
videoDialog.addEventListener('close', () => {
  video.controls = false;
  videoHome.prepend(video);
  video.play().catch(() => {});
  videoHome.classList.toggle('is-floating', !heroVideoIsVisible && !floatingDismissed);
  updateSoundButton();
  document.documentElement.style.overflow = previousOverflow;
  cover.focus({ preventScroll: true });
});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.section-heading,.area-card,.community-intro,.social').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=`${i%3*70}ms`;observer.observe(el);});}
document.getElementById('year').textContent=new Date().getFullYear();

// Full service details open only on click/tap or keyboard activation.
const serviceDialog = document.getElementById('service-dialog');
const serviceContent = serviceDialog.querySelector('.service-dialog-content');
let serviceTrigger = null;
let serviceScrollOverflow = '';

document.querySelectorAll('.service-card').forEach(card => {
  const trigger = card.querySelector('.service-image');
  const preview = card.querySelector('.service-tooltip');
  trigger.addEventListener('click', () => {
    serviceTrigger = trigger;
    const details = preview.querySelector('.service-detail').cloneNode(true);
    details.querySelector('h3').id = 'service-dialog-title';
    const image = trigger.querySelector('img').cloneNode(true);
    image.className = 'service-dialog-image';
    image.loading = 'eager';
    const body = document.createElement('div');
    body.className = 'service-dialog-body';
    body.append(details, card.querySelector('.service-cta').cloneNode(true));
    serviceContent.replaceChildren(image, body);
    serviceScrollOverflow = document.documentElement.style.overflow;
    serviceDialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  });
});
serviceDialog.querySelector('.service-dialog-close').addEventListener('click', () => serviceDialog.close());
serviceDialog.addEventListener('click', event => {
  if (event.target !== serviceDialog) return;
  const rect = serviceDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) serviceDialog.close();
});
serviceDialog.addEventListener('close', () => {
  document.documentElement.style.overflow = serviceScrollOverflow;
  serviceTrigger?.focus({ preventScroll: true });
});
