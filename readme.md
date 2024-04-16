# O código abaixo é um código antigo da primeira vez que fiz esse projeto.

Esse projeto foi concluido pela primeira vez em 27/07/2023 e sofreu modificações no dia 25/08/2023.
foi modificado para uma legibilidade melhor e para uma melhor experiência



~~~javascript 
const botaoEnviar = document.querySelector("#botao-js")

exibirDadosNaTela()

botaoEnviar.addEventListener("click", function (event) {
    event.preventDefault()
    const nomeInput = document.querySelector("#name").value
    const aniversarioInput = document.querySelector("#birth-date").value
    const exibirAlertaNome = document.querySelector(".validando-nome--js")
    const paragrafoTexto = document.querySelector(".texto-confirmado")

    const nomeContemNumerosELetras = /[0-9]/.test(nomeInput) && /[a-zA-Z]/.test(nomeInput);

    if (nomeInput.length <= 3 || nomeContemNumerosELetras) {
        exibirAlertaNome.style.display = "block";
        return;
    } else {
        exibirAlertaNome.style.display = "none";
        paragrafoTexto.style.display = "block";
        setTimeout(function () {
            paragrafoTexto.style.display = "none";
        }, 3000);
    }

    const pessoa = {
        nome: nomeInput,
        aniversario: aniversarioInput
    }

    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []

    const nomeExiste = pessoas.some(p => p.nome === nomeInput)

    if (nomeExiste) {
        paragrafoTexto.innerHTML = "Esse nome já está cadastrado, tente outro nome!"
        paragrafoTexto.style.color = "red"
        return;
    }

    pessoas.push(pessoa)

    localStorage.setItem("pessoas", JSON.stringify(pessoas))

    adicionaItens(nomeInput, aniversarioInput)
})

function exibirDadosNaTela () {
    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []

    pessoas.forEach((pessoa) => {
        adicionaItens(pessoa.nome, pessoa.aniversario)
    })
}

function adicionaItens (nome, aniversario) {
    const tbody = document.querySelector("tbody")

    const novaTr = document.createElement("tr")
    const novaTdNome = document.createElement("td")
    const novaTdAniversario = document.createElement("td")
    const novaTdAcoes = document.createElement("td")
    const acaoEditar = document.createElement("p")
    const acaoDeletar = document.createElement("p")

    novaTdNome.textContent = nome
    novaTdAniversario.textContent = formatarData(aniversario)
    acaoEditar.textContent = "Editar"
    acaoDeletar.textContent = "Deletar"

    novaTdAcoes.classList.add("td-acao")
    acaoEditar.classList.add("tr-editar")
    acaoDeletar.classList.add("tr-deletar")

    novaTdAcoes.appendChild (acaoEditar)
    novaTdAcoes.appendChild (acaoDeletar)

    novaTr.appendChild(novaTdNome)
    novaTr.appendChild(novaTdAniversario)
    novaTr.appendChild(novaTdAcoes)

    tbody.appendChild(novaTr)

    acaoEditar.addEventListener("click", function() {
        const linhaSelecionada = acaoEditar.closest("tr")
        
        const colunaNome = linhaSelecionada.querySelector("td:first-child")
        const colunaAniversario = linhaSelecionada.querySelector("td:nth-child(2)")
        
        const nomeAlterado = prompt("Insira o nome desejado para a alteração:")
        const aniversarioAlterado = prompt("Insira sua data de aniversário desejado para a alteração:")

        const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/
        if(!dataRegex.test(aniversarioAlterado)) { //SE A EXPRESSÃO REGULAR NÃO ENCONTRAR O PADRAO DE DATA
            // NO TEXTO "ANIVERSARIOALTERADO", FAÇA OQ ESTIVER DENTRO DO BLOCO 'IF'
            alert("Formato de data inválido. Insira a data no formato dd/mm/aaaa")
            return;
        }

        colunaNome.textContent = nomeAlterado
        colunaAniversario.textContent = aniversarioAlterado
    })

    acaoDeletar.addEventListener("click", function() {
        novaTdNome.remove()
        novaTdAcoes.remove()
        novaTdAniversario.remove()
        window.localStorage.clear()
    })

}

function formatarData (data) {
    const dataObj = new Date(data)
    const dia = dataObj.getDate().toString().padStart(2, "0")
    const mes = (dataObj.getMonth() +1).toString().padStart(2, "0")
    const ano = dataObj.getFullYear()

    return `${dia}/${mes}/${ano}`
}
~~~
