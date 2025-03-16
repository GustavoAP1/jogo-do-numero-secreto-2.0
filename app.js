// Variaveis lei zero
let listaNumeros = [];
let tamanhoDaLista = 10;
let numbSecreto = gerarNumeroAleatorio();
let tentativa = 1;

// Campos fixos sem interação direta
function exibirTexto(tagHtml,textoInteracao){
    let campoTexto = document.querySelector(tagHtml);
    campoTexto.innerHTML = textoInteracao;
    responsiveVoice.speak(textoInteracao,'Brazilian Portuguese Female',{rate:1.2});
}

function mensagemInicial(){
exibirTexto('h1', 'Jogo do número SECRETO');
exibirTexto('p', `Escolha um número de 1 a ${tamanhoDaLista}`);
}
mensagemInicial();

//Configuração das dicas sobro como encontrar o número secreto
function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * tamanhoDaLista + 1);
    if (tamanhoDaLista == listaNumeros.length){
        listaNumeros = [];
    }
    if (listaNumeros.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    } else {
        listaNumeros.push(numeroSorteado);
        console.log(listaNumeros);
        return numeroSorteado;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(numbSecreto);
    if (chute == numbSecreto){
        exibirTexto('h1', 'Acertou!!!!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        exibirTexto('p', `Parabéns você descobriu o número secreto ${numbSecreto} com ${tentativa} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        limparCampo()
        exibirTexto('h1', 'Erroouu!!!');
        tentativa++
        let palavraMensuravel = chute < numbSecreto ? 'maior' : 'menor';
        exibirTexto('p', `O número secreto é ${palavraMensuravel} que ${chute}, tente novamente:`);
        }
}

function jogarNovamente(){
    numbSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}