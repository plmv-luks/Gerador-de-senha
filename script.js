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
  crypto.getRandomValues(buf)
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

  if (!alfabetoCombinado) {
    campoSenha.value = ''
    labelForca.textContent = 'marque pelo menos uma opção'
    barraForca.style.width = '0%'
    return
  }

  const somaMinimos = tipos.reduce((soma, t) => soma + t.min, 0)
  if (somaMinimos > tamanhoTotal) {
    campoSenha.value = ''
    labelForca.textContent = 'os mínimos somados passam do tamanho'
    barraForca.style.width = '0%'
    return
  }

  const resultado = []
  for (const tipo of tipos) {
    if (!tipo.chars) continue
    for (let i = 0; i < tipo.min; i++) resultado.push(tipo.chars[indiceAleatorio(tipo.chars.length)])
  }
  while (resultado.length < tamanhoTotal) {
    resultado.push(alfabetoCombinado[indiceAleatorio(alfabetoCombinado.length)])
  }

  const senha = embaralha(resultado).join('')
  campoSenha.value = senha
  atualizarForca(senha.length * Math.log2(alfabetoCombinado.length))
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

  campoSenha.value = partes.join(separador.value)
  atualizarForca(entropia)
}

function atualizarForca(entropia) {
  let porcentagem, cor, texto
  if (entropia < 40) {
    porcentagem = 25; cor = '#c0392b'; texto = 'fraca'
  } else if (entropia < 60) {
    porcentagem = 50; cor = '#b7791f'; texto = 'razoável'
  } else if (entropia < 90) {
    porcentagem = 75; cor = '#4d7c0f'; texto = 'forte'
  } else {
    porcentagem = 100; cor = '#3f6b4a'; texto = 'muito forte'
  }

  barraForca.style.width = porcentagem + '%'
  barraForca.style.background = cor
  labelForca.textContent = texto
}

function gerar() {
  if (painelFrase.hidden) gerarSenhaAleatoria()
  else gerarFrase()
}

async function copiarSenha() {
  if (!campoSenha.value) return

  await navigator.clipboard.writeText(campoSenha.value)
  avisoCopiado.classList.add('show')
  setTimeout(() => avisoCopiado.classList.remove('show'), 1500)
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

btnGerar.addEventListener('click', gerar)
btnCopiar.addEventListener('click', copiarSenha)

for (const [check, min] of [[checkMaiusculas, minMaiusculas], [checkMinusculas, minMinusculas], [checkNumeros, minNumeros], [checkSimbolos, minSimbolos]]) {
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

gerar()
