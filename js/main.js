var sitename = document.getElementById("sitename");
var siteUrl = document.getElementById("siteUrl");
var buttnN = document.getElementById("mainButton");
var show = document.getElementById("tableBody");
var alertRed = document.getElementById("alertRed");
var alertName = document.getElementById("alertName");
var inputs = document.querySelectorAll("input");
var siteContent = [];
if (JSON.parse(localStorage.getItem("sitelist")) !== null) {
  siteContent = JSON.parse(localStorage.getItem("sitelist"));
  display();
}

buttnN.onclick = function () {
  setValue();
  display();
  clear();
};

function setValue() {
  var site = {
    name: sitename.value,
    urld: siteUrl.value,
  };
  siteContent.push(site);
  localStorage.setItem("sitelist", JSON.stringify(siteContent));
}
function display() {
  var box = "";
  for (let i = 0; i < siteContent.length; i++) {
    box += `<tr class=" rounded-1 bg-info bg-opacity-10 my-2 w-100 row left justify-content-between align-items-end">
                <td class=" col-3"><h5>${siteContent[i].name}</h5></td>
                <td class=" col-6  g-2 align-items-center">
                <a class="btn btn-primary border-0 green fw-bold" href="${siteContent[i].urld}" target=_blank role="button">Viste</a>
                <button onclick = deleteSite(${i}) class=" bg-danger btn btn-primary border-0">Delete</button>
                </td>
                <td></td>
                <td></td>
                <td></td>

                
                </tr>`;
  }
  show.innerHTML = box;
}
function deleteSite(index) {
  siteContent.splice(index, 1);
  localStorage.setItem("sitelist", JSON.stringify(siteContent));
  display();
}
function clear() {
  for (let i = 0; i < siteContent.length; i++) {
    inputs[i].value = "";
    siteUrl.classList.remove("is-valid");
    sitename.classList.remove("is-valid");
    buttnN.disabled = true;
  }
  siteUrl.value = "";
}
siteUrl.onkeyup = function () {
  var urldvali =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (urldvali.test(siteUrl.value)) {
    buttnN.removeAttribute("disabled");
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    alertRed.classList.add("d-none");
  } else {
    buttnN.disabled = "true";
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    alertRed.classList.remove("d-none");
  }
};
sitename.onkeyup = function () {
  var nameValid = /[\S\s]+[\S]+/;
  if (nameValid.test(sitename.value)) {
    alertName.classList.add("d-none");
    sitename.classList.add("is-valid");
    sitename.classList.remove("is-invalid");
  } else {
    sitename.classList.add("is-invalid");
    sitename.classList.remove("is-valid");
    alertName.classList.remove("d-none");
  }
};
