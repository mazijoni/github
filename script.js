// Henter referanser til DOM-elementer
const utstyrsliste = document.getElementById('utstyrsliste');
const utstyrForm = document.getElementById('utstyrForm');

// Eksempel på hardkodet data
let utstyr = [
  { navn: 'Kamera', status: 'Tilgjengelig' },
  { navn: 'Stativ', status: 'Utleid' }
];

// Funksjon for å oppdatere utstyrslisten
function oppdaterUtstyrsliste() {
  utstyrsliste.innerHTML = ''; // Tømmer listen
  utstyr.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'utstyr';
    div.innerHTML = `
      <span>${item.navn} - ${item.status}</span>
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
  utstyr.push({ navn, status: 'Tilgjengelig' });
  oppdaterUtstyrsliste();
  utstyrForm.reset(); // Tømmer skjema
});

// Funksjon for å endre status
function endreStatus(index) {
  utstyr[index].status =
    utstyr[index].status === 'Tilgjengelig' ? 'Utleid' : 'Tilgjengelig';
  oppdaterUtstyrsliste();
}

// Funksjon for å slette utstyr
function slettUtstyr(index) {
  utstyr.splice(index, 1);
  oppdaterUtstyrsliste();
}

// Initial oppdatering av listen
oppdaterUtstyrsliste();
// Lagre til LocalStorage
function lagreTilLocalStorage() {
    localStorage.setItem('utstyr', JSON.stringify(utstyr));
  }
  
  // Hente fra LocalStorage
  function hentFraLocalStorage() {
    const lagretUtstyr = localStorage.getItem('utstyr');
    if (lagretUtstyr) {
      utstyr = JSON.parse(lagretUtstyr);
    }
  }
  
  // Oppdater funksjonene
  utstyrForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const navn = document.getElementById('navn').value;
    utstyr.push({ navn, status: 'Tilgjengelig' });
    lagreTilLocalStorage();
    oppdaterUtstyrsliste();
  });
  
  function oppdaterUtstyrsliste() {
    utstyrsliste.innerHTML = '';
    utstyr.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'utstyr';
      div.innerHTML = `
        <span>${item.navn} - ${item.status}</span>
        <button onclick="endreStatus(${index})">Endre status</button>
        <button onclick="slettUtstyr(${index})">Slett</button>
      `;
      utstyrsliste.appendChild(div);
    });
    lagreTilLocalStorage();
  }
  
  hentFraLocalStorage();
  oppdaterUtstyrsliste();
  