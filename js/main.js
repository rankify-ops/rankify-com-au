/* Rankify® — interactions (rebuilt off Framer) */

(function () {
  "use strict";

  /* ----- mobile menu ----- */
  var burger = document.querySelector(".nav-burger");
  var overlay = document.getElementById("menuOverlay");
  if (burger && overlay) {
    burger.addEventListener("click", function () {
      var open = overlay.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    overlay.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ----- scroll reveal ----- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-scale");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ----- animated counters ----- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1600;
    var start = null;
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * ease(p)) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ----- services accordion (single-open) ----- */
  var serviceRows = document.querySelectorAll("[data-service]");
  serviceRows.forEach(function (row) {
    var head = row.querySelector(".service-head");
    head.addEventListener("click", function () {
      if (row.classList.contains("is-open")) return;
      serviceRows.forEach(function (r) { r.classList.remove("is-open"); });
      row.classList.add("is-open");
    });
  });

  /* ----- FAQ accordion ----- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-a").style.maxHeight = "";
      });
      if (!isOpen) {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ----- forms (backend pending — placeholder handler) ----- */
  function wireForm(form, message) {
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      if (btn) {
        btn.textContent = message;
        btn.disabled = true;
      }
    });
  }
  wireForm(document.getElementById("contactForm"), "Thanks — we’ll be in touch!");
  wireForm(document.getElementById("newsForm"), "Subscribed!");
})();
