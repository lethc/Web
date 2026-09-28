const video = document.getElementById('intro-video');
const cover = document.getElementById('video-cover');
const videoDialog = document.getElementById('video-dialog');
const videoHome = video.parentElement;
const player = videoDialog.querySelector('.video-dialog-player');
let previousOverflow = '';
video.muted = true;
video.play().catch(() => {});


cover.addEventListener('click', async () => {
  if (videoDialog.open) return;
  previousOverflow = document.documentElement.style.overflow;
  player.append(video);
  video.controls = true;
  video.muted = false;
  videoDialog.showModal();
  document.documentElement.style.overflow = 'hidden';
  try {
    await video.play();
    if (!videoDialog.open) video.muted = true;
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
  video.muted = true;
  video.controls = false;
  videoHome.prepend(video);
  video.play().catch(() => {});
  document.documentElement.style.overflow = previousOverflow;
  cover.focus({ preventScroll: true });
});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.section-heading,.area-card,.community-intro,.social').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=`${i%3*70}ms`;observer.observe(el);});}
document.getElementById('year').textContent=new Date().getFullYear();
