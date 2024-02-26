const tracks = Array.from(document.querySelectorAll(".carousel__track"));
let slidesTrack = [[], []];
tracks.forEach((track, index) => {
	slidesTrack[index] = Array.from(track.children);
});
const nextButtons = Array.from(
	document.querySelectorAll(".carousel__button--right")
);
const prevButtons = Array.from(
	document.querySelectorAll(".carousel__button--left")
);

const slideWidth = slidesTrack[0][0].getBoundingClientRect().width;

// arrange slides next to one another
const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + "px";
};
slidesTrack.forEach((slides) => {
	slides.forEach((slide, index) => {
		setSlidePosition(slide, index);
	});
});

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = "translateX(-" + targetSlide.style.left + ")";
	currentSlide.classList.remove("current-slide");
	targetSlide.classList.add("current-slide");
};

// returns either the previous slide or the last one
const getPrevSlide = (track, currentSlide) => {
	if (currentSlide.previousElementSibling == null) {
		const i = track.children.length - 1;
		return track.children[i];
	}

	return currentSlide.previousElementSibling;
};

// returns either the next slide or the first one
const getNextSlide = (track, currentSlide) => {
	if (currentSlide.nextElementSibling == null) {
		return track.children[0];
	}

	return currentSlide.nextElementSibling;
};

// left button
prevButtons.forEach((prevButton, index) => {
	prevButton.addEventListener("click", (e) => {
		// move your own track
		const currentSlide = tracks[index].querySelector(".current-slide");
		const prevSlide = getPrevSlide(tracks[index], currentSlide);

		moveToSlide(tracks[index], currentSlide, prevSlide);

		// move other track
		const otherIndex = (index + 1) % 2;
		const otherCurrentSlide =
			tracks[otherIndex].querySelector(".current-slide");
		const otherNextSlide = getNextSlide(tracks[otherIndex], otherCurrentSlide);

		moveToSlide(tracks[otherIndex], otherCurrentSlide, otherNextSlide);
	});
});

// right button
nextButtons.forEach((nextButton, index) => {
	nextButton.addEventListener("click", (e) => {
		const currentSlide = tracks[index].querySelector(".current-slide");
		const nextSlide = getNextSlide(tracks[index], currentSlide);

		moveToSlide(tracks[index], currentSlide, nextSlide);

		// move other track
		const otherIndex = (index + 1) % 2;
		const otherCurrentSlide =
			tracks[otherIndex].querySelector(".current-slide");
		const otherPrevSlide = getPrevSlide(tracks[otherIndex], otherCurrentSlide);

		moveToSlide(tracks[otherIndex], otherCurrentSlide, otherPrevSlide);
	});
});
