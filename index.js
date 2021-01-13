import { promises as fs } from 'fs';

const times = [];

async function init() {
  //const data = await fs.readFile('2003.json').then(data => {
  //console.log(JSON.parse(data));
  try {
    const data = JSON.parse(await fs.readFile('2003.json'));
    //});
    //inicialezando array de times

    data[0].partidas.forEach(partida => {
      times.push({ time: partida.mandante, pontuacao: 0 });
      times.push({ time: partida.visitante, pontuacao: 0 });
    });

    //preencher a pontuacao dos times no array
    data.forEach(rodada => {
      rodada.partidas.forEach(partida => {
        const timeMandante = times.find(item => item.time === partida.mandante);
        const timeVisitante = times.find(
          item => item.time === partida.visitante
        );

        if (partida.placar_mandante > partida.placar_visitante) {
          // 3 pontos mandante
          timeMandante.pontuacao += 3;
        } else if (partida.placar_visitante > partida.placar_mandante) {
          // 3 pontos para o visitante
          timeVisitante.pontuacao += 3;
        } else {
          //1 ponto pra cada
          timeMandante.pontuacao += 1;
          timeVisitante.pontuacao += 1;
        }
      });
    });
    times.sort((a, b) => {
      return b.pontuacao - a.pontuacao;
    });
    console.log(times);
    await salvaTimes();
    await salvaQuatroPrim();
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array.forEach(async x => {
      console.log(await teste(x));
    });
  } catch (err) {
    console.log(err);
  }
}
init();

async function salvaTimes(params) {
  fs.writeFile('times.json', JSON.stringify(times, null, 2));
}
async function salvaQuatroPrim(params) {
  fs.writeFile(
    'quatroprimeiros.json',
    JSON.stringify(times.slice(0, 4), null, 2)
  );
}
function teste(number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(number);
    }, Math.random() * 1000);
  });
}
