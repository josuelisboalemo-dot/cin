let dados = {};
let mistura = [];

// ===== CARREGAR DADOS =====
async function carregar() {
  const res = await fetch("dados.json");
  dados = await res.json();
  mostrarElementos();
}

// ===== MOSTRAR ELEMENTOS =====
function mostrarElementos() {
  const div = document.getElementById("elementos");

  for (let key in dados.elementos) {
    let el = dados.elementos[key];

    div.innerHTML += `
      <div class="elemento" onclick="adicionar('${key}')">
        ${el.emoji}<br>${key}
      </div>
    `;
  }
}

// ===== ADICIONAR NA MISTURA =====
function adicionar(simbolo) {
  mistura.push(simbolo);
  atualizarMistura();
}

// ===== ATUALIZAR UI =====
function atualizarMistura() {
  const div = document.getElementById("mistura");
  div.innerHTML = mistura.join(" + ");
}

// ===== IA SIMPLES =====
function prever() {
  let elementos = {};

  mistura.forEach(e => {
    elementos[e] = (elementos[e] || 0) + 1;
  });

  let formula = Object.keys(elementos)
    .sort()
    .map(e => e + (elementos[e] > 1 ? elementos[e] : ""))
    .join("");

  if (dados.compostos[formula]) {
    return { formula, info: dados.compostos[formula] };
  }

  // regras inteligentes
  if (elementos["Na"] && elementos["Cl"]) {
    return { formula: "NaCl", info: dados.compostos["NaCl"] };
  }

  if (elementos["H"] && elementos["O"]) {
    return { formula: "H2O", info: dados.compostos["H2O"] };
  }

  if (elementos["C"] && elementos["O"]) {
    return { formula: "CO2", info: dados.compostos["CO2"] };
  }

  // IA cria composto fake 😈
  return {
    formula,
    info: {
      nome: "Composto Desconhecido",
      emoji: "❓",
      como_fazer: "Combinação experimental",
      seguranca: "Desconhecida"
    }
  };
}

// ===== MISTURAR =====
function misturar() {
  const res = document.getElementById("resultado");
  const anim = document.getElementById("animacao");

  let resultado = prever();

  anim.innerHTML = "🧬";
  setTimeout(() => anim.innerHTML = "", 2000);

  res.innerHTML = `
    <div class="card resultado">
      ✨ ${resultado.info.emoji} ${resultado.info.nome}<br>
      🧪 Fórmula: ${resultado.formula}<br>
      🔬 ${resultado.info.como_fazer}<br>
      ⚠️ ${resultado.info.seguranca}
    </div>
  `;

  mistura = [];
  atualizarMistura();
}

// iniciar
carregar();