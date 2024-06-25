import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");




// creo dinámicamente mi card

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="img-container">
         <img src="${image}" class="img-prod" alt="img-prod">
    </div>

    <div class="card-info">
        <p class="card-title">${name}</p>
        <div class="card-end">
            <p class='card-precio'>$ ${price}</p>
            <button class="delete-button" data-id="${id}">
                <i class='bx bxs-trash bx-sm '></i>
            </button>
        </div>
    </div> 
    `;

    //elimino mi card

    const botonDelete = card.querySelector("[data-id]");

    botonDelete.addEventListener("click", async (e) => {
        e.preventDefault();

        //creo alerta de guardar cambios o no

        await Swal.fire({
            title: "¿Quieres eliminar el producto?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar",
            denyButtonText: `No`
        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire("¡Se eliminó correctamente!", "", "success");
                servicesProducts.deleteProducts(id);
                card.remove();
                console.log("se borró");
            } else if (result.isDenied) {
                Swal.fire("No se guardaron los cambios", "", "info");
            }
        });




    });



    productContainer.appendChild(card);
    return card;
}

//traer mi api
const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        //console.log(listProducts);

        //debo recorrer mi array de productos para que los renderice mi navegador

        listProducts.forEach(product => {
            //a cada producto le agrego un hijo(card)
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });

    } catch (error) {
        console.log(error)
    }
};

//agregar escuchador de evento a formulario. Recibe como segundo parámetro una función anónima

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name, price, image)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));



});








render();