// Project data and UI logic
document.addEventListener('DOMContentLoaded', () => {
  const projects = [
    {
      id: 'uci-arc',
      title: 'UCI ARC Court Reservation Prototype',
      tech: 'React, TypeScript, Figma, Tailwind CSS',
      short: 'Project manager for a 4-person team; reservation system supporting 8 sports with real-time availability.',
      details: `Served as project manager for a 4-person team, defined product requirements, and led usability improvements that reduced reservation completion time by 53% (85 → 40s). Features: real-time availability, reservations, check-in, open-court joining, cancellations.`,
      links: { github: 'https://github.com/vdvenna/ARC', demo: '#' }
    },
    {
      id: 'sars-align',
      title: 'SARS-CoV-2 Sequence Alignment Platform',
      tech: 'Python, TypeScript, Flask, React, Biopython',
      short: 'Bioinformatics platform for spike-protein sequence alignment and benchmarking.',
      details: `Built preprocessing pipeline to extract spike coding sequences and reduced dynamic-programming computation significantly. Ran 2,016 alignment experiments and benchmarked algorithms across scoring profiles.`,
      links: { github: 'https://github.com/dhanush-ven/sars-align', demo: '#' }
    },
    {
      id: 'malaria-detect',
      title: 'Malaria Parasite Detection from Blood Smears',
      tech: 'Python, PyTorch, scikit-learn, OpenCV',
      short: 'Image classification using MobileNetV2 / EfficientNetB0; achieved 92.6% validation accuracy.',
      details: `Fine-tuned pretrained CNNs with augmentation and optimization; achieved 92.6% validation accuracy, 0.977 ROC-AUC. Analyzed training/validation metrics to improve generalization.`,
      links: { github: 'https://github.com/dhanush-ven/malaria-detect', demo: '#' }
    }
  ];

  const grid = document.getElementById('projects-grid');
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card fade-in';
    card.tabIndex = 0;
    card.innerHTML = `
      <h3>${p.title}</h3>
      <div class="tech">${p.tech}</div>
      <p class="metrics">${p.short}</p>
      <div style="margin-top:.6rem">
        <button class="details-btn" data-id="${p.id}">Details</button>
        <a class="outline" href="${p.links.github}" target="_blank" style="margin-left:.5rem">GitHub</a>
      </div>
    `;
    grid.appendChild(card);
  });

  // reveal animations on load
  requestAnimationFrame(() => {
    document.querySelectorAll('.fade-in').forEach((el,i) => setTimeout(()=>el.classList.add('visible'), 60*i));
  });

  // Modal logic
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  grid.addEventListener('click', (e)=>{
    const btn = e.target.closest('.details-btn');
    if(!btn) return;
    const id = btn.dataset.id;
    const p = projects.find(x=>x.id===id);
    if(!p) return;
    modalBody.innerHTML = `<h2>${p.title}</h2><p><strong>Tech:</strong> ${p.tech}</p><p>${p.details}</p><p><a href="${p.links.github}" target="_blank">View on GitHub</a></p>`;
    modal.setAttribute('aria-hidden','false');
  });
  modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true') });

  // Toggle the embedded resume preview without navigating away.
  const resumeToggle = document.getElementById('resume-toggle');
  const resumePreview = document.getElementById('resume-preview');
  resumeToggle.addEventListener('click', () => {
    const isOpen = resumePreview.hidden;
    resumePreview.hidden = !isOpen;
    resumeToggle.textContent = isOpen ? 'Hide Preview' : 'Show Preview';
    resumeToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'nearest'});
      }
    })
  });

  // Theme toggle (dark-first). Persist to localStorage.
  const toggle = document.getElementById('theme-toggle');
  function applyTheme(theme){
    document.documentElement.classList.toggle('light', theme==='light');
    toggle.textContent = theme==='light' ? '🌞' : '🌙';
  }
  const saved = localStorage.getItem('dv_theme') || 'dark';
  applyTheme(saved);
  toggle.addEventListener('click', ()=>{
    const isLight = document.documentElement.classList.toggle('light');
    const theme = isLight ? 'light' : 'dark';
    applyTheme(theme);
    localStorage.setItem('dv_theme', theme);
  });
});