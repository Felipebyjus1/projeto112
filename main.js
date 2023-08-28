//https://teachablemachine.withgoogle.com/models/YRWemExjs/

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})

Webcam.attach("#camera")

var classificar = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YRWemExjs/model.json", carregarModelo)

function carregarModelo(){
    console.log("carregarModelo")
}

function TirarFoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("resultado").innerHTML = `<img id="foto" src="${data_uri}"/>`
    })
    img = document.getElementById("foto")
    classificar.classify(img, pegarResultado)
}

function pegarResultado(error, resultado){
if(error){
    console.log(error) 
}
else{
    var gesto = resultado[0].label
    var precisão = (resultado[0].confidence  * 100).toFixed(3) + "%"
    if(gesto == "like"){
        document.getElementById("gesto").innerHTML = "👍"
    }
    else if(gesto == "deslike"){
        document.getElementById("gesto").innerHTML = "👎"
    }
    else if(gesto == "hang loose"){
        document.getElementById("gesto").innerHTML = "🤙"
    }
    else if(gesto == "paz e amor"){
        document.getElementById("gesto").innerHTML = "✌️"
    }
    document.getElementById("precisão").innerHTML = precisão
}
}
