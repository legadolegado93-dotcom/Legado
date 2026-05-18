let jogadores 
let equipes 

async function carregarDados() {
    const resposta = await fetch("../../../assets/data/xtreinoMensal/equipe.json")
    equipes = await resposta.json()


    const resposta2 = await fetch("../../../assets/data/xtreinoMensal/jogadores.json")
    jogadores = await resposta2.json()
}
//o js para e espera pegar todos os dados no json
async function iniciarApp() {
    await carregarDados()
    organizarDados.start(equipes, jogadores)
}
iniciarApp()

const organizarDados = {

    //aq esta selecionando o mes do json
    start(equipes, jogadores) {
        //pega o mes do html selecionado
        const mesDoHtmlSelecionado = document.querySelector("#mes").textContent.toLowerCase()

        //vai percorrer todos os meses no json
        for (let mesEquipes in equipes) {

            //com o mes selecionado no html e o mes percorrido, tem que ser o mesmo
            if (mesEquipes === mesDoHtmlSelecionado) {
                
            }

        }
    }
}
