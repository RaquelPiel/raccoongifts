/* ============================================================
   Raccoon Gifts — CONTEÚDO EDITÁVEL
   ------------------------------------------------------------
   Tudo que você precisa mudar está neste arquivo:
   - nome da loja, WhatsApp e Instagram
   - categorias e temas
   - lista de produtos
   ============================================================ */

window.STORE = {
  name: 'Raccoon Gifts',

  /* ⚠️ TROQUE AQUI: número do WhatsApp no formato 55 + DDD + número.
     Ex.: 5511987654321 (sem espaços, traços ou parênteses). */
  whatsapp: '5542998358208',
  whatsappDisplay: '(42) 99835-8208',

  /* ⚠️ TROQUE AQUI: usuário do Instagram (sem @). */
  instagram: 'raccoon.gifts',

  categories: [
    { id: 'pulseira', label: 'Pulseiras', emoji: '📿', color: '#7C3AED' },
    { id: 'botton', label: 'Bottons', emoji: '📌', color: '#EC4899' },
    { id: 'chaveiro', label: 'Chaveiros', emoji: '🔑', color: '#0EA5E9' }
  ],

  themes: [
    { id: 'rock', label: 'Rock', emoji: '🎸', color: '#F43F5E' },
    { id: 'kpop', label: 'K-Pop', emoji: '💜', color: '#EC4899' },
    { id: 'games', label: 'Games', emoji: '🎮', color: '#16A34A' },
    { id: 'animes', label: 'Animes', emoji: '✨', color: '#7C3AED' }
  ],

  /* ------------------------------------------------------------
     PRODUTOS
     category: pulseira | botton | chaveiro
     theme:    rock | kpop | games | animes
     price:    número (em reais)
     img:      opcional — caminho de uma foto real.
               Ex.: img: 'img/pulseira-rock.jpg'
               Se não existir, usamos a ilustração cartoon automática.
     badge:    opcional — 'novo', 'mais pedido', etc.
     ------------------------------------------------------------ */
  products: [
    {
      id: 'p1',
      name: 'Pulseira Corda Rock',
      category: 'pulseira',
      theme: 'rock',
      price: 24.9,
      badge: 'novo',
      description: 'Pulseira de corda trançada com pingente de raio. Ajustável no pulso e feita para não sair do estilo.'
    },
    {
      id: 'p2',
      name: 'Pulseira Estrela K-Pop',
      category: 'pulseira',
      theme: 'kpop',
      price: 29.9,
      badge: 'mais pedido',
      art: 'star',
      description: 'Miçangas coloridas com pingente de estrela e letras brilhantes. Brilha junto com o seu fandom.'
    },
    {
      id: 'p3',
      name: 'Pulseira Pixel Games',
      category: 'pulseira',
      theme: 'games',
      price: 27.5,
      description: 'Contas em formato de bloquinhos 8-bit e fecho de coração. Para levar o videogame no pulso.'
    },
    {
      id: 'p4',
      name: 'Pulseira Sakura Anime',
      category: 'pulseira',
      theme: 'animes',
      price: 32,
      description: 'Pulseira delicada com pétalas e pingente de lua. Inspirada nas cenas mais bonitas dos animes.'
    },
    {
      id: 'p5',
      name: 'Botton Caveira Rock',
      category: 'botton',
      theme: 'rock',
      price: 12,
      art: 'skull',
      description: 'Botton redondo de 32 mm com caveira estilosa. Vai bem na jaqueta, na mochila ou na capa do caderno.'
    },
    {
      id: 'p6',
      name: 'Botton Coração K-Pop',
      category: 'botton',
      theme: 'kpop',
      price: 12,
      badge: 'novo',
      description: 'Coração neon com brilho de palco. O toque fofo e vibrante que o seu look precisa.'
    },
    {
      id: 'p7',
      name: 'Botton Controle Games',
      category: 'botton',
      theme: 'games',
      price: 12,
      art: 'gamepad',
      description: 'Botton de 32 mm com controle retrô. Perfeito para quem vive entre um level e outro.'
    },
    {
      id: 'p8',
      name: 'Botton Neko Anime',
      category: 'botton',
      theme: 'animes',
      price: 12,
      art: 'cat',
      description: 'Gatinho kawaii com estrelinha. Fofo na medida certa para o seu moletom.'
    },
    {
      id: 'p9',
      name: 'Chaveiro Guitarra Rock',
      category: 'chaveiro',
      theme: 'rock',
      price: 18.9,
      art: 'guitar',
      description: 'Mini guitarra com cordão reforçado. Aumenta o volume de qualquer chaveiro.'
    },
    {
      id: 'p10',
      name: 'Chaveiro Lightstick K-Pop',
      category: 'chaveiro',
      theme: 'kpop',
      price: 22.9,
      badge: 'mais pedido',
      art: 'lightstick',
      description: 'Luzinha de shows em versão chaveiro, com detalhes brilhantes. Leva o fandom para todo lugar.'
    },
    {
      id: 'p11',
      name: 'Chaveiro Controle Games',
      category: 'chaveiro',
      theme: 'games',
      price: 19.9,
      art: 'gamepad',
      description: 'Controle retrô com acabamento emborrachado. Para nunca perder as chaves (nem o save).'
    },
    {
      id: 'p12',
      name: 'Chaveiro Espada Anime',
      category: 'chaveiro',
      theme: 'animes',
      price: 21.9,
      art: 'sword',
      description: 'Espada lendária em miniatura com detalhes metálicos. O item raro da sua mochila.'
    },
    {
      id: 'p13',
      name: 'Pulseira Fita Rock',
      category: 'pulseira',
      theme: 'rock',
      price: 19.9,
      description: 'Fita de couro sintético com rebites e fecho ajustável. Simples, direta e cheia de atitude.'
    },
    {
      id: 'p14',
      name: 'Botton Coração Neon',
      category: 'botton',
      theme: 'kpop',
      price: 12,
      description: 'Botton de 32 mm com coração em degradê neon. Uma dose extra de energia para o seu dia.'
    },
    {
      id: 'p15',
      name: 'Chaveiro Moeda Games',
      category: 'chaveiro',
      theme: 'games',
      price: 16.5,
      art: 'coin',
      description: 'Moeda de fase dourada com estrela no centro. Aquele item que todo jogador reconhece.'
    },
    {
      id: 'p16',
      name: 'Botton Brilho Anime',
      category: 'botton',
      theme: 'animes',
      price: 12,
      badge: 'novo',
      description: 'Estrela de brilho em estilo anime, com contorno vibrante. Para deixar tudo mais expressivo.'
    }
  ]
};
