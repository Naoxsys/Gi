document.addEventListener("DOMContentLoaded", () => {
	let unlockedSongs = [0]; // Only first song unlocked by default
	let songJustUnlocked = false;

	const events = [
		{
			name: "reddit",
			next: "firsttalk",
			color: "#F0B0BC",
			title: "Reddit",
			description:
				"It's where everything started ! :D I remember wanting a new friendship, even though I knew I had some difficulties hanging out with people. But I wanted to try and see what would happen. I was really glad you replied. I don't think there's anything else to say about it?",
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
			title: "First game",
			description: "“Le triangle”…",
		},
		{
			name: "firstmovie",
			next: "firstserie",
			color: "#F0B0BC",
			title: "First movie",
			description: "“Le triangle”…",
		},
		{
			name: "firstserie",
			next: "minecraft",
			color: "#A0DEEE",
			title: "First serie",
			description: "“Le triangle”…",
		},
		{
			name: "minecraft",
			next: "realisation",
			color: "#CCA9DD",
			title: "Minecraft",
			description: "“Le triangle”…",
		},
		{
			name: "realisation",
			next: "proposal",
			color: "#F0B0BC",
			title: "Realisation",
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
			// === UNLOCK NEXT SONG ===
			if (unlockedSongs.length < playlist.length) {
				unlockedSongs.push(unlockedSongs.length);
				songJustUnlocked = true; // 🔥 set flag to show popup later
				updatePlaylistUI?.();
			}
		});

		dot
			.closest('g[id^="event-"]')
			?.parentNode?.appendChild(dot.closest('g[id^="event-"]'));

		// Somethingnext click → show scrollable popup if all dots unlocked
		const somethingNextImg = document.getElementById("img-somethingnext");
		if (somethingNextImg) {
			somethingNextImg.addEventListener("click", () => {
				const allDots = Array.from(document.querySelectorAll('[id^="dot-"]'));
				const allUnlocked = allDots.every((dot) => {
					return (
						dot.id === "dot-reddit" || // Always treat reddit as unlocked
						dot.classList.contains("unlocked")
					);
				});

				if (!allUnlocked) {
					// If not unlocked → show a small notice popup instead
					const lockedPopup = document.getElementById("locked-popup");
					if (lockedPopup) {
						lockedPopup.classList.add("show");
						setTimeout(() => lockedPopup.classList.remove("show"), 5000);
					}
					return;
				}

				// If unlocked → show the scrollable popup
				const popup = document.getElementById("somethingnext-popup");
				const title = document.getElementById("somethingnext-title");
				const desc = document.getElementById("somethingnext-description");

				if (popup && title && desc) {
					title.textContent = "Something Next";
					desc.innerHTML = `
        <p>This is a long text about something next. You can scroll this area if the content is long enough to exceed the popup height.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales dolor ac nibh vulputate, ac bibendum nisl tempor. Suspendisse potenti. Mauris vel massa id justo luctus tincidunt. Sed euismod ultrices mi, nec faucibus nunc gravida eu.</p>
        <p>...</p>
      `;
					popup.style.display = "block";
				}
			});
		}

		// Close handler for somethingnext popup
		document
			.getElementById("somethingnext-popup-close")
			?.addEventListener("click", () => {
				const p = document.getElementById("somethingnext-popup");
				if (p) p.style.display = "none";
			});

		document
			.getElementById("somethingnext-popup")
			?.addEventListener("click", (e) => {
				if (e.target.id === "somethingnext-popup")
					e.currentTarget.style.display = "none";
			});
	});

	// Popup close behavior
	document.getElementById("popup-close")?.addEventListener("click", () => {
		const p = document.getElementById("event-popup");
		if (p) p.style.display = "none";

		// Show the unlock popup AFTER closing dot popup
		if (songJustUnlocked) {
			songJustUnlocked = false;
			const songPopup = document.getElementById("song-unlocked-popup");
			if (songPopup) {
				songPopup.classList.add("show");
				setTimeout(() => songPopup.classList.remove("show"), 4000);
			}
		}
	});

	// document.getElementById("event-popup")?.addEventListener("click", (e) => {
	// 	if (e.target.id === "event-popup") e.currentTarget.style.display = "none";
	// });

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

	// === Audio player setup ===
	const playlist = [
		{
			name: "I'm yours - Avocuddle, Fets",
			file: "music/Im yours - Fets.mp3",
		},
		{ name: "Latch - Sam Smith", file: "music/Latch (Acoustic).mp3" },
		{ name: "Song 3", file: "music/song3.mp3" },
		{ name: "Song 4", file: "music/song4.mp3" },
		{ name: "Song 5", file: "music/song5.mp3" },
		{ name: "Song 6", file: "music/song6.mp3" },
		{ name: "Song 7", file: "music/song7.mp3" },
		{ name: "Song 8", file: "music/song8.mp3" },
	];
	let currentTrack = 0;

	const audio = document.getElementById("audio-player");
	const nameText = document.getElementById("name-music");
	const pauseBtn = document.getElementById("img-music-pause");
	const playBtn = document.getElementById("img-music-play");
	const nextBtn = document.getElementById("img-music-next");
	const backBtn = document.getElementById("img-music-back");

	function loadTrack(index) {
		if (!playlist[index]) return;

		// Prevent loading if the track is locked
		if (!unlockedSongs.includes(index)) return;

		currentTrack = index;
		audio.src = playlist[index].file;
		nameText.innerHTML = `<tspan id="name-music-tspan" x="1199" y="87.2273">${playlist[index].name}</tspan>`;
	}

	let scrollAnimationId = null;
	let scrollPosition = 0;

	function startSongNameAnimation(songName = "") {
		stopSongNameAnimation();
		const text = document.getElementById("name-music");
		if (!text || !songName) return;

		text.innerHTML = "";
		text.setAttribute("transform", "translate(0, 0)");

		const fullString = songName + "   •   ";

		const clone1 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"tspan"
		);
		const clone2 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"tspan"
		);

		clone1.textContent = fullString;
		clone2.textContent = fullString;

		clone1.setAttribute("x", "1199");
		clone1.setAttribute("y", "87.2273");
		clone2.setAttribute("y", "87.2273");

		text.appendChild(clone1);
		text.appendChild(clone2);

		requestAnimationFrame(() => {
			const fullLength = clone1.getComputedTextLength();
			clone2.setAttribute("x", 1199 + fullLength);

			scrollPosition = 0;

			function scroll() {
				scrollPosition -= 0.2;
				if (scrollPosition <= -fullLength) scrollPosition = 0;
				text.setAttribute("transform", `translate(${scrollPosition}, 0)`);
				scrollAnimationId = requestAnimationFrame(scroll);
			}

			scrollAnimationId = requestAnimationFrame(scroll);
		});
	}

	function stopSongNameAnimation() {
		cancelAnimationFrame(scrollAnimationId);
		scrollAnimationId = null;

		// Optional: reset position to 0
		const text = document.getElementById("name-music");
		if (text) text.setAttribute("transform", "translate(0, 0)");
	}

	function showPauseIcon() {
		playBtn.style.display = "none";
		pauseBtn.style.display = "block";
	}

	function showPlayIcon() {
		pauseBtn.style.display = "none";
		playBtn.style.display = "block";
	}

	playBtn?.addEventListener("click", () => {
		audio.play();
		showPauseIcon();
		startSongNameAnimation(playlist[currentTrack].name); // Pass the name
	});

	pauseBtn?.addEventListener("click", () => {
		audio.pause();
		showPlayIcon();
		stopSongNameAnimation(); // Stops and resets
	});

	nextBtn?.addEventListener("click", () => {
		let next = currentTrack + 1;
		while (next < playlist.length && !unlockedSongs.includes(next)) {
			next++;
		}

		if (next < playlist.length) {
			loadTrack(next);
			audio.play();
			showPauseIcon();
			startSongNameAnimation(playlist[next].name);
		} else {
			// No more unlocked songs → show popup
			const noMorePopup = document.getElementById("no-more-songs-popup");
			if (noMorePopup) {
				noMorePopup.classList.add("show");
				setTimeout(() => noMorePopup.classList.remove("show"), 4000);
			}
		}
	});

	backBtn?.addEventListener("click", () => {
		let prev = currentTrack - 1;
		while (prev >= 0 && !unlockedSongs.includes(prev)) {
			prev--;
		}
		if (prev >= 0) {
			loadTrack(prev);
			audio.play();
			showPauseIcon();
			startSongNameAnimation(playlist[prev].name);
		}
	});

	function playAndAnimateOnce() {
		audio.play();
		showPauseIcon();
		startSongNameAnimation(playlist[currentTrack].name);
	}

	const volumeSlider = document.getElementById("volume-slider");

	if (volumeSlider && audio) {
		// Update audio volume when the slider is changed
		volumeSlider.addEventListener("input", (e) => {
			audio.volume = parseFloat(e.target.value);
		});
	}

	// Only load, do not play on entry
	loadTrack(currentTrack);

	// Show playlist popup
	document.getElementById("img-music-bigger")?.addEventListener("click", () => {
		const popup = document.getElementById("music-playlist-popup");
		const list = document.getElementById("music-playlist-list");

		if (!popup || !list) return;

		// Clear and repopulate playlist
		list.innerHTML = "";
		unlockedSongs.forEach((index) => {
			const track = playlist[index];
			const li = document.createElement("li");
			li.textContent = track.name;
			li.onclick = () => {
				currentTrack = index;
				loadTrack(index);
				audio.addEventListener("canplay", playAndAnimateOnce, { once: true });
				popup.style.display = "none";
			};
			list.appendChild(li);
		});

		popup.style.display = "flex";
	});

	// Close popup when clicking outside the box
	document
		.getElementById("music-playlist-popup")
		?.addEventListener("click", (e) => {
			if (e.target.id === "music-playlist-popup") {
				e.currentTarget.style.display = "none";
			}
		});

	// Close popup when clicking the "X" button
	document
		.getElementById("close-music-popup")
		?.addEventListener("click", () => {
			document.getElementById("music-playlist-popup").style.display = "none";
		});
});
