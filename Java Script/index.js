var productName = document.getElementById("productInputName");
var productPrice = document.getElementById("productInputPrice");
var productDesc = document.getElementById("productInputDesc");
var inputs = document.getElementsByClassName("form-control");
var addBtn = document.getElementById("addProduct");

var currentIndex = 0;

// Array**
var productsContainer = [];

//  ** To Save Data In Browser **

if (localStorage.getItem("product") != null) {
  productsContainer = JSON.parse(localStorage.getItem("product"));
  displayProduct();
}

//  *** To Check If You Want To Update Or To Add The Product  ***

addBtn.onclick = function () {
  if (addBtn.innerHTML == "Add Product") {
    //add mode
    addProduct();
  } else {
    //update mode
    updateProduct();
  }
  displayProduct();
  clearForm();
};

//               ***  Function Add ***

function addProduct() {

    var product = {
      Name: productName.value,
      Price: productPrice.value,
      // Category: productCategory.value,
      Desc: productDesc.value,
    };
    productsContainer.push(product);
    localStorage.setItem("product", JSON.stringify(productsContainer));
    displayProduct();
  } 


//               ***  Function Display Product ***

function displayProduct() {
  var temp = ``;
  for (var i = 0; i < productsContainer.length; ++i) {
    temp += `
<tr>
    <td>${i + 1}</td>
    <td>${productsContainer[i].Name}</td>
    <td>${productsContainer[i].Price}</td>
    <td>${productsContainer[i].Desc}</td>
    <td><button onclick="getProductInfo(${i})" class='btn btn-warning py-1 '>update</button></td>
    <td><button onclick="deleteProduct(${i})" class='btn btn-danger  py-1 '>delete</button></td>
    </tr>
`;
  }
  document.getElementById("tableBody").innerHTML = temp;
}

//               ***  Function Delete Product ***

function deleteProduct(deleteIndex) {
  productsContainer.splice(deleteIndex, 1);
  localStorage.setItem("product", JSON.stringify(productsContainer));
  displayProduct();
}

//               ***  Function Search Product ***

function searchProduct(term) {
  var search = ``;
  for (var i = 0; i < productsContainer.length; ++i) {
    if (
      productsContainer[i].Name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      search += `
      <tr>
          <td>${i + 1}</td>
          <td>${productsContainer[i].Name}</td>
          <td>${productsContainer[i].Price}</td>
          <td>${productsContainer[i].Desc}</td>
          <td><button onclick="getProductInfo(${i})" class='btn btn-warning'>update</button></td>
          <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>delete</button></td>
          </tr>
      `;
    }
  }
  document.getElementById("tableBody").innerHTML = search;
}

//               ***  Function Updarte Product ***

//               ***  Part One Get Info ***

function getProductInfo(index) {
  currentIndex = index;
  var currentProduct = productsContainer[index];
  productName.value = currentProduct.Name;
  productPrice.value = currentProduct.Price;
  // productCategory.value = currentProduct.Category;
  productDesc.value = currentProduct.Desc;
  document.getElementById("addProduct").innerHTML = "Update Product";
}

//               ***  Part Two Update Product ***

function updateProduct() {
  var product = {
    Name: productName.value,
    Price: productPrice.value,
    Desc: productDesc.value,
  };

  productsContainer[currentIndex] = product;
  localStorage.setItem("product", JSON.stringify(productsContainer));
  document.getElementById("addProduct").innerHTML = "Add Product";
}




//           *** Function Validate Name ***
function validateProductName() {
  var regex = /^[A-Z][a-z]$/;
  if (regex.test(productName.value) == true) {
    return true;
  } else {
    return false;
  }
}

//           *** Clear Form Deatails ***

function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
