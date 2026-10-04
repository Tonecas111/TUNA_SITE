//  FIELDS PER ITEM:
//    id        -> Unique identifier (e.g. "p01"). Used by the
//                 linear reading flow (next/previous navigation).
//    row, col  -> Position on the grid (1..23, 1..41).
//    type      -> "fotografia" | "texto" | "video" | "creditos"
//                 Note: "creditos" is special — not clickable,
//                 shown with its own tooltip style in the cosmos.
//    caption   -> Short text: shown as tooltip in the cosmos and
//                 as caption in the galaxy overlay.
//    caption2  -> Longer or alternative caption shown only in
//                 the galaxy overlay.
//    media     -> Path to the asset file (image or video).
//    text      -> ONLY for type "texto": the text content to show
//                 (short in the galaxy cell, full in the overlay).
//    next      -> id of the NEXT item in the linear reading flow
//                 (the ">" button). If empty, ">" wraps around
//                 to the first item.
//    plusUrl   -> ONLY if the cell has a "+" button; URL it leads
//                 to (e.g. "extras/01.html"). Omit or null if
//                 the cell has no "+" button.
//    ThumbTime -> Second of the video to use as the thumbnail
//                 (video items only).
// ============================================================

const cosmosData = [
  // ===== fotografia =====
  {
    id: "F300",
    row: 8,
    col: 26,
    type: "fotografia",
    caption: "Wata 2021",
    caption2: "Mami Wata I, Lisboa, 2021",
    media: "media/images/F300_S_Lola.webp",
    next: "F014",
  },
  {
    id: "F010",
    row: 6,
    col: 2,
    type: "fotografia",
    caption: "Lhioubímov 1991",
    caption2: "Iúri Lhioubímov's Boris Godunov, 1991",
    media: "media/images/F010_IOURI_LIOUBIMOV.webp",
    next: "T026",
  },

  {
    id: "F012",
    row: 13,
    col: 4,
    type: "fotografia",
    caption: "Bob Wilson 1999",
    caption2: "Robert Wilson's The Days Before, 1999",
    media: "media/images/F012_BOB_WILSON.webp",
    next: "T021",
  },
  {
    id: "F013",
    row: 14,
    col: 17,
    type: "fotografia",
    caption: "Antígona 2010",
    caption2: "Nuno Carinhas' Antígona, Maria do Céu, 2010",
    media: "media/images/F013_ANTIGONAmariaCEU.webp",
    next: "F043",
  },
  {
    id: "F014",
    row: 8,
    col: 32,
    type: "fotografia",
    caption: "Bergman 1991",
    caption2: "Ingmar Bergman's Madame de Sade, 1991",
    media: "media/images/F014_INGMAR_BERGMAN.webp",
    next: "F059",
  },

  {
    id: "F015",
    row: 13,
    col: 36,
    type: "fotografia",
    caption: "D. Eunice 1993",
    caption2: "João Perry's Zerlina, Eunice Muñoz, 1993",
    media: "media/images/F015_ZERLINA.webp",
    next: "F161",
  },

  {
    id: "F016",
    row: 6,
    col: 27,
    type: "fotografia",
    caption: "Kazuo Ohno 1994",
    caption2: "Kazuo Ohno's Flowers Birds Wind Moon, 1994",
    media: "media/images/F016_KAZUO_OHNO.webp",
    next: "T022",
  },

  {
    id: "F017",
    row: 13,
    col: 28,
    type: "fotografia",
    caption: "Wooster Group 1992",
    caption2: "The Wooster Group's Brace Up! 1992",
    media: "media/images/F017_WOOSTER_GROUP.webp",
    next: "F040",
  },

  {
    id: "F018",
    row: 7,
    col: 24,
    type: "fotografia",
    caption: "Ostermier 2001",
    caption2: "Thomas Ostermier's Der Name, 2001",
    media: "media/images/F018_OSTERMIER.webp",
    next: "F045",
  },

  {
    id: "F019",
    row: 18,
    col: 18,
    type: "fotografia",
    caption: "Nekrosius 2003",
    caption2: "Eimuntas Nekrosius's Otelas, 2003",
    media: "media/images/F019_NEKROSIUS.webp",
    next: "F010",
  },
  {
    id: "F020",
    row: 19,
    col: 7,
    type: "fotografia",
    caption: "Pais 2007",
    caption2:
      "Ricardo Pais' Turismo Infinito, Emília Silvestre, João Reis, 2007",
    media: "media/images/F020_TURISMO.webp",
    next: "F029",
  },

  {
    id: "F021",
    row: 15,
    col: 21,
    type: "fotografia",
    caption: "Ana 1986",
    caption2: "Ana, Lisboa, 1986",
    media: "media/images/F021_BW1986.webp",
    next: "V024",
  },

  {
    id: "F022",
    row: 15,
    col: 16,
    type: "fotografia",
    caption: "Maria 1987",
    caption2: "Maria, Lisboa, 1987",
    media: "media/images/F022_MARIA.webp",
    next: "F039",
  },

  {
    id: "F023",
    row: 21,
    col: 25,
    type: "fotografia",
    caption: "Tadeu 1987",
    caption2: "Tadeu, Tondela, 1987",
    media: "media/images/F023_TADEU.webp",
    next: "F015",
  },

  {
    id: "F024",
    row: 22,
    col: 19,
    type: "fotografia",
    caption: "Bates 1992",
    caption2: "Alan Bates, Lisboa, 1992",
    media: "media/images/F024_ALAN_BATES.webp",
    next: "F035",
  },

  {
    id: "F025",
    row: 13,
    col: 10,
    type: "fotografia",
    caption: "Trintignant 1995",
    caption2: "Marie Trintignant, Lisboa, 1995",
    media: "media/images/F025_MARIE_TRINTIGNANT.webp",
    next: "F048",
  },

  {
    id: "F026",
    row: 8,
    col: 17,
    type: "fotografia",
    caption: "Maria 1994",
    caption2: "Maria de Medeiros, Lisboa, 1994",
    media: "media/images/F026_MARIAdeMEDEIROS.webp",
    next: "F209",
  },

  {
    id: "F027",
    row: 12,
    col: 9,
    type: "fotografia",
    caption: "Cesariny 2002",
    caption2: "Mário Cesariny, Lisboa, 2002",
    media: "media/images/F027MARIO_CESARINY.webp",
    next: "F030",
  },
  {
    id: "F028",
    row: 9,
    col: 20,
    type: "fotografia",
    caption: "Catarina 2007",
    caption2: "Catarina Varatojo, Porto, 2007",
    media: "media/images/F028_KATArosto.webp",
    next: "F027",
  },

  {
    id: "F029",
    row: 15,
    col: 32,
    type: "fotografia",
    caption: "João 1996",
    caption2: "João Mota, Lisboa, 1996",
    media: "media/images/F029_JOAO_MOTA.webp",
    next: "F175",
  },

  {
    id: "F030",
    row: 1,
    col: 37,
    type: "fotografia",
    caption: "Alfredo 1996",
    caption2: "Alfredo Brissos, Lisboa, 1996",
    media: "media/images/F030_ALFREDO.webp",
    next: "F036",
  },

  {
    id: "F031",
    row: 16,
    col: 34,
    type: "fotografia",
    caption: "Pedro 2010",
    caption2: "Pedro Almendra, Porto, 2010",
    media: "media/images/F031_PEDRO_ALMENDRAsombras.webp",
    next: "T017",
  },

  {
    id: "F032",
    row: 21,
    col: 10,
    type: "fotografia",
    caption: "Ana 2013",
    caption2: "Ana Bustorff, Lisboa, 2013",
    media: "media/images/F032_ANA_BUSTORFF.webp",
    next: "F271",
  },

  {
    id: "F033",
    row: 18,
    col: 15,
    type: "fotografia",
    caption: "Hanna 1992",
    caption2: "Hanna Shygulla, Sintra, 1992",
    media: "media/images/F033_HANNA_SHYGULLA.webp",
    next: "F055",
  },

  {
    id: "F034",
    row: 18,
    col: 34,
    type: "fotografia",
    caption: "Sandra 1998",
    caption2: "Sandra Faleiro, Lisboa, 1998",
    media: "media/images/F034_SANDRA_FALEIRO.webp",
    next: "T028",
  },

  {
    id: "F035",
    row: 10,
    col: 13,
    type: "fotografia",
    caption: "Boys 2009",
    caption2: "Boys, Porto, 2009",
    media: "media/images/F035_COLORs.webp",
    next: "F300",
  },

  {
    id: "F036",
    row: 19,
    col: 10,
    type: "fotografia",
    caption: "Rebeka 2017",
    caption2: "Rebeka Friedli, Lisboa, 2017",
    media: "media/images/F036_REBEKA.webp",
    next: "T014",
  },

  {
    id: "F037",
    row: 6,
    col: 20,
    type: "fotografia",
    caption: "Boneville 2017",
    caption2: "Miguel Boneville, Lisboa, 2017",
    media: "media/images/F037_MIGUEL_BONEVILLE.webp",
    next: "F097",
  },

  {
    id: "F038",
    row: 19,
    col: 24,
    type: "fotografia",
    caption: "Paula 2017",
    caption2: "Paula Diogo, Lisboa, 2017",
    media: "media/images/F038_PAULA_DIOGO.webp",
    next: "F221",
  },

  {
    id: "F039",
    row: 18,
    col: 13,
    type: "fotografia",
    caption: "Ego 1997",
    caption2: "Vera Mantero, A Queda de 1 Ego, Lisboa, 1997",
    media: "media/images/F039_VERA_MANTEROego.webp",
    next: "V037",
  },

  {
    id: "F040",
    row: 18,
    col: 28,
    type: "fotografia",
    caption: "Ruby Slippers 2016",
    caption2: "Ruby Slippers, Mónica Calle, 2016, Lisboa, 2016",
    media: "media/images/F040_PEquartoEscuro.webp",
    next: "V013",
  },

  {
    id: "F305",
    row: 20,
    col: 15,
    type: "fotografia",
    caption: "Ophelia 2021",
    caption2: "Ophelia I, Leonor Cabral, Lisboa, 2021",
    media: "media/images/F305_Agualola.webp",
    next: "V008",
  },

  {
    id: "F043",
    row: 9,
    col: 36,
    type: "fotografia",
    caption: "Odalisque 2022",
    caption2: "Odalisque, Lisboa, 2022",
    media: "media/images/F043_LEONORcostas.webp",
    next: "F222",
  },

  {
    id: "F044",
    row: 19,
    col: 1,
    type: "fotografia",
    caption: "Maria do Céu 2010",
    caption2: "Maria do Céu Ribeiro, Porto, 2010",
    media: "media/images/F044_CEU_RIBEIRO.webp",
    next: "F162",
  },

  {
    id: "F045",
    row: 4,
    col: 31,
    type: "fotografia",
    caption: "Silver 2016",
    caption2: "White Horse, Oeiras, 2016",
    media: "media/images/F045_CAVALO.webp",
    next: "F073",
  },

  {
    id: "F046",
    row: 9,
    col: 31,
    type: "fotografia",
    caption: "Santa Ágata 2009",
    caption2: "Santa Ágata, Toys, Porto, 2009",
    media: "media/images/F046_TOYs.webp",
    next: "F206",
  },

  {
    id: "F048",
    row: 22,
    col: 37,
    type: "fotografia",
    caption: "Ela 2019",
    caption2: "Ela Polkowska, Kaunas, 2019",
    media: "media/images/F048_GIRLprocurate.webp",
    next: "F089",
  },

  {
    id: "F050",
    row: 5,
    col: 26,
    type: "fotografia",
    caption: "Diana 2017",
    caption2: "Diana Sá, Lisboa, 2017",
    media: "media/images/F050_DIANA_SA.webp",
    next: "F031",
  },

  {
    id: "F051",
    row: 2,
    col: 20,
    type: "fotografia",
    caption: "Diana 2022",
    caption2: "Diana Sousa, Lisboa, 2022",
    media: "media/images/F051_DIANA_SOUSA.webp",
    next: "F125",
  },

  {
    id: "F052",
    row: 14,
    col: 15,
    type: "fotografia",
    caption: "Alice 2018",
    caption2: "Alice, Todos, Lisboa, 2018",
    media: "media/images/F052_RAPARIGAtodos.webp",
    next: "T032",
  },

  {
    id: "F054",
    row: 22,
    col: 13,
    type: "fotografia",
    caption: "Emília 2008",
    caption2: "Emília Silvestre, Porto, 2008",
    media: "media/images/F054_EMILIA_SILVESTRE.webp",
    next: "F207",
  },

  {
    id: "F055",
    row: 15,
    col: 3,
    type: "fotografia",
    caption: "Emília 2008",
    caption2: "Emília Silvestre, Porto, 2014",
    media: "media/images/F055_PROJECCAOemilia.webp",
    next: "T041",
  },

  {
    id: "F056",
    row: 6,
    col: 22,
    type: "fotografia",
    caption: "Zoo 2013",
    caption2: "Zoo, Victor Hugo Pontes, Porto, 2013",
    media: "media/images/F056_ZOO.webp",
    next: "F232",
  },

  {
    id: "F059",
    row: 16,
    col: 22,
    type: "fotografia",
    caption: "Bela 2016",
    caption2: "Bela, In The Sky, Lisboa, 2016",
    media: "media/images/F059_INtheSKY.webp",
    next: "F028",
  },

  {
    id: "F060",
    row: 22,
    col: 34,
    type: "fotografia",
    caption: "Celine 2018",
    caption2: "Celine Noon, Lisboa, 2018",
    media: "media/images/F60_CELINEgrito.webp",
    next: "F158",
  },

  {
    id: "F061",
    row: 17,
    col: 30,
    type: "fotografia",
    caption: "Torso 2017",
    caption2: "Torso of a Young Woman, Lisboa, 2017",
    media: "media/images/F61_CELINEcostas.webp",
    next: "F108",
  },

  {
    id: "F062",
    row: 13,
    col: 16,
    type: "fotografia",
    caption: "Celine 2017",
    caption2: "Celine Noon, Lisboa, 2017",
    media: "media/images/F62_CELINEestrado.webp",
    next: "V007",
  },

  {
    id: "F064",
    row: 7,
    col: 34,
    type: "fotografia",
    caption: "Ophelia 2018",
    caption2: "Ophelia II, Lisboa, 2018",
    media: "media/images/F64_CELINEagua_01.webp",
    next: "T020",
  },

  {
    id: "F066",
    row: 21,
    col: 41,
    type: "fotografia",
    caption: "Celine 2018",
    caption2: "Celine Noon, Lisboa, 2018",
    media: "media/images/F66_CELINEagua_03.webp",
    next: "F110",
  },

  {
    id: "F067",
    row: 21,
    col: 4,
    type: "fotografia",
    caption: "Celine 2018",
    caption2: "Celine Noon, Lisboa, 2018",
    media: "media/images/F67_CELINEagua_04.webp",
    next: "V032",
  },

  {
    id: "F068",
    row: 3,
    col: 36,
    type: "fotografia",
    caption: "Celine 2017",
    caption2: "Celine Noon, Lisboa, 2017",
    media: "media/images/F68_CELINEcarvao_01.webp",
    next: "F129",
  },

  {
    id: "F069",
    row: 1,
    col: 36,
    type: "fotografia",
    caption: "Happy 2017",
    caption2: "Happy Tongue, Lisboa, 2017",
    media: "media/images/F069_CELIENlingua_01.webp",
    next: "F159",
  },

  {
    id: "F070",
    row: 17,
    col: 35,
    type: "fotografia",
    caption: "Celine 2017",
    caption2: "Celine Noon, Lisboa, 2017",
    media: "media/images/F070_CELINElama_01.webp",
    next: "F016",
  },

  {
    id: "F071",
    row: 14,
    col: 39,
    type: "fotografia",
    caption: "Celine 2017",
    caption2: "Celine Noon, Lisboa, 2017",
    media: "media/images/F071_CELINElama_02.webp",
    next: "T038",
  },

  {
    id: "F072",
    row: 17,
    col: 2,
    type: "fotografia",
    caption: "Celine 2017",
    caption2: "Celine Noon, Lisboa, 2017",
    media: "media/images/F072_CELINEpalha.webp",
    next: "F174",
  },

  {
    id: "F073",
    row: 8,
    col: 5,
    type: "fotografia",
    caption: "CELINE, LISBOA, 2017",
    caption2: "CELINE, LISBOA, 2017",
    media: "media/images/F073_CELINEcueca_01.webp",
    next: "F267",
  },

  {
    id: "F074",
    row: 5,
    col: 17,
    type: "fotografia",
    caption: "RTP 2025",
    caption2: "Celine Noon for RTP, 2025",
    media: "media/images/F074_CELINE_RTP.webp",
    next: "F046",
    plusUrl: "sistema.html?id=F074", // exemplo: tem botão "+"
  },

  {
    id: "F083",
    row: 13,
    col: 26,
    type: "fotografia",
    caption: "Lourdes 2021",
    caption2: "Lourdes, Todos Ameixoeira, 2021",
    media: "media/images/F083_TODOS_AMEIXOEIRA_02.webp",
    next: "F228",
  },

  {
    id: "F084",
    row: 17,
    col: 6,
    type: "fotografia",
    caption: "António 2021",
    caption2: "António, Todos Ameixoeira, 2021",
    media: "media/images/F084_TODOS_AMEIXOEIRA_03.webp",
    next: "F116",
  },

  {
    id: "F089",
    row: 23,
    col: 12,
    type: "fotografia",
    caption: "Pape 2020",
    caption2: "Pape, Todos St Engrácia, 2020",
    media: "media/images/F089_TODOS_mAGUA_02.webp",
    next: "F071",
  },

  {
    id: "F090",
    row: 12,
    col: 16,
    type: "fotografia",
    caption: "Awa 2020",
    caption2: "Awa, Todos St Engrácia, 2020",
    media: "media/images/F090_TODOS_mAGUA_03.webp",
    next: "F091",
  },

  {
    id: "F091",
    row: 3,
    col: 17,
    type: "fotografia",
    caption: "Chai 2020",
    caption2: "Chai, Todos St Engrácia, 2020",
    media: "media/images/F091_TODOS_mAGUA_04.webp",
    next: "V041",
  },

  {
    id: "F097",
    row: 12,
    col: 26,
    type: "fotografia",
    caption: "Diana 2016",
    caption2: "Diana Sá, Porto, 2016",
    media: "media/images/F097_ULTIMOS DIAS.webp",
    next: "F064",
  },

  {
    id: "F099",
    row: 3,
    col: 24,
    type: "fotografia",
    caption: "Wall",
    caption2: "Faces on The Wall",
    media: "media/images/F099_ICH_BINnivel.webp",
    next: "V015",
    plusUrl: "sistema.html?id=F099", // exemplo: tem botão "+"
  },

  {
    id: "F102",
    row: 16,
    col: 41,
    type: "fotografia",
    caption: "Eduardo 2009",
    caption2: "Eduardo Silva, Ich Bin Kein Berliner, Porto, 2009",
    media: "media/images/F102_ICH.webp",
    next: "F099",
  },

  {
    id: "F103",
    row: 1,
    col: 4,
    type: "fotografia",
    caption: "Pedro 2009",
    caption2: "Pedro Almendra, Ich Bin Kein Berliner, Porto, 2009",
    media: "media/images/F103_ICH.webp",
    next: "T011",
  },

  {
    id: "F108",
    row: 9,
    col: 25,
    type: "fotografia",
    caption: "Júlia 2022",
    caption2: "Júlia, Persona, Lisboa, 2022",
    media: "media/images/F108_PERSONA_02.webp",
    next: "F126",
  },

  {
    id: "F109",
    row: 23,
    col: 3,
    type: "fotografia",
    caption: "Rafael 2022",
    caption2: "Rafael, Persona, Lisboa, 2022",
    media: "media/images/F109_PERSONA_03b.webp",
    next: "F090",
  },

  {
    id: "F110",
    row: 4,
    col: 41,
    type: "fotografia",
    caption: "Paula 2022",
    caption2: "Paula, Persona, Lisboa, 2022",
    media: "media/images/F110_PERSONA_04.webp",
    next: "F068",
  },

  {
    id: "F111",
    row: 6,
    col: 3,
    type: "fotografia",
    caption: "Tatiana 2022",
    caption2: "Tatiana, Persona, Lisboa, 2022",
    media: "media/images/F111_PERSONA_05.webp",
    next: "F176",
  },

  {
    id: "F116",
    row: 17,
    col: 32,
    type: "fotografia",
    caption: "Jorge 2025",
    caption2: "Jorge Mota, Porto, 2025",
    media: "media/images/F116_CADERNO_P_02.webp",
    next: "F241",
  },

  {
    id: "F117",
    row: 23,
    col: 40,
    type: "fotografia",
    caption: "Sérgio 2025",
    caption2: "Sérgio Sá, Porto, 2025",
    media: "media/images/F117_CADERNO_P_03.webp",
    next: "F050",
  },

  {
    id: "F125",
    row: 9,
    col: 26,
    type: "fotografia",
    caption: "Armando 2020",
    caption2: "Armando, Do Tirar Pelo natural, Lisboa, 2020",
    media: "media/images/F125_DO_TIRAR.webp",
    next: "V025",
  },

  {
    id: "F126",
    row: 16,
    col: 8,
    type: "fotografia",
    caption: "Artur 2020",
    caption2: "Artur, Do Tirar Pelo natural, Lisboa, 2020",
    media: "media/images/F126_DO_TIRAR.webp",
    next: "V036",
  },

  {
    id: "F127",
    row: 18,
    col: 32,
    type: "fotografia",
    caption: "Sandro 2020",
    caption2: "Sandro, Do Tirar Pelo natural, Lisboa, 2020",
    media: "media/images/F127_DO_TIRAR.webp",
    next: "F083",
  },

  {
    id: "F128",
    row: 2,
    col: 14,
    type: "fotografia",
    caption: "Luís 2020",
    caption2: "Luís, Do Tirar Pelo natural, Lisboa, 2020",
    media: "media/images/F128_DO_TIRAR.webp",
    next: "F037",
  },

  {
    id: "F129",
    row: 22,
    col: 22,
    type: "fotografia",
    caption: "Dália 2020",
    caption2: "Dália, Do Tirar Pelo natural, Lisboa, 2020",
    media: "media/images/F129_DO_TIRAR.webp",
    next: "V010",
  },

  {
    id: "F130",
    row: 11,
    col: 34,
    type: "fotografia",
    caption: "Luís 2020",
    caption2: "Luís, Do Tirar Pelo natural, Lisboa, 2020",
    media: "media/images/F130_DO_TIRAR.webp",
    next: "F266",
  },

  {
    id: "F140",
    row: 11,
    col: 5,
    type: "fotografia",
    caption: "Eye 2007",
    caption2: "Medical Eye Model, Lisboa, 2007",
    media: "media/images/F140_NATUREZA_IR.webp",
    next: "F150",
  },

  {
    id: "F147",
    row: 12,
    col: 40,
    type: "fotografia",
    caption: "Ray 2013",
    caption2: "Ray, João Cardoso, Porto, 2013",
    media: "media/images/F147_ML_BW_04.webp",
    next: "F111",
  },

  {
    id: "F150",
    row: 2,
    col: 19,
    type: "fotografia",
    caption: "Otelo 2018",
    caption2: "Nuno Carinhas' Otelo, António Durães, 2018",
    media: "media/images/F150_ML_BW_07.webp",
    next: "F103",
  },

  {
    id: "F152",
    row: 4,
    col: 11,
    type: "fotografia",
    caption: "David 2016",
    caption2: "David, João Lourenço, Porto, 2016",
    media: "media/images/F152_ML_BW_05.webp",
    next: "F070",
  },

  {
    id: "F153",
    row: 13,
    col: 35,
    type: "fotografia",
    caption: "Ana Sofia 1998",
    caption2: "Vera Mantero's Poesia & Selvajaria, Ana Sofia, 1998",
    media: "media/images/F153_POESIAeSELVAJARIA.webp",
    next: "F249",
    plusUrl: "sistema.html?id=F153", // exemplo: tem botão "+"
  },

  {
    id: "F155",
    row: 5,
    col: 10,
    type: "fotografia",
    caption: "Bruce 1997",
    caption2: "Nuno Carinhas' Marie & Bruce, 1997",
    media: "media/images/F155_MARIE&BRUCE.webp",
    next: "V023",
    plusUrl: "sistema.html?id=F155", // exemplo: tem botão "+"
  },

  {
    id: "F156",
    row: 21,
    col: 30,
    type: "fotografia",
    caption: "Crónicas 1997",
    caption2: "Mónica Calle's Crónicas, 1997",
    media: "media/images/F156_CRONICAScalle.webp",
    next: "F163",
  },

  {
    id: "F158",
    row: 22,
    col: 7,
    type: "fotografia",
    caption: "Mónica 1993",
    caption2: "Mónica Calle, Lisboa, 1993",
    media: "media/images/F158_JOGOSdeNOITE.webp",
    next: "F160",
  },

  {
    id: "F159",
    row: 20,
    col: 13,
    type: "fotografia",
    caption: "Party 1994",
    caption2: "High Society Party, Cascais, 1994",
    media: "media/images/F159_PARTY.webp",
    next: "T044",
  },

  {
    id: "F160",
    row: 13,
    col: 22,
    type: "fotografia",
    caption: "Meia Noite 2000",
    caption2: "Mónica Calle's Bar da Meia Noite, 2000",
    media: "media/images/F160_BARdaMEIA_NOITE.webp",
    next: "V043",
    plusUrl: "sistema.html?id=F160", // exemplo: tem botão "+"
  },

  {
    id: "F161",
    row: 17,
    col: 10,
    type: "fotografia",
    caption: "Teresa, 1986",
    caption2: "Teresa on TV, Lisboa, 1986",
    media: "media/images/F161_TERESAonTV.webp",
    next: "V044",
    plusUrl: "sistema.html?id=F161", // exemplo: tem botão "+"
  },

  {
    id: "F162",
    row: 10,
    col: 6,
    type: "fotografia",
    caption: "Alexandre 2001",
    caption2: "Alexandre Falcão, Porto, 2001",
    media: "media/images/F162_A_HORA.webp",
    next: "F208",
  },

  {
    id: "F163",
    row: 12,
    col: 6,
    type: "fotografia",
    caption: "Catarina 2004",
    caption2: "Catarina Varatojo, Porto, 2004",
    media: "media/images/F163_CATARINA_VARATOJO.webp",
    next: "V002",
    plusUrl: "sistema.html?id=F163", // exemplo: tem botão "+"
  },

  {
    id: "F164",
    row: 19,
    col: 23,
    type: "fotografia",
    caption: "Susana 2001",
    caption2: "Susana Barbosa, Porto, 2001",
    media: "media/images/F164_PONTI_2001.webp",
    next: "V004",
    plusUrl: "sistema.html?id=F164", // exemplo: tem botão "+"
  },

  {
    id: "F169",
    row: 21,
    col: 16,
    type: "fotografia",
    caption: "Carla 2015",
    caption2: "Carla Ribeiro, Porto, 2015",
    media: "media/images/F169_SOMBRAS.webp",
    next: "F153",
  },

  {
    id: "F174",
    row: 21,
    col: 7,
    type: "fotografia",
    caption: "Castro 2003",
    caption2: "Castro, Praça da Batalha, Porto, 2003",
    media: "media/images/F174_onFRONT.webp",
    next: "V020",
    plusUrl: "sistema.html?id=F174", // exemplo: tem botão "+"
  },

  {
    id: "F175",
    row: 2,
    col: 23,
    type: "fotografia",
    caption: "Paper",
    caption2:
      "Cornelia Geiser's Uma Vida de Teatro, Luís Madureira and Marcello Urgeghe, 2003",
    media: "media/images/F175_onPAPER.webp",
    next: "T049",
    plusUrl: "sistema.html?id=F175", // exemplo: tem botão "+"
  },

  {
    id: "F176",
    row: 22,
    col: 24,
    type: "fotografia",
    caption: "Wall",
    caption2:
      "João Mota's A Senhora Klein, Cucha Carvalheiro, Elsa Galvão and Natália Luiza, 1994",
    media: "media/images/F176_onWALL.webp",
    next: "F056",
    plusUrl: "sistema.html?id=F176", // exemplo: tem botão "+"
  },

  {
    id: "F206",
    row: 3,
    col: 34,
    type: "fotografia",
    caption: "Flower 2019",
    caption2: "Spring Flower, Lisboa, Porto",
    media: "media/images/F206_RALO_01.webp",
    next: "T039",
  },

  {
    id: "F207",
    row: 17,
    col: 38,
    type: "fotografia",
    caption: "Elixir 2018",
    caption2: "Elixir, Lisboa, 2018",
    media: "media/images/F207_CELINE_cCUSPO_01.webp",
    next: "V003",
  },

  {
    id: "F208",
    row: 11,
    col: 1,
    type: "fotografia",
    caption: "V 2017",
    caption2: "V, Lisboa, 2017",
    media: "media/images/F208_CELINE_IRamor_01.webp",
    next: "V026",
  },

  {
    id: "F209",
    row: 10,
    col: 32,
    type: "fotografia",
    caption: "Wild 2015",
    caption2: "Wild Bud, Lisboa, 2015",
    media: "media/images/F209_IRjarro_01.webp",
    next: "F164",
  },

  {
    id: "F214",
    row: 7,
    col: 23,
    type: "fotografia",
    caption: "Celine 2018",
    caption2: "Celine Noon, Lisboa, 2018",
    media: "media/images/F214_CELINE_aguaPRETA_01.webp",
    next: "F054",
  },

  {
    id: "F306",
    row: 23,
    col: 33,
    type: "fotografia",
    caption: "Leonor 2020",
    caption2: "Leonor Cabral, Lisboa, 2020",
    media: "media/images/F306_carvaoLola.webp",
    next: "T035",
  },

  {
    id: "F219",
    row: 14,
    col: 4,
    type: "fotografia",
    caption: "Celine 2018",
    caption2: "Celine Noon, Lisboa, 2018",
    media: "media/images/F219_CELINE_aguaPRETA_06.webp",
    next: "F084",
  },

  {
    id: "F221",
    row: 7,
    col: 39,
    type: "fotografia",
    caption: "Ophelia 2018",
    caption2: "Ophelia III, Lisboa, 2018",
    media: "media/images/F221_CELINE_aguaPRETA_08.webp",
    next: "T027",
  },

  {
    id: "F222",
    row: 11,
    col: 15,
    type: "fotografia",
    caption: "Celine 2017",
    caption2: "Celine Noon, Lisboa, 2017",
    media: "media/images/F222_CELINE_cabecaPLASTICO_01.webp",
    next: "F052",
  },

  {
    id: "F223",
    row: 16,
    col: 14,
    type: "fotografia",
    caption: "Celine 2017",
    caption2: "Celine Noon, Lisboa, 2017",
    media: "media/images/F223_CELINE_cabecaPLASTICO_02.webp",
    next: "F117",
  },

  {
    id: "F226",
    row: 2,
    col: 39,
    type: "fotografia",
    caption: "Celine 2017",
    caption2: "Celine Noon, Lisboa, 2017",
    media: "media/images/F226_CELINEestrado_01.webp",
    next: "F243",
  },

  {
    id: "F228",
    row: 1,
    col: 12,
    type: "fotografia",
    caption: "Celine 2017",
    caption2: "Celine Noon, Lisboa, 2017",
    media: "media/images/F228_CELINEvogue_01.webp",
    next: "T045",
  },

  {
    id: "F232",
    row: 17,
    col: 22,
    type: "fotografia",
    caption: "ML 2013",
    caption2: "ML, Dias Felizes, TNSJ, 2013",
    media: "media/images/F232_ML_IR_02.webp",
    next: "T036",
    plusUrl: "sistema.html?id=F232", // exemplo: tem botão "+"
  },

  {
    id: "F240",
    row: 2,
    col: 27,
    type: "fotografia",
    caption: "Joana 2016",
    caption2: "Joana Africano, Porto, 2016",
    media: "media/images/F240_HUMANIDADEjoana_01.webp",
    next: "F245",
  },

  {
    id: "F241",
    row: 2,
    col: 1,
    type: "fotografia",
    caption: "João 2016",
    caption2: "João Cardoso, Porto, 2016",
    media: "media/images/F241_HUMANIDADEjoao_01.webp",
    next: "T042",
  },

  {
    id: "F243",
    row: 9,
    col: 41,
    type: "fotografia",
    caption: "Sara 2016",
    caption2: "Sara Barros Leitão, Porto, 2016",
    media: "media/images/F243_HUMANIDADEsara_01.webp",
    next: "F306",
  },

  {
    id: "F245",
    row: 23,
    col: 35,
    type: "fotografia",
    caption: "António 2016",
    caption2: "António Durães, Porto, 2016",
    media: "media/images/F245_HUMANIDADEduraes_01.webp",
    next: "F147",
  },

  {
    id: "F249",
    row: 6,
    col: 21,
    type: "fotografia",
    caption: "Marcello 2016",
    caption2: "Marcello Urgeghe, Porto, 2016",
    media: "media/images/F249_HUMANIDADEbaixoMARCELO_01.webp",
    next: "F283",
  },

  {
    id: "F264",
    row: 4,
    col: 3,
    type: "fotografia",
    caption: "Ana 2010",
    caption2: "Ana, Do Tirar Pelo natural, 2020",
    media: "media/images/F264_doTIRAR_ana_01.webp",
    next: "T033",
  },

  {
    id: "F266",
    row: 23,
    col: 8,
    type: "fotografia",
    caption: "José 2010",
    caption2: "José, Do Tirar Pelo natural, 2020",
    media: "media/images/F266_doTIRAR_jose_01.webp",
    next: "F067",
  },

  {
    id: "F267",
    row: 5,
    col: 12,
    type: "fotografia",
    caption: "Carlos 2010",
    caption2: "Carlos, Do Tirar Pelo natural, 2020",
    media: "media/images/F267_doTIRAR_carlos_01.webp",
    next: "T043",
  },

  {
    id: "F271",
    row: 13,
    col: 31,
    type: "fotografia",
    caption: "Susana 2010",
    caption2: "Susana, Do Tirar Pelo natural, 2020",
    media: "media/images/F271_doTIRAR_susana_01.webp",
    next: "F305",
  },

  {
    id: "F280",
    row: 8,
    col: 7,
    type: "fotografia",
    caption: "Eyes 2016",
    caption2: "TNDM II Workers' Eyes, Lisboa, 2016",
    media: "media/images/F280_Ssolar-16.webp",
    next: "F022",
    plusUrl: "sistema.html?id=F280", // exemplo: tem botão "+"
  },

  {
    id: "F283",
    row: 1,
    col: 24,
    type: "fotografia",
    caption: "Faces 2016",
    caption2: "TNDM II Workers' Faces, Lisboa, 2016",
    media: "media/images/F283_Ssolar-2.webp",
    next: "F069",
    plusUrl: "sistema.html?id=F283", // exemplo: tem botão "+"
  },

  // ===== VIDEO =====

  {
    id: "V002",
    row: 2,
    col: 8,
    type: "video",
    caption: "St Cruz 1985",
    caption2: "Primo Sertório, St Cruz, 1985",
    media: "media/video/V002_MOI_stCRUZ_01.webm",
    thumbTime: 13,
    next: "F024",
  },

  {
    id: "V003",
    row: 3,
    col: 20,
    type: "video",
    caption: "Monchique 2020",
    caption2: "Quando, Madalena Vitorino, Monchique, 2020",
    media: "media/video/V003_MOI_QUANDO_01.webm",
    thumbTime: 1,
    next: "T037",
  },

  {
    id: "V004",
    row: 7,
    col: 37,
    type: "video",
    caption: "Ego 1996",
    caption2: "Queda de 1 Ego, Vera Mantero, 100' Hi8, 1996",
    media: "media/video/V004_EGO_01.webm",
    thumbTime: 4,
    next: "F226",
  },

  {
    id: "V005",
    row: 14,
    col: 33,
    type: "video",
    caption: "Ego 1996",
    caption2: "Queda de 1 Ego, Vera Mantero, 100' Hi8, 1996",
    media: "media/video/V005_EGO_01.webm",
    thumbTime: 2,
    next: "F127",
  },

  {
    id: "V005b",
    row: 18,
    col: 40,
    type: "video",
    caption: "Ego 1996",
    caption2: "Queda de 1 Ego, Vera Mantero, 100' Hi8, 1996",
    media: "media/video/V005b_EGO_01.webm",
    thumbTime: 23,
    next: "T048",
  },

  {
    id: "V006",
    row: 16,
    col: 20,
    type: "video",
    caption: "Feira da Ladra 1985",
    caption2: "Feira da Ladra, 50' VHS-C, 1985",
    media: "media/video/V006_FEIRAdaLADRA_01.webm",
    thumbTime: 5,
    next: "F044",
  },

  {
    id: "V007",
    row: 10,
    col: 18,
    type: "video",
    caption: "Ana 1986",
    caption2: "Filme Experimental, Ana, 6' VHS-C, 1986",
    media: "media/video/V007_ANA_01.webm",
    thumbTime: 9,
    next: "V011a",
  },

  {
    id: "V008",
    row: 3,
    col: 30,
    type: "video",
    caption: "Ana 1986",
    caption2: "Filme Experimental, Ana, 6' VHS-C, 1986",
    media: "media/video/V008_ANA_01.webm",
    thumbTime: 12,
    next: "V009",
  },

  {
    id: "V009",
    row: 13,
    col: 13,
    type: "video",
    caption: "Primavera 1997",
    caption2:
      "Primavera, Ana Quintans, Edmundo Rosa + Ana Moreira, Duarte Guimarães, 12' 35mm, 1997",
    media: "media/video/V009_PRIMAVERA_01.webm",
    thumbTime: 29,
    next: "T031",
  },

  {
    id: "V010",
    row: 20,
    col: 32,
    type: "video",
    caption: "Primavera 1997",
    caption2: "Primavera, Ana Moreira, Duarte Guimarães, 12' 35mm, 1997",
    media: "media/video/V010_PRIMAVERA_01.webm",
    thumbTime: 12,
    next: "F074",
  },

  {
    id: "V011a",
    row: 3,
    col: 31,
    type: "video",
    caption: "Elevador 1998",
    caption2: "Grafitis no Bairro Alto, 30' Hi8, 1988",
    media: "media/video/V011_ELE_GLORIAa_01.webm",
    thumbTime: 5,
    next: "F038",
  },

  {
    id: "V011b",
    row: 4,
    col: 8,
    type: "video",
    caption: "Elevador 1998",
    caption2: "Grafitis no Bairro Alto, 30' Hi8, 1988",
    media: "media/video/V011_ELE_GLORIAb_01.webm",
    thumbTime: 30,
    next: "T046",
  },

  {
    id: "V012",
    row: 10,
    col: 29,
    type: "video",
    caption: "Dorme Devagar 2003",
    caption2: "Dorme Devagar, Sara Gonçalves, Diogo Bento, 30' HD, 2003",
    media: "media/video/V012_DORME_DEVAGAR_01.webm",
    thumbTime: 3,
    next: "F018",
  },

  {
    id: "V013",
    row: 20,
    col: 30,
    type: "video",
    caption: "Plasticina",
    caption2: "TV Commercial, Plasticina 15'' HD, 2004",
    media: "media/video/V013_SPOTs_TV_01.webm",
    thumbTime: 4,
    next: "F156",
    plusUrl: "sistema.html?id=V013",
  },

  {
    id: "V015",
    row: 14,
    col: 25,
    type: "video",
    caption: "Beckett 2006",
    caption2:
      "João Cardoso, Samuel Beckett's A Piece of Monologue, Nuno Carinhas, 55' DVD, 2006.",
    media: "media/video/V015_MONOLOGUE_01.webm",
    thumbTime: 10,
    next: "V011b",
  },

  {
    id: "V016",
    row: 17,
    col: 20,
    type: "video",
    caption: "Beckett 2006",
    caption2:
      "Emilia Silvestre, Samuel Beckett's Not I, Nuno Carinhas, 55' DVD, 2006",
    media: "media/video/V016_NOT_I_01.webm",
    thumbTime: 1,
    next: "F019",
  },

  {
    id: "V018",
    row: 23,
    col: 25,
    type: "video",
    caption: "Rosinda 2015",
    caption2: "Rosinda Costa, Labor, Joana Craveiro, 120' HD, 2015",
    media: "media/video/V018_LABORrosinda_01.webm",
    thumbTime: 2,
    next: "F034",
  },

  {
    id: "V020",
    row: 5,
    col: 5,
    type: "video",
    caption: "Porto 2001",
    caption2: "Porto 2001, 2,5X9m projection 40' 3XDVD, 2001",
    media: "media/video/V020_PORTO2001_01.webm",
    thumbTime: 55,
    next: "F214",
  },

  {
    id: "V050",
    row: 8,
    col: 10,
    type: "video",
    caption: "Leonor 2021",
    caption2: "Atmosfera, Leonor Cabral, with 3 fans 30' 4K, 2021",
    media: "media/video/V050_ATMOSFERAlterra_02.webm",
    thumbTime: 54,
    next: "V016",
  },

  {
    id: "V022",
    row: 18,
    col: 1,
    type: "video",
    caption: "Roupas 2011",
    caption2: "Roupas de Cena, 27' HD, 2011",
    media: "media/video/V022_ROUPAS_01.webm",
    thumbTime: 12,
    next: "F017",
  },

  {
    id: "V023",
    row: 5,
    col: 39,
    type: "video",
    caption: "Roupas, 2011",
    caption2: "Roupas de Cena, 27' HD, 2011",
    media: "media/video/V023_ROUPAS_01.webm",
    thumbTime: 4,
    next: "F264",
  },

  {
    id: "V024",
    row: 16,
    col: 11,
    type: "video",
    caption: "Roupas 2011",
    caption2: "Roupas de Cena, 27' HD, 2011",
    media: "media/video/V024_ROUPAS_01.webm",
    thumbTime: 4,
    next: "F060",
  },

  {
    id: "V025",
    row: 14,
    col: 27,
    type: "video",
    caption: "Rave 2004",
    caption2: "Rave Party, 6X8m projection 56' SD, 2004",
    media: "media/video/V025_RAVEcoracoesB_01.webm",
    thumbTime: 3,
    next: "F033",
  },

  {
    id: "V026",
    row: 4,
    col: 35,
    type: "video",
    caption: "Rave 2004",
    caption2: "Rave Party, 6X8m projection 56' SD, 2004",
    media: "media/video/V026_RAVEpipiB_01.webm",
    thumbTime: 11,
    next: "F012",
  },

  {
    id: "V027",
    row: 7,
    col: 33,
    type: "video",
    caption: "Rave 2004",
    caption2: "Rave Party, 6X8m projection 56' SD, 2004",
    media: "media/video/V027_RAVEbonecas_01.webm",
    thumbTime: 19,
    next: "F032",
  },

  {
    id: "V030",
    row: 10,
    col: 23,
    type: "video",
    caption: "Terminal 2016",
    caption2:
      "Luís Godinho, Estação Terminal, Madalena Vitorino & Pedro Salvador, 6X10m projection 48' HD, 2016",
    media: "media/video/V030_ESTACAOluis_01.webm",
    thumbTime: 29,
    next: "F061",
  },

  {
    id: "V031",
    row: 23,
    col: 23,
    type: "video",
    caption: "Terminal 2016",
    caption2:
      "Estação Terminal, Madalena Vitorino & Pedro Salvador, 6X10m projection 48' HD, 2016",
    media: "media/video/V031_ESTACAOvermelho_01.webm",
    thumbTime: 4,
    next: "T040",
  },

  {
    id: "V032",
    row: 7,
    col: 5,
    type: "video",
    caption: "Terminal 2016",
    caption2:
      "Estação Terminal, Madalena Vitorino & Pedro Salvador, 6X10m projection 48' HD, 2016",
    media: "media/video/V032_ESTACAOboys_01.webm",
    thumbTime: 18,
    next: "F025",
  },

  {
    id: "V036",
    row: 8,
    col: 29,
    type: "video",
    caption: "Chrysalid 2021",
    caption2: "Atmosfera, Leonor Cabral, with 3 fans 30' 4K, 2021",
    media: "media/video/V036_ATMOSFERAlagarta_01.webm",
    thumbTime: 10,
    next: "T019",
  },

  {
    id: "V037",
    row: 20,
    col: 34,
    type: "video",
    caption: "Leonor 2021",
    caption2: "Atmosfera, Leonor Cabral, with 3 fans 30' 4K, 2021",
    media: "media/video/V037_ATMOSFERAlpiscina_01.webm",
    thumbTime: 10,
    next: "V040",
  },

  {
    id: "V039",
    row: 8,
    col: 35,
    type: "video",
    caption: "Elsa 2016",
    caption2: "Elsa, Av de Roma, continuous loop SD 5', 2016",
    media: "media/video/V039_LARGOelsa_01.webm",
    thumbTime: 2,
    next: "F140",
  },

  {
    id: "V040",
    row: 19,
    col: 19,
    type: "video",
    caption: "Zé 2016",
    caption2: "Zé, Av de Roma, continuous loop SD 5', 2016",
    media: "media/video/V040_LARGOze_01.webm",
    thumbTime: 2,
    next: "T012",
  },

  {
    id: "V041",
    row: 23,
    col: 7,
    type: "video",
    caption: "Céline 2016",
    caption2: "Céline, Av de Roma, continuous loop SD 5', 2016",
    media: "media/video/V041_LARGOceline_01.webm",
    thumbTime: 2,
    next: "V031",
  },

  {
    id: "V043",
    row: 3,
    col: 27,
    type: "video",
    caption: "Horses 2016",
    caption2:
      "Cavalo de Sangue, 100X180cm projection onto a table covered with black soil 15' HD, 2016",
    media: "media/video/V043_CAVALOsangue_01.webm",
    thumbTime: 23,
    next: "T030",
  },

  {
    id: "V044",
    row: 10,
    col: 11,
    type: "video",
    caption: "Horses 2016",
    caption2:
      "Cavalo de Sangue, 100X180cm projection onto a table covered with black soil 15' HD, 2016",
    media: "media/video/V044_CAVALOsangue_01.webm",
    thumbTime: 1,
    next: "V005b",
  },

  // ===== creditos =====

  {
    id: "CR001",
    row: 23,
    col: 1,
    type: "creditos",
    caption: "Web Design and Coding Matilde Fernandes & Diogo Aires",
    text: "Web Design and Coding Matilde Fernandes & Diogo Aires",
  },

  // ===== TEXTO =====

  {
    id: "T011",
    row: 1,
    col: 18,
    type: "texto",
    caption: "Vinha ofegante",
    caption2: "Mal da Juventude, folha de sala, Lisboa, 1996",
    text: "Chegou atrasado. Ainda vinha ofegante por causa da última ladeira antes do prédio. Os últimos degraus daquele terceiro andar pareceram-lhe nunca mais terminar. O suor escorria-lhe em pequenas gotas pela testa. Entrou de rompante, mas parou logo a seguir à porta. Olhou-a, sentiu-se aliviado. Respirou fundo pela primeira vez naquele dia.",
    next: "V012",
  },

  {
    id: "T012",
    row: 19,
    col: 4,
    type: "texto",
    caption: "Chegou-se perto",
    caption2: "Mal da Juventude, folha de sala, Lisboa, 1996",
    text: "Cheia de medo. Cheia de medo não, completamente em pânico. Chegou-se perto, muito perto. Sentiu-lhe o bafo. As mãos quentes e peludas apertaram-lhe a cintura. Com um olhar seco avançou. Ela sentiu em poucos segundos a juventude a despedir-se. A barba por fazer arranhou-lhe a face esquerda.",
    next: "T024",
  },

  {
    id: "T013",
    row: 3,
    col: 15,
    type: "texto",
    caption: "Demasiado calor",
    caption2: "Isto Não é um Sonho, folha de sala, Guarda, 1997",
    text: "Em fevereiro fez demasiado calor. De repente toda a gente andava de manga curta, algumas flores começaram a abrir. Deve ter sido ao pé da paragem, há um pequeno espaço entre dois prédios que permite alguma intimidade. Com suor de novo por todos os lados. Ficou impossível viajar no metropolitano nas horas de ponta e mesmo nas avenidas mais largas tudo parecia demasiado pesado. Disse-lhe que já não aguentava que não a percebia, que estava sempre deprimido. (...) aquela coisa sempre no ar... sentia que ali não era o seu lugar. Os metrologistas tentaram explicar o fenómeno: o clima está a mudar, já não há estações, o buraco na camada de ozono está a provocar uma subida na temperatura.",
    next: "F026",
  },

  {
    id: "T014",
    row: 1,
    col: 13,
    type: "texto",
    caption: "O mundo está a transformar-se",
    caption2: "Isto Não é um Sonho, folha de sala, Guarda, 1997",
    text: '"O mundo está a transformar-se" disse-lhe Rita. "O relacionamento entre pessoas já não é o que era. A sociedade patriarcal está a acabar" continuou "O amor é diferente agora". As mudanças súbitas das condições atmosféricas tornaram-se vulgares, muitas delas refletem-se em forma de tempestade. Mas não tinha sido assim que ele tinha sido educado, a ideia que lhe tinham dado do mundo era outra, mais organizado, estável. "Mas a vida não é assim, amiguinho" respondeu-lhe Rita com ternura. "Isto não é um sonho".',
    next: "F066",
  },

  {
    id: "T016",
    row: 12,
    col: 1,
    type: "texto",
    caption: "Cresceu sozinho",
    caption2:
      "Dorme Devagar, Dramaturgias Emergentes, TNSJ, Livros Cotovia, 2001",
    text: "Não teve irmãos, nem primos, nem havia meninos. Cresceu sozinho. Ele gostava de crianças só que não sabia o que fazer. Não sei como mas sempre percebi isso. E era eu que me relacionava bem com ele. Eu fazia o trabalho dele. Sempre à espera do dia em que ele já soubesse o que me dizer. Ele morreu quando eu ia fazer dezoito anos. Às vezes dou comigo a falar com ele, a explicar-lhe coisas. Fico à espera que me responda ...",
    next: "F021",
  },

  {
    id: "T017",
    row: 7,
    col: 28,
    type: "texto",
    caption: "Pelos olhos adentro",
    caption2:
      "Dorme Devagar, Dramaturgias Emergentes, TNSJ, Livros Cotovia, 2001",
    text: "O homem tinha passado um ano inteiro a pedir à mulher para soltar o cabelo. Quando saiam, quando iam a festas, quando iam visitar a família dele. A mulher nunca soltou. Porque o cabelo ainda estava molhado do banho. Porque não dava jeito durante a viagem ou porque não tinha um espelho ali à mão e ficava sempre para quando chegassem aos sítios. Quando chegava esquecia-se sempre. O homem andou assim um ano inteiro. A única altura em que via a mulher com o cabelo solto era quando se deitavam. Logo depois apagava a luz ... E o homem dormia abraçado à mulher com os cabelos dela a fazerem-lhe cócegas no rosto e a entrarem-lhe pelo nariz, pela boca ... pelos olhos adentro.",
    next: "T018",
  },

  {
    id: "T018",
    row: 4,
    col: 33,
    type: "texto",
    caption: "Prazer em dar prazer",
    caption2:
      "Dorme Devagar, Dramaturgias Emergentes, TNSJ, Livros Cotovia, 2001",
    text: "Fiquei a pensar nessa coisa do cabelo. Que raio? Será que a mulher não tinha prazer em dar prazer ao homem? Se calhar se ele lhe tem pedido para lhe fazer um broche ela fazia. Como as outras dez mil.",
    next: "F169",
  },

  {
    id: "T019",
    row: 22,
    col: 38,
    type: "texto",
    caption: "Bairro da Graça 07H00",
    caption2: "TODOS, folha de sala, Lisboa, 2019",
    text: 'Lisboa, Bairro da Graça. 07h00. Na escola dos meninos, no lar dos idosos, nos lugares com portas fechadas. O cuidado. Depois do comboio, do autocarro. Depois do avião e depois da ladeira. Depois da calçada e depois do "Bom dia!". O cuidado. O cuidar dos outros. Dos meninos dos outros, dos "nossos" meninos. Depois de tudo e antes da Igreja. Antes de tudo. A Larissa, a Carla, a Egilda. Com as mãos, sempre com as mãos. Os idosos. O chão. A Celsa, a Dina, a Vanderleia. Depois da distância. Depois da dificuldade. A dificuldade na distância. São Marcos, Rio de Mouro, Arrentela. Às 07h00. Depois do comboio. Do avião. A Humilta, a Gilma, a Isis. Na ausência dos nossos "meninos", em Cabo Verde. Timor. Trinta anos. Quarenta anos. Cinquenta anos, portas fechadas na Venezuela. Santa Iria da Azóia, Sacavém. Depois da estrada. Sessenta anos. Tantos anos. Tantos meninos. Tantos idosos. Tantos no Brasil. Em São Tomé e Príncipe. O cuidado. Na graça de Deus...',
    next: "V018",
  },

  {
    id: "T020",
    row: 19,
    col: 16,
    type: "texto",
    caption: "Ao contrário da verdade",
    caption2: "V-Effeckt em Bertolt Brecht, FLUP, 2004",
    text: "(...) ainda que a realidade seja independente do homem ao contrário da verdade que, não é nem um facto nem um dado mas uma adequação entre a inteligência e o real, portanto uma propriedade da linguagem. Não se trata de uma oposição platónica entre mimésis e diégésis, pois mimese não se refere a uma representação directa da vida; pressupõe a utilização de diversos índices e signos onde a leitura linear e temporal é indispensável à construção do sentido.",
    next: "V006",
  },

  {
    id: "T021",
    row: 22,
    col: 28,
    type: "texto",
    caption: "Estados hipnóticos",
    caption2: "V-Effeckt em Bertolt Brecht, FLUP, 2004",
    text: "A sala deve perder a sua aura mágica própria do teatro clássico e não deve explorar qualquer mecanismo que favoreça estados hipnóticos. Devemo-nos abster de criar sobre o palco qualquer atmosfera particular (...) Não se deve aquecer o espectador por nenhum tipo de jogo, seja ele resultado do encadeamento do drama seja pela criação de cenas potenciadoras desse estado. Não se deve dar a ilusão de que o que se assiste é um acontecimento natural que se dá pela primeira vez.",
    next: "T016",
  },

  {
    id: "T022",
    row: 11,
    col: 17,
    type: "texto",
    caption: "Acto de compreensão",
    caption2: "V-Effeckt em Bertolt Brecht, FLUP, 2004",
    text: "A distância como acto de compreensão (compreender – não compreender – compreender) negação da negação.",
    next: "F023",
  },

  {
    id: "T024",
    row: 11,
    col: 2,
    type: "texto",
    caption: "A aparência sensível das coisas",
    caption2:
      "Efeminização em António e Cleópatra de William Shakespeare, FLUP, 2004",
    text: "Se a realidade não se identifica com a aparência, então abre a porta ao conhecimento inteligível, procura ver as coisas tal qual são e não como parecem, procura um fundamento estável ao contrário do conhecimento sensível; mas como podemos dissociar aquilo que é, da representação que temos? Podemos estabelecer diferentes níveis de leitura que se afastam ou sobrepõem conforme o nosso entendimento de verdade. Afinal a realidade aproxima-se da verdade tanto quanto se afasta da aparência, no entanto a não verdade, não é veículo para a aparência pois o conhecimento sensível é, também ele, motor para a percepção da realidade; afinal não somos apenas produto de um logos, somos também propriedade do conhecimento sensível e seremos verdade por inteiro, um movimento que transporta para o aparente uma propriedade do real.",
    next: "F128",
  },

  {
    id: "T025",
    row: 16,
    col: 7,
    type: "texto",
    caption: "Efeminização",
    caption2:
      "Efeminização em António e Cleópatra de William Shakespeare, FLUP, 2004",
    text: "Um herói a quem a amante alcooliza e veste com as suas roupas (...) de mulher. Um herói travestido de mulher assim como os rapazes actores. Um rapaz vestido de mulher que veste, também de mulher, um homem. Que veste o homem.",
    next: "F062",
  },

  {
    id: "T026",
    row: 11,
    col: 27,
    type: "texto",
    caption: "Natureza essencial",
    caption2:
      "Efeminização em António e Cleópatra de William Shakespeare, FLUP, 2004",
    text: "(...) o monstruoso como o que não tem uma natureza essencial, porque não tem um género essencial, por fim podemos ver que a diferença entre os dois termos opostos monstruoso e sem uma natureza essencial esvazia-se perante a ideia de androginia. Para os defensores deste modelo, o actor hermafrodita, o rapaz com propriedades de ambos os sexos, transforma-se na personificação de tudo o que é assustador no eu.",
    next: "F152",
  },

  {
    id: "T027",
    row: 18,
    col: 19,
    type: "texto",
    caption: "O texto e o mundo",
    caption2:
      "Efeminização em António e Cleópatra de William Shakespeare, FLUP, 2004",
    text: 'Afinal tal como o nosso mundo está em constante movimento assim está também a obra literária, o texto e o mundo constroem juntos o texto e o mundo. (...) "as obras de ficção em literatura e as suas correlativas noutras artes desempenham um papel preeminente na feitura do mundo; os nossos mundos são tanto uma herança dos cientistas, biógrafos e historiadores como o são dos romancistas, dos dramaturgos e dos pintores" - Nelson Goodman',
    next: "T013",
  },

  {
    id: "T028",
    row: 15,
    col: 37,
    type: "texto",
    caption: "Ich Bin Kein Berliner",
    caption2: "Ich Bin Kein Berliner, TNSJ, Porto, 2009",
    text: "Ich Bin Kein Berliner (Eu não sou Berlinense) nomeia a frase empática que John F Kennedy proferiu diante do Muro de Berlim: Ich Bin Berliner – Eu sou Berlinense (1963). Diferente da solidariedade de Kennedy, a Alemanha e outros países do norte da Europa desprezaram os países do sul durante a crise financeira global que teve início em 2008, apelidando-os de PIIGS.\n\nA exposição Ich Bin Kein Berliner reúne um conjunto de treze fotografias de grande dimensão, os rostos do elenco da produção Os Tambores na Noite de Bertolt Brecht com encenação de Nuno Carinhas.",
    next: "F102",
  },

  {
    id: "T030",
    row: 10,
    col: 31,
    type: "texto",
    caption: "O meu corpo",
    caption2: "António, Oficina de Escrita – Textos Escolhidos, TNSJ, 2011",
    text: "... Não tenho memórias... o meu corpo não guarda memórias... Do teu. Ninguém bate à porta... nunca... Devo partir... Devo voltar... a casa... Maria continua a olhar... voltar ao caos... à fome. A cama da Maria está húmida... de lágrimas. Queres... queres que as lágrimas se misturem com a saliva... Queres? Queres que a humidade das lágrimas dê lugar à humidade do esperma? Queres? ...que te foda. A solidão... Nunca bateram à porta... nunca... o carteiro. Uma vez por mês... mas o carteiro... O cheque... Há quatro dias abri a caixa do correio... minimercado... fechei a porta.",
    next: "V039",
  },

  {
    id: "T031",
    row: 5,
    col: 33,
    type: "texto",
    caption: "Abre a porta",
    caption2: "António, Oficina de Escrita – Textos Escolhidos, TNSJ, 2011",
    text: "No verão a chave não entrou... a chave não entrou na fechadura... bato... A minha Fátima abre a porta... olha-me com surpresa... Doze anos, a Fátima já tem doze anos... linda! Está muda... eu digo COM LICENÇA. Dou-lhe um beijo e digo COM LICENÇA... Limpo os pés, digo COM LICENÇA e entro. Com licença... para entrar na minha casa... bato à porta... a Fátima já tem doze anos... feitos em Maio... nasceram todas em Maio... as três meninas... a Fátima é a mais nova... todos os anos em Agosto abri aquela porta...",
    next: "F013",
  },

  {
    id: "T032",
    row: 4,
    col: 4,
    type: "texto",
    caption: "Duas camas",
    caption2: "António, Oficina de Escrita – Textos Escolhidos, TNSJ, 2011",
    text: "Nem havia aguardente em casa. À noite, no quarto, duas camas... duas camas, uma para mim outra para a ela... e ela nem estava lá... e eu sem memórias... o meu corpo sem memorias. E duas camas... uma vazia...",
    next: "F219",
  },

  {
    id: "T033",
    row: 22,
    col: 10,
    type: "texto",
    caption: "A cama está fria",
    caption2: "António, Oficina de Escrita – Textos Escolhidos, TNSJ, 2011",
    text: "A cama está fria. A tua cama está húmida... de lágrimas? Já não! Depois do jantar o sofá... um copo de aguardente... outro... depois outro... e depois outro. Já é tarde, ninguém bate à porta... não há memória... Com frio.... Nunca batem à porta. Não há memória para o calor, para a humidade... não me lembro... do calor das lágrimas... aqui dentro... cresce com o desejo que as lágrimas lamentam... de que não me lembro. Sempre a mesma rotina... trinta anos... pegar às oito, sair às cinco, meia hora de almoço... trinta anos... acordar... Acordar e sair.",
    next: "V030",
  },

  {
    id: "T035",
    row: 13,
    col: 7,
    type: "texto",
    caption: "Boi não é um boi",
    caption2:
      'Para lá do Hábito ou "Boi" não é um Boi, Figurinos, Edições Afrontamento, 2018',
    text: "'E' tem assim uma tarefa a cumprir, a responsabilidade sobre a construção do significado do que lhe é dado a ver, sobre a compreensão da coisa cénica. Mais, é-lhe exigido o conhecimento dos códigos teatrais, da simbologia dos signos, da função da ficção; este é o bilhete que 'E' deve adquirir para se poder sentar, em total liberdade, defronte da cena teatral. A cena é diversa da realidade, ainda que possa enunciar um mundo possível não abandona, nunca, a propriedade do valor simbólico (...)",
    next: "F020",
  },

  {
    id: "T036",
    row: 14,
    col: 28,
    type: "texto",
    caption: "Uncanny",
    caption2:
      'Para lá do Hábito ou "Boi" não é um Boi, Figurinos, Edições Afrontamento, 2018',
    text: "Em The Uncanny Freud descreve um estado de estranho desconforto diante de um objecto familiar mas desconhecido; familiar porque pertence ao arquétipo universal, desconhecido porque não o compreendemos. Um fantasma, a morte, uma boneca viva, um animal falante, membros decepados, um morto-vivo. O uncanny refere-se a um modo de atracção e repulsa simultâneos, criando um efeito de desordem cognitiva que resulta, frequentemente, na recusa do objecto; este estado verifica-se com frequência em lugares do conhecimento onde a fronteira entre ficção e realidade é esbatida.",
    next: "F223",
  },

  {
    id: "T037",
    row: 14,
    col: 8,
    type: "texto",
    caption: "Linear e Pictórico",
    caption2:
      'Para lá do Hábito ou "Boi" não é um Boi, Figurinos, Edições Afrontamento, 2018',
    text: 'Ver por linhas é diverso do ver por manchas, linear e pictórico são dois modos sensíveis opostos, duas línguas diferentes. Ver por linhas é linear e táctil porque define o limite do objecto, promove o seu contorno, permite ao leitor a ideia de tocar as suas margens, ver por manchas, pelo contrário, é um modo pictórico e óptico porque promove a ideia de "uma percepção flutuante e esfumada da forma, dissolve a continuidade dos contornos, confere autonomia à composição..." (Perniola, 1998: 54),',
    next: "F280",
  },

  {
    id: "T038",
    row: 20,
    col: 22,
    type: "texto",
    caption: "Norma e Simetria",
    caption2:
      'Para lá do Hábito ou "Boi" não é um Boi, Figurinos, Edições Afrontamento, 2018',
    text: "Norma e simetria para o táctil, excepcional e insólito para o óptico; pela dissolução da forma, o óptico tende para o infinito, o informe, o abundante. A aparência da Morte rompe com o corpo-padrão do drama burguês, opõe-se ao paradigma da figuração no teatro naturalista e, através dos princípios da semiologia, permite leituras implicadas, particulares. Este corpo nu, estranho ao Teatro Nacional, ao naturalismo, ao domínio publico, abre-se enquanto conhecimento sensível — através do analógico — ao afecto.",
    next: "V005",
  },

  {
    id: "T039",
    row: 7,
    col: 25,
    type: "texto",
    caption: "Perceptos",
    caption2:
      'Para lá do Hábito ou "Boi" não é um Boi, Figurinos, Edições Afrontamento, 2018',
    text: '"Os perceptos não são já percepções, são independentes de um estado dos que as experimentaram; os afectos não são já sentimentos ou afecções, excedem a força dos que passam por eles." (Deleuze/Guattari, 1992: 144). Gil Deleuze e Félix Guattari nomeiam o percepto e o afecto como os dois tipos básicos de sensação de que a obra de arte é um compósito; não devem ser confundidos com o sentimento pessoal, são blocos de sensações autónomos e auto-suficientes que vão para além do sujeito, são impessoais, não devem nada àqueles que os experimentam. Perceptos e afectos resultam da experiência sensível através de lugares não previstos, não familiares, onde ocorre novo conhecimento, novas relações livres do peso do significado. Marcas de natureza analógica que estabelecem pontos de fuga, agentes de deformação.',
    next: "F051",
  },

  {
    id: "T040",
    row: 8,
    col: 38,
    type: "texto",
    caption: "A rejeição do não-padrão",
    caption2:
      'Para lá do Hábito ou "Boi" não é um Boi, Figurinos, Edições Afrontamento, 2018',
    text: "A rejeição do corpo magro que é tantas coisas para lá da magreza, embora por via desta, é a rejeição do não-padrão, não de qualidade física mas de qualidade sensível. Não de qualidade digital mas de qualidade analógica. 'E' rejeita a Morte, que rejeita 'E'. Não se trata de rejeição sobre o desconhecido mas sobre o devir, sobre sensação e sobre afinidade — na verdade, nem sabemos se se trata de rejeição, pois apenas conhecemos a sua verbalização. Costelas impróprias para o palco? 'E' impróprio para a plateia? Não! O percepto não resulta nem tem lugar por via de processos binários, a sua recusa exige reconhecimento, logo, é composto pela mesma matéria: o sensível. Trata-se então de um jogo, 'E' recusa um conjunto de linhas de fuga que a desterritorialização produziu sobre o corpo da actriz, optando por outras linhas de fuga. Quais? Não saberemos. Mas conhecemos o corpo da Morte e conhecemos a sua potência.",
    next: "V022",
  },

  {
    id: "T041",
    row: 8,
    col: 22,
    type: "texto",
    caption: "Aparência",
    caption2:
      'Para lá do Hábito ou "Boi" não é um Boi, Figurinos, Edições Afrontamento, 2018',
    text: "Significante e significado divergem, a aparência sobrepõe-se à ideia mental do objecto; aqui, a linguagem de natureza analógica bloqueia a relação de convenção que deveria dar lugar ao reconhecimento do signo. A magreza na seminudez corrompe o significado da Morte. O nú, só por si, provoca uma \"estranheza inquietante\" (Pavis 2003: 165), condição que 'E' deveria ter presente. Não deve a figura da Morte causar desconforto, inquietação? Existe uma linha entre bom e mau desconforto?",
    next: "F240",
  },

  {
    id: "T042",
    row: 15,
    col: 27,
    type: "texto",
    caption: "Afinidade",
    caption2:
      "Fixar o Que Não Pode Ser Fixado, Teatro do Vestido – um dicionário, TNDM II – Bicho do Mato, 2018",
    text: '(…) Não sobre as qualidades da sua dramaturgia mas sobre afinidade, sobre imanência, sobre blocos de sensações. Percepto, palimpsesto, rizoma. Os conceitos, agora lentes, lupas que explodem no interior da cena; domínios que me ferem, que me desfazem, que me alimentam. (…)\n\n "O acto de resistência, parece-me, tem dois lados: é humano e é também um acto artístico. Apenas o acto de resistência resiste à morte, seja na forma de uma obra de arte, seja na forma de uma luta de homens." (Deleuze, 1987)',
    next: "T025",
  },

  {
    id: "T043",
    row: 9,
    col: 29,
    type: "texto",
    caption: "Percepto e Afecto",
    caption2:
      "Fixar o Que Não Pode Ser Fixado, Teatro do Vestido – um dicionário, TNDM II – Bicho do Mato, 2018",
    text: "A obra de arte é independente do leitor, do seu modelo, do seu autor. Estes experimentam-na, de modo diverso, por via de um conjunto de sensações vitais que os aproxima do conhecimento sensível. Percepto e afecto sobrevivem, explodem na inverosimilhança geométrica, na imperfeição física, na anomalia orgânica.",
    next: "F155",
  },

  {
    id: "T044",
    row: 11,
    col: 33,
    type: "texto",
    caption: "Apelar ao dionisíaco",
    caption2:
      "Fixar o Que Não Pode Ser Fixado, Teatro do Vestido – um dicionário, TNDM II – Bicho do Mato, 2018",
    text: "Apelar ao dionisíaco por via da festa, da comida, do vinho, da música, da acção do espectador. Abrir para a ruptura do corpo, para a ruptura da personalidade, para a ruptura da individualidade.",
    next: "V027",
  },

  {
    id: "T045",
    row: 5,
    col: 19,
    type: "texto",
    caption: "Uma ideia é um acontecimento",
    caption2:
      "Fixar o Que Não Pode Ser Fixado, Teatro do Vestido – um dicionário, TNDM II – Bicho do Mato, 2018",
    text: "Tradicionalmente a produção de conhecimento organiza-se de modo hierárquico e articulado. Vertical. Parte de um acontecimento – uma ideia é um acontecimento - e desenvolve-se sequencialmente, inscrito em procedimentos lineares onde o novo pressuposto é uma variante directa do anterior. Encontramos no último passo do conhecimento vestígios do primeiro passo, seja qual for a distância – ou o tempo – que os separam. Uma árvore: raiz, tronco, ramos, folhas. A folha contém toda a informação sobre a natureza da árvore, a folha contém em si toda a sua história. O mesmo para os ramos, para o tronco, para as raízes, todos contêm a história do seu passado. A folha-conhecimento guarda consigo o percurso raiz-folha. (…) (agora) o conhecimento é produzido de modo diverso, não há uma raiz, uma única semente que dá lugar a ramos, a folhas. Não existe o procedimento linear. Existem antes inúmeras raízes que se desenvolvem não sobre a verticalidade mas em qualquer direcção, uma rede de ligações infinita sem hierarquia, sem unidades. Já não raiz mas rizoma que estabelece ligações através de qualquer ponto ainda que de natureza diversa, que não regressa a si. O rizoma não tem princípio nem fim, mas um meio por onde cresce e transborda. (depois de Gilles Deleuze & Félix Guattari)",
    next: "V050",
  },

  {
    id: "T046",
    row: 11,
    col: 30,
    type: "texto",
    caption: "Largo do Intendente",
    caption2: "Do Largo ou Do Tirar pelo Natural, folha da sala, Lisboa, 2020",
    text: "O Largo do Intendente encontra-se num estado de metamorfose como grande parte da cidade de Lisboa. (…) Alguns de nós parte, muda de lugar. Muda a sua geografia e a sua identidade que pertencia aquele lugar que já não é seu. Há de certa forma uma espécie de morte. O retrato faz o elogio do monumento, do que já não existe. Do passado. Feito ao natural, presencialmente, olhos nos olhos. De como é, se se pode dizer assim, participar numa ideia de realidade - ainda que existam realidades – que combata a ideia de fronteira. Que ao tirar pelo natural se invente um novo conhecimento, de humanidade.\nIdosos, sem-abrigo, consumidores de substâncias psicoativas, antigos lojistas. É este o corpus deste trabalho.",
    next: "F130",
  },

  {
    id: "T048",
    row: 7,
    col: 10,
    type: "texto",
    caption: "Persona",
    caption2: "Persona, folha de sala, Lisboa, 2022",
    text: "Persona é este grupo de pessoas com origens diversas que, ainda assim, partilha o que nos une: a humanidade. Como se todos pudéssemos ser qualquer um. Como se cada um de nós fosse todos por um momento. Como se, de uma vez por todas, a palavra futuro deixasse de ser uma grilheta.",
    next: "F109",
  },

  {
    id: "T049",
    row: 20,
    col: 37,
    type: "texto",
    caption: "A Cidade Fala",
    caption2:
      "A Cidade Fala – Do tirar pelo natural, folha de sala, Portimão, 2025",
    text: "(…) Em A Cidade Fala um conjunto de pescadores, de construtores navais e de antigas operárias conserveiras da fábrica Feu Hermanos – agora o Museu Municipal - sentou-se num velho banco e olhou a câmara de frente. Sem idealização, glamourização ou dramatização. Não há mais mimese da natureza como mera aparência, mas antes, mimese como jogo que penetra mais fundo na realidade do corpo. Um bisturi, como Walter Benjamin apelida a câmara fotográfica. Olhos nos olhos. Primeiro sobre o fotógrafo-câmara depois sobre o espectador-leitor. Maria, Fátima, Rosalina, Telma, Isaurinda e Virgínia trabalharam neste lugar como operárias conserveiras nas décadas de cinquenta e sessenta do século passado. Olham-nos agora a partir das paredes do museu.\n\nUm operário enquanto obra de arte? Um sacrifício? A humanidade enquanto objecto de autocontemplação?\n\nA politização da arte depois da estetização da política.",
    next: "F072",
  },
  // ===== continua aqui =====
];
