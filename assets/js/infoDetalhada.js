let season;
let jogadores;

async function carregarDados() {
    try {
        const resposta = await fetch("../data/equipe.json");
        season = await resposta.json();

        const resposta2 = await fetch("../data/jogadores.json");
        jogadores = await resposta2.json();

        console.log("Dados carregados com sucesso!");
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}

async function iniciarApp() {
    await carregarDados();
}

iniciarApp();

const classificação = [
    { posição: 1, pts: 12 },
    { posição: 2, pts: 9 },
    { posição: 3, pts: 8 },
    { posição: 4, pts: 7 },
    { posição: 5, pts: 6 },
    { posição: 6, pts: 5 },
    { posição: 7, pts: 4 },
    { posição: 8, pts: 3 },
    { posição: 9, pts: 2 },
    { posição: 10, pts: 1 },
    { posição: 11, pts: 0 },
    { posição: 12, pts: 0 },
    { posição: 13, pts: 0 }
];

// ESCUTADOR DE EVENTOS ÚNICO
document.addEventListener("click", (event) => {
    for (let i = 1; i <= 12; i++) {
        if (event.target.id === `info${i}`) {
            const tr = document.querySelector(`#tr${i}`);
            if (tr) {
                
                dados.start(tr, event.target, i);
            }
        }
    }
});

const dados = {
    start(tr, click, index) {
        const select = document.querySelector(".container_select").value;
        console.log(select)
        this.processarEquipe(select, tr, click, index);
    },

    processarEquipe(seasonSelecionada, tr, click, index) {
        if (seasonSelecionada == "treinoSelecionado") {
            seasonSelecionada = "treino1"
        }
        const equipes = season[seasonSelecionada].equipes;

        equipes.forEach(equipe => {
            // Verifica se o nome da equipe bate com a classe da linha clicada
            if (tr.className === equipe.equipe) {
                // ENVIAMOS OS DETALHES COMPLETOS (O ARRAY)
                informaçãoDealhada.exibir(tr, index, equipe.detalhes, equipe.equipe);


            }
        });
    },

    ptsPosição(pos) {
        const dado = classificação.find(item => item.posição === pos);
        return dado ? dado.pts : 0;
    }
};

const informaçãoDealhada = {
    exibir(tr, i, listaDetalhes, nomeEquipe) {
        // Verifica se a linha de detalhes já existe para fechar (Toggle)
        const idLinhaInfo = `detalhe_linha_${i}`;
        const linhaExistente = document.getElementById(idLinhaInfo);
        if (linhaExistente) {
            linhaExistente.remove();
            return;
        }

        // Cria a estrutura principal uma única vez
        const createTr = document.createElement("tr");
        createTr.id = idLinhaInfo;

        const createTd = document.createElement("td");
        createTd.setAttribute("colspan", "7");
        createTd.className = "td_infoPartida";

        const divPrincipal = document.createElement("div");
        divPrincipal.className = "desempenhoDetalhado";

        // Cria o Cabeçalho (H2)
        const h2 = document.createElement("h2");
        h2.innerHTML = `📊 Desempenho Detalhado - <span>${nomeEquipe}</span>`;
        divPrincipal.appendChild(h2);

        // Container para os cards das quedas
        const divQuedas = document.createElement("div");
        divQuedas.className = "desempenhoDetalhado_quedas";

        // LOOP INTERNO: Cria os 5 cards dentro do container
        listaDetalhes.forEach(partida => {
            const ptsPos = dados.ptsPosição(partida.posicao);
            const totalPartida = partida.kills + ptsPos;

            const card = this.criarCardPartida(partida, ptsPos, totalPartida);
            divQuedas.appendChild(card);
        });

        divPrincipal.appendChild(divQuedas);
        createTd.appendChild(divPrincipal);
        createTr.appendChild(createTd);

        // Adiciona a linha detalhada logo após a linha do time
        tr.after(createTr);
    },

    criarCardPartida(partida, ptsPos, total) {
        const divCadaPartida = document.createElement("div");
        divCadaPartida.className = "desempenhoDetalhado_quedas_partida";

        
        if (partida.posicao === 13) {
            divCadaPartida.innerHTML = `
                <h3>Partida <span>${partida.queda}</span></h3>
                <p class="desempenhoDetalhado_quedas_partida_posição">Posição: <span>Não jogou</span></p>
                <p class="desempenhoDetalhado_quedas_partida_kills">Kills: <span>Não jogou</span></p>
                <p class="desempenhoDetalhado_quedas_ptsPosição">Pts Posição: <span>${ptsPos}</span></p>
                <p class="desempenhoDetalhado_quedas_ptsKills">Pts Kills: <span>${partida.kills}</span></p>
                <hr>
                <p class="desempenhoDetalhado_quedas_total">Total: <span>${total}</span></p>
            `;
        } else {
            // Usando Template String para o HTML ficar limpo e fácil de ler
            divCadaPartida.innerHTML = `
                    <h3>Partida <span>${partida.queda}</span></h3>
                    <p class="desempenhoDetalhado_quedas_partida_posição">Posição: <span>${partida.posicao}º</span></p>
                    <p class="desempenhoDetalhado_quedas_partida_kills">Kills: <span>${partida.kills}</span></p>
                    <p class="desempenhoDetalhado_quedas_ptsPosição">Pts Posição: <span>${ptsPos}</span></p>
                    <p class="desempenhoDetalhado_quedas_ptsKills">Pts Kills: <span>${partida.kills}</span></p>
                    <hr>
                    <p class="desempenhoDetalhado_quedas_total">Total: <span>${total}</span></p>`;
        }



        return divCadaPartida;
    }
};