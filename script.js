const attractionsData = [
  {
    id: "westminster-big-ben",
    name: "Palace of Westminster & Big Ben",
    location: "Westminster, Central London",
    image: "image/Palace of Westminster & Big Ben.jpg",
    alt: "Palace of Westminster and Big Ben in London",
    shortDesc: "Historic riverside landmark and seat of the UK Parliament in the heart of London.",
    extraInfo: "Located beside Westminster Bridge; allow extra time for security checks when visiting Parliament."
  },
  {
    id: "tower-of-london",
    name: "Tower of London",
    location: "Tower Hill, Central London",
    image: "image/Tower of London.jpg",
    alt: "Tower of London historic castle",
    shortDesc: "Historic castle on the north bank of the River Thames, home to the Crown Jewels.",
    extraInfo: "Book tickets in advance and head straight to the Crown Jewels early in the morning to beat queues."
  },
  {
    id: "british-museum",
    name: "British Museum",
    location: "Bloomsbury, Central London",
    image: "image/British Museum.jpg",
    alt: "British Museum classical facade",
    shortDesc: "World-famous museum dedicated to human history, art, and culture.",
    extraInfo: "General entry is free, though booking a timed slot is recommended on busy days."
  },
{
   id: "tower-bridge",
    name: "Tower Bridge",
    location: "Tower Hill / Southwark, London",
    image: "image/Tower Bridge.jpg",
    alt: "Tower Bridge crossing the River Thames in London",
    shortDesc: "Iconic bascule and suspension bridge spanning the River Thames near the Tower of London.",
    extraInfo: "Walk across the glass walkways for views down to the river traffic below."
  },
  {
    id: "borough-market",
    name: "Borough Market",
    location: "Southwark, Central London",
   image: "image/Borough Market.jpg",
    alt: "Stalls and produce at Borough Market in London",
    shortDesc: "Historic food market renowned for street food, artisanal produce, and bakeries.",
    extraInfo: "Arrive early or outside peak lunch hours to avoid long queues at popular stalls."
  },
  {
    id: "hyde-park",
    name: "Hyde Park",
    location: "Central London",
    image: "image/Hyde Park.jpg",
    alt: "Walking path and greenery in Hyde Park, London",
    shortDesc: "Expansive Royal Park with lakes, walking trails, and open green spaces.",
    extraInfo: "Great spot for a morning walk near the Serpentine or Kensington Gardens."
  },
  {
    id: "camden-market",
    name: "Camden Market",
    location: "Camden Town, North London",
    image: "image/Camden Market.jpg",
    alt: "Stalls and canal area at Camden Market in London",
    shortDesc: "Vibrant market complex famous for independent stalls, global street food, and creative energy.",
    extraInfo: "Great to combine with a stroll along the Regent's Canal towpath."
  },
  {
    id: "covent-garden",
    name: "Covent Garden",
    location: "West End, Central London",
    image: "image/Covent Garden.jpg",
    alt: "Historic piazza and shops in Covent Garden, London",
    shortDesc: "Lively piazza known for boutiques, street performers, dining, and theatres.",
    extraInfo: "Ideal for evening meals, theatre shows, and browsing the historic market hall."
  }
];

function getFavourites() {
  const saved = localStorage.getItem("londonFavourites");
  return saved ? JSON.parse(saved) : [];
}

function saveFavourites(favs) {
  localStorage.setItem("londonFavourites", JSON.stringify(favs));
}

function updateFavCounter() {
  const favs = getFavourites();
  document.querySelectorAll("[data-fav-count]").forEach((el) => {
    el.textContent = favs.length;
  });
}

function toggleFavourite(id) {
  const favs = getFavourites();
  const index = favs.indexOf(id);

  if (index === -1) {
    favs.push(id);
  } else {
    favs.splice(index, 1);
  }

  saveFavourites(favs);
  updateFavCounter();
}

function createAttractionCard(attraction) {
  const article = document.createElement("article");
  article.className = "attraction-card";

  const favs = getFavourites();
  const isFav = favs.includes(attraction.id);

  article.innerHTML = `
    <img src="${attraction.image}" alt="${attraction.alt}" class="card-img">
    <div class="card-body">
      <p class="card-location">${attraction.location}</p>
      <h3>${attraction.name}</h3>
      <p>${attraction.shortDesc}</p>
      <p class="extra-info" hidden>${attraction.extraInfo}</p>
      <div class="card-actions">
        <button type="button" class="btn btn-secondary toggle-details-btn">View Details</button>
     <button type="button" class="btn btn-primary fav-btn">${isFav ? "Saved in Favourites" : "Add to Favourites"}</button>
      </div>
    </div>
  `;

  const detailsBtn = article.querySelector(".toggle-details-btn");
  const extraInfo = article.querySelector(".extra-info");
  detailsBtn.addEventListener("click", () => {
    const isHidden = extraInfo.hasAttribute("hidden");
    if (isHidden) {
      extraInfo.removeAttribute("hidden");
      detailsBtn.textContent = "Hide Details";
    } else {
      extraInfo.setAttribute("hidden", "");
      detailsBtn.textContent = "View Details";
    }
  });

  const favBtn = article.querySelector(".fav-btn");
  favBtn.addEventListener("click", () => {
    toggleFavourite(attraction.id);
    const nowFav = getFavourites().includes(attraction.id);
    favBtn.textContent = nowFav ? "Saved in Favourites" : "Add to Favourites";
  });

  return article;
}

function renderFeaturedAttractions() {
  const container = document.getElementById("featured-attractions");
  if (!container) return;

  container.innerHTML = "";
  attractionsData.slice(0, 3).forEach((attraction) => {
    container.appendChild(createAttractionCard(attraction));
  });
}


function renderAllAttractions() {
  const container = document.getElementById("attractions-list");
  if (!container) return;

  container.innerHTML = "";
  attractionsData.forEach((attraction) => {
    container.appendChild(createAttractionCard(attraction));
  });
}

function renderHeaderFooter() {
  const body = document.body;
  if (!body) return;

  if (!document.querySelector("header")) {
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <nav class="nav-container">
        <a href="index.html" class="logo">London Trip</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="attractions.html">Attractions</a></li>
          <li><a href="favourites.html">Favourites (<span id="fav-count">0</span>)</a></li>
          <li><a href="about.html">About London</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    `;
    body.insertBefore(header, body.firstChild);
  }

  if (!document.querySelector("footer")) {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <p>&copy; 2026 London Trip Guide. All rights reserved.</p>
    `;
    body.appendChild(footer);
  }
}

document.addEventListener("DOMContentLoaded", () => {
 renderHeaderFooter();
  updateFavCounter();
  renderFeaturedAttractions();
  renderAllAttractions();
renderFavouriteAttractions();
});
function renderFavouriteAttractions() {
  const container = document.getElementById("favourites-list");
  const emptyMsg = document.getElementById("no-favourites-msg");
  if (!container) return;

  const favIds = getFavourites();
  const favAttractions = attractionsData.filter((item) => favIds.includes(item.id));

  container.innerHTML = "";

  if (favAttractions.length === 0) {
    if (emptyMsg) emptyMsg.style.display = "block";
    return;
  }

  if (emptyMsg) emptyMsg.style.display = "none";

  favAttractions.forEach((attraction) => {
    const card = createAttractionCard(attraction);
    const favBtn = card.querySelector(".fav-btn");

    if (favBtn) {
      favBtn.textContent = "Saved in Favourites";
      favBtn.addEventListener("click", () => {
        updateFavCounter();
        renderFavouriteAttractions();
      });
    }

    container.appendChild(card);
  });
}
// Lógica do Formulário de Contacto
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm && contactSuccess) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página
    contactForm.style.display = 'none';
    contactSuccess.style.display = 'block';
  });
}
