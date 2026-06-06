'use client'

import { useApp } from '@/lib/store'

export type Lang = 'pt' | 'en'

export const T = {
  pt: {
    // Nav
    nav_destinations:     'Destinos',
    nav_about:            'Sobre Angola',
    nav_partners:         'Parceiros',
    nav_contact:          'Contacto',
    nav_explore_map:      'Explorar Mapa',
    nav_explore_map_full: 'Explorar Mapa Interactivo',
    nav_open_menu:        'Abrir menu',
    nav_close_menu:       'Fechar menu',
    nav_lang_switch:      'EN',

    // Hero
    hero_badge:       'Portal para os Turistas',
    hero_title:       'Descubra Angola',
    hero_subtitle:    '18 províncias. Milhares de histórias.\nUm país que ainda está por descobrir.',
    hero_cta_map:     'Explorar o Mapa Interactivo',
    hero_cta_dest:    'Ver Destinos',
    hero_stat_prov:   'Províncias',
    hero_stat_coast:  'Costa Atlântica',
    hero_stat_pop:    'Habitantes',
    hero_stat_parks:  'Parques Nacionais',

    // Destinations
    dest_badge:       'Destinos em Destaque',
    dest_title:       'Maravilhas que Esperam por Si',
    dest_subtitle:    'Angola tem muito para oferecer — explore os destinos mais fascinantes do país.',
    dest_cta:         'Ver todos os 38 destinos no mapa interactivo →',
    dest_best_season: 'Melhor época:',
    dest_view_map:    'Ver no mapa interactivo →',
    dest_view_map_s:  'Ver no mapa →',
    dest_close:       'Fechar',

    // Stats section
    stats_badge:   'Angola em Números',
    stats_title:   'Um País de Dimensão Extraordinária',
    s1_label: 'Área Total',          s1_sub: 'Sétimo maior de África',
    s2_label: 'Habitantes',          s2_sub: 'E a crescer',
    s3_label: 'Províncias',          s3_sub: 'Cada uma, um mundo',
    s4_label: 'Costa Atlântica',     s4_sub: 'De praias e biodiversidade',
    s5_label: 'Parques Nacionais',   s5_sub: 'Fauna e flora endémicas',
    s6_label: 'Património UNESCO',   s6_sub: 'Mbanza Kongo',
    s7_label: 'Destinos Mapeados',   s7_sub: 'Neste portal',
    s8_label: 'Grandes Etnias',      s8_sub: 'Diversidade cultural única',
    about_title: 'Sobre Angola',
    about_p1:    'Angola é o sétimo maior país de África, com uma diversidade geográfica e cultural incomparável. Das cataratas de Kalandula ao deserto do Namibe, das praias do Lobito às florestas da Cabinda, cada província é um mundo diferente.',
    about_p2:    'O país emerge como um destino turístico de classe mundial, com infraestruturas em rápido desenvolvimento e uma hospitalidade que define a cultura angolana. A Palanca Negra Gigante, símbolo nacional, representa a singularidade e a força de uma nação que se descobre ao mundo.',
    timeline_1:  'Fundação de Luanda',
    timeline_2:  'Independência',
    timeline_3:  'Paz duradoura',
    img_caption: 'Palanca Negra Gigante · Símbolo Nacional',

    // Partners
    partners_badge:      'Ecossistema Turístico',
    partners_title:      'Parceiros e Operadores',
    partners_subtitle:   'Trabalhamos com os melhores operadores turísticos de Angola e da região.',
    partners_strategic:  'Parceiro Estratégico',
    partners_cta_title:  'É um operador turístico ou entidade de Angola?',
    partners_cta_sub:    'Junte-se ao portal de turismo mais completo de Angola e chegue a milhares de viajantes.',
    partners_cta_btn:    'Tornar-se Parceiro',
    tipo_air:     'Transportes Aéreos',
    tipo_gov:     'Entidade Governamental',
    tipo_tour:    'Operador Turístico',
    tipo_hotel:   'Hotelaria',
    tipo_eco:     'Ecoturismo',
    tipo_coast:   'Turismo Costeiro',
    tipo_agency:  'Agência de Viagens',

    // CTA section
    cta_badge:     'Angola360',
    cta_title_1:   'Pronto para',
    cta_title_2:   'Descobrir Angola?',
    cta_subtitle:  'O mapa interactivo mais completo de Angola está à sua espera. Explore destinos, vistas 360° e deixe-se guiar pela nossa IA turística.',
    cta_map:       'Abrir Mapa Interactivo',
    cta_ai:        'Falar com Njila, seu Guia IA',

    // Footer
    footer_tagline:   'Portal Turístico Interactivo de Angola.\nExplore, descubra, inspire-se.',
    footer_dest:      'Destinos',
    footer_portal:    'Portal',
    footer_contact:   'Contacto',
    footer_view_all:  'Ver todos →',
    footer_map:       'Mapa Interactivo',
    footer_about:     'Sobre Angola',
    footer_partners:  'Parceiros',
    footer_ai:        'Guia IA',
    footer_api:       'API para Operadores',
    footer_ministry:  'Ministério do Turismo de Angola',
    footer_partner_btn: 'Tornar-se Parceiro',
    footer_rights:    '© 2025 Angola360 · Todos os direitos reservados ·',
    footer_privacy:   'Política de Privacidade',
    footer_powered:   'Powered by Claude · Made in Angola 🇦🇴',

    // Map header
    map_style_light:  'Claro',
    map_style_dark:   'Dark',
    map_style_sat:    'Satélite',
    map_search:       'Pesquisar destino...',
    map_ai_btn:       'Guia IA',

    // Sidebar
    sidebar_cats:     'Categorias',
    sidebar_dests:    'Destinos',
    sidebar_empty:    'Nenhum destino encontrado',
    cat_all:          'Todos',
    cat_natureza:     'Natureza',
    cat_praia:        'Praias',
    cat_cidade:       'Cidades',
    cat_historia:     'História',
    cat_cultura:      'Cultura',
    cat_surf:         'Surf',
    cat_aventura:     'Aventura',

    // StatsBar
    bar_dests:        'Destinos',
    bar_provinces:    'Províncias',
    bar_mode:         'Modo',
    bar_style:        'Estilo',
    bar_ai_active:    'Guia IA activo',

    // POI popup
    poi_best_season:  'Melhor época',
    poi_coords:       'Coordenadas',
    poi_highlights:   'Destaques',
    poi_ai_guide:     'Guia IA',
    poi_view_360:     'Vista 360°',
    poi_maps:         'Maps',

    // AI chat
    ai_title:         'Guia IA Angola360',
    ai_greeting:      'Olá! Sou Njila, teu guia IA.',
    ai_subtext:       'Pergunta-me sobre destinos, cultura, ou planeia a tua viagem a Angola.',
    ai_placeholder:   'Pergunta sobre Angola…',
    ai_clear:         'Limpar conversa',
    ai_s1:            'Qual é o melhor destino para surf em Angola?',
    ai_s2:            'Planeia 5 dias no Sul de Angola',
    ai_s3:            'Onde ver animais selvagens perto de Luanda?',
    ai_s4:            'Melhores praias do país?',
    ai_system:        'És o Guia IA do Angola360 — o portal turístico mais completo de Angola.\nAjudas viajantes a descobrir Angola: destinos, cultura, natureza, gastronomia, logística e segurança.\nResponde em português europeu. Sê útil, entusiástico mas conciso. Máximo 3 parágrafos.',
    ai_system_poi:    'Dá-me 2 frases curtas e evocativas sobre {name} em {province}, Angola. Menciona algo único e especial. Responde só em português, sem emojis.',
    ai_insight_sys:   'És o Guia IA de Angola360. Dás insights curtos, poéticos e informativos sobre destinos turísticos angolanos. Máximo 2 frases. Português europeu.',
  },
  en: {
    // Nav
    nav_destinations:     'Destinations',
    nav_about:            'About Angola',
    nav_partners:         'Partners',
    nav_contact:          'Contact',
    nav_explore_map:      'Explore Map',
    nav_explore_map_full: 'Explore Interactive Map',
    nav_open_menu:        'Open menu',
    nav_close_menu:       'Close menu',
    nav_lang_switch:      'PT',

    // Hero
    hero_badge:       'Tourist Portal',
    hero_title:       'Discover Angola',
    hero_subtitle:    '18 provinces. Thousands of stories.\nA country still waiting to be discovered.',
    hero_cta_map:     'Explore the Interactive Map',
    hero_cta_dest:    'See Destinations',
    hero_stat_prov:   'Provinces',
    hero_stat_coast:  'Atlantic Coast',
    hero_stat_pop:    'Inhabitants',
    hero_stat_parks:  'National Parks',

    // Destinations
    dest_badge:       'Featured Destinations',
    dest_title:       'Wonders Waiting for You',
    dest_subtitle:    'Angola has so much to offer — explore the most fascinating destinations in the country.',
    dest_cta:         'See all 38 destinations on the interactive map →',
    dest_best_season: 'Best season:',
    dest_view_map:    'View on interactive map →',
    dest_view_map_s:  'View on map →',
    dest_close:       'Close',

    // Stats section
    stats_badge:   'Angola in Numbers',
    stats_title:   'A Country of Extraordinary Scale',
    s1_label: 'Total Area',          s1_sub: 'Seventh largest in Africa',
    s2_label: 'Inhabitants',         s2_sub: 'And growing',
    s3_label: 'Provinces',           s3_sub: 'Each one, a world apart',
    s4_label: 'Atlantic Coast',      s4_sub: 'Beaches and biodiversity',
    s5_label: 'National Parks',      s5_sub: 'Endemic fauna and flora',
    s6_label: 'UNESCO Heritage',     s6_sub: 'Mbanza Kongo',
    s7_label: 'Mapped Destinations', s7_sub: 'On this portal',
    s8_label: 'Major Ethnic Groups', s8_sub: 'Unique cultural diversity',
    about_title: 'About Angola',
    about_p1:    'Angola is the seventh largest country in Africa, with unparalleled geographical and cultural diversity. From the Kalandula waterfalls to the Namibe desert, from the beaches of Lobito to the forests of Cabinda, each province is a different world.',
    about_p2:    'The country is emerging as a world-class tourist destination, with rapidly developing infrastructure and a hospitality that defines Angolan culture. The Giant Sable Antelope, the national symbol, represents the uniqueness and strength of a nation discovering itself to the world.',
    timeline_1:  'Founding of Luanda',
    timeline_2:  'Independence',
    timeline_3:  'Lasting peace',
    img_caption: 'Giant Sable Antelope · National Symbol',

    // Partners
    partners_badge:      'Tourism Ecosystem',
    partners_title:      'Partners & Operators',
    partners_subtitle:   'We work with the best tourism operators in Angola and the region.',
    partners_strategic:  'Strategic Partner',
    partners_cta_title:  'Are you a tourism operator or Angolan entity?',
    partners_cta_sub:    "Join Angola's most complete tourism portal and reach thousands of travellers.",
    partners_cta_btn:    'Become a Partner',
    tipo_air:     'Air Transport',
    tipo_gov:     'Government Entity',
    tipo_tour:    'Tour Operator',
    tipo_hotel:   'Hospitality',
    tipo_eco:     'Ecotourism',
    tipo_coast:   'Coastal Tourism',
    tipo_agency:  'Travel Agency',

    // CTA section
    cta_badge:     'Angola360',
    cta_title_1:   'Ready to',
    cta_title_2:   'Discover Angola?',
    cta_subtitle:  "Angola's most complete interactive map awaits you. Explore destinations, 360° views and let our AI tourism guide lead the way.",
    cta_map:       'Open Interactive Map',
    cta_ai:        'Chat with Njila, your AI Guide',

    // Footer
    footer_tagline:     "Angola's Interactive Tourism Portal.\nExplore, discover, be inspired.",
    footer_dest:        'Destinations',
    footer_portal:      'Portal',
    footer_contact:     'Contact',
    footer_view_all:    'View all →',
    footer_map:         'Interactive Map',
    footer_about:       'About Angola',
    footer_partners:    'Partners',
    footer_ai:          'AI Guide',
    footer_api:         'API for Operators',
    footer_ministry:    'Angola Ministry of Tourism',
    footer_partner_btn: 'Become a Partner',
    footer_rights:      '© 2025 Angola360 · All rights reserved ·',
    footer_privacy:     'Privacy Policy',
    footer_powered:     'Powered by Claude · Made in Angola 🇦🇴',

    // Map header
    map_style_light:  'Light',
    map_style_dark:   'Dark',
    map_style_sat:    'Satellite',
    map_search:       'Search destination...',
    map_ai_btn:       'AI Guide',

    // Sidebar
    sidebar_cats:     'Categories',
    sidebar_dests:    'Destinations',
    sidebar_empty:    'No destinations found',
    cat_all:          'All',
    cat_natureza:     'Nature',
    cat_praia:        'Beaches',
    cat_cidade:       'Cities',
    cat_historia:     'History',
    cat_cultura:      'Culture',
    cat_surf:         'Surf',
    cat_aventura:     'Adventure',

    // StatsBar
    bar_dests:        'Destinations',
    bar_provinces:    'Provinces',
    bar_mode:         'Mode',
    bar_style:        'Style',
    bar_ai_active:    'AI Guide active',

    // POI popup
    poi_best_season:  'Best season',
    poi_coords:       'Coordinates',
    poi_highlights:   'Highlights',
    poi_ai_guide:     'AI Guide',
    poi_view_360:     '360° View',
    poi_maps:         'Maps',

    // AI chat
    ai_title:         'Angola360 AI Guide',
    ai_greeting:      'Hi! I\'m Njila, your AI guide.',
    ai_subtext:       'Ask me about destinations, culture, or plan your Angola trip.',
    ai_placeholder:   'Ask about Angola…',
    ai_clear:         'Clear conversation',
    ai_s1:            'Best surfing destination in Angola?',
    ai_s2:            'Plan 5 days in Southern Angola',
    ai_s3:            'Where to see wildlife near Luanda?',
    ai_s4:            'Best beaches in the country?',
    ai_system:        'You are the AI Guide of Angola360 — Angola\'s most complete tourism portal.\nYou help travellers discover Angola: destinations, culture, nature, gastronomy, logistics and safety.\nReply in English. Be helpful, enthusiastic but concise. Maximum 3 paragraphs.',
    ai_system_poi:    'Give me 2 short evocative sentences about {name} in {province}, Angola. Mention something unique and special. Reply only in English, no emojis.',
    ai_insight_sys:   'You are the AI Guide of Angola360. Give short, poetic and informative insights about Angolan tourist destinations. Maximum 2 sentences. English.',
  },
} as const

export type TKey = keyof typeof T.pt

export function useT() {
  const { language } = useApp()
  return (key: TKey): string => T[language][key] as string
}
