function misturar() {
  const res = document.getElementById("resultado");
  const anim = document.getElementById("animacao");

  anim.innerHTML = "💥";
  anim.style.fontSize = "60px";

  setTimeout(() => {
    anim.innerHTML = "🧬";
  }, 500);

  setTimeout(() => {
    let resultado = prever();

    res.innerHTML = `
      <div class="card resultado">
        ✨ ${resultado.info.emoji} ${resultado.info.nome}<br>
        🧪 ${resultado.formula}
      </div>
    `;

    anim.innerHTML = "";
  }, 1200);

  mistura = [];
  atualizarMistura();
}
