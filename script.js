/* ============================================
   KASHISH PORTFOLIO — Interactive JavaScript
   Three.js 3D · Particles · Magnetic Cursor
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. THREE.JS — 3D FLOATING OBJECTS
  // ============================================
  const threeCanvas = document.getElementById('three-canvas');
  let scene, camera, renderer, objects3D = [];
  let mouseX = 0, mouseY = 0;

  function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({
      canvas: threeCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Point Lights — Teal/Emerald/Amber tones
    const tealLight = new THREE.PointLight(0x14b8a6, 2, 100);
    tealLight.position.set(10, 10, 10);
    scene.add(tealLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 1.5, 100);
    amberLight.position.set(-10, -10, 10);
    scene.add(amberLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 1, 80);
    emeraldLight.position.set(0, 15, -5);
    scene.add(emeraldLight);

    // Create 3D Objects
    createObjects();

    // Start animation loop
    animateThreeJS();
  }

  function createObjects() {
    // Materials — Glassmorphism style
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.3,
      wireframe: false,
    });

    const amberMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.3,
      roughness: 0.2,
      metalness: 0.4,
    });

    const emeraldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.25,
      roughness: 0.15,
      metalness: 0.35,
    });

    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.2,
      roughness: 0.1,
      metalness: 0.6,
    });

    const mintMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.2,
      roughness: 0.2,
      metalness: 0.3,
    });

    // Wireframe materials for extra depth
    const wireTeal = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

    const wireAmber = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });

    // Object 1: Icosahedron (crystal)
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.5, 0),
      glassMaterial
    );
    ico.position.set(-12, 5, -5);
    ico.userData = { speed: 0.003, amplitude: 2, phase: 0 };
    scene.add(ico);
    objects3D.push(ico);

    // Object 2: Octahedron (diamond)
    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(2, 0),
      amberMaterial
    );
    octa.position.set(14, -4, -8);
    octa.userData = { speed: 0.004, amplitude: 3, phase: 1 };
    scene.add(octa);
    objects3D.push(octa);

    // Object 3: Torus (ring)
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.6, 16, 50),
      emeraldMaterial
    );
    torus.position.set(-8, -8, -3);
    torus.userData = { speed: 0.005, amplitude: 1.5, phase: 2 };
    scene.add(torus);
    objects3D.push(torus);

    // Object 4: Dodecahedron
    const dodeca = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1.8, 0),
      goldMaterial
    );
    dodeca.position.set(10, 8, -6);
    dodeca.userData = { speed: 0.003, amplitude: 2.5, phase: 3 };
    scene.add(dodeca);
    objects3D.push(dodeca);

    // Object 5: Torus Knot (fancy 3D knot)
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16),
      glassMaterial.clone()
    );
    torusKnot.material.opacity = 0.2;
    torusKnot.position.set(0, 12, -10);
    torusKnot.userData = { speed: 0.002, amplitude: 2, phase: 4 };
    scene.add(torusKnot);
    objects3D.push(torusKnot);

    // Object 6: Wireframe sphere
    const wireSphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 20, 20),
      wireTeal
    );
    wireSphere.position.set(-15, -2, -12);
    wireSphere.userData = { speed: 0.001, amplitude: 1, phase: 5 };
    scene.add(wireSphere);
    objects3D.push(wireSphere);

    // Object 7: Large wireframe icosahedron in background
    const wireIco = new THREE.Mesh(
      new THREE.IcosahedronGeometry(5, 1),
      wireAmber
    );
    wireIco.position.set(5, -10, -20);
    wireIco.userData = { speed: 0.0015, amplitude: 1.5, phase: 6 };
    scene.add(wireIco);
    objects3D.push(wireIco);

    // Object 8: Small sphere cluster
    const clusterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf472b6,
      transparent: true,
      opacity: 0.4,
      roughness: 0.05,
      metalness: 0.5,
    });

    for (let i = 0; i < 5; i++) {
      const miniSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 16, 16),
        clusterMaterial
      );
      const angle = (i / 5) * Math.PI * 2;
      miniSphere.position.set(
        15 + Math.cos(angle) * 2,
        3 + Math.sin(angle) * 2,
        -4
      );
      miniSphere.userData = { speed: 0.006, amplitude: 0.5, phase: i, cluster: true, angle: angle, cx: 15, cy: 3 };
      scene.add(miniSphere);
      objects3D.push(miniSphere);
    }

    // Object 9: Cone 
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 3, 6),
      mintMaterial
    );
    cone.position.set(-5, 10, -7);
    cone.userData = { speed: 0.004, amplitude: 2, phase: 7 };
    scene.add(cone);
    objects3D.push(cone);

    // Object 10: Ring / Flat torus
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.15, 8, 60),
      new THREE.MeshBasicMaterial({
        color: 0xfda4af,
        transparent: true,
        opacity: 0.15
      })
    );
    ring.position.set(0, 0, -15);
    ring.rotation.x = Math.PI / 3;
    ring.userData = { speed: 0.001, amplitude: 0.5, phase: 8 };
    scene.add(ring);
    objects3D.push(ring);
  }

  function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);

    const time = Date.now() * 0.001;

    objects3D.forEach((obj) => {
      const d = obj.userData;

      // Rotate
      obj.rotation.x += d.speed;
      obj.rotation.y += d.speed * 1.3;

      // Float up/down
      if (d.cluster) {
        const angle = d.angle + time * 0.5;
        obj.position.x = d.cx + Math.cos(angle) * 2;
        obj.position.y = d.cy + Math.sin(angle) * 2 + Math.sin(time + d.phase) * d.amplitude;
      } else {
        obj.position.y += Math.sin(time * 0.5 + d.phase) * 0.005 * d.amplitude;
      }

      // React to mouse (subtle parallax)
      obj.position.x += (mouseX * 0.01 - obj.position.x) * 0.0005;
      obj.position.y += (-mouseY * 0.01 - obj.position.y) * 0.0005;
    });

    renderer.render(scene, camera);
  }

  // Initialize Three.js
  if (typeof THREE !== 'undefined') {
    initThreeJS();
  }

  // ============================================
  // 2. PARTICLE SYSTEM
  // ============================================
  const particleCanvas = document.getElementById('particle-canvas');
  const pCtx = particleCanvas.getContext('2d');
  let particles = [];
  const particleCount = 60;

  function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  resizeParticleCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.5 ? 174 : 38; // Teal or Amber
    }

    update(mx, my) {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse interaction — particles gently flee
      const dx = mx - this.x;
      const dy = my - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x -= dx * force * 0.02;
        this.y -= dy * force * 0.02;
      }

      // Wrap around
      if (this.x < 0) this.x = particleCanvas.width;
      if (this.x > particleCanvas.width) this.x = 0;
      if (this.y < 0) this.y = particleCanvas.height;
      if (this.y > particleCanvas.height) this.y = 0;

      // Twinkle
      this.opacity += (Math.random() - 0.5) * 0.02;
      this.opacity = Math.max(0.05, Math.min(0.6, this.opacity));
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let pMouseX = 0, pMouseY = 0;

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(p => {
      p.update(pMouseX, pMouseY);
      p.draw(pCtx);
    });

    // Draw connection lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          pCtx.beginPath();
          pCtx.moveTo(particles[i].x, particles[i].y);
          pCtx.lineTo(particles[j].x, particles[j].y);
          pCtx.strokeStyle = `rgba(20, 184, 166, ${0.08 * (1 - dist / 100)})`;
          pCtx.lineWidth = 0.5;
          pCtx.stroke();
        }
      }
    }
  }
  animateParticles();

  // ============================================
  // 3. MAGNETIC CURSOR
  // ============================================
  const cursorDot = document.querySelector('.cursor__dot');
  const cursorRing = document.querySelector('.cursor__ring');
  const cursorEl = document.getElementById('cursor');

  let cursorX = 0, cursorY = 0;
  let ringX = 0, ringY = 0;

  if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
      pMouseX = e.clientX;
      pMouseY = e.clientY;

      cursorDot.style.left = cursorX + 'px';
      cursorDot.style.top = cursorY + 'px';
    });

    // Smooth ring follow
    function updateCursorRing() {
      ringX += (cursorX - ringX) * 0.15;
      ringY += (cursorY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(updateCursorRing);
    }
    updateCursorRing();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .magnetic, .project-card, .skill-card, .about__card, .testimonial-card, .contact__info-card, .contact__social-link');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorEl.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => cursorEl.classList.remove('cursor--hover'));
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button').forEach(el => el.style.cursor = 'none');
  }

  // ============================================
  // 4. MAGNETIC BUTTON EFFECT
  // ============================================
  const magneticElements = document.querySelectorAll('.magnetic');
  if (window.matchMedia('(pointer: fine)').matches) {
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // ============================================
  // 5. NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ============================================
  // 6. MOBILE NAV TOGGLE
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('.navbar__link, .navbar__cta').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ============================================
  // 7. SMOOTH SCROLL FOR NAV LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // 8. ACTIVE NAV LINK HIGHLIGHT
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinksArr = document.querySelectorAll('.navbar__link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinksArr.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${currentId}`) {
            link.style.color = 'var(--text-primary)';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ============================================
  // 9. SCROLL REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // 10. SKILL BAR ANIMATIONS
  // ============================================
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  });

  skillCards.forEach(card => skillObserver.observe(card));

  // ============================================
  // 11. COUNTER ANIMATION FOR STATS
  // ============================================
  const animateCounter = (element, target, suffix = '') => {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 25);
  };

  const statElements = document.querySelectorAll('.hero__stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statElements.forEach(stat => {
          const text = stat.textContent;
          const number = parseInt(text);
          const suffix = text.replace(/\d/g, '');
          stat.textContent = '0' + suffix;
          animateCounter(stat, number, suffix);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero__stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ============================================
  // 12. CONTACT FORM HANDLING
  // ============================================
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.style.borderColor = 'var(--accent-rose)';
        isValid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    if (!isValid) return;

    const submitBtn = document.getElementById('contact-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... ✨';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();

      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }, 1500);
  });

  // ============================================
  // 13. TYPING EFFECT FOR HERO
  // ============================================
  const greetingEl = document.getElementById('hero-greeting');
  if (greetingEl) {
    const phrases = [
      "Hello, I'm ✨",
      "Hey there! 💫",
      "Welcome to my world 🌸",
      "Nice to meet you 🦋"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentPhrase = phrases[0];

    function typeEffect() {
      if (isDeleting) {
        greetingEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        greetingEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        currentPhrase = phrases[phraseIndex];
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 800);
  }

  // ============================================
  // 14. TILT EFFECT ON PROJECT CARDS (3D Tilt)
  // ============================================
  if (window.matchMedia('(pointer: fine)').matches) {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ============================================
  // 15. SMOOTH PARALLAX ON SCROLL
  // ============================================
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Parallax on hero content
        const heroContent = document.querySelector('.hero__content');
        if (heroContent && scrollY < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
          heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
        }

        // Parallax on hero visual
        const heroVisual = document.querySelector('.hero__visual');
        if (heroVisual && scrollY < window.innerHeight) {
          heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ============================================
  // 16. WINDOW RESIZE HANDLER
  // ============================================
  window.addEventListener('resize', () => {
    resizeParticleCanvas();

    if (renderer) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
  });

  // ============================================
  // 17. INTERACTIVE SKILL CARDS — Ripple Effect
  // ============================================
  document.querySelectorAll('.skill-card, .about__card').forEach(card => {
    card.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(20, 184, 166,0.3), transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 0;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // 18. SCROLL PROGRESS INDICATOR
  // ============================================
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #14b8a6, #f59e0b, #10b981);
    z-index: 10000;
    transition: width 0.1s linear;
    width: 0%;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }, { passive: true });

  // ============================================
  // 19. EASTER EGG — KONAMI CODE
  // ============================================
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Rainbow mode
        document.body.style.animation = 'none';
        document.body.style.filter = 'hue-rotate(90deg) saturate(1.5)';
        setTimeout(() => {
          document.body.style.filter = '';
        }, 4000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ============================================
  // 20. SPARKLE EFFECT ON CLICK
  // ============================================
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      const size = Math.random() * 6 + 3;
      const angle = (i / 6) * Math.PI * 2;
      const distance = Math.random() * 30 + 20;

      sparkle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > 0.5 ? '#14b8a6' : '#f59e0b'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: sparkleAnim 0.6s ease-out forwards;
        --tx: ${Math.cos(angle) * distance}px;
        --ty: ${Math.sin(angle) * distance}px;
      `;

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 600);
    }
  });

  // Sparkle animation
  const sparkleStyle = document.createElement('style');
  sparkleStyle.textContent = `
    @keyframes sparkleAnim {
      0% { transform: translate(0, 0) scale(1); opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
    }
  `;
  document.head.appendChild(sparkleStyle);
});
