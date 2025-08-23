var contagemMovimentos = 0;
var gamewin = false;

function mover(ev) {
    if (gamewin) return;
    let bt = Number(ev.target.id.slice(1)); // armazena número do botão (0 a 15)
    let lin = Math.floor(bt / 4); // calcula a linha da matriz
    let col = bt % 4; // calcula a coluna da matriz
    // verifica se o botão pressionado é vizinho do espaço vazio (valor igual a 0)
    let viz = false;
    let linvz, colvz; // linha e coluna do espaço vazio

    // calcula posição do espaço vazio
    if (lin - 1 > -1 && matriz[lin - 1][col] == 0) { // acima
        linvz = lin - 1;
        colvz = col;
        viz = true;
    } else if (col + 1 < 4 && matriz[lin][col + 1] == 0) { // direita
        linvz = lin;
        colvz = col + 1;
        viz = true;
    } else if (lin + 1 < 4 && matriz[lin + 1][col] == 0) { // abaixo
        linvz = lin + 1;
        colvz = col;
        viz = true;
    } else if (col - 1 > -1 && matriz[lin][col - 1] == 0) { // esquerda
        linvz = lin;
        colvz = col - 1;
        viz = true;
    }

    if (viz) {
        som(sndclick, 1, 1.2);

        // movimento do botão pressionado para o espaço vazio
        let aux = matriz[lin][col];
        matriz[lin][col] = matriz[linvz][colvz];
        matriz[linvz][colvz] = aux;
        desenhar();
        contagemMovimentos++;
        document.getElementById('moviments').innerText = "Movimentos: " + contagemMovimentos;}

    if (verificarVitoria()) {
        document.getElementById("vitoria").innerText = "Parabéns vc nao é Burro! Você venceu em " + contagemMovimentos + " movimentos.";
        document.querySelectorAll("#partes button").forEach(botao => botao.disabled = true);
        gamewin = true; }
    
}

function desenhar() {
    const imgWidth = 400;
    const imgHeight = 400;
    const partWidth = imgWidth / 4;
    const partHeight = imgHeight / 4;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let p = i * 4 + j; // transforma i e j em um valor de 0 a 15
            let btn = document.getElementById('b' + p);
            document.getElementById('b' + p).hidden = false;
            if (matriz[i][j] == 0) // esconde o botão de valor zero
            document.getElementById('b' + p).hidden = true;
            else

            var imgSrc = "Cat-2.0.png"
            if (matriz[i][j] != 0) {
            var valor = matriz[i][j] - 1;
            var x = (valor % 4) * partWidth;
            var y = Math.floor(valor / 4) * partHeight;

            btn.style.backgroundImage = `url(${imgSrc})`;
            btn.style.backgroundPosition = `-${x}px -${y}px`;
            btn.style.backgroundSize = `${imgWidth}px ${imgHeight}px`;
            btn.style.border = "1px solid black";
            btn.innerText = '';
} 
        }
    }
}

function som(som, vol, vel) {
	let snd = new Audio(som);
    snd.volume = vol;
	snd.playbackRate = vel;
	snd.play();
}

// código executado ao abrir ou atualizar a página

const sndclick = 'click.mp3';

// define o evento 'click' para os botões (partes)
const bts = document.getElementById('partes');
bts.addEventListener('click', mover);

// gera aleatórios distintos de 0 a 15
let vals = []; // lista vazia
for (let i = 0; i < 16; i++) { 
    let v;
    do {
        v = Math.floor(Math.random() * 16); // gera aleatório entre 0 e 15
    } while (vals.includes(v)); // se já foi incluído, gera outro valor
    vals.push(v); // insere valor na lista 'vals'
}

// insere aleatórios na matriz do jogo
let matriz = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
for (let i = 0; i < 4; i++) { // percorre as linhas da matriz
    for (let j = 0; j < 4; j++) { // percorre as colunas da matriz
        let p = i * 4 + j; // posição da lista aleatória que será inserida
        matriz[i][j] = vals[p]; // posição i,j recebe o valor aleatório    
    }
}

function verificarVitoria() {
    let valor = 1; // O primeiro número deve ser 1
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i === 3 && j === 3) return matriz[i][j] === 0; // A última posição deve ser 0
            if (matriz[i][j] !== valor) return false; // Verifica se o valor é o esperado
            valor++;
        }
    }
    return true; // A vitória foi atingida
}

matriz = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 0, 15]];
desenhar()

if (verificarVitoria()) {
    document.getElementById("vitoria").innerText = "Parabéns vc nao é Burro!";
    document.querySelectorAll("#partes button").forEach(botao => botao.disabled = true);
}   