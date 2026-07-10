/*==================================================
    SNAP AURA DESIGNS
    MAIN SCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  /*=====================================
        MAGNETIC / GLOW EFFECT
    =====================================*/

  const cards = document.querySelectorAll(
    ".service-card, .pricing-card, .testimonial-card, .portfolio-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });

  /*=====================================
        FAQ ACCORDION
    =====================================*/

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    answer.style.maxHeight = "0px";

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");

        faq.querySelector(".faq-answer").style.maxHeight = "0px";
      });

      if (!isActive) {
        item.classList.add("active");

        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /*=====================================
        LUCIDE ICONS
    =====================================*/

  if (window.lucide) {
    lucide.createIcons();
  }
});
/*==============================
 HERO TILT EFFECT
==============================*/

const heroImage = document.querySelector(".hero-main-image");

if (heroImage) {
  heroImage.addEventListener("mousemove", (e) => {
    const rect = heroImage.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 14;

    const rotateX = (y / rect.height - 0.5) * -14;

    heroImage.style.transform = `
perspective(1200px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.04)
`;
  });

  heroImage.addEventListener("mouseleave", () => {
    heroImage.style.transform = `
perspective(1200px)
rotateX(0deg)
rotateY(0deg)
scale(1)
`;
  });
}

/*=========================================
WHY CHOOSE ANIMATION
==========================================*/

const whySection = document.querySelector(".trusted");

if (whySection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.25 },
  );

  observer.observe(whySection);
}
/*=========================================
COUNTER
==========================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = +counter.dataset.target;

      let current = 0;

      const step = Math.ceil(target / 50);

      const update = () => {
        current += step;

        if (current >= target) {
          counter.innerHTML = target + "+";
        } else {
          counter.innerHTML = current + "+";

          requestAnimationFrame(update);
        }
      };

      update();

      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.6 },
);

counters.forEach((counter) => counterObserver.observe(counter));
/*=========================================
ABOUT SECTION REVEAL
==========================================*/

const aboutSection = document.querySelector(".about");

if (aboutSection) {
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          aboutObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25,
    },
  );

  aboutObserver.observe(aboutSection);
}
/*=========================================
SERVICES REVEAL
==========================================*/

const services = document.querySelector(".services");

if (services) {
  const serviceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          serviceObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  serviceObserver.observe(services);
}
/*=========================================
PORTFOLIO MOUSE GLOW
=========================================*/

document.querySelectorAll(".portfolio-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});
/*=========================================
PORTFOLIO REVEAL
=========================================*/

const portfolio = document.querySelector(".portfolio");

if (portfolio) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(portfolio);
}
/*=========================================
PORTFOLIO PAGE REVEAL
=========================================*/

const portfolioPage = document.querySelector(".portfolio-page");

if (portfolioPage) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(portfolioPage);
}
/*=========================================
PRICING REVEAL
=========================================*/

const pricing = document.querySelector(".pricing");

if (pricing) {
  const pricingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          pricingObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  pricingObserver.observe(pricing);
}
/*=========================================
TESTIMONIAL REVEAL
=========================================*/

const testimonials = document.querySelector(".testimonials");

if (testimonials) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(testimonials);
}
/*=========================================
FAQ REVEAL
=========================================*/

const faq = document.querySelector(".faq");

if (faq) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(faq);
}
/*=========================================
CONTACT REVEAL
=========================================*/

const contact = document.querySelector(".contact");

if (contact) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(contact);
}
/*=========================================
FOOTER REVEAL
=========================================*/

const footer = document.querySelector(".footer");

if (footer) {
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");

          footerObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  footerObserver.observe(footer);
}

