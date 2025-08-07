document.addEventListener("DOMContentLoaded", () => {
	const playlist = [
		{
			name: "I'm yours - Avocuddle, Fets",
			file: "music/Im yours - Fets.mp3",
		},
		{ name: "Latch - Sam Smith", file: "music/Latch (Acoustic).mp3" },
		{ name: "One call away - Charlie Puth", file: "music/One Call Away.mp3" },
		{ name: "Valentine - Kina Grannis", file: "music/Valentine.mp3" },
		{
			name: "Everywhere - Flatwood Mac",
			file: "music/Everywhere (2017 Remaster).mp3",
		},
		{
			name: "Your song - Ellie Goulding",
			file: "music/Your Song (Bonus Track).mp3",
		},
		{
			name: "On the nature of daylight - Max Richter",
			file: "music/On the Nature of Daylight.mp3",
		},
		{
			name: "Unconditionally - Katty Perry",
			file: "music/Unconditionally.mp3",
		},
	];
	let currentTrack = 0;
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
			description:
				"By 'first talk' I mean the one we had on Discord. You seemed really nice and easy to talk to. Hmm… maybe I should phrase it differently? I have no idea how to write it all.",
		},
		{
			name: "firstgame",
			next: "firstmovie",
			color: "#CCA9DD",
			title: "First game",
			description:
				"I remember (yes, I can remember things!) that before we played, I was a bit scared about how things would go. But while we were playing, it felt really cozy and fun, and after a while, I wasn’t scared at all. You were really funny  and you still are! I had a really nice night, so thank you for that and for everything else.",
		},
		{
			name: "firstmovie",
			next: "firstserie",
			color: "#F0B0BC",
			title: "First movie",
			description:
				"I'm pretty sure we saw 'Saw' (hehe, saw Saw  I can make jokes too!). It was really nice to watch a movie with someone especially you. I really enjoyed, and still enjoy, your company a lot. Watching 'Saw' was fun and chill, not just because of the movie, but because I got to watch it with you. That’s when I realized I could spend time with you, even in silence, and still have fun and enjoy your presence.",
		},
		{
			name: "firstserie",
			next: "minecraft",
			color: "#A0DEEE",
			title: "First serie",
			description:
				"What I really liked was that while we were watching, we kept messaging each other, even as we paid attention to the series. It showed me something that whether we're watching something, playing, talking, or just sitting in silence, the atmosphere between us stays the same peaceful and warm. Like a safe place where you could have the best sleep ever.",
		},
		{
			name: "minecraft",
			next: "realisation",
			color: "#CCA9DD",
			title: "Minecraft",
			description:
				"Why Minecraft, of all the games we played? Because it’s the one where you managed to get most of my siblings to play together and that meant so much to me. It’s through that game that my siblings met you, and they like you just as much as I do. You showed so much patience and kindness, it was honestly so sweet. I enjoy every second spent with you, and that’s amazing. That’s when I realized I could truly be myself around you, without any worry. The more I got to know you, the more I just wanted to spend time with you I couldn’t wish for anything more.",
		},
		{
			name: "realisation",
			next: "proposal",
			color: "#F0B0BC",
			title: "Realisation",
			description:
				"After all the time we’ve spent together, and after a talk I had with my older brother, I realized something you are the best person I know. Every moment we've shared has been among the warmest and dearest in my life. I couldn’t wish for a better person to spend my time with, and that feeling is just amazing. You brighten my days and nights, and for someone to change my daily life like that... it’s something truly wonderful. You've filled my days with so much more than just happiness. That’s when I realized I’m in love with you.",
		},
		{
			name: "proposal",
			next: null, // No next dot to unlock
			color: "#A0DEEE",
			title: "Proposal",
			description:
				"Even before you asked, I was already smiling at the thought of having you as my girlfriend. I don’t even know how to explain what I felt it was like fireworks. My whole soul felt it deeply, because you're so amazing. What you make me feel just by being yourself is incredible, and I don’t ever want to lose you. I want us to look toward the future and build something together. I’m really looking forward to it.",
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
			dot.classList.add("unlocked");
			dot.setAttribute("data-clicked", "true");

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
				songJustUnlocked = true; // set flag to show popup later
				saveProgress();
			}

			saveProgress();
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
       <p>Do you want to know something?</p>

<p>There’s a calm that fills me every time I hear your voice like the world slows down just to let me breathe. And when you sing, it’s like the sky opens up just a little more. You don’t even realize how deeply you affect everything around you.</p>

<p>Having you in my life has brought me more than just happiness it’s a feeling I can’t quite explain.</p>

<p>It’s warmth. It’s peace. It’s joy. It’s light. It’s melody. It’s you.</p>

<p>want to spend every second with you not because I need to fill time, but because you make time feel worth living.</p>

<p>You carry something no one else does your dreams, your past, your way of seeing the world, and the strength you carry even in silence.</p>

<p>Today is your day, and I just want to say this: I’m so thankful you were born.</p>

<p>Because thanks to that, I get to know you. I get to love you.</p>

<p>You’ve made ordinary days feel magical, and even silence with you feels full.</p>

<p>Whatever we do, wherever life takes us  I know I’ll smile if you’re there with me.</p>

<p>You deserve all the love and softness the world can offer  and I hope I can be a part of giving that to you.</p>

<p>Happy Birthday. I love you my love.</p>

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

	audio.addEventListener("ended", () => {
		let next = currentTrack + 1;

		while (next < playlist.length && !unlockedSongs.includes(next)) {
			next++;
		}

		if (next < playlist.length) {
			loadTrack(next);
			audio.play();
			showPauseIcon();
			startSongNameAnimation(playlist[next].name);
		}
	});

	function saveProgress() {
		const unlockedDotIds = [
			...document.querySelectorAll('[data-clicked="true"]'),
		]
			.filter((el) => el.id?.startsWith("dot-"))
			.map((el) => el.id);

		const unlockedSongIndices = unlockedSongs;

		localStorage.setItem("unlockedDots", JSON.stringify(unlockedDotIds));
		localStorage.setItem("unlockedSongs", JSON.stringify(unlockedSongIndices));
		localStorage.setItem("currentTrack", currentTrack);
	}

	document.getElementById("reset-progress")?.addEventListener("click", () => {
		if (confirm("Are you sure you want to reset all progress?")) {
			localStorage.clear();
			location.reload();
		}
	});

	restoreProgress();

	function restoreProgress() {
		try {
			const redditDot = document.getElementById("dot-reddit");
			if (redditDot) redditDot.classList.add("unlocked");
			const unlockedDotIds =
				JSON.parse(localStorage.getItem("unlockedDots")) || [];
			const savedUnlockedSongs = JSON.parse(
				localStorage.getItem("unlockedSongs")
			) || [0];
			currentTrack = parseInt(localStorage.getItem("currentTrack")) || 0;

			// Restore unlocked songs
			unlockedSongs = savedUnlockedSongs;

			// Restore unlocked elements
			unlockedDotIds.forEach((dotId) => {
				const dot = document.getElementById(dotId);
				if (!dot) return;

				const name = dotId.replace("dot-", "");
				const ev = events.find((e) => e.name === name);
				if (!ev) return;

				// Mark it as clicked so we can re-save properly
				dot.setAttribute("data-clicked", "true");

				const path = document.getElementById(`path-${ev.name}-${ev.next}`);
				const title = document.getElementById(`title-${ev.name}`);
				const icon = document.getElementById(`icon-${ev.name}`);
				const icon2 = document.getElementById(`icon2-${ev.name}`);
				const text = document.getElementById(`text-${ev.name}`);
				const text2 = document.getElementById(`text2-${ev.name}`);

				//  Only restore clicked node visuals, not the next one
				dot.classList.add("unlocked");
				dot.style.fill = ev.color;
				if (title) {
					title.style.fill = ev.color;
					title?.classList.add("unlocked");
				}
				if (path) {
					path.classList.add("unlocked");
					path.style.stroke = ev.color;
				}
				if (icon) {
					icon.classList.add("unlocked");
					icon
						.querySelectorAll("*")
						.forEach((el) => (el.style.stroke = ev.color));
				}
				if (icon2) {
					icon2.classList.add("unlocked");
					icon2
						.querySelectorAll("*")
						.forEach((el) => (el.style.stroke = ev.color));
				}
				if (text) {
					text.classList.add("unlocked");
					text.style.fill = ev.color;
				}
				if (text2) {
					text2.classList.add("unlocked");
					text2.style.fill = ev.color;
				}
				if (ev.next) {
					const nextDot = document.getElementById(`dot-${ev.next}`);
					const nextTitle = document.getElementById(`title-${ev.next}`);
					if (nextDot) nextDot.classList.add("unlocked");
					if (nextTitle) nextTitle.classList.add("unlocked");
				}
				if (ev.name === "proposal") {
					const proposalPath = document.getElementById("path-proposal");
					if (proposalPath) {
						proposalPath.classList.add("unlocked");
						proposalPath.style.stroke = ev.color;
					}
				}
			});
		} catch (err) {
			console.warn("Restore failed", err);
		}
	}
});
