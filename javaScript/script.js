
let listaMensagens = [];

//funcão para enviar a mensagem
function enviarMensagem() {
    //salva o valor digitado
    let mensagem = document.querySelector('.mensagem').value;
    //salva todas mensagens presentes no site
    listaMensagens = document.querySelector("ul")
    //adiciona a mensagem nova
    listaMensagens.innerHTML = listaMensagens.innerHTML +
        `<li class="global">
        <h1><time>(09:22:28)</time> <strong>João</strong> para <strong>Todos</strong>: ${mensagem} </h1>
    </li>`;
    //remove a mensagem do input para uma nova ser digitada
    document.querySelector('.mensagem').value = '';
}
