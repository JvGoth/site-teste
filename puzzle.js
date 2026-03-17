var contagemMovimentos = 0;
var gamewin = false;

function mover(ev) {
    if (gamewin) return;
    let bt = Number(ev.target.id.slice(1));
    let lin = Math.floor(bt / 4);
    let col = bt % 4;
    let viz = false;
    let linvz, colvz;

    if (lin - 1 > -1 && matriz[lin - 1][col] == 0) {
        linvz = lin - 1;
        colvz = col;
        viz = true;
    } else if (col + 1 < 4 && matriz[lin][col + 1] == 0) {
        linvz = lin;
        colvz = col + 1;
        viz = true;
    } else if (lin + 1 < 4 && matriz[lin + 1][col] == 0) {
        linvz = lin + 1;
        colvz = col;
        viz = true;
    } else if (col - 1 > -1 && matriz[lin][col - 1] == 0) {
        linvz = lin;
        colvz = col - 1;
        viz = true;
    }

    if (viz) {
        som(sndclick, 1, 1.2);
        let aux = matriz[lin][col];
        matriz[lin][col] = matriz[linvz][colvz];
        matriz[linvz][colvz] = aux;
        desenhar();
        contagemMovimentos++;
        document.getElementById('moviments').innerText = "Movimentos: " + contagemMovimentos;

        if (verificarVitoria()) {
            document.getElementById("vitoria").innerText = "Parabéns, você não é Burro! Você venceu em " + contagemMovimentos + " movimentos.";
            
            // Exibe a última peça que faltava para mostrar o quebra-cabeça montado
            let btnFinal = document.getElementById('b15');
            btnFinal.hidden = false;
            btnFinal.style.backgroundImage = "url('Cat-2.0.png')";
            btnFinal.style.backgroundPosition = "-300px -300px";
            btnFinal.style.backgroundSize = "400px 400px";
            btnFinal.style.border = "1px solid black";
            
            gamewin = true;
        }
    }
}

function desenhar() {
    const imgWidth = 400;
    const imgHeight = 400;
    const partWidth = imgWidth / 4;
    const partHeight = imgHeight / 4;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let p = i * 4 + j;
            let btn = document.getElementById('b' + p);
            if (!btn) continue;
            document.getElementById('b' + p).hidden = false;
            if (matriz[i][j] == 0) {
                document.getElementById('b' + p).hidden = true;
            } else {
                var imgSrc = "hamster.png";
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

const sndclick = 'click.mp3';
const bts = document.getElementById('partes');
bts.addEventListener('click', mover);

let vals = [];
for (let i = 0; i < 16; i++) {
    let v;
    do {
        v = Math.floor(Math.random() * 16);
    } while (vals.includes(v));
    vals.push(v);
}

let matriz = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        let p = i * 4 + j;
        matriz[i][j] = vals[p];
    }
}

function verificarVitoria() {
    let valor = 1;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i === 3 && j === 3) return matriz[i][j] === 0;
            if (matriz[i][j] !== valor) return false;
            valor++;
        }
    }
    return true;
}

// Essa linha foi descomentada para o teste
//matriz = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 0], [13, 14, 15, 12]];
desenhar();
