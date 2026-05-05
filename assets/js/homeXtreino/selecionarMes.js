document.addEventListener("click", (click) => {
    const link = click.target.closest("a");

    if (link && link.dataset.value) {
        // Salva o mês no "pente" do navegador
        localStorage.setItem("mesSelecionado", link.dataset.value);
    }
});