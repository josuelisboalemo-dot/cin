import json
import re

# ===== CARREGAR DADOS =====
with open("dados.json", "r", encoding="utf-8") as f:
    dados = json.load(f)

elementos_db = dados["elementos"]
compostos_db = dados["compostos"]

# ===== ANALISAR =====
def analisar_formula(formula):
    partes = re.findall(r'([A-Z][a-z]?)(\d*)', formula)

    elementos = {}
    massa_total = 0

    for simbolo, qtd in partes:
        qtd = int(qtd) if qtd else 1

        if simbolo in elementos_db:
            elementos[simbolo] = elementos.get(simbolo, 0) + qtd
            massa_total += elementos_db[simbolo]["massa"] * qtd

    return elementos, massa_total

# ===== IA SIMPLES =====
def prever_composto(elementos):
    # tenta montar fórmula
    formula = ""

    for el in sorted(elementos.keys()):
        qtd = elementos[el]
        formula += el + (str(qtd) if qtd > 1 else "")

    # verifica direto
    if formula in compostos_db:
        return formula, compostos_db[formula]

    # regras simples (IA fake 😈)
    if "Na" in elementos and "Cl" in elementos:
        return "NaCl", compostos_db.get("NaCl")

    if "H" in elementos and "O" in elementos:
        return "H2O", compostos_db.get("H2O")

    if "C" in elementos and "O" in elementos:
        return "CO2", compostos_db.get("CO2")

    return None, None

# ===== EXECUTAR =====
def executar(formula):
    elementos, massa = analisar_formula(formula)
    comp_formula, composto = prever_composto(elementos)

    return {
        "elementos": elementos,
        "massa": massa,
        "resultado": composto,
        "formula_resultado": comp_formula
    }

# TESTE
if __name__ == "__main__":
    f = input("Digite fórmula: ")
    print(executar(f))