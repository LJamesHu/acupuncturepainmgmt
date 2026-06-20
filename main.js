/* =========================================================
   Acupuncture & Pain Management Center — site behaviour
   Vanilla JS, no dependencies (except Leaflet for the map).
   ========================================================= */
(function () {
	"use strict";

	/* ---- Current year in footer ---- */
	var yearEl = document.getElementById("year");
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	/* ---- Mobile navigation toggle ---- */
	var toggle = document.querySelector(".nav-toggle");
	var menu = document.getElementById("nav-menu");

	function closeMenu() {
		if (!menu) return;
		menu.classList.remove("open");
		if (toggle) toggle.setAttribute("aria-expanded", "false");
	}

	if (toggle && menu) {
		toggle.addEventListener("click", function () {
			var open = menu.classList.toggle("open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
		// Close after tapping a link
		menu.addEventListener("click", function (e) {
			if (e.target.closest("a")) closeMenu();
		});
		// Close on Escape
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") closeMenu();
		});
	}

	/* ---- Sticky header shadow on scroll ---- */
	var header = document.querySelector(".site-header");
	function onScroll() {
		if (header) header.classList.toggle("scrolled", window.scrollY > 8);
	}
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	/* ---- Scroll-reveal animations ---- */
	var revealEls = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && revealEls.length) {
		var observer = new IntersectionObserver(function (entries, obs) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					obs.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
		revealEls.forEach(function (el) { observer.observe(el); });
	} else {
		revealEls.forEach(function (el) { el.classList.add("is-visible"); });
	}

	/* ---- Active nav link highlighting ---- */
	var sections = document.querySelectorAll("main section[id]");
	var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
	if ("IntersectionObserver" in window && sections.length) {
		var linkFor = {};
		navLinks.forEach(function (a) {
			linkFor[a.getAttribute("href").slice(1)] = a;
		});
		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				var link = linkFor[entry.target.id];
				if (!link) return;
				if (entry.isIntersecting) {
					navLinks.forEach(function (a) { a.classList.remove("active"); });
					link.classList.add("active");
				}
			});
		}, { rootMargin: "-45% 0px -50% 0px" });
		sections.forEach(function (s) { spy.observe(s); });
	}

	/* ---- Leaflet map ---- */
	var mapEl = document.getElementById("map");
	if (mapEl && window.L) {
		var coords = [29.554589, -81.236148];
		var map = L.map("map", {
			scrollWheelZoom: false,
			zoomControl: true
		}).setView(coords, 14);

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		L.marker(coords).addTo(map)
			.bindPopup(
				"<strong>Acupuncture &amp; Pain Management Center</strong><br>" +
				"50 Leanni Way, Unit A2<br>Palm Coast, FL 32137"
			);

		// Re-center cleanly if the container size changes
		window.addEventListener("resize", function () {
			map.invalidateSize();
		});
	}
})();
