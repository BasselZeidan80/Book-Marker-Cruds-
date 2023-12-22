var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var searchInput = document.getElementById("search");
var pattern = /^[(www)(WWW)]{3}\.\w*\.\w*$/i;

var indexUpdate = 0;
var siteList = [];

if (localStorage.getItem("WebSite") != null) {
  siteList = JSON.parse(localStorage.getItem("WebSite"));
  displayData();
}

function createSite() {
  if (validationUrl() == true && validationName() == true) {
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };

    siteList.push(site);
    console.log(siteList);

    localStorage.setItem("WebSite", JSON.stringify(siteList));
    clearInput();
    displayData();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The Url must be start with www.lorem.lorem !",
    });
  }
}

function clearInput() {
  siteName.value = "";
  siteUrl.value = "";
}

function displayData() {
  var container = "";
  for (var i = 0; i < siteList.length; i++) {
    console.log(siteList[i].name);
    container += `
    
    <tr>
    <td>${i + 1}</td>
    <td>${siteList[i].name}</td>
    <td><button class="btn btn-warning" onclick="setData(${i})"><i class="fa-solid fa-pen-to-square px-2"></i></button></td>

    <td>
    <button class="btn btn-success" href = ${
      siteList[i].url
    }  onclick = "visitUrl(${i})"><i class="fa-solid fa-eye px-2 "></i></button>
    </td>
    <td><button class="btn btn-danger" onclick= "deleteItem(${i})"><i class="fa-solid fa-trash px-2"></i></button></td>

</tr>
    
    `;
  }
  document.getElementById("tbody").innerHTML = container;
}

function deleteItem(idx) {
  /////////////////////////////////////
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        siteList.splice(idx, 1);
        localStorage.setItem("WebSite", JSON.stringify(siteList));
        displayData();

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });

  ///////////////////////////

  console.log("deleted");

  console.log(siteList);
}

function DeleteAll() {
  /////////////////////////////////////
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete All !",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        siteList.splice(0);
        localStorage.setItem("WebSite", JSON.stringify(siteList));
        displayData();

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });

  ///////////////////////////

  console.log("deleted All");
}

function search() {
  var term = searchInput.value;
  console.log(term);

  var container = "";
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      container += `
    
      <tr>
      <td>${i + 1}</td>
      <td>${siteList[i].name}</td>
      <td><button class="btn btn-warning" onclick="setData(${i})"><i class="fa-solid fa-pen-to-square px-2"></i></button></td>
  
      <td>
      <button class="btn btn-success" href = ${
        siteList[i].url
      } target="_blank" onclick = "visitUrl(${i})"><i class="fa-solid fa-eye px-2 "></i></button>
      </td>
      <td><button class="btn btn-danger" onclick= "deleteItem(${i})"><i class="fa-solid fa-trash px-2"></i></button></td>
  
  </tr>
      
      `;
      console.log("true");
      document.getElementById("tbody").innerHTML = container;
    }
  }
}

function setData(idx) {
  indexUpdate = idx;
  console.log("setData");
  var currentSite = siteList[idx];
  console.log(currentSite);
  siteName.value = currentSite.name;
  siteUrl.value = currentSite.url;

  document.getElementById("submit").classList.add("d-none");
  document.getElementById("update").classList.remove("d-none");
}

function updateItem(idx) {
  if (validationUrl() == true && validationName() == true) {
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };

    siteList.splice(idx, 1, site);
    console.log(siteList.splice(idx, 1, site));
    localStorage.setItem("WebSite", JSON.stringify(siteList));

    document.getElementById("update").classList.add("d-none");
    document.getElementById("submit").classList.remove("d-none");

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    clearInput();
    displayData();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The Url must be start with www.lorem.lorem!",
    });
  }
}

function visitUrl(idx) {
  window.location.href = "https://" + siteList[idx].url;

  console.log("visited", idx);
}

// Validation

function validationUrl() {
  var siteUrl = document.getElementById("siteUrl").value;

  let siteUrl2 = document.getElementById("siteUrl");
  var pattern = /^[(www)(WWW)]{3}\.\w*\.\w*$/;

  // console.log(pattern.test(siteUrl));

  if (pattern.test(siteUrl) == true) {
    siteUrl2.classList.remove("is-invalid");
    siteUrl2.classList.add("is-valid");
    return true;
  } else {
    siteUrl2.classList.add("is-invalid");
    siteUrl2.classList.remove("is-valid");
    return false;
  }
}

function validationName() {
  var name = siteName.value;
  var name2 = siteName;
  var regex = /^[A-z0-9]{3,20}$/i;
  console.log(regex.test(name));
  if (regex.test(name) == true) {
    name2.classList.add("is-valid");
    name2.classList.remove("is-invalid");
    return true;
  } else {
    name2.classList.remove("is-valid");
    name2.classList.add("is-invalid");
    return false;
  }
}
