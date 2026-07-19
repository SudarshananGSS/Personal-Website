function show_modal(modal_id){
  const profModal= document.getElementById(modal_id);
  const modalEl = new bootstrap.Modal(profModal);
  modalEl.show();

  // Privacy-friendly analytics event (Plausible), if enabled.
  if (window.plausible) {
    window.plausible('Work Modal Open', { props: { modal: modal_id } });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Track outbound/social/action clicks without cookies (Plausible).
  document.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!window.plausible) return;
      var href = link.getAttribute('href') || '';
      if (href.startsWith('http')) {
        window.plausible('Outbound Click', { props: { href: href } });
      } else if (href.startsWith('mailto:')) {
        window.plausible('Email Click');
      } else if (href.toLowerCase().endsWith('.pdf')) {
        window.plausible('Resume Download');
      }
    });
  });

  // Scrollspy — highlight active nav link as user scrolls
  var sectionNavMap = [
    { id: 'project-focus', section: 'projects' },
    { id: 'proj',          section: 'projects' },
    { id: 'abt',           section: 'about'    },
    { id: 'edu',           section: 'edu'      },
    { id: 'skill',         section: 'skills'   },
    { id: 'cert',          section: 'skills'   },
    { id: 'work',          section: 'work'     },
    { id: 'volunteer',     section: 'work'     },
  ];

  function getActiveSection() {
    var scrollY = window.scrollY + 120;
    var active = null;
    sectionNavMap.forEach(function (entry) {
      var el = document.getElementById(entry.id);
      if (el && el.offsetTop <= scrollY) active = entry.section;
    });
    return active;
  }

  function updateScrollspy() {
    var active = getActiveSection();
    document.querySelectorAll('.nav-link[data-section]').forEach(function (link) {
      if (link.dataset.section === active) {
        link.classList.add('nav-scrollspy-active');
      } else {
        link.classList.remove('nav-scrollspy-active');
      }
    });
  }

  window.addEventListener('scroll', updateScrollspy, { passive: true });
  updateScrollspy();

  // Back to top button
  var backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
