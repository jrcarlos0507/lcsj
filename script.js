Escrita

// ===============================
// CARRINHO
// ===============================

let carrinho = [];


// ADICIONAR PRODUTO

function adicionarCarrinho(nome, preco) {

    let produtoExistente = carrinho.find(
        item => item.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();

}


// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    const container =
        document.getElementById("itensCarrinho");

    const contador =
        document.getElementById("contadorCarrinho");

    const totalElemento =
        document.getElementById("totalCarrinho");

    container.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;


    if (carrinho.length === 0) {

        container.innerHTML = `
            <div class="text-center text-muted py-4">

                <i class="bi bi-cart-x fs-1"></i>

                <p>
                    Seu carrinho está vazio.
                </p>

            </div>
        `;

    }


    carrinho.forEach((item, index) => {

        let subtotal =
            item.preco * item.quantidade;

        total += subtotal;

        quantidadeTotal += item.quantidade;


        container.innerHTML += `

            <div class="carrinho-item">

                <div class="d-flex justify-content-between">

                    <strong>
                        ${item.nome}
                    </strong>

                    <strong>
                        R$ ${subtotal.toFixed(2).replace(".", ",")}
                    </strong>

                </div>


                <div class="d-flex justify-content-between align-items-center mt-2">

                    <div class="quantidade">

                        <button onclick="diminuirQuantidade(${index})">
                            -
                        </button>

                        <span>
                            ${item.quantidade}
                        </span>

                        <button onclick="aumentarQuantidade(${index})">
                            +
                        </button>

                    </div>


                    <button
                        class="btn btn-sm btn-outline-danger"
                        onclick="removerProduto(${index})">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </div>

        `;

    });


    contador.textContent = quantidadeTotal;

    totalElemento.textContent =
        formatarMoeda(total);

}


// AUMENTAR QUANTIDADE

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();

}


// DIMINUIR QUANTIDADE

function diminuirQuantidade(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();

}


// REMOVER PRODUTO

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// FORMATAR MOEDA

function formatarMoeda(valor) {

    return "R$ " +
        valor.toFixed(2).replace(".", ",");

}


// ===============================
// ABRIR PEDIDO
// ===============================

function abrirPedido() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }


    let total = calcularTotal();

    document.getElementById("totalPedido")
        .textContent = formatarMoeda(total);


    const carrinhoModal =
        bootstrap.Modal.getInstance(
            document.getElementById("carrinhoModal")
        );

    carrinhoModal.hide();


    const pedidoModal =
        new bootstrap.Modal(
            document.getElementById("pedidoModal")
        );

    pedidoModal.show();

}


// CALCULAR TOTAL

function calcularTotal() {

    return carrinho.reduce(
        (total, item) =>
            total + item.preco * item.quantidade,
        0
    );

}


// ===============================
// WHATSAPP
// ===============================

function enviarWhatsApp() {

    let nome =
        document.getElementById("nomeCliente").value;

    let telefone =
        document.getElementById("telefoneCliente").value;

    let endereco =
        document.getElementById("enderecoCliente").value;

    let pagamento =
        document.getElementById("pagamentoCliente").value;


    if (
        nome === "" ||
        telefone === "" ||
        endereco === "" ||
        pagamento === ""
    ) {

        alert(
            "Preencha todos os campos para continuar."
        );

        return;

    }


    let mensagem =
        "🍔 *NOVO PEDIDO - FOODMAX*%0A%0A";


    mensagem +=
        "*Cliente:* " +
        nome +
        "%0A";

    mensagem +=
        "*Telefone:* " +
        telefone +
        "%0A";

    mensagem +=
        "*Endereço:* " +
        endereco +
        "%0A";

    mensagem +=
        "*Pagamento:* " +
        pagamento +
        "%0A%0A";


    mensagem +=
        "*PEDIDO:*%0A";


    carrinho.forEach(item => {

        let subtotal =
            item.preco * item.quantidade;

        mensagem +=
            item.quantidade +
            "x " +
            item.nome +
            " - R$ " +
            subtotal.toFixed(2).replace(".", ",") +
            "%0A";

    });


    mensagem +=
        "%0A*TOTAL: " +
        calcularTotal()
            .toFixed(2)
            .replace(".", ",") +
        "*";


    // ====================================
    // TROQUE PELO WHATSAPP DA EMPRESA
    // ====================================

    let numeroWhatsApp =
        "5500000000000";


    let url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        mensagem;


    window.open(url, "_blank");

}


// ===============================
// FILTRO DE CATEGORIAS
// ===============================

function filtrarProdutos(categoria) {

    const produtos =
        document.querySelectorAll(".produto");


    produtos.forEach(produto => {

        if (
            categoria === "todos" ||
            produto.dataset.categoria === categoria
        ) {

            produto.style.display = "block";

        } else {

            produto.style.display = "none";

        }

    });


    document.querySelectorAll(".categoria-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    event.target.closest(".categoria-btn")
        .classList.add("active");

}


// ===============================
// PESQUISA
// ===============================

function pesquisarProduto() {

    let busca =
        document.getElementById("pesquisa")
            .value
            .toLowerCase();


    document.querySelectorAll(".produto")
        .forEach(produto => {

            let nome =
                produto.dataset.nome
                    .toLowerCase();


            if (nome.includes(busca)) {

                produto.style.display = "block";

            } else {

                produto.style.display = "none";

            }

        });

}