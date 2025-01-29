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
      <span><strong>${item.navn}</strong> <br>
      <small>Lagt til: ${item.dato}</small></span>
      ${
        item.bilde
          ? `<img src="${item.bilde}" alt="${item.navn}">`
          : ''
      }
      ${item.låntAv ? `<p>Lånt ut til: ${item.låntAv}</p>` : ''}
      <button onclick="redigerUtstyr(${index})">Rediger</button>
      <button onclick="lånUtUtstyr(${index})">Lån ut</button>
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
  const dato = new Date().toLocaleDateString();

  if (!navn.trim()) {
    alert('Vennligst fyll inn et navn!');
    return;
  }

  if (bildeInput) {
    const reader = new FileReader();
    reader.onload = (event) => {
      utstyr.push({ navn, bilde: event.target.result, dato, låntAv: null });
      lagreTilLocalStorage();
      oppdaterUtstyrsliste();
      utstyrForm.reset();
    };
    reader.readAsDataURL(bildeInput);
  } else {
    utstyr.push({ navn, bilde: null, dato, låntAv: null });
    lagreTilLocalStorage();
    oppdaterUtstyrsliste();
    utstyrForm.reset();
  }
});

// Funksjon for å redigere utstyr
function redigerUtstyr(index) {
  const nyttNavn = prompt('Skriv inn nytt navn for utstyret:', utstyr[index].navn);
  if (nyttNavn && nyttNavn.trim() !== '') {
    utstyr[index].navn = nyttNavn;
    lagreTilLocalStorage();
    oppdaterUtstyrsliste();
  }
}

// Funksjon for å låne ut utstyr
function lånUtUtstyr(index) {
  const låntAv = prompt('Hvem låner dette utstyret?');
  if (låntAv && låntAv.trim() !== '') {
    utstyr[index].låntAv = låntAv;
    lagreTilLocalStorage();
    oppdaterUtstyrsliste();
  }
}

// Funksjon for å slette utstyr
function slettUtstyr(index) {
  if (confirm('Er du sikker på at du vil slette dette utstyret?')) {
    utstyr.splice(index, 1);
    lagreTilLocalStorage();
    oppdaterUtstyrsliste();
  }
}

// Initial oppdatering av listen
oppdaterUtstyrsliste();
