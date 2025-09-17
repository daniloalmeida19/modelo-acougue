document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionar = document.querySelectorAll('.add-to-cart-btn');
    const listaCarrinho = document.getElementById('lista-carrinho');
    const carrinhoVazioMsg = document.getElementById('carrinho-vazio');
    const botaoFinalizar = document.getElementById('finalizar-pedido-btn');

    // Substitua pelo seu número de WhatsApp
    const numeroWhatsApp = '5511999998888'; 

    let carrinho = [];

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', () => {
            const card = botao.closest('.produto-card');
            const nomeProduto = card.querySelector('h3').innerText;
            const inputQuantidade = card.querySelector('input');
            const quantidade = inputQuantidade.value;

            if (quantidade) {
                adicionarAoCarrinho(nomeProduto, quantidade);
                inputQuantidade.value = ''; // Limpa o campo após adicionar
            } else {
                alert('Por favor, informe a quantidade desejada.');
            }
        });
    });

    function adicionarAoCarrinho(nome, quantidade) {
        carrinho.push({ nome, quantidade });
        atualizarCarrinho();
    }

    function atualizarCarrinho() {
        listaCarrinho.innerHTML = ''; // Limpa a lista antes de atualizar

        if (carrinho.length === 0) {
            carrinhoVazioMsg.style.display = 'block';
            botaoFinalizar.style.display = 'none';
        } else {
            carrinhoVazioMsg.style.display = 'none';
            botaoFinalizar.style.display = 'block';

            carrinho.forEach(item => {
                const li = document.createElement('li');
                li.innerText = `${item.nome} - Quantidade: ${item.quantidade}`;
                listaCarrinho.appendChild(li);
            });
        }
        
        gerarLinkWhatsApp();
    }

    function gerarLinkWhatsApp() {
        let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n';
        carrinho.forEach(item => {
            mensagem += `- ${item.nome} (Qtd: ${item.quantidade})\n`;
        });

        const link = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
        botaoFinalizar.href = link;
        botaoFinalizar.target = '_blank';
    }

    atualizarCarrinho(); // Garante que o estado inicial do carrinho esteja correto
});