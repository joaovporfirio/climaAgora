preencheDados = (dadosJson) => {

    document.getElementById('cidade').innerHTML = dadosJson.name
    document.querySelector('.previsao #pais').setAttribute("src", `https://countryflagsapi.com/png/${dadosJson.sys.country}`)
    document.querySelector('#temperatura span').innerHTML = parseInt(dadosJson.main.temp)
    document.querySelector('#clima p').innerHTML = dadosJson.weather[0].description
    document.querySelector('#clima img').setAttribute("src", `https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}.png`)
    document.querySelector('#umidade span').innerHTML = `${dadosJson.main.humidity}%`
    document.querySelector('#vento span').innerHTML = `${dadosJson.wind.speed} km/h`
}


// Pega a cidade e faz a busca das informações
var pesquisaCidade = async () => {

    var cidade = document.getElementById('input_cidade').value
    var key = '7f9a996a78c93e52b8d59926f3e33cc3'
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${key}&lang=pt_br`

    var dados = await fetch(url)
    var dadosJson = await dados.json()

    //Mudando Background
    var urlImagem = "https://api.unsplash.com/search/?client_id=a_zJxBxRX2A8-OwkYX0Aqz9ErVYCJC-0JD4yj37t6a0&query=cidade" + dadosJson.name + "&orientation=landscape"

    var imagemBackground = await fetch(urlImagem)
    var imagem = await imagemBackground.json()

    if (imagem.photos.results[0]?.urls.regular) {
        // criando url para mudar o background
        var urlpersonalizada = imagem.photos.results[0]?.urls.regular
        console.log(urlpersonalizada)
        var body = document.querySelector('.body')
        body.style.backgroundImage = 'url(' + urlpersonalizada + ')'
    }else {
        var body = document.querySelector('.body')
        body.style.backgroundImage = 'linear-gradient(180deg,#014ba0,#3b8eed)'

    }

    //Tratamento de erro no nome da cidade
    if (dadosJson.name == undefined) {

        document.querySelector('.mensagem_erro').innerHTML = `Cidade não encontrada, tente novamente!`
        //Limpa o campo de pesquisa
        document.querySelector('#input_cidade').value = ''
        //Esconde a área de informações do clima
        document.querySelector('.previsao').classList.add('hide')

    } else {
        document.querySelector('.mensagem_erro').innerHTML = ``
        preencheDados(dadosJson)
        //Limpa o campo de pesquisa
        document.querySelector('#input_cidade').value = ''
        //Retirar a class 'hide' quando pesquisar a cidade
        document.querySelector('.previsao').classList.remove('hide')

    }


}


// // Aciona a função a partir do click no botão
document.getElementById('pesquisa').addEventListener('click', pesquisaCidade)

// // Aciona a função a partir do Enter
document.getElementById('input_cidade').addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        pesquisaCidade()
    }
})
