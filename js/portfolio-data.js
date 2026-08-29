const portfolioVideos = [
  {
    id: 'vid-1',
    title: 'Aftermovie Corrida',
    category: 'Comercial',
    vimeoId: '1215953227',
    videoUrl: 'https://vimeo.com/1215953227?fl=tl&fe=ec',
    thumbnail: 'assets/images/thumbs/thumb-befit.jpg',
    aspectRatio: '9:16',
    badge: 'Aftermovie',
    span: 'col-span-1'
  },
  {
    id: 'vid-2',
    title: 'Drift Uberlândia',
    category: 'Eventos',
    isLocal: true,
    videoUrl: 'assets/videos/carros-corrida.webm',
    thumbnail: 'assets/images/portfolio/drift-uberlandia.webp',
    aspectRatio: '9:16',
    badge: 'Eventos',
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
    id: 'vid-16',
    title: 'YC Beauty Estética Feminina - Reel',
    category: 'Reel',
    vimeoId: '1216133261',
    videoUrl: 'https://vimeo.com/1216133261?fl=tl&fe=ec',
    aspectRatio: '9:16',
    badge: 'Beleza',
    span: 'col-span-1'
  },
  {
    id: 'vid-22',
    title: 'Pedru Barber',
    category: 'Instituicional',
    vimeoId: '1217146847',
    videoUrl: 'https://vimeo.com/1217146847?share=copy&fl=sv&fe=ci',
    aspectRatio: '9:16',
    badge: 'Institucional',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'vid-12',
    title: 'Aftermovie Películas Brasil',
    category: 'Eventos',
    vimeoId: '1215953186',
    videoUrl: 'https://vimeo.com/1215953186?fl=tl&fe=ec',
    thumbnail: 'assets/images/portfolio/peliculas-brasil-1.webp',
    aspectRatio: '9:16',
    badge: 'Aftermovie',
    span: 'col-span-1'
  },
  {
    id: 'vid-13',
    title: 'Atendimento odontológico',
    category: 'Reels',
    videoId: 'FJ_oY7cchgI',
    aspectRatio: '9:16',
    badge: 'Institucional',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'vid-14',
    title: 'Aftermovie PMMG',
    category: 'Reels',
    videoId: 'GWE79ujogZs',
    aspectRatio: '9:16',
    badge: 'Aftermovie',
    span: 'col-span-1'
  },
  {
    id: 'vid-15',
    title: 'Apresentação Barqueiro',
    category: 'Reels',
    videoId: '-8I79Hh1Wx8',
    aspectRatio: '9:16',
    badge: 'Institucional',
    span: 'col-span-1'
  },
  {
    id: 'vid-16',
    title: 'Homenagem aos comandantes',
    category: 'Eventos',
    vimeoId: '1219067663',
    videoUrl: 'https://vimeo.com/1219067663?share=copy&fl=sv&fe=ci',
    aspectRatio: '9:16',
    badge: 'Eventos',
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
    gallery: ['assets/images/portfolio/casamento-mãos.webp', 'assets/images/portfolio/casamento-braço.webp', 'assets/images/portfolio/casamento-suvinier.webp', 'assets/images/portfolio/mesa-casamento-frente.webp', 'assets/images/portfolio/mesa-casamento-lado.webp']
  },
  {
    id: 'photo-55',
    title: 'Chá Revelação',
    category: 'Eventos',
    isDestaque: true,
    image: 'assets/images/portfolio/cha-revelacao-01.webp',
    aspectRatio: '3/4',
    span: 'col-span-1',
    gallery: [
      'assets/images/portfolio/cha-revelacao-19.webp',
      'assets/images/portfolio/cha-revelacao-01.webp',
      'assets/images/portfolio/cha-revelacao-02.webp',
      'assets/images/portfolio/cha-revelacao-03.webp',
      'assets/images/portfolio/cha-revelacao-04.webp',
      'assets/images/portfolio/cha-revelacao-05.webp',
      'assets/images/portfolio/cha-revelacao-06.webp',
      'assets/images/portfolio/cha-revelacao-07.webp',
      'assets/images/portfolio/cha-revelacao-08.webp',
      'assets/images/portfolio/cha-revelacao-09.webp',
      'assets/images/portfolio/cha-revelacao-10.webp',
      'assets/images/portfolio/cha-revelacao-11.webp',
      'assets/images/portfolio/cha-revelacao-12.webp',
      'assets/images/portfolio/cha-revelacao-13.webp',
      'assets/images/portfolio/cha-revelacao-14.webp',
      'assets/images/portfolio/cha-revelacao-15.webp',
      'assets/images/portfolio/cha-revelacao-16.webp',
      'assets/images/portfolio/cha-revelacao-17.webp',
      'assets/images/portfolio/cha-revelacao-18.webp',
      'assets/images/portfolio/cha-revelacao-20.webp',
      'assets/images/portfolio/cha-revelacao-21.webp',
      'assets/images/portfolio/cha-revelacao-22.webp',
      'assets/images/portfolio/cha-revelacao-23.webp'
    ]
  },
  {
    id: 'photo-54',
    title: 'Artistas & Shows',
    category: 'Eventos',
    isDestaque: true,
    image: 'assets/images/portfolio/foto-artista-01.webp',
    aspectRatio: '3/4',
    span: 'col-span-1 row-span-2',
    gallery: [
      'assets/images/portfolio/foto-artista-01.webp',
      'assets/images/portfolio/foto-artista-02.webp',
      'assets/images/portfolio/foto-artista-03.webp',
      'assets/images/portfolio/foto-artista-04.webp',
      'assets/images/portfolio/foto-artista-05.webp',
      'assets/images/portfolio/foto-artista-06.webp',
      'assets/images/portfolio/foto-artista-07.webp',
      'assets/images/portfolio/foto-artista-08.webp',
      'assets/images/portfolio/foto-artista-09.webp',
      'assets/images/portfolio/foto-artista-10.webp',
      'assets/images/portfolio/foto-artista-11.webp',
      'assets/images/portfolio/foto-artista-12.webp',
      'assets/images/portfolio/foto-artista-13.webp',
      'assets/images/portfolio/foto-artista-14.webp',
      'assets/images/portfolio/foto-artista-15.webp',
      'assets/images/portfolio/foto-artista-16.webp',
      'assets/images/portfolio/foto-artista-17.webp',
      'assets/images/portfolio/foto-artista-18.webp',
      'assets/images/portfolio/foto-artista-19.webp',
      'assets/images/portfolio/foto-artista-20.webp',
      'assets/images/portfolio/foto-artista-21.webp',
      'assets/images/portfolio/foto-artista-22.webp',
      'assets/images/portfolio/foto-artista-23.webp',
      'assets/images/portfolio/foto-artista-24.webp',
      'assets/images/portfolio/foto-artista-25.webp',
      'assets/images/portfolio/foto-artista-26.webp',
      'assets/images/portfolio/foto-artista-27.webp',
      'assets/images/portfolio/foto-artista-28.webp',
      'assets/images/portfolio/foto-artista-29.webp',
      'assets/images/portfolio/foto-artista-30.webp',
      'assets/images/portfolio/foto-artista-31.webp'
    ]
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
    gallery: ['assets/images/portfolio/cavalaria-pmmg-2.webp', 'assets/images/portfolio/cavalaria-pmmg-3.webp', 'assets/images/portfolio/cavalaria-pmmg-4.webp', 'assets/images/portfolio/cavalaria-pmmg-5.webp', 'assets/images/portfolio/cavalaria-pmmg-6.webp', 'assets/images/portfolio/cavalaria-pmmg-7.webp', 'assets/images/portfolio/cavalaria-pmmg-8.webp', 'assets/images/portfolio/cavalaria-pmmg-9.webp', 'assets/images/portfolio/cavalaria-pmmg-10.webp','assets/images/portfolio/cavalaria-pmmg-11.webp', 'assets/images/portfolio/cavalaria-pmmg.webp']
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
    id: 'photo-44',
    title: 'Retrato LuCasa',
    category: 'Retratos',
    isDestaque: false,
    image: 'assets/images/portfolio/lucasa.webp',
    aspectRatio: '1/1',
    span: 'col-span-1 row-span-2'
  ,
    gallery: ['assets/images/portfolio/lucasa.webp',]
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
    gallery: ['assets/images/portfolio/zeus-evolution.webp','assets/images/portfolio/zeus-evolution-2.webp', 'assets/images/portfolio/zeus-evolution-3.webp', 'assets/images/portfolio/zeus-evolution-4.webp', 'assets/images/portfolio/zeus-evolution-5.webp','assets/images/portfolio/zeus-evolution-6.webp', 'assets/images/portfolio/zeus-evolution-7.webp', 'assets/images/portfolio/zeus-evolution-8.webp', 'assets/images/portfolio/zeus-evolution-9.webp', 'assets/images/portfolio/zeus-evolution-10.webp', 'assets/images/portfolio/zeus-evolution-11.webp', 'assets/images/portfolio/zeus-evolution-12.webp']
  }
];
