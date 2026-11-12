# 🦝 Raccoon Gifts

Loja vitrine **PWA mobile first** para anunciar pulseiras, bottons e chaveiros de **rock, k-pop, games e animes**.
Feita com **HTML + CSS + JavaScript puros** (sem frameworks, sem build) e estética **cartoon moderna**.

![PWA](https://img.shields.io/badge/PWA-instalável-7C3AED)
![Sem dependências](https://img.shields.io/badge/dependências-0-22C55E)

---

## ✨ Funcionalidades

- Catálogo com **filtros por categoria** (pulseiras, bottons, chaveiros) e **tema** (rock, k-pop, games, animes), combináveis entre si
- Busca por nome, descrição, tema ou categoria
- Modal de detalhes do produto
- Pedido via **WhatsApp com mensagem pré-preenchida** (produto, tema, preço)
- Ilustrações cartoon geradas em SVG automaticamente por categoria + tema
- Layout mobile first com navegação inferior, responsivo até desktop
- **PWA**: instalável no celular, ícone próprio e funcionamento **offline**
- Acessibilidade: foco visível, `aria-*`, fechamento do modal com `Esc`, respeito a `prefers-reduced-motion`

---

## 📁 Estrutura

```
├── index.html                # Página única (início + sobre + modal)
├── css/style.css             # Todo o visual cartoon
├── js/
│   ├── data.js               # ⭐ CONTEÚDO: WhatsApp, Instagram, produtos
│   ├── app.js                # Filtros, busca, modal, WhatsApp, instalação
│   └── sw-register.js        # Registro do Service Worker
├── sw.js                     # Cache offline
├── manifest.webmanifest      # Configuração do PWA
└── icons/                    # Ícones do mascote guaxinim
```

---

## ▶️ Rodar localmente

Na pasta do projeto:

```bash
python3 -m http.server 8000
```

Abra <http://localhost:8000> no navegador (ou no celular, usando o IP da máquina na rede).

> O Service Worker só funciona em `localhost` ou HTTPS. Abrir o `index.html` direto (`file://`) mostra o site, mas sem offline/instalação.

---

## ✏️ Personalizar

### 1. Contato

Em `js/data.js`, no topo:

```js
whatsapp: '5511999999999',   // 55 + DDD + número, sem espaços
instagram: 'raccoongifts',   // sem @
```

> ⚠️ O número atual é um **placeholder**. Troque pelo seu antes de publicar.

### 2. Produtos

Ainda em `js/data.js`, edite o array `products`:

```js
{
  id: 'p1',
  name: 'Pulseira Corda Rock',
  category: 'pulseira',      // pulseira | botton | chaveiro
  theme: 'rock',             // rock | kpop | games | animes
  price: 24.9,
  badge: 'novo',             // opcional
  art: 'bolt',               // ilustração automática (opcional)
  description: '...'
}
```

**Símbolos de ilustração disponíveis:** `bolt`, `heart`, `plus`, `star`, `skull`, `cat`, `gamepad`, `guitar`, `lightstick`, `sword`, `coin`.
Sem `art`, usa o símbolo padrão do tema.

### 3. Fotos reais

Para usar uma foto em vez da ilustração, adicione `img` ao produto:

```js
img: 'img/pulseira-rock.jpg'
```

Crie a pasta `img/` e coloque as fotos nela (de preferência quadradas, ~800×800 px).

### 4. Cores

No topo de `css/style.css`, no bloco `:root`, ajuste `--purple`, `--pink`, `--green`, `--yellow` etc.

---

## 🚀 Publicar

Qualquer hospedagem estática funciona:

- **Netlify Drop**: arraste a pasta em <https://app.netlify.com/drop>
- **Vercel**: importe o repositório (sem build)
- **GitHub Pages**: ative Pages na branch principal

Depois de publicar, abra no celular e use **“Adicionar à Tela de Início”** para instalar como app.

---

## 🦝 Créditos

Feito com carinho para a Raccoon Gifts.
