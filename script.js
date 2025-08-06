document.addEventListener("DOMContentLoaded", () => {
	const events = [
		{
			name: "reddit",
			next: "firsttalk",
			color: "#F0B0BC",
			title: "Juin",
			description: "he looks cursed",
		},
		{
			name: "firsttalk",
			next: "firstgame",
			color: "#A0DEEE",
			title: "First talk",
			description: "“Le triangle”…",
		},
		{
			name: "firstgame",
			next: "firstmovie",
			color: "#CCA9DD",
			title: "First talk",
			description: "“Le triangle”…",
		},
		{
			name: "firstmovie",
			next: "firstserie",
			color: "#F0B0BC",
			title: "First game",
			description: "“Le triangle”…",
		},
		{
			name: "firstserie",
			next: "minecraft",
			color: "#A0DEEE",
			title: "First game",
			description: "“Le triangle”…",
		},
		{
			name: "minecraft",
			next: "realisation",
			color: "#CCA9DD",
			title: "First game",
			description: "“Le triangle”…",
		},
		{
			name: "realisation",
			next: "proposal",
			color: "#F0B0BC",
			title: "First game",
			description: "“Le triangle”…",
		},
		{
			name: "proposal",
			next: null, // No next dot to unlock
			color: "#A0DEEE",
			title: "Proposal",
			description: "The big moment ❤️",
		},
	];

	// Set up the timeline interactions + popup
	events.forEach((ev) => {
		const title = document.getElementById(`title-${ev.name}`);
		const dot = document.getElementById(`dot-${ev.name}`);
		const icon = document.getElementById(`icon-${ev.name}`);
		const icon2 = document.getElementById(`icon2-${ev.name}`);
		const text = document.getElementById(`text-${ev.name}`);
		const text2 = document.getElementById(`text2-${ev.name}`);
		const path = document.getElementById(`path-${ev.name}-${ev.next}`);
		const nextDot = document.getElementById(`dot-${ev.next}`);
		const nextTitle = document.getElementById(`title-${ev.next}`);
		if (!dot) return;
		dot.addEventListener("click", () => {
			dot.style.fill = ev.color;

			// 1) Normal chain unlocks (only when a next path exists)
			if (path) {
				path.classList.add("unlocked");
				nextDot?.classList.add("unlocked");
				nextTitle?.classList.add("unlocked");
				icon?.classList.add("unlocked");
				icon2?.classList.add("unlocked");
				text?.classList.add("unlocked");
				text2?.classList.add("unlocked");

				path.style.stroke = ev.color;
				icon
					?.querySelectorAll("*")
					?.forEach((el) => (el.style.stroke = ev.color));
				icon2
					?.querySelectorAll("*")
					?.forEach((el) => (el.style.stroke = ev.color));
				title && (title.style.fill = ev.color);
				text && (text.style.fill = ev.color);
				text2 && (text2.style.fill = ev.color);
			}

			// 2) Terminal node: proposal (no next) — still show its inbound path + visuals
			if (!ev.next && ev.name === "proposal") {
				const proposalPath = document.getElementById("path-proposal");
				proposalPath?.classList.add("unlocked");
				proposalPath.style.stroke = ev.color;

				icon?.classList.add("unlocked");
				icon2?.classList.add("unlocked");
				text?.classList.add("unlocked");
				text2?.classList.add("unlocked");

				// Tint like the other steps
				icon
					?.querySelectorAll("*")
					?.forEach((el) => (el.style.stroke = ev.color));
				icon2
					?.querySelectorAll("*")
					?.forEach((el) => (el.style.stroke = ev.color));
				title && (title.style.fill = ev.color);
				text && (text.style.fill = ev.color);
				text2 && (text2.style.fill = ev.color);
			}

			// 3) Popup — always runs (don’t gate it behind `if (path)`)
			const popup = document.getElementById("event-popup");
			const t = document.getElementById("popup-title");
			const d = document.getElementById("popup-description");
			if (popup && t && d) {
				t.textContent = ev.title || ev.name;
				d.textContent = ev.description || "No details yet.";
				popup.style.display = "block";
			}
		});

		dot
			.closest('g[id^="event-"]')
			?.parentNode?.appendChild(dot.closest('g[id^="event-"]'));
	});

	// Popup close behavior
	document.getElementById("popup-close")?.addEventListener("click", () => {
		const p = document.getElementById("event-popup");
		if (p) p.style.display = "none";
	});
	document.getElementById("event-popup")?.addEventListener("click", (e) => {
		if (e.target.id === "event-popup") e.currentTarget.style.display = "none";
	});

	// Intro modal (show once per browser)
	const modal = document.getElementById("intro-modal");
	const closeBtn = modal?.querySelector(".intro-close");
	const seenKey = "introSeen_v1";
	const openModal = () => modal.classList.add("open");
	const closeModal = () => {
		modal.classList.remove("open");
		try {
			localStorage.setItem(seenKey, "1");
		} catch {}
	};
	if (modal && !localStorage.getItem(seenKey)) {
		openModal();
		closeBtn?.addEventListener("click", closeModal);
		modal
			.querySelector(".intro-backdrop")
			?.addEventListener("click", closeModal);
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
		});
	}
});
