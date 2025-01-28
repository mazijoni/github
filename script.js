// Referanser til DOM-elementer
const utstyrsliste = document.getElementById('utstyrsliste');
const utstyrForm = document.getElementById('utstyrForm');

// Eksempel på hardkodet data
let utstyr = [
  { navn: 'Kamera', status: 'Tilgjengelig' },
  { navn: 'Stativ', status: 'Utleid' },
];

// Funksjon for å oppdatere utstyrslisten
function oppdaterUtstyrsliste() {
  utstyrsliste.innerHTML = ''; // Tøm listen
  utstyr.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'utstyr';
    div.innerHTML = `
      <span>${item.navn} - <strong>${item.status}</strong></span>
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
  const bilde = document.getElementById('bilde').files[0]; // Brukes senere
  if (navn.trim() !== '') {
    utstyr.push({ navn, status: 'Tilgjengelig' });
    oppdaterUtstyrsliste();
    utstyrForm.reset(); // Tøm skjema
  } else {
    alert('Vennligst fyll inn et navn!');
  }
});

// Funksjon for å endre status
function endreStatus(index) {
  utstyr[index].status =
    utstyr[index].status === 'Tilgjengelig' ? 'Utleid' : 'Tilgjengelig';
  oppdaterUtstyrsliste();
}

// Funksjon for å slette utstyr
function slettUtstyr(index) {
  if (confirm('Er du sikker på at du vil slette dette utstyret?')) {
    utstyr.splice(index, 1);
    oppdaterUtstyrsliste();
  }
}

// Initial oppdatering av listen
oppdaterUtstyrsliste();
