document.getElementById("addProduct").addEventListener("click", (event) => {
    event.preventDefault();
    AddProduct();
});
document.getElementById("deleteProducts").addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify([]));
    printTable();
});


let productsList = [];

let productsFromLocalStorage = [];

let AddProduct = () => {
    let addProductName = document.getElementById("addProductName").value;
    let addProductQuantity = document.getElementById("addProductQuantity").value;
    let addProductPrice = document.getElementById("addProductPrice").value;

    let product = {
        id: Math.floor(Math.random() * 999999),
        name: addProductName,
        quantity: addProductQuantity,
        price: addProductPrice,
        edit: false,
    };

    let products = localStorage.getItem("products");
    productsFromLocalStorage = JSON.parse(products);
    productsList = JSON.parse(products);
    productsList.push(product);
    localStorage.setItem("products", JSON.stringify(productsList));
    printTable(productsList);
};

let printTable = (productsList) => {
    document.getElementById("productsList").innerHTML = '';
    let products = localStorage.getItem("products");
    if(products == null)
    {
        localStorage.setItem("products", JSON.stringify(productsFromLocalStorage));
    }
    productsFromLocalStorage = JSON.parse(products);
    productsList = JSON.parse(products);
    productsFromLocalStorage.map((element) => {
        if(element.edit == true)
        {
            document.getElementById("productsList").innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td><input id="editName" type="text" value="${element.name}"></td>
                <td><input id="editQuantity" type="text" value="${element.quantity}"></td>
                <td><input id="editPrice" type="text" value="${element.price}"></td>
                <td productID='${element.id}' class="saveEditProduct">SAVE</td>
                <td productID='${element.id}' class="exitEditProduct">EXIT</td>
            </tr>
            `;
            productsList[productsList.findIndex((item) => item.id == element.id)].edit = false;
            localStorage.removeItem("products");
            localStorage.setItem("products", JSON.stringify(productsList));
        }
        else
        {
            document.getElementById("productsList").innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.quantity}</td>
                <td>${element.price}</td>
                <td productID='${element.id}' class="editProduct">EDIT</td>
                <td productID='${element.id}' class="deleteProduct">DELETE</td>
            </tr>
            `;
        }
    });

    document.querySelectorAll(".saveEditProduct").forEach((element) => {
        element.removeEventListener('click', saveEditProduct);
        element.addEventListener('click', saveEditProduct);
    });

    document.querySelectorAll(".exitEditProduct").forEach((element) => {
        element.removeEventListener('click', exitEditProduct);
        element.addEventListener('click', exitEditProduct);
    });

    document.querySelectorAll(".editProduct").forEach((element) => {
        element.removeEventListener('click', editProduct);
        element.addEventListener('click', editProduct);
    });

    document.querySelectorAll(".deleteProduct").forEach((element) => {
        element.removeEventListener('click', deleteProduct);
        element.addEventListener('click', deleteProduct);
    });
};

export const saveEditProduct = (event) => {
    let id = event.currentTarget.getAttribute("productID");
    let products = localStorage.getItem("products");
    productsList = JSON.parse(products);
    let index = productsList.findIndex((item) => item.id == id);
    productsList[index].name = document.getElementById("editName").value;
    productsList[index].quantity = document.getElementById("editQuantity").value;
    productsList[index].price = document.getElementById("editPrice").value;
    productsList[index].edit = false;
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(productsList));
    printTable(productsList);
};

export const exitEditProduct = (event) => {
    let id = event.currentTarget.getAttribute("productID");
    let products = localStorage.getItem("products");
    productsList = JSON.parse(products);
    let index = productsList.findIndex((item) => item.id == id);
    productsList[index].edit = false;
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(productsList));
    printTable(productsList);
};

export const editProduct = (event) => {
    let id = event.currentTarget.getAttribute("productID");
    let products = localStorage.getItem("products");
    productsList = JSON.parse(products);
    let index = productsList.findIndex((item) => item.id == id);
    productsList[index].edit = true;
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(productsList));
    printTable(productsList);
};

export const deleteProduct = (event) => {
    let id = event.currentTarget.getAttribute("productID");
    let products = localStorage.getItem("products");
    productsFromLocalStorage = JSON.parse(products);
    productsFromLocalStorage = productsFromLocalStorage.filter((item) => item.id != id);
    localStorage.removeItem("products");
    localStorage.setItem("products", JSON.stringify(productsFromLocalStorage));
    printTable(productsFromLocalStorage);
};

printTable();