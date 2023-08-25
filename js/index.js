const botaoEnviar = document.getElementById("botao-js")
const tbody = document.querySelector(".tabela-corpo")
const nomeInput = document.querySelector("#name")
const aniversarioInput = document.querySelector("#birth-date")
const exibirAlertaNome = document.querySelector(".validando-nome--js")
const paragrafoTexto = document.querySelector(".texto-confirmado")

let listaDePessoas = []
const listaRecuperada = localStorage.getItem('dadosArmazenados')

mostraTabelaCabecalho()

function salvarDados () {
    localStorage.setItem('dadosArmazenados', JSON.stringify(listaDePessoas))
    // o localStorage não funciona de forma assíncrona, ou seja, o interpretador do js lê ela instantâneamente
    // diferente de outros códigos que precisam ser executados linha por linha.
}

if(listaRecuperada) {
    listaDePessoas = JSON.parse(listaRecuperada)
    mostrarItem()
} else {
    listaDePessoas = []
}

botaoEnviar.addEventListener("click", function (event) {
    event.preventDefault()
    salvarPessoa()
    mostrarItem()
    salvarDados()
})

function salvarPessoa () {
    const nomePessoa = nomeInput.value
    const aniversarioPessoa = aniversarioInput.value
    const aniversarioPessoaFormatada = formatarDataAniversario(aniversarioPessoa) 
    const checarDuplicado = listaDePessoas.some((p) => p.nome.toUpperCase() === nomePessoa.toUpperCase())
    const nomeContemNumerosELetras = /[0-9]/.test(nomeInput.value) && /[a-zA-Z]/.test(nomeInput.value);
    const nomeContemNumeros = /^[0-9]+$/.test(nomeInput.value)

    const criarDataAtual = new Date()
    const anoAtual = criarDataAtual.getFullYear()
    const partes = aniversarioPessoaFormatada.split('/')
    const ano = partes[2]

    if(ano >= 1920 && ano <= anoAtual) {
        exibirMensagem("Salvo com Sucesso!", "green")
    } else {
        exibirMensagem("Data de Nascimento inválida!", "red")
        return;
    }
    
    if (nomeInput.length <= 3 || nomeContemNumerosELetras || nomeContemNumeros) {
        exibirAlertaNome.style.display = "block";
        return;
    } else {
        exibirAlertaNome.style.display = "none";
        paragrafoTexto.style.display = "block";
        document.querySelector("#name").value = ""
        document.querySelector("#birth-date").value = ""
    }

    if(checarDuplicado) {
        exibirMensagem("Nome já Existente!", "red")
        
    } else {
        listaDePessoas.push ({
            nome: nomePessoa,
            aniversario: aniversarioPessoaFormatada
        })
    }
    console.log(listaDePessoas)
}

function exibirMensagem (texto, cor) {
    paragrafoTexto.style.display = "block"
    paragrafoTexto.style.color = cor
    paragrafoTexto.innerHTML = texto

    setTimeout(() => {
        paragrafoTexto.style.display = "none"
    }, 3000);
}

function removerDoLocalStorage(index) {
    listaDePessoas =  JSON.parse(localStorage.getItem('dadosArmazenados'))
    if (index >= 0 && index < listaDePessoas.length) {
        listaDePessoas.splice(index, 1)
        salvarDados()
    }
}

function mostrarItem () { 
    tbody.innerHTML = ""
    mostraTabelaCabecalho()
    listaDePessoas.forEach((elemento, index) => { // ao usar o metodo forEach, o js passa três argumentos
        // para a função de callback(de retorno) o primeiro argumento é o elemento, o segundo é o indice, e o terceiro
        // é a array sendo completamente percorrida, eu estou utilizando o indice para saber o index do meu objeto 
        // e poder deletar esse objeto na função de deletar.
        const novaTr = document.createElement("tr");
        novaTr.setAttribute("data-value", index);
        novaTr.classList.add("novoElementoTr")
        
        const novaTdNome = document.createElement("td");
        novaTdNome.textContent = elemento.nome;

        const novaTdAniversario = document.createElement("td");
        novaTdAniversario.textContent = elemento.aniversario;

        const novaTdAcoes = document.createElement("td")
        const acaoEditar = document.createElement("p")
        const acaoDeletar = document.createElement("p")
       
        acaoEditar.textContent = "Editar"
        acaoDeletar.textContent = "Deletar"

        novaTdAcoes.classList.add("td-acao")
        acaoEditar.classList.add("tr-editar")
        acaoDeletar.classList.add("tr-deletar")

        novaTdAcoes.appendChild (acaoEditar)
        novaTdAcoes.appendChild (acaoDeletar)
        
        novaTr.appendChild(novaTdNome);
        novaTr.appendChild(novaTdAniversario);
        novaTr.appendChild(novaTdAcoes)

        tbody.appendChild(novaTr);

        acaoDeletar.addEventListener("click", () => {
            listaDePessoas.splice(index, 1)
            removerDoLocalStorage(index)
            mostrarItem()
        })

        acaoEditar.addEventListener("click", () => {
            validarNomeEditado(index)
        })
    })
}

function validarNomeEditado (index) {
    const nomeAlterado = prompt("Insira seu nome para Alteração:")
    const nomeContemNumerosELetras = /[0-9]/.test(nomeAlterado) && /[a-zA-Z]/.test(nomeAlterado);
    const nomeContemNumeros = /^[0-9]+$/.test(nomeAlterado)
    const checarDuplicado = listaDePessoas.some((p) => p.nome.toUpperCase() === nomeAlterado.toUpperCase())
    
    if (nomeAlterado.length <= 3 || nomeContemNumerosELetras || nomeContemNumeros) {
        alert("o nome precisa ter pelo menos três letras e no máximo cento e vinte. não é possivel informar números.")
        return;
    }

    if(checarDuplicado) {
        alert("Nome já existente!")
        return;
    }
    
    const aniversarioAlterado = prompt("Insira seu aniversário para Alteração:\n(Apenas no formato dd/mm/aaaa EX: 19/01/2007)")
    
    if(nomeAlterado && aniversarioAlterado !== null) {
        const aniversarioAlteradoFormatado = validarAniversarioEditado(aniversarioAlterado)
        if(aniversarioAlteradoFormatado) {
            console.log(aniversarioAlteradoFormatado)
            listaDePessoas[index].nome = nomeAlterado;
            listaDePessoas[index].aniversario = aniversarioAlteradoFormatado;
            salvarDados()
            mostrarItem()
        } else {
            alert("Data Inválida! Utilize dd/mm/aaaa")
        }
    }
       
}

function validarAniversarioEditado(data) {
    const partes = data.split('/');
    if (partes.length !== 3) {
        return false;
    }

    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]);
    const ano = parseInt(partes[2]);

    if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
        return false;
    }

    const dataFormatada = new Date(ano, mes - 1, dia);
    switch (true) {
        case (dia < 1 || dia > 31):
        case (mes < 1 || mes > 12):
        case (ano < 1920 || ano > 2023):
        case (dataFormatada.getDate() !== dia):
        case (dataFormatada.getMonth() !== mes - 1):
        case (dataFormatada.getFullYear() !== ano):
            return false;
        default:
            return data;
    }
}
 
function mostraTabelaCabecalho () {
    const trCabecalho = document.createElement("tr")
    const cabecalhoNome = document.createElement("th")
    const cabecalhoAniversario = document.createElement("th")
    const cabecalhoAcoes = document.createElement("th")

    cabecalhoNome.textContent = "Nome";
    cabecalhoAniversario.textContent = "Data de Aniversário";
    cabecalhoAcoes.textContent = "Ações";

    trCabecalho.appendChild(cabecalhoNome)
    trCabecalho.appendChild(cabecalhoAniversario)
    trCabecalho.appendChild(cabecalhoAcoes)

    tbody.appendChild(trCabecalho)
}

function formatarDataAniversario(data) {
    const criarDataEspecifica = new Date(data)
    const diaAtual = (criarDataEspecifica.getDate() +1).toString().padStart(2, "0")
    const mesAtual = (criarDataEspecifica.getMonth() +1).toString().padStart(2, "0")
    const anoAtual = criarDataEspecifica.getFullYear()

    console.log(anoAtual)
    return `${diaAtual}/${mesAtual}/${anoAtual}`
}






// o código abaixo remove parametros de consulta da url
// pega a url atual
const urlAtual = window.location.href;
const urlNova = urlAtual.split('?')[0]; // remove os parametros de consulta
history.replaceState(null, '', urlNova) // atualiza a URL no histórico do nav sem recarregar a pág
