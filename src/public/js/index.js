console.log('socket')
const socket = io()

socket.on('productos', data => {
    console.log(data)

    let div = document.getElementById('listProducts')
    let productos = ''
    data.forEach((product) =>{
        productos += '<div>${product.title} precio: ${product.precio}</div>'



    })

div.innerHTML = productos



})