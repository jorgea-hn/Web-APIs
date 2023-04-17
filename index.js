
// API DOM
let video = document.querySelector(".video-source") 
let canvas = document.querySelector("#canvas")
let context = canvas.getContext("2d")

let botonFoto = document.querySelector("#boton-foto")



botonFoto.addEventListener("click",function(ev){
    let url = canvas.toDataURL("image/jpeg");
    let a = document.createElement("a");
    a.href= url;
    a.innerHTML ="Descargar"
    a.download = "foto.jpg"
    a.click()
});

function redimensionar(){
    let camara = document.querySelector(".camara")
    canvas.width = camara.clientWidth;
    canvas.height = camara.clientHeight;
}


async function enlistarCamaras(){
    let camarasDisponibles = await navigator.mediaDevices.enumerateDevices();
    camarasDisponibles = camarasDisponibles.filter(device=>device.kind === "videoinput");
    console.log(camarasDisponibles)
    let select = document.createElement("select");
    camarasDisponibles.forEach(camara=>{
        let option = document.createElement("option");
        option.innerHTML=camara.label;
        option.value=camara.deviceId;
        select.appendChild(option)
    });
    select.addEventListener("change",function(ev){
        console.log(select.value)
    })
    document.querySelector("body").appendChild(select)
}

async function solicitarPermisosCamara(deviceId){
    let constraints = {}

    if (deviceId){
        constraints = {
           video:{deviceId:deviceId}
        }
    }else{
        constraints = {video:true}
    }


    //API MEDIADEVICES
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints)    // Si quiero audio tambien {video:true,audio:true}  
    // API VIDEO
    video.srcObject = mediaStream; 
    video.play();
}




let imagenCargada;
async function cargarImagen(){
    let image = document.createElement("img")
    image.src="img/marco1.png"
    // document.querySelector(".camara").appendChild(image)

    // descarga la imagen
    await image.decode();
    imagenCargada=image;
}


function dibujar(){
    context.drawImage(video,0,0,canvas.width,canvas.height)
    if (imagenCargada){
        context.drawImage(imagenCargada,0,0,canvas.width,canvas.height)
    }
    
    requestAnimationFrame(dibujar);
}

redimensionar()
solicitarPermisosCamara()
cargarImagen()
dibujar()
enlistarCamaras() // puedo saber cuantos dispositivos tengo






// canvas

// context.fillStyle="red"
// context.fillRect(50,50,100,200)
