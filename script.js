const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

const setHeaderState = () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
};
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  navToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  navLinks?.classList.toggle('open', !open);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('open');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

const terminalLines = document.querySelectorAll('.terminal-line');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
terminalLines.forEach((line, index) => {
  window.setTimeout(() => line.classList.add('visible'), reduceMotion ? 0 : 450 + index * 420);
});

const systems = {
  vision: {
    tag: 'SYSTEM_01',
    title: '360° Vision',
    body: 'A custom hyperbolic mirror gives the OpenMV camera a panoramic view of the field. The vision pipeline identifies the orange ball, goals and field geometry for real-time positioning and decision-making.',
    chips: ['OpenMV camera', 'Custom mirror profile', 'Real-time object detection']
  },
  mobility: {
    tag: 'SYSTEM_02',
    title: 'Omnidirectional Drive',
    body: 'Four motors and omni wheels let the robot translate in any direction while maintaining its heading. This gives the software precise control when orbiting the ball, defending and recovering from the boundary.',
    chips: ['4-motor drive', 'Omni wheels', 'Vector movement']
  },
  sensing: {
    tag: 'SYSTEM_03',
    title: 'Line Sensing',
    body: 'A custom circular PCB carries 48 phototransistors: 32 on the inner ring and 16 on the outer ring. PWM-controlled LEDs provide consistent illumination while clustered readings estimate the field-line angle.',
    chips: ['48 phototransistors', 'PWM illumination', 'Cluster-based escape logic']
  },
  control: {
    tag: 'SYSTEM_04',
    title: 'Embedded Control',
    body: 'A Teensy 4.1 runs the primary C++ control software, combining sensor data, vision output and strategy into low-latency drive commands. A BNO055 IMU supports heading and orientation control.',
    chips: ['Teensy 4.1', 'C++ firmware', 'BNO055 IMU']
  },
  electrical: {
    tag: 'SYSTEM_05',
    title: 'Custom Electronics',
    body: 'The second main-PCB revision separates motor and logic ground planes to reduce noise. Pull-down resistors, protected motor signal lines and improved connector placement increase reliability and serviceability.',
    chips: ['Custom main PCB', 'Isolated ground planes', 'Competition-ready serviceability']
  }
};

const panel = document.querySelector('[data-system-panel]');
const tabs = document.querySelectorAll('.system-tab');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.system;
    const data = systems[key];
    if (!data || !panel) return;

    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });

    panel.innerHTML = `
      <p class="detail-tag">${data.tag}</p>
      <h3>${data.title}</h3>
      <p>${data.body}</p>
      <ul>${data.chips.map((chip) => `<li>${chip}</li>`).join('')}</ul>
    `;
  });
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});
