
const btn = document.querySelector(".btn-scoring-system")
btn.addEventListener("click", () => {
        
    const scoringSystem = document.querySelector(".scoring-system")
    scoringSystem.classList.toggle("ativo")

    const btnScoringSystem = document.querySelector(".btn-scoring-system")
    btnScoringSystem.classList.toggle("juntar")

    const btnScoringSystemSpan = document.querySelector(".btn-scoring-system span")
    btnScoringSystemSpan.classList.toggle("grau180")

        
})


