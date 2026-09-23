# Gerador de Senha

![license](https://img.shields.io/github/license/plmv-luks/Gerador-de-senha)
![html](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

gerador de senha que roda direto no navegador, sem servidor. nada sai do seu computador.

tem dois modos: senha aleatória ou frase com palavras (tipo `sol-praia-lua-42`). dá pra ajustar o tamanho (4 a 64 caracteres, ou 2 a 8 palavras no modo frase), escolher quais tipos de caractere entram (maiúscula, minúscula, número, símbolo) e até definir um mínimo de cada um. também dá pra evitar caracteres parecidos (l, 1, O, 0) e incluir ou excluir caracteres específicos.

mostra a força da senha com base na entropia, e dá pra gerar várias de uma vez, ficando um histórico das últimas. copia com um clique. tema claro/escuro fica salvo no navegador, as senhas geradas não ficam salvas em lugar nenhum.

## usar

acessa direto pelo navegador: https://plmv-luks.github.io/Gerador-de-senha/

ou, se preferir rodar local, só clonar e abrir o `index.html`:

```
git clone https://github.com/plmv-luks/Gerador-de-senha.git
```

## feito com

html, css e js puro, sem framework. usa `crypto.getRandomValues` pra gerar os caracteres de forma segura.

## contribuindo

achou bug ou tem ideia de melhoria? abre uma issue. quer resolver algo você mesmo? dá fork e manda o PR direto.
