async function carregarComponente(id, arquivo) {
    const destino = document.getElementById(id)
    const resposta = await fetch(arquivo)

    if (!resposta.ok) {
        throw new Error(`Não foi possível carregar ${arquivo}: ${resposta.status}`)
    }

    destino.innerHTML = await resposta.text()
}

const baseDoProjeto = new URL("../", document.currentScript.src)

carregarComponente("header", new URL("components/header/header.html", baseDoProjeto))
carregarComponente("footer", new URL("components/footer/footer.html", baseDoProjeto))