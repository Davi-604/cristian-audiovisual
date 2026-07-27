const portfolioVideos = [
  {
    id: 'vid-1',
    title: 'Aftermovie Corrida',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'assets/videos/carros-corrida.webm',
    thumbnail: 'assets/images/thumbs/thumb-befit.jpg',
    aspectRatio: '9:16',
    badge: 'Destaque',
    span: 'col-span-1'
  },
  {
    id: 'vid-2',
    title: 'Drift Uberlândia',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'assets/videos/carros-corrida.webm',
    thumbnail: 'assets/images/portfolio/drift-uberlandia.webp',
    aspectRatio: '9:16',
    badge: 'Comercial',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'vid-3',
    title: 'Treino Costas & Bíceps',
    category: 'Esportes',
    isLocal: true,
    videoUrl: 'assets/videos/costas-biceps.webm',
    thumbnail: 'assets/images/thumbs/thumb-treino-costas-biceps.webp',
    aspectRatio: '16:9',
    badge: 'Esportes',
    span: 'col-span-2'
  },
  {
    id: 'vid-4',
    title: 'Videos Imobiliários - Lucasa',
    category: 'Institucional',
    isLocal: true,
    videoUrl: 'assets/videos/lucasa-imobiliaria.webm',
    thumbnail: 'assets/images/thumbs/thumb-lucasa-imobiliaria-1.webp',
    aspectRatio: '9:16',
    badge: 'Imóveis',
    span: 'col-span-1'
  },
  {
    id: 'vid-5',
    title: 'Videos Imobiliários - Lucasa',
    category: 'Institucional',
    isLocal: true,
    videoUrl: 'assets/videos/lucasa-imobiliaria-2.webm',
    thumbnail: 'assets/images/thumbs/thumb-lucasa-imobiliaria-2.webp',
    aspectRatio: '9:16',
    badge: 'Imóveis',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'vid-6',
    title: 'Inauguração Películas Brasil',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'assets/videos/peliculas-brasil.webm',
    thumbnail: 'assets/images/portfolio/peliculas-brasil-2.webp',
    aspectRatio: '9:16',
    badge: 'Automotivo',
    span: 'col-span-1'
  },
  {
    id: 'vid-7',
    title: 'Películas Brasil RAM',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'assets/videos/peliculas-brasil-ram.webm',
    thumbnail: 'assets/images/thumbs/thumb-peliculas-brasil-ram.webp',
    aspectRatio: '9:16',
    badge: 'Automotivo',
    span: 'col-span-1'
  },
  {
    id: 'vid-8',
    title: 'Sojeff Hamburgueria',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'assets/videos/sojeff-hamburgueria.webm',
    thumbnail: 'assets/images/portfolio/torre-hamburguer.webp',
    aspectRatio: '9:16',
    badge: 'Gastronomia',
    span: 'col-span-1'
  },
  {
    id: 'vid-9',
    title: 'Solos Agroambiental',
    category: 'Institucional',
    isLocal: true,
    videoUrl: 'assets/videos/solos-agroambiental.webm',
    thumbnail: 'assets/images/thumbs/thumb-solos-agroambiental.webp',
    aspectRatio: '9:16',
    badge: 'Agro',
    span: 'col-span-1'
  },
  {
    id: 'vid-10',
    title: 'YC Beauty Estética Feminina',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'assets/videos/yascardoso-cilios.webm',
    thumbnail: 'assets/images/thumbs/thumb-yc-cardoso.webp',
    aspectRatio: '9:16',
    badge: 'Beleza',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'vid-11',
    title: 'YC Beauty Estética Feminina - Resultados',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'assets/videos/yascardoso-cilios-2.webm',
    thumbnail: 'assets/images/portfolio/yc-cardoso-resultados.webp',
    aspectRatio: '9:16',
    badge: 'Beleza',
    span: 'col-span-1'
  },
  {
    id: 'vid-12',
    title: 'Aftermovie Películas Brasil',
    category: 'Eventos',
    isLocal: true,
    videoUrl: 'assets/videos/EXPORT-2.webm',
    thumbnail: 'assets/images/portfolio/peliculas-brasil-1.webp',
    aspectRatio: '9:16',
    badge: 'Eventos',
    span: 'col-span-1'
  },
  {
    id: 'vid-13',
    title: 'Atendimento odontológico',
    category: 'Reels',
    videoId: 'FJ_oY7cchgI',
    aspectRatio: '9:16',
    badge: 'Shorts',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'vid-14',
    title: 'Aftermovie PMMG',
    category: 'Reels',
    videoId: 'GWE79ujogZs',
    aspectRatio: '9:16',
    badge: 'Shorts',
    span: 'col-span-1'
  },
  {
    id: 'vid-15',
    title: 'Apresentação Barqueiro',
    category: 'Reels',
    videoId: '-8I79Hh1Wx8',
    aspectRatio: '9:16',
    badge: 'Shorts',
    span: 'col-span-1'
  }
];

const portfolioPhotos = [
  
  {
    id: 'photo-1',
    title: 'Corpo de Bombeiros - Retratos',
    category: 'Retratos',
    isDestaque: true,
    image: 'assets/images/portfolio/bombeiro-bigode.webp',
    aspectRatio: '3/4',
    span: 'col-span-1 row-span-2'
  ,
    gallery: ['assets/images/portfolio/bombeiro-bigode.webp', 'assets/images/portfolio/bombeiro-cachorro.webp', 'assets/images/portfolio/bombeiro-costas.webp', 'assets/images/portfolio/bombeiro-equipamento.webp', 'assets/images/portfolio/equipe-reconhecimento-pmmg.webp']
  },
  {
    id: 'photo-5',
    title: 'Viatura Oficial',
    category: 'Institucional',
    isDestaque: true,
    image: 'assets/images/portfolio/caminhao-bombeiro.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  },
  {
    id: 'photo-6',
    title: 'Retrato Artista',
    category: 'Retratos',
    isDestaque: true,
    image: 'assets/images/portfolio/cantor-cabeludo.webp',
    aspectRatio: '9/16',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'photo-13',
    title: 'PMMG',
    category: 'Eventos',
    isDestaque: true,
    image: 'assets/images/portfolio/turma-militar.webp',
    aspectRatio: '16/9',
    span: 'col-span-2'
  ,
    gallery: ['assets/images/portfolio/turma-militar.webp', 'assets/images/portfolio/policial-trompete.webp']
  },
  {
    id: 'photo-14',
    title: 'Películas Brasil',
    category: 'Institucional',
    isDestaque: true,
    image: 'assets/images/portfolio/carro-branco-faixada-peliculas-brasil-lado.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['assets/images/portfolio/carro-branco-faixada-peliculas-brasil-lado.webp', 'assets/images/portfolio/carro-branco-faixada-peliculas-brasil.webp', 'assets/images/portfolio/carro-branco.webp', 'assets/images/portfolio/peliculas-brasil-1.webp', 'assets/images/portfolio/peliculas-brasil-2.webp', 'assets/images/portfolio/fusca-peliculas-brasil.webp', 'assets/images/portfolio/motos-peliculas-brasil.webp']
  },
  {
    id: 'photo-17',
    title: 'Carros Antigos',
    category: 'Outros',
    isDestaque: true,
    image: 'assets/images/portfolio/carros-antigos.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  },
  {
    id: 'photo-18',
    title: 'Casamento',
    category: 'Eventos',
    isDestaque: true,
    image: 'assets/images/portfolio/casamento-mãos.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['assets/images/portfolio/casamento-mãos.webp', 'assets/images/portfolio/casamento-suvinier.webp', 'assets/images/portfolio/mesa-casamento-frente.webp', 'assets/images/portfolio/mesa-casamento-lado.webp']
  },
  {
    id: 'photo-20',
    title: 'Cavalaria PMMG',
    category: 'Institucional',
    isDestaque: true,
    image: 'assets/images/portfolio/cavalaria-pmmg-2.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['assets/images/portfolio/cavalaria-pmmg-2.webp', 'assets/images/portfolio/cavalaria-pmmg-3.webp', 'assets/images/portfolio/cavalaria-pmmg-4.webp', 'assets/images/portfolio/cavalaria-pmmg-5.webp', 'assets/images/portfolio/cavalaria-pmmg-6.webp', 'assets/images/portfolio/cavalaria-pmmg-7.webp', 'assets/images/portfolio/cavalaria-pmmg-8.webp', 'assets/images/portfolio/cavalaria-pmmg-9.webp', 'assets/images/portfolio/cavalaria-pmmg-10.webp', 'assets/images/portfolio/cavalaria-pmmg.webp']
  },
  {
    id: 'photo-29',
    title: 'Corrida',
    category: 'Esportes',
    isDestaque: false,
    image: 'assets/images/portfolio/corrida-1.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['assets/images/portfolio/corrida-1.webp', 'assets/images/portfolio/corrida-2.webp', 'assets/images/portfolio/corrida-3.webp', 'assets/images/portfolio/corrida-4.webp', 'assets/images/portfolio/corrida-5.webp', 'assets/images/portfolio/corrida-6.webp', 'assets/images/portfolio/corrida-7.webp', 'assets/images/portfolio/corrida-8.webp', 'assets/images/portfolio/corrida-9.webp']
  },
  {
    id: 'photo-41',
    title: 'Girassol',
    category: 'Natureza',
    isDestaque: false,
    image: 'assets/images/portfolio/girassol.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  },
  {
    id: 'photo-43',
    title: 'Mãe e Filho',
    category: 'Retratos',
    isDestaque: false,
    image: 'assets/images/portfolio/mae-filho.webp',
    aspectRatio: '1/1',
    span: 'col-span-1 row-span-2'
  ,
    gallery: ['assets/images/portfolio/mae-filho.webp', 'assets/images/portfolio/mae-filho-2.webp']
  },
  {
    id: 'photo-45',
    title: 'Mico',
    category: 'Natureza',
    isDestaque: false,
    image: 'assets/images/portfolio/natureza.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  },
  {
    id: 'photo-46',
    title: 'Retrato Maquiadora',
    category: 'Retratos',
    isDestaque: false,
    image: 'assets/images/portfolio/retrato-mulher-maquiadora-1.webp',
    aspectRatio: '1/1',
    span: 'col-span-1 row-span-2'
  ,
    gallery: ['assets/images/portfolio/retrato-mulher-maquiadora-1.webp', 'assets/images/portfolio/retrato-mulher-maquiadora-2.webp', 'assets/images/portfolio/retrato-mulher-maquiadora-3.webp', 'assets/images/portfolio/retrato-mulher-maquiadora.webp']
  },
  {
    id: 'photo-51',
    title: 'Soujeff Hamburgueria',
    category: 'Gastronomia',
    isDestaque: false,
    image: 'assets/images/portfolio/soujeff-lanche.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['assets/images/portfolio/soujeff-lanche.webp', 'assets/images/portfolio/torre-hamburguer.webp']
  },
  {
    id: 'photo-52',
    title: 'Templo na Natureza',
    category: 'Natureza',
    isDestaque: false,
    image: 'assets/images/portfolio/templo-natureza.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  },
  {
    id: 'photo-53',
    title: 'Zeus Evolution',
    category: 'Esportes',
    isDestaque: false,
    image: 'assets/images/portfolio/zeus-evolution.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['assets/images/portfolio/zeus-evolution.webp']
  }
];
