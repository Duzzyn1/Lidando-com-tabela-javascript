modal

~~~html
<div id="fade" class="hide"></div>
    <div id="modal" class="hide">
        <div class="modal-cabecalho">
            <h2 class="modal-titulo">Insira seu Nome e Aniversário para alteração</h2>
        </div>
        <div class="modal-body">
            <form class="modal-form">
                <div class="modal-form--nome">
                    <label for="nome-alterado">Digite o nome:</label>
                    <input type="text" class="form-field modal-form--field" id="nome-alterado" placeholder="Digite o nome para alteração:">
                </div>
                <div class="modal-form--aniversario">
                    <label for="aniversario-alterado">Digite a Data de nascimento:</label>
                    <input type="date" class="form-field modal-form--field" id="aniversario-alterado" name="birth-date" placeholder="Digite a data para alteração:">
                </div>
            </form>
            <div class="modal-secao--botao">
                <button class="modal-botao" id="fechar-modal" type="submit">Fechar</button>
                <button class="modal-botao" id="enviarDadosAlterados" type="submit">Concluir</button>
            </div>
        </div>
    </div>
~~~

    
~~~css
.modal-secao--botao {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
}

.modal-botao {
    padding: .6rem 1.2rem;
    background-color: #888;
    color: #fff;
    border: none;
    border-radius: .40rem;
    cursor: pointer;
    opacity: 0.9;
    font-size: 1rem;
    transition: 0.4s;
}

.modal-botao:hover {
    opacity: 1;
}

.modal-botao#fechar-modal {
    order: 1;
}

#fade, 
#modal {
    transition: .5s;
    opacity: 1;
    pointer-events: all;
}

#fade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 5;
}

#modal {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 600px;
    max-width: 80%;
    border-radius: .5rem;
}

.modal-cabecalho {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-principal);
    margin-bottom: 1rem;
    padding: 1rem 0 1rem 1rem;
}

.modal-titulo {
    color: #fff;
}

.modal-form {
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
}

.modal-form--nome, 
.modal-form--aniversario {
    display: flex;
    flex-direction: column;
}

.modal-form--field {
    width: 50%;
}

.modal-body {
    padding: 1rem;
}

.modal-body div {
    margin-bottom: 1rem;
}


#modal.hide,
#fade.hide {
    opacity: 0;
    pointer-events: none;
}
~~~