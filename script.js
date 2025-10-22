// Haetaan tarvittavat elementit
const lomake = document.getElementById("todo-form");
const syote = document.getElementById("todo-input");
const lista = document.getElementById("todo-list");
const virheviesti = document.getElementById("error-message");
const laskuri = document.getElementById("counter");

// Ladataan tallennetut tehtävät localStoragesta
let tehtavat = JSON.parse(localStorage.getItem("tehtavat")) || [];

// Päivittää tehtävien määrän
function paivitaLaskuri() {
  const jaljella = tehtavat.filter(tehtava => !tehtava.valmis).length;
  laskuri.textContent = `Tehtäviä jäljellä: ${jaljella}`;
}

// Tallentaa tehtävät localStorageen
function tallennaTehtavat() {
  localStorage.setItem("tehtavat", JSON.stringify(tehtavat));
}

// Piirtää tehtävät listalle
function piirraTehtavat() {
  lista.innerHTML = "";
  tehtavat.forEach((tehtava, indeksi) => {
    const valmisLuokka = tehtava.valmis ? "done" : "";
    lista.innerHTML += `
      <li class="${valmisLuokka}">
        ${tehtava.teksti}
        <div>
          <button onclick="merkitseValmiiksi(${indeksi})">✓</button>
          <button onclick="poistaTehtava(${indeksi})">x</button>
        </div>
      </li>
    `;
  });
  paivitaLaskuri();
}

// Merkitsee tehtävän tehdyksi tai palauttaa sen aktiiviseksi
function merkitseValmiiksi(indeksi) {
  tehtavat[indeksi].valmis = !tehtavat[indeksi].valmis;
  tallennaTehtavat();
  piirraTehtavat();
}

// Poistaa tehtävän listalta
function poistaTehtava(indeksi) {
  tehtavat.splice(indeksi, 1);
  tallennaTehtavat();
  piirraTehtavat();
}

// Lomakkeen lähetys
lomake.addEventListener("submit", tapahtuma => {
  tapahtuma.preventDefault();
  const teksti = syote.value.trim();

  if (teksti.length < 3) {
    syote.classList.add("error");
    virheviesti.textContent = "Tehtävän pitää olla vähintään 3 merkkiä.";
    return;
  }

  syote.classList.remove("error");
  virheviesti.textContent = "";

  tehtavat.push({ teksti, valmis: false });
  tallennaTehtavat();
  piirraTehtavat();
  syote.value = "";
});

// Näytetään tallennetut tehtävät sivun latauksen yhteydessä
piirraTehtavat();
