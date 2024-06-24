const productList = () => {
    return fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .catch((err) => console.log(err));

};

//post (el id lo crea automáticamente)

const createProducts = (name, price, image) => {
    return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            price,
            image,
        })
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

//delete

async function deleteProducts(id) {
    return await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",

    });

};



export const servicesProducts = {
    productList, createProducts, deleteProducts
};
