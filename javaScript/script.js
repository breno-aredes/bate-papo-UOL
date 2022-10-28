
let listaMensagens = [];
let horario = '';
const nome = prompt('Seu Lindo nome');

//funçaõ para salvar o horario no computador do usuario
function hora() {
    horario = new Date().toLocaleTimeString();
}

//funcão para enviar a mensagem
function enviarMensagem() {
    //salva o valor digitado
    const mensagem = document.querySelector('.mensagem').value;
    //salva todas mensagens presentes no site
    listaMensagens = document.querySelector("ul");
    // chama a função para verificar a hora.
    hora();
    //adiciona a mensagem nova
    listaMensagens.innerHTML = listaMensagens.innerHTML +
        `<li class="global">
        <h1><time>(${horario})</time> <strong>${nome}</strong> para <strong>Todos</strong>: ${mensagem} </h1>
    </li>`;
    //remove a mensagem do input para uma nova ser digitada
    document.querySelector('.mensagem').value = '';

}
