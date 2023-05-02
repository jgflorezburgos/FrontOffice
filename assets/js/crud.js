$(document).ready(function () {
    const storageKey = "crudData";
  
    function loadData() {
      let data = JSON.parse(localStorage.getItem(storageKey)) || [];
      $("#tableBody").empty();
      data.forEach(function (item) {
        const tableRow = `
        
      
        <tr data-id="${item.id}">
        <td>${item.id}</td>
        <td>${item.zonaDeProduccion}</td>
        <td>${item.insumos}</td>
        <td>${item.responsable}</td>
        <td>${item.descripcion}</td>
        <td>${item.municipio}</td>
        <td>${item.departamento}</td>
        <td class="container">${item.estado === 1 ? 'Activo' : 'Inactivo'}</td>
        <td>
          <button class="btn btn-primary btn-sm edit">Editar</button>
          <button class="btn btn-danger btn-sm delete">Eliminar</button>
        </td>
      </tr>
    
        `;
        $("#tableBody").append(tableRow);
  
      });
     
    }
  
    if ($("#tableBody").length) {
      loadData();
    }
  
    // Enviar formulario
    $("#crudForm").on("submit", function (event) {
      event.preventDefault();
      let data = JSON.parse(localStorage.getItem(storageKey)) || [];
      const formData = new FormData(this);
      const id = formData.get("id") || Date.now().toString();
      const newItem = {
        id,
        zonaDeProduccion: formData.get("zonaDeProduccion"),
        insumos: formData.get("insumos"),
        responsable: formData.get("responsable"),
        descripcion: formData.get("descripcion"),
        municipio: formData.get("municipio"),
        departamento: formData.get("departamento"),
        estado: formData.get("estado") === "1" ? 1 : 2,
      };
  
      if (formData.get("id")) {
        const index = data.findIndex((item) => item.id === id);
        data[index] = newItem;
      } else {
        data.push(newItem);
      }
  
      localStorage.setItem(storageKey, JSON.stringify(data));
      alert("Datos guardados con éxito");
      window.location.href = "ver-zonas.html";
    });
  
    // Eliminar elemento
    $("#tableBody").on("click", ".delete", function () {
      let data = JSON.parse(localStorage.getItem(storageKey));
      const id = $(this).parents("tr").data("id").toString();
      data = data.filter((item) => item.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(data));
      loadData();
    });
  
    // Editar elemento
    $("#tableBody").on("click", ".edit", function () {
      const id = $(this).parents("tr").data("id").toString();
      const data = JSON.parse(localStorage.getItem(storageKey));
      const item = data.find((item) => item.id === id);
      localStorage.setItem('currentItem', JSON.stringify(item));
      window.location.href = "formulario.html";
    });
  
    if ($("#crudForm").length) {
      const item = JSON.parse(localStorage.getItem('currentItem'));
      if (item) {
        for (const key in item) {
          $(`#${key}`).val(item[key]);
        }
        localStorage.removeItem('currentItem');
      }
    }
  });
  