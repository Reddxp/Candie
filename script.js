// EDIT THIS LIST to add your own photos, titles, and captions.
// Put the matching image files inside the "photos" folder.
const slides = [
  {
    image: "photos/photo1.jpg",
    title: "The little things",
    caption: "The best memories are often the simplest ones."
  },
  {
    image: "photos/photo2.jpg",
    title: "A reason to smile",
    caption: "Some people make a normal day feel a little brighter."
  },
  {
    image: "photos/photo3.jpg",
    title: "Moments worth keeping",
    caption: "One day, these little moments will be the big memories."
  },
  {
    image: "photos/photo4.jpg",
    title: "Always appreciated",
    caption: "Here’s to friendship, laughter, and more memories ahead."
  }
];

const welcomeScreen = document.getElementById("welcomeScreen");
const memoriesSection = document.getElementById("memoriesSection");
const openMemories = document.getElementById("openMemories");
const slideImage = document.getElementById("slideImage");
const slideTitle = document.getElementById("slideTitle");
const slideCaption = document.getElementById("slideCaption");
const photoCount = document.getElementById("photoCount");
const slideDots = document.getElementById("slideDots");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pauseButton = document.getElementById("pauseButton");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const backgroundMusic = document.getElementById("backgroundMusic");

let currentSlide = 0;
let slideshowTimer = null;
let isPlayingSlideshow = true;
let isMusicPlaying = false;
const SLIDE_DELAY = 5000;

function renderDots() {
  slideDots.innerHTML = "";
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = `dot${index === currentSlide ? " active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.setAttribute("aria-current", index === currentSlide ? "true" : "false");
    dot.addEventListener("click", () => {
      showSlide(index);
      restartSlideshow();
    });
    slideDots.appendChild(dot);
  });
}

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];

  slideImage.classList.add("changing");
  window.setTimeout(() => {
    slideImage.src = slide.image;
    slideImage.alt = slide.title;
    slideTitle.textContent = slide.title;
    slideCaption.textContent = slide.caption;
    photoCount.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    renderDots();
    slideImage.classList.remove("changing");
  }, 160);
}

function stopSlideshow() {
  if (slideshowTimer) window.clearInterval(slideshowTimer);
  slideshowTimer = null;
}

function startSlideshow() {
  stopSlideshow();
  slideshowTimer = window.setInterval(() => showSlide(currentSlide + 1), SLIDE_DELAY);
  isPlayingSlideshow = true;
  pauseButton.textContent = "Ⅱ Pause slideshow";
  pauseButton.setAttribute("aria-pressed", "false");
}

function restartSlideshow() {
  if (isPlayingSlideshow) startSlideshow();
}

openMemories.addEventListener("click", async () => {
  welcomeScreen.classList.add("hidden");
  memoriesSection.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  startSlideshow();

  // The Enter button click is a user gesture, so browsers are more likely to allow sound.
  try {
    await backgroundMusic.play();
    isMusicPlaying = true;
    musicLabel.textContent = "Pause music";
    musicToggle.setAttribute("aria-pressed", "true");
  } catch (error) {
    isMusicPlaying = false;
    musicLabel.textContent = "Tap for music";
    // The slideshow still works if the MP3 is missing or the browser blocks playback.
  }
});

prevButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  restartSlideshow();
});
nextButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  restartSlideshow();
});

pauseButton.addEventListener("click", () => {
  if (isPlayingSlideshow) {
    stopSlideshow();
    isPlayingSlideshow = false;
    pauseButton.textContent = "▶ Resume slideshow";
    pauseButton.setAttribute("aria-pressed", "true");
  } else {
    startSlideshow();
  }
});

musicToggle.addEventListener("click", async () => {
  if (!isMusicPlaying) {
    try {
      await backgroundMusic.play();
      isMusicPlaying = true;
      musicLabel.textContent = "Pause music";
      musicToggle.setAttribute("aria-pressed", "true");
    } catch (error) {
      musicLabel.textContent = "Add your MP3 first";
      // Browsers cannot play a missing or unsupported audio file.
      window.setTimeout(() => {
        if (!isMusicPlaying) musicLabel.textContent = "Play music";
      }, 2500);
    }
  } else {
    backgroundMusic.pause();
    isMusicPlaying = false;
    musicLabel.textContent = "Play music";
    musicToggle.setAttribute("aria-pressed", "false");
  }
});

// Set up the first photo and dots. Browsers require a click before audio can play.
showSlide(0);
