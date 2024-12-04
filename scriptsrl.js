let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const priceDisplay = document.getElementById('price');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3000);  // Change slide every 3 seconds
showSlide(currentSlide);

document.getElementById('rank-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const mode = document.getElementById('mode').value;
  const currentRank = document.getElementById('currentRank').value;
  const desiredRank = document.getElementById('desiredRank').value;

  if (!mode || !currentRank || !desiredRank) {
    alert("Please fill out all fields");
    return;
  }

  const ranks = ["bronze1", "bronze2", "bronze3", "silver1", "silver2", "silver3", "gold1", "gold2", "gold3", "platinum1", "platinum2", "platinum3", "diamond1", "diamond2", "diamond3", "champion1", "champion2", "champion3", "grandchampion1", "grandchampion2", "grandchampion3", "ssl"];
  const currentIndex = ranks.indexOf(currentRank);
  const desiredIndex = ranks.indexOf(desiredRank);

  if (currentIndex === -1 || desiredIndex === -1 || currentIndex >= desiredIndex) {
    alert("Please select a valid rank progression.");
    return;
  }

  const rankDifference = desiredIndex - currentIndex;
  const price = rankDifference * 5;

  priceDisplay.textContent = price;
});
