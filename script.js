const campoInput = document.getElementById('pesquisa');
const botaoAdd = document.getElementById('botaoAdd');
const container = document.getElementById('container-texto');
const botaoLimpar = document.getElementById('btnLimpar');
const botaoEditar = document.getElementById('btnEditar');      
const mensagemVazia = document.getElementById('mensagem-vazia');

function atualizarEstadoDaLista() {
    if (container.children.length === 0) {
        mensagemVazia.style.display = 'block';
        botaoLimpar.style.display = 'none';
    } else {
        mensagemVazia.style.display = 'none';
        botaoLimpar.style.display = 'block';
    }
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

        const bntEditar = document.createElement('button');
        bntEditar.textContent = "Editar";
        bntEditar.classList.add('btn-acao', 'btn-editar'); 
        bntEditar.addEventListener('click', function() {
            const novoValor = prompt("Edite o item:", textoSpan.textContent);
            if (novoValor !== null) {
                const valorEditado = novoValor.trim();
                textoSpan.textContent = valorEditado;
            }
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