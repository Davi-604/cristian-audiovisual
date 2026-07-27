const portfolioVideos = [
  {
    id: 'vid-1',
    title: 'Aftermovie Corrida',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'public/assets/videos/BE-FIT-RUN-2026.webm',
    thumbnail: 'public/assets/images/thumbs/thumb-befit.jpg',
    aspectRatio: '9:16',
    badge: 'Destaque',
    span: 'col-span-1'
  },
  {
    id: 'vid-2',
    title: 'Drift Uberlândia',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'public/assets/videos/carros-corrida.webm',
    thumbnail: 'public/assets/images/portfolio/drift-uberlandia.webp',
    aspectRatio: '9:16',
    badge: 'Comercial',
    span: 'col-span-1 md:row-span-2'
  },
  {
    id: 'vid-3',
    title: 'Treino Costas & Bíceps',
    category: 'Esportes',
    isLocal: true,
    videoUrl: 'public/assets/videos/costas-biceps.webm',
    thumbnail: 'public/assets/images/thumbs/thumb-treino-costas-biceps.webp',
    aspectRatio: '16:9',
    badge: 'Esportes',
    span: 'col-span-1 md:col-span-2'
  },
  {
    id: 'vid-4',
    title: 'Videos Imobiliários - Lucasa',
    category: 'Institucional',
    isLocal: true,
    videoUrl: 'public/assets/videos/lucasa-imobiliaria.webm',
    thumbnail: 'public/assets/images/thumbs/thumb-lucasa-imobiliaria-1.webp',
    aspectRatio: '9:16',
    badge: 'Imóveis',
    span: 'col-span-1'
  },
  {
    id: 'vid-5',
    title: 'Videos Imobiliários - Lucasa',
    category: 'Institucional',
    isLocal: true,
    videoUrl: 'public/assets/videos/lucasa-imobiliaria-2.webm',
    thumbnail: 'public/assets/images/thumbs/thumb-lucasa-imobiliaria-2.webp',
    aspectRatio: '9:16',
    badge: 'Imóveis',
    span: 'col-span-1 md:row-span-2'
  },
  {
    id: 'vid-6',
    title: 'Inauguração Películas Brasil',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'public/assets/videos/peliculas-brasil.webm',
    thumbnail: 'public/assets/images/portfolio/peliculas-brasil-2.webp',
    aspectRatio: '9:16',
    badge: 'Automotivo',
    span: 'col-span-1'
  },
  {
    id: 'vid-7',
    title: 'Películas Brasil RAM',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'public/assets/videos/peliculas-brasil-ram.webm',
    thumbnail: 'public/assets/images/thumbs/thumb-peliculas-brasil-ram.webp',
    aspectRatio: '9:16',
    badge: 'Automotivo',
    span: 'col-span-1'
  },
  {
    id: 'vid-8',
    title: 'Sojeff Hamburgueria',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'public/assets/videos/sojeff-hamburgueria.webm',
    thumbnail: 'public/assets/images/portfolio/torre-hamburguer.webp',
    aspectRatio: '9:16',
    badge: 'Gastronomia',
    span: 'col-span-1'
  },
  {
    id: 'vid-9',
    title: 'Solos Agroambiental',
    category: 'Institucional',
    isLocal: true,
    videoUrl: 'public/assets/videos/solos-agroambiental.webm',
    thumbnail: 'public/assets/images/thumbs/thumb-solos-agroambiental.webp',
    aspectRatio: '9:16',
    badge: 'Agro',
    span: 'col-span-1'
  },
  {
    id: 'vid-10',
    title: 'YC Beauty Estética Feminina',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'public/assets/videos/yascardoso-cilios.webm',
    thumbnail: 'public/assets/images/thumbs/thumb-yc-cardoso.webp',
    aspectRatio: '9:16',
    badge: 'Beleza',
    span: 'col-span-1 md:row-span-2'
  },
  {
    id: 'vid-11',
    title: 'YC Beauty Estética Feminina - Resultados',
    category: 'Comercial',
    isLocal: true,
    videoUrl: 'public/assets/videos/yascardoso-cilios-2.webm',
    thumbnail: 'public/assets/images/portfolio/yc-cardoso-resultados.webp',
    aspectRatio: '9:16',
    badge: 'Beleza',
    span: 'col-span-1'
  },
  {
    id: 'vid-12',
    title: 'Aftermovie Películas Brasil',
    category: 'Eventos',
    isLocal: true,
    videoUrl: 'public/assets/videos/EXPORT-2.webm',
    thumbnail: 'public/assets/images/portfolio/peliculas-brasil-1.webp',
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
    span: 'col-span-1 md:row-span-2'
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
    image: 'public/assets/images/portfolio/bombeiro-bigode.webp',
    aspectRatio: '3/4',
    span: 'col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2'
  ,
    gallery: ['public/assets/images/portfolio/bombeiro-bigode.webp', 'public/assets/images/portfolio/bombeiro-cachorro.webp', 'public/assets/images/portfolio/bombeiro-costas.webp', 'public/assets/images/portfolio/bombeiro-equipamento.webp', 'public/assets/images/portfolio/equipe-reconhecimento-pmmg.webp']
  },
  {
    id: 'photo-5',
    title: 'Viatura Oficial',
    category: 'Institucional',
    isDestaque: true,
    image: 'public/assets/images/portfolio/caminhao-bombeiro.webp',
    aspectRatio: '1/1',
    span: 'col-span-1 md:col-span-2 lg:col-span-1'
  },
  {
    id: 'photo-6',
    title: 'Retrato Artista',
    category: 'Retratos',
    isDestaque: true,
    image: 'public/assets/images/portfolio/cantor-cabeludo.webp',
    aspectRatio: '9/16',
    span: 'col-span-1 md:row-span-2'
  },
  {
    id: 'photo-13',
    title: 'PMMG',
    category: 'Eventos',
    isDestaque: true,
    image: 'public/assets/images/portfolio/turma-militar.webp',
    aspectRatio: '16/9',
    span: 'col-span-1 md:col-span-2'
  ,
    gallery: ['public/assets/images/portfolio/turma-militar.webp', 'public/assets/images/portfolio/policial-trompete.webp']
  },
  {
    id: 'photo-14',
    title: 'Películas Brasil',
    category: 'Institucional',
    isDestaque: true,
    image: 'public/assets/images/portfolio/carro-branco-faixada-peliculas-brasil-lado.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['public/assets/images/portfolio/carro-branco-faixada-peliculas-brasil-lado.webp', 'public/assets/images/portfolio/carro-branco-faixada-peliculas-brasil.webp', 'public/assets/images/portfolio/carro-branco.webp', 'public/assets/images/portfolio/peliculas-brasil-1.webp', 'public/assets/images/portfolio/peliculas-brasil-2.webp', 'public/assets/images/portfolio/fusca-peliculas-brasil.webp', 'public/assets/images/portfolio/motos-peliculas-brasil.webp']
  },
  {
    id: 'photo-17',
    title: 'Carros Antigos',
    category: 'Outros',
    isDestaque: true,
    image: 'public/assets/images/portfolio/carros-antigos.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  },
  {
    id: 'photo-18',
    title: 'Casamento',
    category: 'Eventos',
    isDestaque: true,
    image: 'public/assets/images/portfolio/casamento-mãos.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['public/assets/images/portfolio/casamento-mãos.webp', 'public/assets/images/portfolio/casamento-suvinier.webp', 'public/assets/images/portfolio/mesa-casamento-frente.webp', 'public/assets/images/portfolio/mesa-casamento-lado.webp']
  },
  {
    id: 'photo-20',
    title: 'Cavalaria PMMG',
    category: 'Institucional',
    isDestaque: true,
    image: 'public/assets/images/portfolio/cavalaria-pmmg-2.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['public/assets/images/portfolio/cavalaria-pmmg-2.webp', 'public/assets/images/portfolio/cavalaria-pmmg-3.webp', 'public/assets/images/portfolio/cavalaria-pmmg-4.webp', 'public/assets/images/portfolio/cavalaria-pmmg-5.webp', 'public/assets/images/portfolio/cavalaria-pmmg-6.webp', 'public/assets/images/portfolio/cavalaria-pmmg-7.webp', 'public/assets/images/portfolio/cavalaria-pmmg-8.webp', 'public/assets/images/portfolio/cavalaria-pmmg-9.webp', 'public/assets/images/portfolio/cavalaria-pmmg-10.webp', 'public/assets/images/portfolio/cavalaria-pmmg.webp']
  },
  {
    id: 'photo-29',
    title: 'Corrida',
    category: 'Esportes',
    isDestaque: false,
    image: 'public/assets/images/portfolio/corrida-1.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['public/assets/images/portfolio/corrida-1.webp', 'public/assets/images/portfolio/corrida-2.webp', 'public/assets/images/portfolio/corrida-3.webp', 'public/assets/images/portfolio/corrida-4.webp', 'public/assets/images/portfolio/corrida-5.webp', 'public/assets/images/portfolio/corrida-6.webp', 'public/assets/images/portfolio/corrida-7.webp', 'public/assets/images/portfolio/corrida-8.webp', 'public/assets/images/portfolio/corrida-9.webp']
  },
  {
    id: 'photo-41',
    title: 'Girassol',
    category: 'Natureza',
    isDestaque: false,
    image: 'public/assets/images/portfolio/girassol.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  },
  {
    id: 'photo-43',
    title: 'Mãe e Filho',
    category: 'Retratos',
    isDestaque: false,
    image: 'public/assets/images/portfolio/mae-filho.webp',
    aspectRatio: '1/1',
    span: 'col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2'
  ,
    gallery: ['public/assets/images/portfolio/mae-filho.webp', 'public/assets/images/portfolio/mae-filho-2.webp']
  },
  {
    id: 'photo-45',
    title: 'Mico',
    category: 'Natureza',
    isDestaque: false,
    image: 'public/assets/images/portfolio/natureza.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  },
  {
    id: 'photo-46',
    title: 'Retrato Maquiadora',
    category: 'Retratos',
    isDestaque: false,
    image: 'public/assets/images/portfolio/retrato-mulher-maquiadora-1.webp',
    aspectRatio: '1/1',
    span: 'col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2'
  ,
    gallery: ['public/assets/images/portfolio/retrato-mulher-maquiadora-1.webp', 'public/assets/images/portfolio/retrato-mulher-maquiadora-2.webp', 'public/assets/images/portfolio/retrato-mulher-maquiadora-3.webp', 'public/assets/images/portfolio/retrato-mulher-maquiadora.webp']
  },
  {
    id: 'photo-51',
    title: 'Soujeff Hamburgueria',
    category: 'Gastronomia',
    isDestaque: false,
    image: 'public/assets/images/portfolio/soujeff-lanche.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['public/assets/images/portfolio/soujeff-lanche.webp', 'public/assets/images/portfolio/torre-hamburguer.webp']
  },
  {
    id: 'photo-52',
    title: 'Templo na Natureza',
    category: 'Natureza',
    isDestaque: false,
    image: 'public/assets/images/portfolio/templo-natureza.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  },
  {
    id: 'photo-53',
    title: 'Zeus Evolution',
    category: 'Esportes',
    isDestaque: false,
    image: 'public/assets/images/portfolio/zeus-evolution.webp',
    aspectRatio: '1/1',
    span: 'col-span-1'
  ,
    gallery: ['public/assets/images/portfolio/zeus-evolution.webp']
  }
];
