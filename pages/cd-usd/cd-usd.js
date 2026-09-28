// window.addEventListener("load", function() {
//   window.location.href = "../../index.html";  
// });

const lista = document.querySelector(".envelopBorder ul");
const primeiraLi = document.querySelector(".envelopBorder ul li:first-child");
const opcoesMoedas = document.querySelectorAll(
  ".envelopBorder ul li:not(:first-child)",
);

let moedaSelecionada = "";

// 1. Abre/Fecha o menu ao clicar no topo
primeiraLi.addEventListener("click", (event) => {
  event.stopPropagation();
  lista.classList.toggle("aberto");
});

// 2. Controla o clique nas moedas
opcoesMoedas.forEach((moeda) => {
  moeda.addEventListener("click", () => {
    const nomeMoeda = moeda.textContent.trim();
    const srcImagem = moeda.querySelector("img").src;

    // Limpa a classe de "esconder" de todas as moedas antes de aplicar na nova
    opcoesMoedas.forEach((opt) => opt.classList.remove("esconder-opcao"));

    // Adiciona a classe para esconder ESTA moeda que foi clicada da lista de baixo
    moeda.classList.add("esconder-opcao");

    // Atualiza o topo do select com a moeda escolhida e mantém a seta
    primeiraLi.innerHTML = `
            <img width="40" height="40" src="${srcImagem}" alt="${nomeMoeda}-LOGO">
            ${nomeMoeda}
            <img class="arrowDown" width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/ffffff/expand-arrow--v1.png" alt="expand-arrow--v1" />
        `;

    moedaSelecionada = nomeMoeda;

    // Fecha a lista
    lista.classList.remove("aberto");
  });
});

// 3. Fecha se clicar fora
document.addEventListener("click", () => {
  lista.classList.remove("aberto");
});

//______________________________________________________________________________________

let selectMoeda = ""; // Guarda a moeda selecionada

const select = document.querySelectorAll("ul li"); // Seleciona todos os itens da lista (LI) dentro do UL

select.forEach((item) => {
  // Itera sobre cada item da lista
  item.addEventListener("click", () => {
    // Adiciona um evento de clique a cada item

    // Ignora o clique na primeira LI (que é o topo/header do select)
    if (item.classList.contains("topo-select")) return;
    selectMoeda = item.id; // Guarda o ID da moeda clicada (ex: "dolar", "euro")

    convertValues(); // Chama a função de conversão
  });
});

async function convertValues() {
  const inputCurrencyValue = parseFloat(
    document.querySelector(".input-currency").value,
  );
  const currencyValueBr = document.querySelector(".currency-value-to-convert");
  const currencyOutrosValue = document.querySelector(".currency-value");

  const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL").then(response => response.json())
  console.log(data)
  
  const dolarToday = data.USDBRL.high
  const euroToday = data.EURBRL.high
  const bitcoinToday = data.BTCBRL.high
  const libraToday = data.GBPBRL.high;

  // Validação: se o usuário não digitou um número válido ou não escolheu uma moeda
  if (isNaN(inputCurrencyValue)) {
    alert("Por favor, digite um valor numérico.");
    return;
  }

  if (!selectMoeda) {
    alert("Por favor, selecione uma moeda na lista.");
    return;
  }


  if (selectMoeda === "dolar") {
    currencyOutrosValue.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(inputCurrencyValue / dolarToday);
  }

  if (selectMoeda === "euro") {
    currencyOutrosValue.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(inputCurrencyValue / euroToday);
  }

  if (selectMoeda === "libra") {
    currencyOutrosValue.innerHTML = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(inputCurrencyValue / libraToday);
  }

  if (selectMoeda === "bitcoin") {
    currencyOutrosValue.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BTC",
    }).format(inputCurrencyValue / bitcoinToday);
  }

  currencyValueBr.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);
}

const convertButton = document.querySelector(".convert-button");
convertButton.addEventListener("click", convertValues)