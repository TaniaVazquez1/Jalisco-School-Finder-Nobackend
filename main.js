document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const municipioSelect = document.getElementById("municipioSelect");
    const nivelSelect = document.getElementById("nivelSelect");
    const searchBtn = document.getElementById("searchBtn");
    const results = document.getElementById("results");
  
    function init() {
  
      console.log("Init running");
  
      municipios.data.forEach(municipio => {
        const option = document.createElement("option");
        option.value = municipio;
        option.textContent = municipio;
        municipioSelect.appendChild(option);
      });
  
      niveles.data.forEach(nivel => {
        const option = document.createElement("option");
        option.value = nivel;
        option.textContent = nivel;
        nivelSelect.appendChild(option);
      });
  
    }
  
    function search() {
  
      let text = searchInput.value.trim().toLowerCase();
      let selectedMunicipio = municipioSelect.value;
      let selectedNivel = nivelSelect.value;
  
      results.innerHTML = "";
  
      let filtered = escuelas.data.filter(escuela => {
  
        let matchName = escuela.nombre.toLowerCase().includes(text);
  
        let matchMunicipio =
          selectedMunicipio === "" ||
          escuela.municipio === selectedMunicipio;
  
        let matchNivel =
          selectedNivel === "" ||
          escuela.nivel === selectedNivel;
  
        return matchName && matchMunicipio && matchNivel;
      });
  
      if (filtered.length === 0) {
        results.innerHTML = "<p>No schools found.</p>";
        return;
      }
  
      filtered.forEach(escuela => {
        results.innerHTML += `
          <div class="card">
            <h3>${escuela.nombre}</h3>
            <p><strong>Clave:</strong> ${escuela.clave}</p>
            <p><strong>Location:</strong> ${escuela.municipio}, JAL</p>
            <p><strong>Nivel:</strong> ${escuela.nivel}</p>
            <div class="badge">${escuela.control}</div>
          </div>
        `;
      });
    }
  
    searchBtn.addEventListener("click", search);
    municipioSelect.addEventListener("change", search);
    nivelSelect.addEventListener("change", search);
    searchInput.addEventListener("input", search);
  
    init();
  
  });