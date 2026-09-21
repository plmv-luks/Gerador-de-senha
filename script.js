const btnTema = document.getElementById('btnTema')
const btnModoSenha = document.getElementById('btnModoSenha')
const btnModoFrase = document.getElementById('btnModoFrase')
const painelSenha = document.getElementById('painelSenha')
const painelFrase = document.getElementById('painelFrase')

const campoSenha = document.getElementById('campoSenha')
const btnGerar = document.getElementById('btnGerar')
const btnCopiar = document.getElementById('btnCopiar')
const avisoCopiado = document.getElementById('avisoCopiado')
const barraForca = document.getElementById('barraForca')
const labelForca = document.getElementById('labelForca')

const tamanho = document.getElementById('tamanho')
const valorTamanho = document.getElementById('valorTamanho')

const checkMaiusculas = document.getElementById('maiusculas')
const checkMinusculas = document.getElementById('minusculas')
const checkNumeros = document.getElementById('numeros')
const checkSimbolos = document.getElementById('simbolos')
const minMaiusculas = document.getElementById('minMaiusculas')
const minMinusculas = document.getElementById('minMinusculas')
const minNumeros = document.getElementById('minNumeros')
const minSimbolos = document.getElementById('minSimbolos')
const checkSemAmbiguos = document.getElementById('semAmbiguos')
const campoIncluir = document.getElementById('campoIncluir')
const campoExcluir = document.getElementById('campoExcluir')

const qtdPalavras = document.getElementById('qtdPalavras')
const valorQtdPalavras = document.getElementById('valorQtdPalavras')
const separador = document.getElementById('separador')
const numeroFinal = document.getElementById('numeroFinal')

const quantidade = document.getElementById('quantidade')
const historico = document.getElementById('historico')
const listaHistorico = document.getElementById('listaHistorico')
const btnCopiarTodas = document.getElementById('btnCopiarTodas')
const btnLimpar = document.getElementById('btnLimpar')

const CONJUNTOS = {
  maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  minusculas: 'abcdefghijklmnopqrstuvwxyz',
  numeros: '0123456789',
  simbolos: '!@#$%^&*()-_=+[]{};:,.<>?/'
}

const AMBIGUOS = /[lI1O0]/g

const PALAVRAS = ['casa', 'carro', 'gato', 'cachorro', 'arvore', 'rio', 'montanha', 'praia', 'sol', 'lua',
  'estrela', 'ceu', 'mar', 'vento', 'chuva', 'fogo', 'agua', 'terra', 'pedra', 'flor',
  'folha', 'fruta', 'banana', 'laranja', 'limao', 'uva', 'maca', 'pera', 'mesa', 'cadeira',
  'porta', 'janela', 'livro', 'caneta', 'papel', 'lampada', 'relogio', 'telefone', 'teclado', 'mouse',
  'tela', 'camera', 'musica', 'filme', 'jogo', 'bola', 'futebol', 'cidade', 'campo', 'floresta',
  'deserto', 'ilha', 'ponte', 'estrada', 'caminho', 'viagem', 'aviao', 'navio', 'trem', 'onibus',
  'bicicleta', 'moto', 'chave', 'parede', 'teto', 'chao', 'escada', 'elevador', 'jardim', 'quintal',
  'telhado', 'muro', 'portao', 'cerca', 'passaro', 'peixe', 'tigre', 'leao', 'elefante', 'girafa',
  'macaco', 'urso', 'lobo', 'raposa', 'coelho', 'tartaruga', 'cobra', 'aranha', 'abelha', 'formiga',
  'borboleta', 'planeta', 'universo', 'galaxia', 'cometa', 'foguete', 'robo', 'maquina', 'motor', 'roda',
  'ferramenta', 'martelo', 'prego', 'parafuso', 'corda', 'fio', 'tecido', 'roupa', 'sapato', 'chapeu',
  'oculos', 'anel', 'colar', 'pulseira', 'bolsa', 'mochila', 'caixa', 'garrafa', 'copo', 'prato',
  'panela', 'fogao', 'geladeira', 'forno', 'banco', 'sofa', 'cama', 'travesseiro', 'cobertor', 'espelho',
  'quadro', 'tapete', 'cortina', 'vaso', 'planta', 'semente', 'raiz', 'tronco', 'galho', 'legume',
  'arroz', 'feijao', 'milho', 'trigo', 'pao', 'queijo', 'leite', 'ovo', 'carne', 'sopa']

function indiceAleatorio(max) {
  const buf = new Uint32Array(1)
  const limite = 2 ** 32 - (2 ** 32 % max)
  do {
    crypto.getRandomValues(buf)
  } while (buf[0] >= limite)
  return buf[0] % max
}

function embaralha(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = indiceAleatorio(i + 1)
    const tmp = lista[i]
    lista[i] = lista[j]
    lista[j] = tmp
  }
  return lista
}

function filtraCaracteres(str, excluir) {
  let r = checkSemAmbiguos.checked ? str.replace(AMBIGUOS, '') : str
  if (excluir.size) r = [...r].filter(c => !excluir.has(c) && !excluir.has(c.toLowerCase()) && !excluir.has(c.toUpperCase())).join('')
  return r
}

function lerMin(input, max) {
  const v = Number(input.value) || 0
  return Math.max(0, Math.min(v, max))
}

function erro(msg) {
  campoSenha.value = ''
  labelForca.textContent = msg
  barraForca.style.width = '0%'
  return null
}

function gerarSenhaAleatoria() {
  const tamanhoTotal = Number(tamanho.value)
  const excluir = new Set(campoExcluir.value.split(''))

  const tipos = []
  if (checkMaiusculas.checked) tipos.push({ chars: filtraCaracteres(CONJUNTOS.maiusculas, excluir), min: lerMin(minMaiusculas, tamanhoTotal) })
  if (checkMinusculas.checked) tipos.push({ chars: filtraCaracteres(CONJUNTOS.minusculas, excluir), min: lerMin(minMinusculas, tamanhoTotal) })
  if (checkNumeros.checked) tipos.push({ chars: filtraCaracteres(CONJUNTOS.numeros, excluir), min: lerMin(minNumeros, tamanhoTotal) })
  if (checkSimbolos.checked) tipos.push({ chars: filtraCaracteres(CONJUNTOS.simbolos, excluir), min: lerMin(minSimbolos, tamanhoTotal) })

  const extra = filtraCaracteres(campoIncluir.value, excluir)
  const alfabetoCombinado = tipos.map(t => t.chars).join('') + extra

  if (!alfabetoCombinado) return erro('marque pelo menos uma opção')

  const somaMinimos = tipos.reduce((soma, t) => soma + t.min, 0)
  if (somaMinimos > tamanhoTotal) return erro('os mínimos somados passam do tamanho')

  const resultado = []
  for (const tipo of tipos) {
    if (!tipo.chars) continue
    for (let i = 0; i < tipo.min; i++) resultado.push(tipo.chars[indiceAleatorio(tipo.chars.length)])
  }
  while (resultado.length < tamanhoTotal) {
    resultado.push(alfabetoCombinado[indiceAleatorio(alfabetoCombinado.length)])
  }

  const senha = embaralha(resultado).join('')
  return { texto: senha, entropia: senha.length * Math.log2(alfabetoCombinado.length) }
}

function gerarFrase() {
  const qtd = Number(qtdPalavras.value)
  const partes = []
  for (let i = 0; i < qtd; i++) partes.push(PALAVRAS[indiceAleatorio(PALAVRAS.length)])

  let entropia = qtd * Math.log2(PALAVRAS.length)
  if (numeroFinal.checked) {
    partes.push(String(10 + indiceAleatorio(90)))
    entropia += Math.log2(90)
  }

  return { texto: partes.join(separador.value), entropia }
}

function atualizarForca(entropia) {
  let porcentagem, cor, texto
  if (entropia < 40) {
    porcentagem = 25; cor = 'var(--fraca)'; texto = 'fraca'
  } else if (entropia < 60) {
    porcentagem = 50; cor = 'var(--razoavel)'; texto = 'razoável'
  } else if (entropia < 90) {
    porcentagem = 75; cor = 'var(--forte)'; texto = 'forte'
  } else {
    porcentagem = 100; cor = 'var(--muito-forte)'; texto = 'muito forte'
  }

  barraForca.style.width = porcentagem + '%'
  barraForca.style.background = cor
  labelForca.textContent = texto
}

function gerarUma() {
  return painelFrase.hidden ? gerarSenhaAleatoria() : gerarFrase()
}

function gerar() {
  const r = gerarUma()
  if (!r) return
  campoSenha.value = r.texto
  atualizarForca(r.entropia)
}

async function copiar(texto) {
  if (!texto) return

  await navigator.clipboard.writeText(texto)
  avisoCopiado.classList.add('show')
  setTimeout(() => avisoCopiado.classList.remove('show'), 1500)
}

const MAX_HISTORICO = 20
let itens = []

function desenhaHistorico() {
  listaHistorico.replaceChildren(...itens.map(texto => {
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.textContent = texto
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.textContent = 'copiar'
    btn.addEventListener('click', () => copiar(texto))
    li.append(span, btn)
    return li
  }))
  historico.hidden = !itens.length
}

function gerarVarias() {
  const qtd = Math.max(1, Math.min(Number(quantidade.value) || 1, 20))
  const novas = []
  for (let i = 0; i < qtd; i++) {
    const r = gerarUma()
    if (!r) return
    novas.push(r)
  }
  campoSenha.value = novas[0].texto
  atualizarForca(novas[0].entropia)
  itens = [...novas.map(r => r.texto), ...itens].slice(0, MAX_HISTORICO)
  desenhaHistorico()
}

function trocaModo(mostrarFrase) {
  painelSenha.hidden = mostrarFrase
  painelFrase.hidden = !mostrarFrase
  btnModoSenha.classList.toggle('ativo', !mostrarFrase)
  btnModoFrase.classList.toggle('ativo', mostrarFrase)
  btnModoSenha.setAttribute('aria-pressed', String(!mostrarFrase))
  btnModoFrase.setAttribute('aria-pressed', String(mostrarFrase))
  gerar()
}

const escuroDoSistema = matchMedia('(prefers-color-scheme: dark)')

function temaAtual() {
  return document.documentElement.dataset.tema || (escuroDoSistema.matches ? 'escuro' : 'claro')
}

function rotuloTema() {
  btnTema.textContent = temaAtual() === 'escuro' ? 'claro' : 'escuro'
}

btnTema.addEventListener('click', () => {
  document.documentElement.dataset.tema = temaAtual() === 'escuro' ? 'claro' : 'escuro'
  rotuloTema()
})
escuroDoSistema.addEventListener('change', rotuloTema)
rotuloTema()

btnModoSenha.addEventListener('click', () => trocaModo(false))
btnModoFrase.addEventListener('click', () => trocaModo(true))

tamanho.addEventListener('input', () => {
  valorTamanho.textContent = tamanho.value
  gerar()
})

qtdPalavras.addEventListener('input', () => {
  valorQtdPalavras.textContent = qtdPalavras.value
  gerar()
})

btnGerar.addEventListener('click', gerarVarias)
btnCopiar.addEventListener('click', () => copiar(campoSenha.value))
btnCopiarTodas.addEventListener('click', () => copiar(itens.join('\n')))
btnLimpar.addEventListener('click', () => {
  itens = []
  desenhaHistorico()
})

const PARES = [[checkMaiusculas, minMaiusculas], [checkMinusculas, minMinusculas], [checkNumeros, minNumeros], [checkSimbolos, minSimbolos]]

for (const [check, min] of PARES) {
  check.addEventListener('change', () => {
    min.disabled = !check.checked
    gerar()
  })
  min.disabled = !check.checked
  min.addEventListener('input', gerar)
}

for (const el of [checkSemAmbiguos, campoIncluir, campoExcluir, separador, numeroFinal]) {
  el.addEventListener('input', gerar)
  el.addEventListener('change', gerar)
}

const CHAVE = 'gerador-config'
const CONTROLES = [tamanho, checkMaiusculas, checkMinusculas, checkNumeros, checkSimbolos,
  minMaiusculas, minMinusculas, minNumeros, minSimbolos, checkSemAmbiguos, campoIncluir, campoExcluir,
  qtdPalavras, separador, numeroFinal, quantidade]

function salvaConfig() {
  const cfg = { modo: painelFrase.hidden ? 'senha' : 'frase', tema: document.documentElement.dataset.tema }
  for (const el of CONTROLES) cfg[el.id] = el.type === 'checkbox' ? el.checked : el.value
  try {
    localStorage.setItem(CHAVE, JSON.stringify(cfg))
  } catch {}
}

function carregaConfig() {
  try {
    const cfg = JSON.parse(localStorage.getItem(CHAVE))
    if (!cfg || typeof cfg !== 'object') return

    for (const el of CONTROLES) {
      if (!(el.id in cfg)) continue
      if (el.type === 'checkbox') el.checked = cfg[el.id] === true
      else if (el.tagName !== 'SELECT' || [...el.options].some(o => o.value === cfg[el.id])) el.value = cfg[el.id]
    }
    valorTamanho.textContent = tamanho.value
    valorQtdPalavras.textContent = qtdPalavras.value
    for (const [check, min] of PARES) min.disabled = !check.checked

    if (cfg.tema === 'claro' || cfg.tema === 'escuro') document.documentElement.dataset.tema = cfg.tema
    rotuloTema()
    trocaModo(cfg.modo === 'frase')
  } catch {}
}

document.addEventListener('input', salvaConfig)
document.addEventListener('change', salvaConfig)
document.addEventListener('click', e => {
  if (e.target.closest('.modos, #btnTema')) salvaConfig()
})

carregaConfig()
gerar()
