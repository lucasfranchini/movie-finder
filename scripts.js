const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes");
promessa.then(popularFilmes);

function popularFilmes (resposta){
    const filmes = resposta.data;
    const campoFilmes = document.querySelector(".movies");
    for(let i =0;i<filmes.length;i++){
        campoFilmes.innerHTML += `
        <div class="movie" id="${filmes[i].id}">
            <img src="${filmes[i].imagem}">
            <div class="title">${filmes[i].titulo}</div>
            <button onclick = "comprar(this)">
            Comprar
            <ion-icon name="cart-outline"></ion-icon>
            </button>
        </div>`;
    }
}


function comprar(botao){
    const filme = botao.parentNode;
    const nomeComprador = prompt("qual o seu nome querido comprador?");
    const numeroAssentos = parseInt(prompt("quantos assentos deseja comprar?"));
    const compra = {
        nome: nomeComprador,
        quantidade: numeroAssentos
    };
    const promessa = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${filme.id}/ingresso`,compra);
    promessa.then(finalizarCompra);
    promessa.catch(tratarErro);
}

function finalizarCompra(resposta){
    alert(resposta.data.mensagem);
}

function tratarErro(){
    alert("Os ingressos para este filme estão esgotados!");
}
