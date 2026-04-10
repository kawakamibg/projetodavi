const campoInput = document.getElementById('pesquisa');
const botaoAdd = document.getElementById('botaoAdd');
const container = document.getElementById('container-texto');
const botaoLimpar = document.getElementById('btnLimpar');
const mensagemVazia = document.getElementById('mensagem-vazia');
const mensagem = document.getElementById('mensagem');
let mensagemTimeout;

function atualizarEstadoDaLista() {
    if (container.children.length === 0) {
        mensagemVazia.style.display = 'block';
        botaoLimpar.style.display = 'none';
    } else {
        mensagemVazia.style.display = 'none';
        botaoLimpar.style.display = 'block';
    }
}

function mostrarMensagem(texto) {
    clearTimeout(mensagemTimeout);
    mensagem.textContent = texto;
    mensagem.classList.add('mostrar');

    mensagemTimeout = setTimeout(function() {
        mensagem.classList.remove('mostrar');
    }, 2200);
}

function adicionarItem() {
    const valorDigitado = campoInput.value.trim(); 

    if (valorDigitado !== "") {
        const textosExistentes = container.querySelectorAll('.item-lista span:first-child');
        
        for (let i = 0; i < textosExistentes.length; i++) {
            if (textosExistentes[i].textContent.toLowerCase() === valorDigitado.toLowerCase()) {
                alert("Este item já está na sua lista!");
                campoInput.value = "";
                campoInput.focus();
                return;
            }
        }

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-lista'); 
        itemDiv.dataset.fixado = "false"; 

        const textoSpan = document.createElement('span');
        textoSpan.textContent = valorDigitado;

        const acoesDiv = document.createElement('div');
        acoesDiv.classList.add('item-acoes'); 

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add('btn-acao', 'btn-excluir'); 
        btnExcluir.addEventListener('click', function() {
            itemDiv.remove(); 
            atualizarEstadoDaLista();
            mostrarMensagem("ítem excluído");
        });

        const btnFixar = document.createElement('button');
        btnFixar.textContent = "Fixar";
        btnFixar.classList.add('btn-acao', 'btn-fixar'); 

        btnFixar.addEventListener('click', function() {
            if (itemDiv.dataset.fixado === "true") {
                itemDiv.dataset.fixado = "false";
                btnFixar.textContent = "Fixar";
                container.appendChild(itemDiv);
            } else {
                itemDiv.dataset.fixado = "true";
                btnFixar.textContent = "Desfixar";
                let primeiroNaoFixado = null;
                for (let i = 0; i < container.children.length; i++) {
                    if (container.children[i].dataset.fixado !== "true") {
                        primeiroNaoFixado = container.children[i];
                        break;
                    }
                }
                container.insertBefore(itemDiv, primeiroNaoFixado);
            }
        });

        const btnWeb = document.createElement('button');
        btnWeb.textContent = "Web";
        btnWeb.classList.add('btn-acao', 'btn-web'); 
        btnWeb.addEventListener('click', function() {
            let termoFormatado = valorDigitado.toLowerCase().split(' ').join('-');
            const url = `https://lista.mercadolivre.com.br/${termoFormatado}?sb=all_mercadolibre#D[A:${termoFormatado}]`;
            window.open(url, '_blank');
        });

        acoesDiv.appendChild(btnExcluir);
        acoesDiv.appendChild(btnFixar);
        acoesDiv.appendChild(btnWeb);

        itemDiv.appendChild(textoSpan);
        itemDiv.appendChild(acoesDiv);

        container.appendChild(itemDiv);

        campoInput.value = "";
        campoInput.focus();

        atualizarEstadoDaLista();
        mostrarMensagem("ítem adicionado");
    }
}

botaoLimpar.addEventListener('click', function() {
    if (confirm("Tem certeza que deseja apagar todos os itens da lista?")) {
        container.innerHTML = ''; 
        atualizarEstadoDaLista();
    }
});

botaoAdd.addEventListener('click', adicionarItem);

atualizarEstadoDaLista();


