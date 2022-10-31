let nomes = [];
let usuario = '';

//pede o nome de usuario
function nomeEmUso() {
    usuario = prompt('Seu Lindo nome');
    Entrou();
}
nomeEmUso()

//adiciona o usuario na api, se retornar o erro, quer dizer que o nome esta em uso, voltando para a função nomeEmUso().
function Entrou() {

    let postNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', { name: usuario });
    postNome.then(Deucerto);
    postNome.catch(Deuerrado);
}
function Deucerto() {
    dadosnoservidor();
}
function Deuerrado() {
    nomeEmUso();
}

//pega a lista de mensagens na api
function dadosnoservidor() {

    let promessaNome = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessaNome.then(respostaChegou);
}
//se teve resposta, adiciona exibe a lista na tela.
function respostaChegou(resposta) {
    nomes = resposta.data;
    listaDoServidor();
}
//função responsavel por percorrer a lista e exibir, de acordo com as caracteristicas de mensagens.
function listaDoServidor() {
    let listaNomes = document.querySelector("ul");
    listaNomes.innerHTML = '';

    for (let i = 0; i < nomes.length; i++) {
        let dados = nomes[i];

        if (dados.type === "status") {
            listaNomes.innerHTML +=
                `<li class="entrousaiu">
                    <h1><time> (${dados.time})</time> <b>${dados.from}</b> ${dados.text}</h1>
                </li>`;
        }
        else if (dados.type === "message") {
            listaNomes.innerHTML +=
                `<li class="global">
                <h1><time> (${dados.time})</time> <b>${dados.from}</b> para <b>${dados.to}</b>: ${dados.text}</h1>
            </li>`;
        }
        else if (dados.type === "private_message") {
            if (dados.from === usuario || dados.to === usuario || dados.to === "Todos") {
                listaNomes.innerHTML +=
                    `<li class="privado">
                        <h1><time>(${dados.time})</time> <b>${dados.from}</b> reservadamente para <b>${dados.to}</b>: ${dados.text}</h1>
                    </li>`;
            }
        }
    }
    //fixa o scroll na parte inferior da tela.
    listaNomes.lastElementChild.scrollIntoView();
}

//repete a função a cada 3 segundos.
setInterval(dadosnoservidor, 3000);

//funcão para enviar a mensagem
function enviarMensagem() {

    let novamensagem = {
        from: usuario,
        to: "todos",
        text: document.querySelector('.mensagem').value,
        type: "message"
    };

    let postNovaMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novamensagem);
    postNovaMensagem.then(dadosnoservidor); //se teve resposta repete a função.
    postNovaMensagem.catch(naoEnviou);

    //remove a mensagem do input para uma nova ser digitada
    document.querySelector('.mensagem').value = '';
}

//se não teve resposta, pagina recarrega.
function naoEnviou() {
    alert('Erro ao enviar mensagem, você foi desconectado');
    window.location.reload();
}

//mantem o usuario ainda esta conectado. 
function manterConexao() {
    let chatAtivo = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', { name: usuario })
    chatAtivo.catch(inativo);
    chatAtivo.then(aindaAtivo);
}
//se ativo repete a função, apara atualizar as mensagens.
function aindaAtivo() {
    dadosnoservidor();
}
//se inativo atualiza a pagina.
function inativo() {
    window.location.reload();
}
// repete a função a cada 5 segundos para manter conectado.
setInterval(manterConexao, 5000);

