const storageKey = "crudData";

function displayCards(filteredData) {
    $("#zonasContainer").empty();
  
    filteredData.forEach((item) => {
      const card = `
        <div class="col-md-4 mb-4">
          <div class="card">
          <div class="container w-100 p-5" style="background-color: green;">
          </div>
            <div class="card-body">
              <h5 class="card-title">${item.zonaDeProduccion}</h5>
              <p class="card-text">${item.descripcion}</p>
              <p class="card-text"><strong>Insumos: </strong>${item.insumos}</p>
              <p class="card-text"><strong>Responsable: </strong>${item.responsable}</p>
            </div>
          </div>
        </div>
      `;
      $("#zonasContainer").append(card);
    });
  }
  
  function filterData() {
    const departamento = $("#departamento").val();
    const municipio = $("#municipio").val();
  
    if (departamento !== "Seleccione el Departamento" && municipio !== "Seleccione el Municipio") {
      let data = JSON.parse(localStorage.getItem(storageKey)) || [];
      let filteredData = data.filter(
        (item) => item.departamento === departamento && item.municipio === municipio
      );
  
      displayCards(filteredData);
    }
  }
  
$(document).ready(function () {
    const storageKey = "crudData";
  
    function loadDepartamentos() {
      let data = JSON.parse(localStorage.getItem(storageKey)) || [];
      let departamentos = new Set(data.map((item) => item.departamento));
  
      $("#departamento").empty();
      $("#departamento").append('<option selected>Seleccione el Departamento</option>');
  
      departamentos.forEach((departamento) => {
        $("#departamento").append(`<option value="${departamento}">${departamento}</option>`);
      });
    }
  
    function loadMunicipios() {
      let data = JSON.parse(localStorage.getItem(storageKey)) || [];
      let municipios = new Set(data.map((item) => item.municipio));
  
      $("#municipio").empty();
      $("#municipio").append('<option selected>Seleccione el Municipio</option>');
  
      municipios.forEach((municipio) => {
        $("#municipio").append(`<option value="${municipio}">${municipio}</option>`);
      });
    }
  
    loadDepartamentos();
    loadMunicipios();
  });
  