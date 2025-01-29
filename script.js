// Referanser til DOM-elementer
const utstyrsliste = document.getElementById('utstyrsliste');
const utstyrForm = document.getElementById('utstyrForm');

// Hent data fra LocalStorage eller bruk en tom liste hvis ingen data finnes
let utstyr = JSON.parse(localStorage.getItem('utstyr')) || [];

// Funksjon for å lagre data i LocalStorage
function lagreTilLocalStorage() {
  localStorage.setItem('utstyr', JSON.stringify(utstyr));
}

// Funksjon for å oppdatere utstyrslisten
function oppdaterUtstyrsliste() {
  utstyrsliste.innerHTML = ''; // Tøm listen
  utstyr.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'utstyr';
    div.innerHTML = `
      <span>${item.navn} - <strong>${item.status}</strong></span>
      ${
        item.bilde
          ? `<img src="${item.bilde}" alt="${item.navn}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; margin-left: 10px;">`
          : ''
      }
      <button onclick="endreStatus(${index})">Endre status</button>
      <button onclick="slettUtstyr(${index})">Slett</button>
    `;
    utstyrsliste.appendChild(div);
  });
}

// Funksjon for å legge til nytt utstyr
utstyrForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const navn = document.getElementById('navn').value;
  const bildeInput = document.getElementById('bilde').files[0];

  // Hvis navn ikke er fylt ut, vis en advarsel
  if (!navn.trim()) {
    alert('Vennligst fyll inn et navn!');
    return;
  }

  // Håndter bildet med FileReader
  if (bildeInput) {
    const reader = new FileReader();
    reader.onload = (event) => {
      utstyr.push({ navn, status: 'Tilgjengelig', bilde: event.target.result });
      lagreTilLocalStorage(); // Lagre til LocalStorage
      oppdaterUtstyrsliste();
      utstyrForm.reset(); // Tøm skjema
    };
    reader.readAsDataURL(bildeInput); // Les bildet som en Data URL
  } else {
    // Hvis ingen bilde lastes opp
    utstyr.push({ navn, status: 'Tilgjengelig', bilde: null });
    lagreTilLocalStorage();
    oppdaterUtstyrsliste();
    utstyrForm.reset();
  }
});

// Funksjon for å endre status
function endreStatus(index) {
  utstyr[index].status =
    utstyr[index].status === 'Tilgjengelig' ? 'Utleid' : 'Tilgjengelig';
  lagreTilLocalStorage(); // Lagre endringene
  oppdaterUtstyrsliste();
}

// Funksjon for å slette utstyr
function slettUtstyr(index) {
  if (confirm('Er du sikker på at du vil slette dette utstyret?')) {
    utstyr.splice(index, 1); // Fjern elementet fra listen
    lagreTilLocalStorage(); // Lagre endringene
    oppdaterUtstyrsliste();
  }
}

// Initial oppdatering av listen
oppdaterUtstyrsliste();
