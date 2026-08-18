import React, { useState, useMemo } from "react";
import {
  Search, Menu, X, Leaf, Fish, Bird, Feather, Waves, Bug, PawPrint,
  ChevronRight, ChevronLeft, Instagram, ArrowRight, CheckCircle2, XCircle,
  Trophy, BookOpen, Globe2, ShieldAlert, Dna, Microscope, Sprout, Quote,
  Heart, Skull, Sparkles, GraduationCap, Scale, MapPin, Clock, Tag, ArrowLeft
} from "lucide-react";

/* Real species photos sourced from Wikimedia Commons (freely licensed).
   Filenames match the exact Commons file titles; commonsPhoto() builds
   a hotlinkable Special:FilePath URL with a requested width. */
function commonsPhoto(filename, width = 800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
}

/* ============================================================
   TOKENS
   Forest #16342A · Canopy #2F6F4F · Moss #8FBF8B (accent)
   Ocean #0B4F6C · Ocean-deep #063245 · Sand #D8A857
   Paper #F6F3EA · Ink #17211D
   Display: Fraunces (italic for scientific names) · Body: Inter · Data: IBM Plex Mono
   Signature: "ficha de espécime" — specimen index cards with a dashed
   collection-tag border, a catalog number, and a DNA-strand rule.
   ============================================================ */

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap";

// Foto real de Daniel Rodrigues (recorte/realce de apresentação apenas — sem alteração de rosto ou identidade)
const DANIEL_PHOTO_PLACEHOLDER = "data:image/jpeg;base64,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";

const GRUPOS = [
  { key: "mamiferos", label: "Mamíferos", icon: PawPrint, color: "#8FBF8B", emoji: "🦁" },
  { key: "aves", label: "Aves", icon: Bird, color: "#D8A857", emoji: "🦜" },
  { key: "repteis", label: "Répteis", icon: Sprout, color: "#7A9E7E", emoji: "🐍" },
  { key: "anfibios", label: "Anfíbios", icon: Leaf, color: "#5FA8A0", emoji: "🐸" },
  { key: "peixes", label: "Peixes", icon: Fish, color: "#0B4F6C", emoji: "🐠" },
  { key: "marinhos", label: "Animais Marinhos", icon: Waves, color: "#063245", emoji: "🦈" },
  { key: "invertebrados", label: "Invertebrados", icon: Bug, color: "#9C6B4F", emoji: "🕷️" },
  { key: "voadores", label: "Animais Voadores", icon: Feather, color: "#C97B4A", emoji: "🦋" },
];

const HABITATS = ["Terrestre", "Marinho", "Água doce", "Aéreo", "Subterrâneo"];

const ANIMALS = [
  {
    id: "axolote", nome: "Axolote", cientifico: "Ambystoma mexicanum", grupo: "anfibios",
    imagem: "Ambystoma mexicanum 1.jpg",
    classe: "Anfíbio", habitat: ["Água doce"], distribuicao: "Lagos de Xochimilco, México",
    alimentacao: "Carnívoro — vermes, larvas, pequenos crustáceos e peixes",
    conservacao: "Criticamente ameaçado", tamanho: "23–30 cm", expectativa: "10–15 anos",
    caracteristicas: "Mantém características de larva por toda a vida (neotenia), incluindo as brânquias externas em forma de pluma nas laterais da cabeça.",
    comportamento: "Solitário, de hábitos noturnos e movimentos lentos; vive no fundo de lagos e canais.",
    reproducao: "Fecundação externa; a fêmea deposita centenas de ovos presos a plantas aquáticas.",
    importancia: "Modelo de estudo para regeneração de tecidos e órgãos na pesquisa biomédica.",
    curiosidade: "É capaz de regenerar patas, cauda, partes do coração e até estruturas do cérebro, quase sem deixar cicatrizes.",
    mitos: [{ afirmacao: "O axolote é uma espécie de peixe.", veredito: "mito", explicacao: "É um anfíbio da família dos ambistomatídeos, um tipo de salamandra — não um peixe." }],
  },
  {
    id: "aranha-marrom", nome: "Aranha-marrom", cientifico: "Loxosceles spp.", grupo: "invertebrados",
    imagem: "Brown recluse spider, Loxosceles reclusa.jpg",
    classe: "Aracnídeo", habitat: ["Terrestre", "Subterrâneo"], distribuicao: "Américas, com destaque no Sul do Brasil",
    alimentacao: "Carnívora — pequenos insetos, capturados sem uso de teia orbicular",
    conservacao: "Não avaliada", tamanho: "1–3 cm de corpo", expectativa: "1–3 anos",
    caracteristicas: "Coloração parda, hábitos discretos; prefere frestas, entulhos, roupas e sapatos guardados.",
    comportamento: "Evita contato humano e só pica em defesa, geralmente quando pressionada contra o corpo.",
    reproducao: "Ovos depositados em sacos de seda, escondidos em locais protegidos.",
    importancia: "Indicadora de acúmulo de entulho e frestas em ambientes urbanos; controla populações de insetos.",
    curiosidade: "O veneno tem ação loxoscelismo — pode causar lesão local grave — mas a maioria das picadas é leve.",
    mitos: [{ afirmacao: "Toda picada de aranha-marrom é grave.", veredito: "mito", explicacao: "A gravidade varia conforme quantidade de veneno inoculado e resposta individual; a maioria dos casos é leve, mas procurar atendimento médico é sempre recomendado." }],
  },
  {
    id: "aranha-lobo", nome: "Aranha-lobo", cientifico: "Família Lycosidae", grupo: "invertebrados",
    imagem: "Wolf spider white bg.jpg",
    classe: "Aracnídeo", habitat: ["Terrestre"], distribuicao: "Ampla distribuição mundial, incluindo o Brasil",
    alimentacao: "Carnívora — caça ativa de insetos no solo, sem construir teia",
    conservacao: "Não avaliada", tamanho: "1–3,5 cm de corpo", expectativa: "1–2 anos",
    caracteristicas: "Pernas longas e robustas, oito olhos dispostos em três fileiras, excelente visão noturna.",
    comportamento: "Caçadora terrestre e ágil; a fêmea carrega o saco de ovos preso ao fiandeiro.",
    reproducao: "Após a eclosão, os filhotes sobem e permanecem sobre o dorso da mãe por semanas.",
    importancia: "Importante predadora natural de pragas agrícolas e domésticas.",
    curiosidade: "O nome vem do antigo hábito, hoje descartado, de compará-la a um lobo por perseguir presas em vez de esperar em teias.",
    mitos: [{ afirmacao: "Aranha-lobo é tão perigosa quanto a aranha-marrom.", veredito: "mito", explicacao: "Seu veneno tem baixa toxicidade para humanos; picadas costumam causar apenas dor e vermelhidão local." }],
  },
  {
    id: "sapo-boi", nome: "Sapo-boi", cientifico: "Rhinella schneideri", grupo: "anfibios",
    imagem: "Rococo Toad (Rhinella schneideri) (27958803304).jpg",
    classe: "Anfíbio", habitat: ["Terrestre", "Água doce"], distribuicao: "América do Sul, comum no Cerrado e Pantanal",
    alimentacao: "Carnívoro generalista — insetos, pequenos vertebrados e invertebrados",
    conservacao: "Pouco preocupante", tamanho: "Até 25 cm", expectativa: "8–10 anos",
    caracteristicas: "Um dos maiores sapos do Brasil, pele com glândulas paratoides atrás dos olhos que secretam toxina defensiva.",
    comportamento: "Hábitos noturnos e terrestres; ativo principalmente na estação chuvosa.",
    reproducao: "Desova em corpos d'água parados, em longos cordões de milhares de ovos.",
    importancia: "Controla populações de insetos e serve de presa para diversas aves e répteis.",
    curiosidade: "A secreção das glândulas paratoides é tóxica se ingerida por predadores ou animais domésticos, mas não é injetada — o sapo não pica nem ataca.",
    mitos: [{ afirmacao: "O sapo-boi é venenoso ao toque.", veredito: "mito", explicacao: "A toxina só é liberada por pressão nas glândulas e é perigosa principalmente se ingerida; o toque comum não causa envenenamento." }],
  },
  {
    id: "ra-touro", nome: "Rã-touro", cientifico: "Lithobates catesbeianus", grupo: "anfibios",
    imagem: "North-American-bullfrog1.jpg",
    classe: "Anfíbio", habitat: ["Água doce"], distribuicao: "Nativa da América do Norte; introduzida em várias regiões, incluindo o Brasil",
    alimentacao: "Carnívora oportunista — insetos, peixes, outros anfíbios e pequenos vertebrados",
    conservacao: "Pouco preocupante (espécie invasora fora de sua área nativa)", tamanho: "Até 20 cm",
    expectativa: "7–9 anos",
    caracteristicas: "Uma das maiores rãs do mundo, com coloração verde-oliva e vocalização grave que lembra o mugido de um boi.",
    comportamento: "Vive em lagoas e açudes, é territorialista e muito vocal durante a época reprodutiva.",
    reproducao: "Desova numerosa; os girinos podem levar até dois anos para completar a metamorfose.",
    importancia: "Onde é nativa, integra a cadeia alimentar; onde foi introduzida, é considerada ameaça à fauna local por predar espécies nativas.",
    curiosidade: "No Brasil é criada em ranicultura, mas exemplares soltos na natureza colocam em risco anfíbios nativos.",
    mitos: [{ afirmacao: "A rã-touro é uma espécie brasileira.", veredito: "mito", explicacao: "É originária da América do Norte e foi introduzida no Brasil para criação comercial, tornando-se invasora em ambientes naturais." }],
  },
  {
    id: "tubarao", nome: "Tubarão-branco", cientifico: "Carcharodon carcharias", grupo: "marinhos",
    imagem: "Carcharodon carcharias.jpg",
    classe: "Peixe cartilaginoso", habitat: ["Marinho"], distribuicao: "Águas costeiras e oceânicas temperadas de todo o mundo",
    alimentacao: "Carnívoro — peixes, focas, leões-marinhos e carcaças",
    conservacao: "Vulnerável", tamanho: "4–6 m", expectativa: "Estimada em 70 anos ou mais",
    caracteristicas: "Corpo fusiforme, eletrorrecepção via ampolas de Lorenzini e linha lateral sensível a vibrações na água.",
    comportamento: "Predador de topo, geralmente solitário; combina emboscada e explosões de velocidade no ataque.",
    reproducao: "Ovovivíparo — os filhotes se desenvolvem em ovos dentro do corpo da mãe e nascem já formados.",
    importancia: "Como predador de topo, regula as populações de presas e mantém o equilíbrio dos ecossistemas marinhos.",
    curiosidade: "As ampolas de Lorenzini permitem detectar os campos elétricos gerados pelos músculos de presas escondidas na areia.",
    mitos: [{ afirmacao: "Tubarões precisam nadar o tempo inteiro para não afundar ou sufocar.", veredito: "depende", explicacao: "Vale para várias espécies que dependem do movimento para respirar (ventilação por ariete), mas algumas conseguem bombear água ativamente pelas brânquias e descansar no fundo." }],
  },
  {
    id: "polvo", nome: "Polvo", cientifico: "Octopus vulgaris", grupo: "invertebrados",
    imagem: "Common octopus.jpg",
    classe: "Molusco cefalópode", habitat: ["Marinho"], distribuicao: "Oceanos tropicais e temperados",
    alimentacao: "Carnívoro — crustáceos, moluscos e pequenos peixes",
    conservacao: "Pouco preocupante", tamanho: "Até 1 m de envergadura", expectativa: "1–2 anos",
    caracteristicas: "Corpo mole sem esqueleto interno, três corações e sangue azulado rico em hemocianina.",
    comportamento: "Solitário, extremamente inteligente, capaz de resolver labirintos, abrir potes e usar ferramentas.",
    reproducao: "Semelparo — a fêmea põe um único e grande lote de ovos e morre logo após o nascimento dos filhotes.",
    importancia: "Predador que ajuda a controlar populações de crustáceos e é presa de peixes maiores e mamíferos marinhos.",
    curiosidade: "Dois corações bombeiam sangue para as brânquias e um terceiro bombeia para o restante do corpo.",
    mitos: [{ afirmacao: "O polvo é um peixe.", veredito: "mito", explicacao: "É um molusco cefalópode, grupo que também inclui lulas e chocos — sem qualquer parentesco próximo com os peixes." }],
  },
  {
    id: "onca-pintada", nome: "Onça-pintada", cientifico: "Panthera onca", grupo: "mamiferos",
    imagem: "Jaguar (Panthera onca palustris) male Three Brothers River 2.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "América Central e do Sul, com populações importantes na Amazônia e no Pantanal",
    alimentacao: "Carnívora — mais de 85 espécies de presas já registradas, de capivaras a jacarés",
    conservacao: "Quase ameaçada", tamanho: "1,1–1,85 m de corpo, mais a cauda", expectativa: "12–15 anos na natureza",
    caracteristicas: "Maior felino das Américas, com mordida entre as mais fortes proporcionalmente do reino animal, capaz de perfurar cascos de répteis.",
    comportamento: "Solitária e territorialista, excelente nadadora, ao contrário da maioria dos felinos.",
    reproducao: "Gestação de cerca de 100 dias; a fêmea cuida sozinha de 1 a 4 filhotes.",
    importancia: "Predadora de topo que regula populações de herbívoros e mantém o equilíbrio de biomas como Amazônia e Pantanal.",
    curiosidade: "Diferente de outros grandes felinos, costuma matar mordendo diretamente o crânio da presa.",
    mitos: [{ afirmacao: "Onça-pintada e jaguar são animais diferentes.", veredito: "mito", explicacao: "'Jaguar' é apenas o nome usado em inglês e em outros países para a mesma espécie, Panthera onca." }],
  },
  {
    id: "mico-leao-dourado", nome: "Mico-leão-dourado", cientifico: "Leontopithecus rosalia", grupo: "mamiferos",
    imagem: "Golden Lion Tamarin Leontopithecus rosalia.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Mata Atlântica do Rio de Janeiro, Brasil",
    alimentacao: "Onívoro — frutas, flores, insetos e pequenos vertebrados",
    conservacao: "Em perigo", tamanho: "20–34 cm de corpo, mais a cauda", expectativa: "Até 15 anos",
    caracteristicas: "Pelagem alaranjada e brilhante, juba ao redor do rosto lembrando a de um leão em miniatura.",
    comportamento: "Vive em pequenos grupos familiares e usa vocalizações para manter contato na copa das árvores.",
    reproducao: "Geralmente nascem gêmeos; o pai e outros membros do grupo ajudam a carregar e cuidar dos filhotes.",
    importancia: "Símbolo da conservação da Mata Atlântica; dispersa sementes ao se alimentar de frutas.",
    curiosidade: "Foi resgatado da beira da extinção por um dos programas de conservação mais bem-sucedidos do Brasil, com reintrodução de indivíduos nascidos em cativeiro.",
    mitos: [{ afirmacao: "O mico-leão-dourado é uma espécie de leão.", veredito: "mito", explicacao: "É um primata da família Callitrichidae; o nome vem apenas da semelhança visual da juba dourada com a de um leão." }],
  },
  {
    id: "golfinho", nome: "Golfinho-nariz-de-garrafa", cientifico: "Tursiops truncatus", grupo: "marinhos",
    imagem: "Tursiops truncatus 01.jpg",
    classe: "Mamífero", habitat: ["Marinho"], distribuicao: "Mares tropicais e temperados de todo o mundo",
    alimentacao: "Carnívoro — peixes e cefalópodes, capturados com o uso de ecolocalização",
    conservacao: "Pouco preocupante", tamanho: "2–4 m", expectativa: "40–50 anos",
    caracteristicas: "Corpo hidrodinâmico, cérebro proporcionalmente grande e sistema de ecolocalização por emissão de cliques sonoros.",
    comportamento: "Extremamente social, vive em grupos chamados manadas e demonstra comportamentos de cooperação e brincadeira.",
    reproducao: "Gestação de cerca de 12 meses; a cria permanece com a mãe por vários anos aprendendo a caçar.",
    importancia: "Predador que ajuda a equilibrar populações de peixes; espécie-bandeira para a saúde dos oceanos.",
    curiosidade: "Cada golfinho desenvolve um assovio-assinatura único, usado como se fosse um 'nome' para se identificar entre o grupo.",
    mitos: [{ afirmacao: "Golfinhos são peixes.", veredito: "mito", explicacao: "São mamíferos: respiram ar pelos pulmões, são de sangue quente e amamentam os filhotes." }],
  },
  {
    id: "elefante", nome: "Elefante-africano", cientifico: "Loxodonta africana", grupo: "mamiferos",
    imagem: "African Bush Elephant.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "África Subsaariana",
    alimentacao: "Herbívoro — capim, cascas, raízes e frutos, até 150 kg de vegetação por dia",
    conservacao: "Ameaçado", tamanho: "3–4 m de altura no ombro", expectativa: "60–70 anos",
    caracteristicas: "Maior animal terrestre vivo; a tromba tem mais de 40 mil músculos e funciona como nariz, mão e ferramenta.",
    comportamento: "Vive em grupos matriarcais liderados por uma fêmea idosa, com forte memória social e comportamento de luto.",
    reproducao: "Gestação de cerca de 22 meses, a mais longa entre os mamíferos terrestres.",
    importancia: "'Engenheiro do ecossistema': derruba árvores e abre clareiras, moldando a paisagem e criando habitat para outras espécies.",
    curiosidade: "É capaz de reconhecer seu próprio reflexo em um espelho, um sinal de autoconsciência raro no reino animal.",
    mitos: [{ afirmacao: "Elefantes têm medo de ratos.", veredito: "mito", explicacao: "Não há evidência científica de medo específico de ratos; elefantes podem reagir a movimentos rápidos e inesperados de qualquer animal pequeno." }],
  },
  {
    id: "camaleao", nome: "Camaleão", cientifico: "Família Chamaeleonidae", grupo: "repteis",
    imagem: "Chameleon (16139192778).jpg",
    classe: "Réptil", habitat: ["Terrestre"], distribuicao: "Principalmente África e Madagascar, com algumas espécies na Ásia e Europa",
    alimentacao: "Carnívoro — insetos capturados com a língua projétil, mais longa que o próprio corpo",
    conservacao: "Varia por espécie", tamanho: "2,5 cm a 68 cm, conforme a espécie", expectativa: "2–10 anos, conforme a espécie",
    caracteristicas: "Olhos que se movem de forma independente, cauda preênsil e pés em pinça adaptados para segurar galhos.",
    comportamento: "Solitário e territorialista; muda de cor também para comunicação social e regulação de temperatura.",
    reproducao: "Varia entre espécies ovíparas, que põem ovos, e ovovivíparas, que geram filhotes já formados.",
    importancia: "Controla populações de insetos e serve de presa para aves e pequenos mamíferos.",
    curiosidade: "A mudança de cor ocorre por cristais especiais na pele que refletem luz de formas diferentes conforme o humor, a temperatura e a comunicação com outros camaleões.",
    mitos: [{ afirmacao: "O camaleão muda de cor apenas para se camuflar.", veredito: "mito", explicacao: "A camuflagem é só um dos motivos; a mudança de cor também comunica humor, intenções territoriais e ajuda a regular a temperatura corporal." }],
  },
  {
    id: "leao", nome: "Leão", cientifico: "Panthera leo", grupo: "mamiferos",
    imagem: "Lion (Panthera leo) male 6y.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "África Subsaariana, com uma pequena população na Índia",
    alimentacao: "Carnívoro — zebras, búfalos e outros grandes herbívoros, caçados em grupo",
    conservacao: "Vulnerável", tamanho: "1,7–2,5 m de corpo, mais a cauda", expectativa: "10–14 anos na natureza",
    caracteristicas: "Único felino verdadeiramente social; machos adultos desenvolvem a juba característica ao redor da cabeça e do pescoço.",
    comportamento: "Vive em grupos chamados alcateias, com fêmeas parentes formando o núcleo e realizando a maior parte das caçadas.",
    reproducao: "Gestação de cerca de 110 dias; filhotes de diferentes fêmeas do grupo costumam ser amamentados coletivamente.",
    importancia: "Predador de topo que regula populações de herbívoros nas savanas africanas.",
    curiosidade: "O rugido de um leão pode ser ouvido a mais de 8 km de distância e serve para marcar território.",
    mitos: [{ afirmacao: "Os leões passam a maior parte do dia caçando.", veredito: "mito", explicacao: "Leões descansam entre 16 e 20 horas por dia; a caça é concentrada em curtos períodos, principalmente ao anoitecer." }],
  },
  {
    id: "girafa", nome: "Girafa", cientifico: "Giraffa camelopardalis", grupo: "mamiferos",
    imagem: "Giraffe (Giraffa camelopardalis) females.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Savanas e áreas abertas da África Subsaariana",
    alimentacao: "Herbívora — folhas de acácia e outras árvores altas, alcançadas com o pescoço longo",
    conservacao: "Vulnerável", tamanho: "Até 5,5 m de altura", expectativa: "20–25 anos na natureza",
    caracteristicas: "Maior animal terrestre em altura; apesar do pescoço longo, possui apenas sete vértebras cervicais, como a maioria dos mamíferos.",
    comportamento: "Vive em grupos com composição flexível; costuma dormir de pé, em períodos curtos de poucos minutos.",
    reproducao: "Gestação de cerca de 15 meses; o filhote já nasce caindo cerca de 1,8 m no chão e anda em poucas horas.",
    importancia: "Ao se alimentar do topo das árvores, molda a vegetação da savana de forma diferente de outros herbívoros.",
    curiosidade: "Cada girafa tem um padrão de manchas único, como uma impressão digital.",
    mitos: [{ afirmacao: "Girafas quase não dormem.", veredito: "verdade", explicacao: "Costumam dormir apenas de 30 minutos a poucas horas por dia, em cochilos curtos, entre os menores tempos de sono de qualquer mamífero." }],
  },
  {
    id: "arara-azul", nome: "Arara-azul-grande", cientifico: "Anodorhynchus hyacinthinus", grupo: "aves",
    imagem: "Hyacinth macaw (Anodorhynchus hyacinthinus) head.JPG",
    classe: "Ave", habitat: ["Terrestre", "Aéreo"], distribuicao: "Pantanal, Cerrado e Amazônia brasileiros",
    alimentacao: "Frugívora — especializada em quebrar cocos de palmeiras muito duros com o bico",
    conservacao: "Quase ameaçada", tamanho: "Cerca de 1 m de comprimento, a maior arara do mundo", expectativa: "Até 50 anos",
    caracteristicas: "Plumagem azul-cobalto intensa, com anéis amarelos ao redor dos olhos e na base do bico.",
    comportamento: "Vive em casais ou pequenos grupos; casais costumam permanecer juntos por toda a vida.",
    reproducao: "Nidifica em ocos de árvores grandes, como o manduvi; põe geralmente 1 a 2 ovos.",
    importancia: "Dispersa sementes de palmeiras que poucos outros animais conseguem processar.",
    curiosidade: "A força do bico é suficiente para quebrar o coco do tucum e da bocaiuva, alimentos que praticamente nenhum outro animal consegue abrir.",
    mitos: [{ afirmacao: "A arara-azul está extinta na natureza.", veredito: "mito", explicacao: "Está ameaçada, mas graças a programas de conservação de décadas, populações selvagens sobrevivem no Pantanal e em outras regiões do Brasil." }],
  },
  {
    id: "pinguim-imperador", nome: "Pinguim-imperador", cientifico: "Aptenodytes forsteri", grupo: "aves",
    imagem: "Manchot empereur - Emperor Penguin - Aptenodytes forsteri.jpg",
    classe: "Ave", habitat: ["Terrestre", "Marinho"], distribuicao: "Costa e banquisas da Antártida",
    alimentacao: "Carnívoro — peixes, krill e lulas, capturados em mergulhos profundos",
    conservacao: "Quase ameaçado", tamanho: "Até 1,2 m de altura", expectativa: "15–20 anos",
    caracteristicas: "Maior espécie de pinguim; corpo adaptado ao frio extremo, com camadas de penas e gordura isolante.",
    comportamento: "Forma grandes colônias; os machos incubam o ovo equilibrado sobre os pés durante o inverno antártico.",
    reproducao: "A fêmea põe um único ovo e o transfere ao macho, que o incuba por cerca de dois meses sem se alimentar.",
    importancia: "Indicador da saúde dos ecossistemas antárticos e da extensão do gelo marinho.",
    curiosidade: "Consegue mergulhar a mais de 500 metros de profundidade e prender a respiração por mais de 20 minutos.",
    mitos: [{ afirmacao: "Todos os pinguins vivem em regiões de gelo.", veredito: "mito", explicacao: "Várias espécies de pinguim vivem em climas temperados ou até tropicais, como o pinguim-de-Galápagos; o pinguim-imperador é uma exceção adaptada ao frio extremo." }],
  },
  {
    id: "tartaruga-marinha", nome: "Tartaruga-verde", cientifico: "Chelonia mydas", grupo: "marinhos",
    imagem: "Green sea turtle (Chelonia mydas) Moorea.jpg",
    classe: "Réptil", habitat: ["Marinho"], distribuicao: "Oceanos tropicais e subtropicais de todo o mundo, incluindo o litoral brasileiro",
    alimentacao: "Herbívora na fase adulta — algas e plantas marinhas; onívora quando jovem",
    conservacao: "Em perigo", tamanho: "Até 1,5 m de carapaça", expectativa: "60–70 anos",
    caracteristicas: "Nome popular vem da coloração esverdeada da gordura interna, não da carapaça, que é geralmente marrom-oliva.",
    comportamento: "Migra por milhares de quilômetros entre áreas de alimentação e as praias onde nasceu para desovar.",
    reproducao: "A fêmea retorna à praia natal para enterrar os ovos na areia; a temperatura do ninho define o sexo dos filhotes.",
    importancia: "Ao pastar em campos de algas marinhas, mantém esses ecossistemos saudáveis para outras espécies.",
    curiosidade: "Fêmeas conseguem retornar, décadas depois, para desovar na mesma praia onde nasceram, guiadas pelo campo magnético da Terra.",
    mitos: [{ afirmacao: "Tartarugas marinhas podem recolher a cabeça dentro do casco.", veredito: "mito", explicacao: "Diferente das tartarugas terrestres, as marinhas têm o pescoço curto e não conseguem recolhê-lo para dentro da carapaça." }],
  },
  {
    id: "baleia-azul", nome: "Baleia-azul", cientifico: "Balaenoptera musculus", grupo: "marinhos",
    imagem: "Blue Whale 001 body bw.jpg",
    classe: "Mamífero", habitat: ["Marinho"], distribuicao: "Todos os oceanos, exceto o Ártico",
    alimentacao: "Filtradora — alimenta-se quase exclusivamente de krill, filtrado pelas barbatanas na boca",
    conservacao: "Em perigo", tamanho: "Até 30 m de comprimento", expectativa: "80–90 anos",
    caracteristicas: "Maior animal já existente no planeta, incluindo os dinossauros; o coração pode pesar mais de 180 kg.",
    comportamento: "Geralmente solitária ou em pares; realiza longas migrações entre áreas de alimentação polares e reprodução em águas mais quentes.",
    reproducao: "Gestação de 10 a 12 meses; nasce um único filhote, que já mede cerca de 7 metros.",
    importancia: "Seus dejetos ricos em nutrientes fertilizam o fitoplâncton, base de toda a cadeia alimentar marinha.",
    curiosidade: "Pode consumir até 4 toneladas de krill por dia durante a temporada de alimentação.",
    mitos: [{ afirmacao: "A baleia-azul é um peixe gigante.", veredito: "mito", explicacao: "É um mamífero: respira ar pelos pulmões, é de sangue quente e amamenta o filhote." }],
  },
  {
    id: "abelha", nome: "Abelha-europeia", cientifico: "Apis mellifera", grupo: "invertebrados",
    imagem: "Apis mellifera Western honey bee.jpg",
    classe: "Inseto", habitat: ["Terrestre", "Aéreo"], distribuicao: "Nativa da Europa, África e Ásia; introduzida em quase todo o mundo",
    alimentacao: "Néctar e pólen de flores",
    conservacao: "Não avaliada (populações selvagens em declínio em várias regiões)", tamanho: "12–15 mm", expectativa: "Semanas (operárias) a poucos anos (rainha)",
    caracteristicas: "Inseto eussocial que vive em colônias organizadas com rainha, operárias e zangões.",
    comportamento: "Comunica a localização de fontes de alimento a outras operárias por meio de uma 'dança' com movimentos específicos.",
    reproducao: "Apenas a rainha se reproduz na colônia; pode botar milhares de ovos por dia durante a estação favorável.",
    importancia: "Principal polinizadora de lavouras e plantas silvestres, essencial para a produção de boa parte dos alimentos consumidos no mundo.",
    curiosidade: "Uma colônia pode conter dezenas de milhares de indivíduos e produzir vários quilos de mel por ano.",
    mitos: [{ afirmacao: "Toda abelha morre depois de picar.", veredito: "depende", explicacao: "Vale para as operárias da abelha-europeia, cujo ferrão farpado fica preso na pele; rainhas e muitas outras espécies de abelha conseguem picar mais de uma vez." }],
  },
  {
    id: "borboleta-monarca", nome: "Borboleta-monarca", cientifico: "Danaus plexippus", grupo: "voadores",
    imagem: "Monarch Butterfly Danaus plexippus on Echinacea purpurea 2800px.jpg",
    classe: "Inseto", habitat: ["Aéreo", "Terrestre"], distribuicao: "Américas, com populações migratórias na América do Norte",
    alimentacao: "Néctar de flores (adulta); folhas de asclépias (lagarta)",
    conservacao: "Ameaçada", tamanho: "9–10 cm de envergadura", expectativa: "2–6 semanas (gerações de verão); até 8 meses (geração migratória)",
    caracteristicas: "Asas alaranjadas com veios e bordas pretas e pequenas manchas brancas, um padrão de aviso a predadores.",
    comportamento: "Realiza uma das migrações mais longas entre os insetos, percorrendo milhares de quilômetros ao longo de várias gerações.",
    reproducao: "A lagarta se alimenta exclusivamente de plantas do gênero asclépia antes de formar a crisálida.",
    importancia: "Polinizadora e elo da cadeia alimentar; sua migração é um fenômeno estudado como indicador ambiental.",
    curiosidade: "As toxinas acumuladas das asclépias na fase de lagarta tornam a borboleta adulta desagradável para a maioria dos predadores.",
    mitos: [{ afirmacao: "A mesma borboleta-monarca faz toda a viagem de ida e volta da migração.", veredito: "mito", explicacao: "A migração completa geralmente leva várias gerações; nenhum indivíduo isolado costuma completar sozinho o ciclo de ida e volta." }],
  },
  {
    id: "piranha-vermelha", nome: "Piranha-vermelha", cientifico: "Pygocentrus nattereri", grupo: "peixes",
    imagem: "Gregory Moine - Red bellied Piranha (by).jpg",
    classe: "Peixe", habitat: ["Água doce"], distribuicao: "Bacias dos rios Amazonas, Paraguai e Paraná, na América do Sul",
    alimentacao: "Onívora — peixes, insetos, frutos e restos de outros animais",
    conservacao: "Pouco preocupante", tamanho: "Até 33 cm", expectativa: "8–10 anos",
    caracteristicas: "Corpo robusto, ventre avermelhado e dentes triangulares afiados encaixados como uma tesoura.",
    comportamento: "Vive em cardumes, o que oferece proteção contra predadores mais do que serve para caçar coletivamente.",
    reproducao: "Desova em áreas de vegetação submersa; os pais defendem o ninho contra outros animais.",
    importancia: "Como predadora e também presa de aves e mamíferos aquáticos, ajuda a equilibrar as cadeias alimentares de rios amazônicos.",
    curiosidade: "Apesar da fama de agressividade extrema, ataques a humanos são raros e geralmente ligados a águas rasas, peixes feridos ou períodos de seca.",
    mitos: [{ afirmacao: "Um cardume de piranhas consegue devorar uma pessoa em segundos.", veredito: "mito", explicacao: "Esse comportamento é raríssimo e associado a condições muito específicas, como águas com pouquíssimo alimento; a maioria dos encontros com humanos não causa ferimentos graves." }],
  },
  {
    id: "peixe-palhaco", nome: "Peixe-palhaço", cientifico: "Amphiprion ocellaris", grupo: "peixes",
    imagem: "Amphiprion ocellaris (Clown anemonefish) by Nick Hobgood.jpg",
    classe: "Peixe", habitat: ["Marinho"], distribuicao: "Recifes de coral do Indo-Pacífico",
    alimentacao: "Onívoro — pequenos invertebrados, algas e restos de alimento da anêmona onde vive",
    conservacao: "Pouco preocupante", tamanho: "Até 11 cm", expectativa: "6–10 anos",
    caracteristicas: "Corpo alaranjado com três faixas brancas bordadas de preto; um muco especial na pele o protege dos tentáculos urticantes da anêmona.",
    comportamento: "Vive em relação de mutualismo com anêmonas-do-mar: recebe proteção e, em troca, afasta peixes que comeriam a anêmona.",
    reproducao: "Todos nascem machos; o peixe dominante do grupo se transforma em fêmea, um fenômeno chamado hermafroditismo sequencial.",
    importancia: "Parte de um dos exemplos mais conhecidos de mutualismo animal, ajudando a manter o equilíbrio dos recifes de coral.",
    curiosidade: "Ficou mundialmente conhecido pelo filme 'Procurando Nemo', o que aumentou a demanda pela espécie no comércio de aquarismo.",
    mitos: [{ afirmacao: "O peixe-palhaço é imune ao veneno de qualquer anêmona.", veredito: "mito", explicacao: "É resistente apenas às espécies de anêmona com as quais evoluiu em parceria; em outras espécies de anêmona pode ser afetado normalmente pelas células urticantes." }],
  },
  {
    id: "jacare-papo-amarelo", nome: "Jacaré-de-papo-amarelo", cientifico: "Caiman latirostris", grupo: "repteis",
    imagem: "Jacare de papo amarelo zoo.jpg",
    classe: "Réptil", habitat: ["Água doce"], distribuicao: "Rios, lagoas e brejos do Brasil, Uruguai, Paraguai e norte da Argentina",
    alimentacao: "Carnívoro — caramujos, peixes, crustáceos e pequenos vertebrados",
    conservacao: "Pouco preocupante", tamanho: "Até 3,5 m", expectativa: "Até 50 anos",
    caracteristicas: "Focinho mais largo e arredondado que o de outros jacarés, com a garganta amarelada que dá nome à espécie.",
    comportamento: "Semiaquático, mais ativo ao entardecer e à noite; costuma tomar sol nas margens durante o dia.",
    reproducao: "A fêmea constrói um ninho de vegetação em decomposição, cujo calor incuba os ovos.",
    importancia: "Como predador de topo em ambientes de água doce, ajuda a controlar populações de moluscos e peixes.",
    curiosidade: "Foi uma das primeiras espécies brasileiras de crocodiliano a se recuperar de perto da extinção graças a programas de manejo sustentável.",
    mitos: [{ afirmacao: "Todo jacaré avistado em rios brasileiros é uma ameaça a pessoas.", veredito: "mito", explicacao: "O jacaré-de-papo-amarelo é naturalmente arisco e evita o contato humano; a maioria dos encontros não envolve risco quando o animal não é provocado." }],
  },
  {
    id: "cobra-coral", nome: "Cobra-coral-verdadeira", cientifico: "Micrurus corallinus", grupo: "repteis",
    imagem: "Cobra-Coral (Micrurus corallinus).jpg",
    classe: "Réptil", habitat: ["Terrestre"], distribuicao: "Mata Atlântica do Sul e Sudeste do Brasil, Paraguai e Argentina",
    alimentacao: "Carnívora — especializada em outras cobras e cobras-cegas (anfisbenas)",
    conservacao: "Pouco preocupante", tamanho: "60–90 cm", expectativa: "Pouco documentada, estimada em vários anos",
    caracteristicas: "Anéis vermelhos, pretos e brancos/amarelos ao redor do corpo; possui presas fixas na frente da boca (peçonhenta).",
    comportamento: "Hábitos fossoriais e discretos, passa a maior parte do tempo enterrada ou sob folhiço.",
    reproducao: "Ovípara; põe um pequeno número de ovos em locais úmidos e protegidos.",
    importancia: "Regula populações de outras serpentes e cobras-cegas no ambiente onde vive.",
    curiosidade: "Cobras-corais verdadeiras (gênero Micrurus) são frequentemente confundidas com espécies não peçonhentas de padrão parecido — diferenciá-las com segurança exige conhecimento especializado.",
    mitos: [{ afirmacao: "É fácil diferenciar cobra-coral verdadeira de falsa coral pela contagem de anéis.", veredito: "mito", explicacao: "Regras populares de contagem de anéis não são confiáveis para todas as espécies; a identificação seguindo critérios científicos deve ser feita por especialistas, nunca por quem encontrou o animal." }],
  },
  {
    id: "dragao-komodo", nome: "Dragão-de-komodo", cientifico: "Varanus komodoensis", grupo: "repteis",
    imagem: "Komodo dragon (Varanus komodoensis).jpg",
    classe: "Réptil", habitat: ["Terrestre"], distribuicao: "Ilhas de Komodo, Rinca, Flores e Gili Motang, na Indonésia",
    alimentacao: "Carnívoro — desde pequenos roedores até búfalos-d'água, que caça por emboscada",
    conservacao: "Em perigo", tamanho: "Até 3 m", expectativa: "Cerca de 30 anos",
    caracteristicas: "Maior lagarto vivo do mundo, com mordida que combina dentes serrilhados e glândulas de veneno que dificultam a coagulação do sangue da presa.",
    comportamento: "Solitário e territorialista; filhotes vivem nas árvores nos primeiros anos para escapar de adultos, que podem ser canibais.",
    reproducao: "Ovípara; fêmeas de algumas populações isoladas já demonstraram partenogênese, reproduzindo-se sem macho.",
    importancia: "Como maior predador das ilhas onde vive, regula populações de herbívoros como o cervo-de-timor.",
    curiosidade: "Consegue sentir o cheiro de uma carcaça a vários quilômetros de distância usando a língua bifurcada, que 'prova' o ar.",
    mitos: [{ afirmacao: "O dragão-de-komodo mata as presas só com bactérias da boca.", veredito: "mito", explicacao: "Pesquisas mostraram que ele possui glândulas de veneno que causam queda de pressão e dificultam a coagulação do sangue da presa — o principal mecanismo, e não apenas contaminação bacteriana como se pensava antigamente." }],
  },
  {
    id: "coruja-buraqueira", nome: "Coruja-buraqueira", cientifico: "Athene cunicularia", grupo: "aves",
    imagem: "Burrowing owl (Athene cunicularia).jpg",
    classe: "Ave", habitat: ["Terrestre", "Subterrâneo"], distribuicao: "Américas, do Canadá à Patagônia, incluindo todo o Brasil",
    alimentacao: "Carnívora — insetos, pequenos roedores, lagartos e ocasionalmente outras aves",
    conservacao: "Pouco preocupante", tamanho: "19–25 cm", expectativa: "6–8 anos",
    caracteristicas: "Pernas compridas para uma coruja, hábito diurno incomum entre corujas e olhos amarelos vivos.",
    comportamento: "Vive em tocas no solo, muitas vezes reaproveitadas de tatus ou outros animais escavadores, e é ativa também durante o dia.",
    reproducao: "Põe de 6 a 12 ovos por ninhada em galerias subterrâneas, número alto entre as aves de rapina.",
    importancia: "Controla populações de insetos e pequenos roedores em campos e áreas abertas.",
    curiosidade: "Quando ameaçada dentro da toca, pode imitar o som de uma cascavel chocalhando a cauda, afastando predadores.",
    mitos: [{ afirmacao: "Toda coruja só caça à noite.", veredito: "mito", explicacao: "A coruja-buraqueira é uma exceção conhecida: caça e forrageia também durante o dia, diferente da maioria das espécies de coruja." }],
  },
  {
    id: "tucano-toco", nome: "Tucano-toco", cientifico: "Ramphastos toco", grupo: "aves",
    imagem: "Toco toucan (Ramphastos toco).jpg",
    classe: "Ave", habitat: ["Terrestre", "Aéreo"], distribuicao: "Savanas e bordas de floresta da América do Sul, incluindo Cerrado e Pantanal",
    alimentacao: "Onívoro — frutas, insetos, pequenos répteis e ocasionalmente ovos de outras aves",
    conservacao: "Pouco preocupante", tamanho: "55–65 cm", expectativa: "Até 20 anos em cativeiro",
    caracteristicas: "Maior espécie de tucano, com bico enorme, leve e colorido, que pode chegar a quase 20 cm de comprimento.",
    comportamento: "Vive em pequenos grupos e usa o bico grande também para regular a temperatura corporal, liberando calor.",
    reproducao: "Nidifica em ocos de árvores; o casal reveza a incubação dos ovos.",
    importancia: "Importante dispersor de sementes de diversas espécies de plantas ao engolir frutos inteiros.",
    curiosidade: "Apesar do tamanho, o bico é feito de queratina leve e estruturas internas ocas, o que o torna surpreendentemente leve para seu volume.",
    mitos: [{ afirmacao: "O bico grande do tucano atrapalha seu voo.", veredito: "mito", explicacao: "Por ser leve e oco por dentro, o bico não compromete significativamente o voo; sua principal função é alcançar frutos e ajudar na troca de calor do corpo." }],
  },
  {
    id: "gaviao-real", nome: "Gavião-real", cientifico: "Harpia harpyja", grupo: "aves",
    imagem: "Harpia-harpyja-001.jpg",
    classe: "Ave", habitat: ["Terrestre", "Aéreo"], distribuicao: "Florestas tropicais da América Central e do Sul, incluindo a Amazônia",
    alimentacao: "Carnívora — preguiças, macacos e outros mamíferos arborícolas de médio porte",
    conservacao: "Quase ameaçado", tamanho: "89–102 cm de comprimento; até 2 m de envergadura", expectativa: "25–35 anos",
    caracteristicas: "Uma das maiores e mais poderosas águias do mundo, com garras que podem chegar a 12,5 cm de comprimento.",
    comportamento: "Solitário e territorialista, caça emboscando presas ao voar rapidamente entre a copa das árvores.",
    reproducao: "Põe geralmente 1 a 2 ovos, mas cuida de apenas um filhote por vez, que permanece dependente dos pais por quase um ano.",
    importancia: "Predador de topo que indica a saúde de florestas tropicais bem preservadas.",
    curiosidade: "Suas garras são comparadas em tamanho às de um urso, adaptadas para capturar presas pesadas em pleno voo.",
    mitos: [{ afirmacao: "O gavião-real ataca humanos com frequência.", veredito: "mito", explicacao: "Apesar do porte imponente, ataques a humanos são extremamente raros; a espécie se alimenta de presas específicas como preguiças e macacos." }],
  },
  {
    id: "morcego-vampiro", nome: "Morcego-vampiro", cientifico: "Desmodus rotundus", grupo: "voadores",
    imagem: "Common vampire bat, Desmodus rotundus.jpg",
    classe: "Mamífero", habitat: ["Terrestre", "Aéreo", "Subterrâneo"], distribuicao: "México, América Central e América do Sul, incluindo o Brasil",
    alimentacao: "Hematófaga — alimenta-se do sangue de mamíferos, principalmente gado",
    conservacao: "Pouco preocupante", tamanho: "7–9 cm de corpo", expectativa: "Até 12 anos em cativeiro",
    caracteristicas: "Dentes incisivos afiados como lâminas e uma saliva com substância anticoagulante que mantém o sangue fluindo durante a alimentação.",
    comportamento: "Vive em colônias que podem ter de dezenas a milhares de indivíduos; compartilha sangue regurgitado com companheiros que não conseguiram se alimentar.",
    reproducao: "Gestação de cerca de 7 meses; nasce geralmente um único filhote por vez.",
    importancia: "Estudado na medicina por causa do anticoagulante da saliva, hoje usado como base para pesquisas sobre tratamento de AVC.",
    curiosidade: "É um dos poucos mamíferos com comportamento de reciprocidade documentado: indivíduos bem alimentados regurgitam sangue para companheiros famintos, mesmo sem parentesco direto.",
    mitos: [{ afirmacao: "O morcego-vampiro se alimenta principalmente do sangue de humanos.", veredito: "mito", explicacao: "Prefere se alimentar de gado e outros grandes mamíferos; ataques a humanos existem mas são bem menos frequentes." }],
  },
  {
    id: "libelula", nome: "Libélula", cientifico: "Subordem Anisoptera", grupo: "voadores",
    imagem: "Dragonfly (8065197784).jpg",
    classe: "Inseto", habitat: ["Aéreo", "Água doce"], distribuicao: "Presente em quase todo o mundo, próxima a ambientes de água doce",
    alimentacao: "Carnívora — mosquitos e outros pequenos insetos, capturados em pleno voo",
    conservacao: "Varia por espécie", tamanho: "Geralmente 2–5 cm, podendo passar de 10 cm em algumas espécies", expectativa: "Poucas semanas a alguns meses na fase adulta",
    caracteristicas: "Dois pares de asas independentes que permitem manobras aéreas extremamente precisas, e olhos compostos enormes que cobrem quase toda a cabeça.",
    comportamento: "Predadora ágil e territorialista; passa a maior parte da vida como larva aquática antes de se tornar adulta voadora.",
    reproducao: "A fêmea deposita os ovos na água ou em plantas aquáticas; a larva pode levar meses ou anos para completar o desenvolvimento.",
    importancia: "Controla populações de mosquitos, incluindo espécies transmissoras de doenças, e serve de alimento para aves e peixes.",
    curiosidade: "É considerada um dos insetos voadores mais eficientes do planeta, com uma taxa de sucesso de caça que pode superar 90% dos ataques.",
    mitos: [{ afirmacao: "Libélulas picam ou ferroam pessoas.", veredito: "mito", explicacao: "Libélulas não possuem ferrão e não mordem humanos de forma significativa; são completamente inofensivas às pessoas." }],
  },
  {
    id: "cavalo-marinho", nome: "Cavalo-marinho", cientifico: "Hippocampus reidi", grupo: "peixes",
    imagem: "Longsnout Seahorse (Hippocampus reidi).jpg",
    classe: "Peixe", habitat: ["Marinho"], distribuicao: "Costa atlântica das Américas, incluindo o litoral brasileiro",
    alimentacao: "Carnívoro — pequenos crustáceos, sugados pelo focinho tubular",
    conservacao: "Dados insuficientes (sobre-explorado pelo comércio de aquarismo e medicina tradicional)", tamanho: "Até 17 cm", expectativa: "3–5 anos",
    caracteristicas: "Corpo ereto revestido por placas ósseas em vez de escamas, e uma cauda preênsil usada para se prender a algas e corais.",
    comportamento: "Nadador lento e pouco ágil; costuma se camuflar se segurando em estruturas do fundo do mar.",
    reproducao: "É o macho quem carrega os ovos em uma bolsa ventral e 'dá à luz' os filhotes após a gestação.",
    importancia: "Indicador da saúde de recifes e campos de algas, ambientes sensíveis à poluição e à pesca predatória.",
    curiosidade: "Casais de cavalo-marinho costumam realizar uma 'dança' diária de reforço do vínculo, girando juntos antes de se separarem para caçar.",
    mitos: [{ afirmacao: "Apenas as fêmeas de cavalo-marinho engravidam.", veredito: "mito", explicacao: "É o oposto: os machos possuem a bolsa incubadora e carregam os ovos fertilizados até o nascimento dos filhotes." }],
  },
  {
    id: "agua-viva", nome: "Água-viva", cientifico: "Aurelia aurita", grupo: "marinhos",
    imagem: "Moon Jellyfish (14278816210).jpg",
    classe: "Cnidário", habitat: ["Marinho"], distribuicao: "Praticamente todos os oceanos do mundo, incluindo o litoral brasileiro",
    alimentacao: "Carnívora — zooplâncton, pequenas larvas e outros organismos microscópicos",
    conservacao: "Não avaliada", tamanho: "5–40 cm de diâmetro do corpo (umbrela)", expectativa: "Cerca de 1 ano",
    caracteristicas: "Corpo gelatinoso em forma de sino translúcido, sem cérebro, coração ou sangue — mais de 95% do corpo é água.",
    comportamento: "Se desloca por pulsos do corpo, mas depende principalmente das correntes marítimas para se locomover.",
    reproducao: "Alterna reprodução sexuada, formando larvas natantes, e reprodução assexuada em uma fase presa ao fundo do mar.",
    importancia: "Parte da base da cadeia alimentar marinha, servindo de alimento para tartarugas-marinhas e alguns peixes.",
    curiosidade: "Apesar de não ter cérebro, consegue detectar luz e gravidade por meio de estruturas sensoriais simples distribuídas pelo corpo.",
    mitos: [{ afirmacao: "Toda água-viva é perigosa e pode matar uma pessoa.", veredito: "mito", explicacao: "A maioria das espécies, como a água-viva-da-lua, causa no máximo uma leve irritação na pele; poucas espécies no mundo têm veneno realmente perigoso para humanos." }],
  },
  {
    id: "escorpiao-amarelo", nome: "Escorpião-amarelo", cientifico: "Tityus serrulatus", grupo: "invertebrados",
    imagem: "Tityus serrulatus (Buthidae) (22768698194).jpg",
    classe: "Aracnídeo", habitat: ["Terrestre", "Subterrâneo"], distribuicao: "Nativo do Sudeste do Brasil, hoje presente em quase todo o país",
    alimentacao: "Carnívoro — baratas e outros pequenos insetos",
    conservacao: "Não avaliada (população urbana em expansão)", tamanho: "5–7 cm", expectativa: "2–5 anos",
    caracteristicas: "Corpo e patas amarelo-claros, com tronco em tom mais escuro; cauda robusta terminando em ferrão.",
    comportamento: "Hábitos noturnos, adaptou-se muito bem a esgotos, entulhos e áreas urbanas por causa da abundância de baratas.",
    reproducao: "Reproduz-se por partenogênese: fêmeas geram filhotes sem necessidade de fertilização por um macho.",
    importancia: "É considerado o escorpião mais perigoso do Brasil em termos de saúde pública, por isso é alvo de programas de controle urbano e pesquisa de soro antiescorpiônico.",
    curiosidade: "A expansão urbana, com esgoto e entulho, aumentou drasticamente os registros de picadas de escorpião no Brasil nas últimas décadas.",
    mitos: [{ afirmacao: "Toda picada de escorpião-amarelo é fatal.", veredito: "mito", explicacao: "A maioria dos casos causa apenas dor local intensa; casos graves ou fatais são mais comuns em crianças pequenas e idosos, e o tratamento com soro reduz muito o risco." }],
  },
  {
    id: "estrela-do-mar", nome: "Estrela-do-mar", cientifico: "Asterias rubens", grupo: "invertebrados",
    imagem: "Asterias rubens.jpg",
    classe: "Equinodermo", habitat: ["Marinho"], distribuicao: "Costas rochosas do Atlântico Norte; outras espécies de estrela-do-mar ocorrem em todo o mundo",
    alimentacao: "Carnívora — mariscos, mexilhões e outros moluscos",
    conservacao: "Pouco preocupante", tamanho: "10–30 cm de diâmetro", expectativa: "5–10 anos",
    caracteristicas: "Corpo com simetria radial, geralmente com cinco braços, coberto por um sistema de centenas de 'pés ambulacrais' usados para locomoção.",
    comportamento: "Movimenta-se lentamente pelo fundo do mar usando o sistema vascular aquífero, uma rede interna de canais cheios de água do mar.",
    reproducao: "Libera óvulos e espermatozoides na água; a fecundação é externa e gera larvas planctônicas.",
    importancia: "Predadora que ajuda a controlar populações de moluscos em costões rochosos e bancos de mariscos.",
    curiosidade: "Consegue regenerar um braço perdido e, em algumas espécies, um braço destacado pode até dar origem a um novo indivíduo inteiro.",
    mitos: [{ afirmacao: "A estrela-do-mar tem cérebro central que comanda seus movimentos.", veredito: "mito", explicacao: "Não possui um cérebro centralizado; usa um anel nervoso e nervos radiais distribuídos pelo corpo para coordenar os movimentos." }],
  },
  {
    id: "ra-venenosa", nome: "Rã-venenosa", cientifico: "Dendrobates tinctorius", grupo: "anfibios",
    imagem: "Dendrobates.tinctorius.7037.jpg",
    classe: "Anfíbio", habitat: ["Terrestre"], distribuicao: "Florestas tropicais do norte da América do Sul, como Suriname, Guiana Francesa e norte do Brasil",
    alimentacao: "Carnívora — formigas, cupins e pequenos insetos",
    conservacao: "Pouco preocupante", tamanho: "4–5,5 cm", expectativa: "Até 10 anos em cativeiro",
    caracteristicas: "Coloração vivamente contrastante entre preto e azul, amarelo ou branco, dependendo da população — um exemplo clássico de aposematismo.",
    comportamento: "Diurna e territorialista; ao contrário de muitos anfíbios, é ativa durante o dia justamente por confiar em sua defesa química.",
    reproducao: "Deposita os ovos em ambientes úmidos no solo; em algumas espécies do gênero, o macho carrega os girinos nas costas até a água.",
    importancia: "Indicadora da saúde de florestas tropicais preservadas, já que é sensível a poluição e desmatamento.",
    curiosidade: "A toxina da pele vem principalmente da dieta de formigas e ácaros específicos da floresta; em cativeiro, sem essa dieta, a espécie perde grande parte da toxicidade.",
    mitos: [{ afirmacao: "Toda rã colorida é uma rã-venenosa perigosa.", veredito: "mito", explicacao: "Nem toda coloração viva indica toxicidade perigosa para humanos; a toxicidade varia muito entre espécies e populações, e a maioria das rãs coloridas do Brasil não é letal ao toque." }],
  },
  {
    id: "salamandra", nome: "Salamandra-de-fogo", cientifico: "Salamandra salamandra", grupo: "anfibios",
    imagem: "Fire salamander (Salamandra Salamandra).jpg",
    classe: "Anfíbio", habitat: ["Terrestre", "Água doce"], distribuicao: "Florestas úmidas da Europa central e do sul",
    alimentacao: "Carnívora — insetos, minhocas, lesmas e pequenos invertebrados",
    conservacao: "Vulnerável (ameaçada por um fungo introduzido em parte de sua área de ocorrência)", tamanho: "15–20 cm", expectativa: "Até 20 anos, podendo passar de 50 em cativeiro",
    caracteristicas: "Corpo preto brilhante com manchas ou listras amarelas vivas, um padrão clássico de aviso a predadores.",
    comportamento: "Hábitos noturnos e terrestres na fase adulta, preferindo florestas úmidas e sombreadas próximas a riachos.",
    reproducao: "Ao contrário da maioria dos anfíbios, é ovovivípara: a fêmea libera larvas já formadas diretamente em riachos de água corrente.",
    importancia: "Indicadora da qualidade de florestas úmidas europeias, sensível a poluição e a doenças fúngicas emergentes.",
    curiosidade: "Glândulas atrás dos olhos podem esguichar uma secreção tóxica a curta distância como defesa contra predadores.",
    mitos: [{ afirmacao: "A salamandra nasce do fogo ou consegue viver dentro dele.", veredito: "mito", explicacao: "A lenda medieval surgiu porque o animal às vezes saía correndo de troncos colocados em fogueiras, onde se abrigava; na realidade, não tem nenhuma resistência especial ao fogo." }],
  },
  {
    id: "tigre", nome: "Tigre", cientifico: "Panthera tigris", grupo: "mamiferos",
    imagem: "Adult male Royal Bengal tiger.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Sul e Sudeste Asiático, com populações remanescentes na Índia, Rússia e Sumatra",
    alimentacao: "Carnívoro — veados, javalis e outros grandes ungulados",
    conservacao: "Em perigo", tamanho: "2,5–3,3 m de corpo, mais a cauda", expectativa: "10–15 anos na natureza",
    caracteristicas: "Maior felino vivo do mundo, com padrão de listras único para cada indivíduo, como uma impressão digital.",
    comportamento: "Solitário e territorialista; ao contrário dos leões, caça e vive sozinho na maior parte do tempo.",
    reproducao: "Gestação de cerca de 105 dias; a fêmea cuida sozinha dos filhotes por até dois anos.",
    importancia: "Predador de topo essencial para o equilíbrio de florestas tropicais e temperadas da Ásia.",
    curiosidade: "As listras não ficam só no pelo: a pele por baixo também é listrada, no mesmo padrão exato do pelo.",
    mitos: [{ afirmacao: "Todo tigre tem pelagem laranja com listras pretas.", veredito: "mito", explicacao: "Existe uma variação genética rara, o tigre branco, com pelagem clara e listras escuras; ele não é uma subespécie separada, apenas uma mutação de cor." }],
  },
  {
    id: "urso-pardo", nome: "Urso-pardo", cientifico: "Ursus arctos", grupo: "mamiferos",
    imagem: "Brown bear (Ursus arctos), Viiksimo, Kainuu region, Finland (29058988558).jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Norte da Europa, Ásia e América do Norte",
    alimentacao: "Onívoro — peixes, pequenos mamíferos, frutas, raízes e mel",
    conservacao: "Pouco preocupante", tamanho: "1,7–2,8 m", expectativa: "20–30 anos na natureza",
    caracteristicas: "Corcunda muscular nos ombros, usada para escavar e dar força extra às patas dianteiras.",
    comportamento: "Solitário na maior parte do ano; entra em um estado de dormência (hibernação) durante o inverno.",
    reproducao: "Gestação com implantação retardada; os filhotes nascem minúsculos durante a hibernação da mãe.",
    importancia: "Ao pescar salmões e espalhar sementes de frutas, transporta nutrientes entre rios e florestas.",
    curiosidade: "Apesar do porte, consegue atingir mais de 50 km/h em curtas distâncias — mais rápido que a maioria dos humanos consegue correr.",
    mitos: [{ afirmacao: "Ursos hibernam em um sono profundo do qual não despertam de jeito nenhum.", veredito: "mito", explicacao: "A hibernação do urso-pardo é mais leve que a de outros hibernantes: a temperatura corporal cai pouco e o animal pode acordar caso seja perturbado." }],
  },
  {
    id: "panda-vermelho", nome: "Panda-vermelho", cientifico: "Ailurus fulgens", grupo: "mamiferos",
    imagem: "Red Panda.JPG",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Florestas de bambu do Himalaia, sul da China e norte de Mianmar",
    alimentacao: "Principalmente herbívoro — folhas e brotos de bambu, além de frutas e pequenos invertebrados ocasionalmente",
    conservacao: "Em perigo", tamanho: "50–65 cm de corpo, mais a cauda", expectativa: "8–10 anos na natureza",
    caracteristicas: "Pelagem avermelhada, cauda longa e anelada, e um 'polegar' falso que ajuda a segurar bambu.",
    comportamento: "Solitário, de hábitos noturnos e crepusculares, passa boa parte do tempo em árvores.",
    reproducao: "Gestação de cerca de 130 dias; nasce geralmente 1 a 2 filhotes por ninhada.",
    importancia: "Apesar do nome parecido, não é próximo do panda-gigante — é o único representante vivo de sua própria família, os Ailuridae.",
    curiosidade: "Foi descrito cientificamente décadas antes do panda-gigante, e o nome 'panda' originalmente se referia a ele.",
    mitos: [{ afirmacao: "O panda-vermelho é um filhote de panda-gigante.", veredito: "mito", explicacao: "São espécies completamente diferentes, de famílias distintas; a semelhança no nome vem apenas da dieta parecida à base de bambu." }],
  },
  {
    id: "hipopotamo", nome: "Hipopótamo", cientifico: "Hippopotamus amphibius", grupo: "mamiferos",
    imagem: "Hippo (Hippopotamus amphibius) (16485955207).jpg",
    classe: "Mamífero", habitat: ["Água doce", "Terrestre"], distribuicao: "Rios e lagos da África Subsaariana",
    alimentacao: "Herbívoro — principalmente capim, consumido durante a noite em terra",
    conservacao: "Vulnerável", tamanho: "3,3–5,2 m", expectativa: "40–50 anos",
    caracteristicas: "Pele espessa que secreta uma substância avermelhada com efeito de protetor solar natural e cicatrizante.",
    comportamento: "Passa a maior parte do dia submerso em rios e lagos para se proteger do calor, saindo à noite para pastar.",
    reproducao: "Gestação de cerca de 8 meses; o parto e a amamentação frequentemente ocorrem na água.",
    importancia: "Seus dejetos fertilizam rios e lagos, sustentando parte da cadeia alimentar aquática africana.",
    curiosidade: "Apesar do corpo pesado e curto, é considerado um dos mamíferos terrestres mais perigosos da África em número de incidentes com humanos.",
    mitos: [{ afirmacao: "O hipopótamo é lento e inofensivo por passar o dia parado na água.", veredito: "mito", explicacao: "É extremamente territorialista e agressivo quando se sente ameaçado, além de conseguir correr surpreendentemente rápido em terra e na água por curtas distâncias." }],
  },
  {
    id: "zebra", nome: "Zebra-das-planícies", cientifico: "Equus quagga", grupo: "mamiferos",
    imagem: "Plains Zebra Equus quagga.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Savanas e planícies do leste e sul da África",
    alimentacao: "Herbívora — principalmente gramíneas",
    conservacao: "Quase ameaçada", tamanho: "2–2,6 m de corpo", expectativa: "20–25 anos na natureza",
    caracteristicas: "Padrão de listras preto e branco único para cada indivíduo, como uma impressão digital.",
    comportamento: "Vive em grupos familiares liderados por um macho, e pode formar grandes manadas durante migrações sazonais.",
    reproducao: "Gestação de cerca de 12 meses; o potro consegue ficar em pé poucos minutos após o nascimento.",
    importancia: "Como grande herbívoro migratório, ajuda a moldar a vegetação das savanas africanas junto com gnus e outros ungulados.",
    curiosidade: "A função exata das listras ainda é estudada pela ciência; hipóteses incluem regulação térmica, camuflagem em grupo e repelência a moscas picadoras.",
    mitos: [{ afirmacao: "A zebra é um cavalo branco com listras pretas.", veredito: "mito", explicacao: "Estudos embriológicos indicam que a base da pele da zebra é escura, e as listras brancas são a variação — o oposto do que a expressão popular sugere." }],
  },
  {
    id: "gorila", nome: "Gorila-ocidental", cientifico: "Gorilla gorilla", grupo: "mamiferos",
    imagem: "Lowland Gorilla (8973697544).jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Florestas tropicais da África Central e Ocidental",
    alimentacao: "Principalmente herbívoro — folhas, caules, frutas e ocasionalmente pequenos invertebrados",
    conservacao: "Criticamente ameaçado", tamanho: "1,25–1,8 m em pé", expectativa: "35–40 anos na natureza",
    caracteristicas: "Maior primata vivo, com machos adultos dominantes desenvolvendo pelos prateados nas costas ('costas prateadas').",
    comportamento: "Vive em grupos familiares liderados por um macho dominante, com fortes laços sociais e comunicação por gestos e vocalizações.",
    reproducao: "Gestação de cerca de 8,5 meses; os filhotes dependem da mãe por vários anos.",
    importancia: "Como dispersor de sementes em grande escala, ajuda a manter a diversidade das florestas tropicais africanas.",
    curiosidade: "Compartilha cerca de 98% do DNA com os humanos e demonstra comportamentos complexos, como uso de ferramentas e luto por membros do grupo.",
    mitos: [{ afirmacao: "Gorilas são animais extremamente agressivos por natureza.", veredito: "mito", explicacao: "São predominantemente pacíficos e tímidos; demonstrações de força como bater no peito geralmente servem para evitar confronto físico, não para provocá-lo." }],
  },
  {
    id: "capivara", nome: "Capivara", cientifico: "Hydrochoerus hydrochaeris", grupo: "mamiferos",
    imagem: "Capybara (Hydrochoerus hydrochaeris).jpg",
    classe: "Mamífero", habitat: ["Água doce", "Terrestre"], distribuicao: "América do Sul, incluindo praticamente todo o Brasil",
    alimentacao: "Herbívora — gramíneas, plantas aquáticas e frutas",
    conservacao: "Pouco preocupante", tamanho: "1–1,3 m", expectativa: "8–10 anos",
    caracteristicas: "Maior roedor vivo do mundo, com corpo robusto, patas parcialmente palmadas e excelente capacidade de nadar e mergulhar.",
    comportamento: "Extremamente social, vive em grupos de até 20 indivíduos ou mais próximos a corpos d'água.",
    reproducao: "Gestação de cerca de 150 dias; os filhotes já nascem capazes de andar e nadar.",
    importancia: "Presa importante para onças e jacarés, além de dispersora de sementes de plantas aquáticas e ribeirinhas.",
    curiosidade: "É tão sociável que frequentemente serve de 'poleiro' para pássaros e até de companhia tranquila para outros animais em zoológicos.",
    mitos: [{ afirmacao: "A capivara é um parente do porco.", veredito: "mito", explicacao: "É um roedor, parente próximo de cutias e preás, sem relação de parentesco direta com os porcos, apesar da semelhança superficial no corpo." }],
  },
  {
    id: "aguia-careca", nome: "Águia-careca", cientifico: "Haliaeetus leucocephalus", grupo: "aves",
    imagem: "Bald Eagle Haliaeetus leucocephalus Full Body 2000px.jpg",
    classe: "Ave", habitat: ["Terrestre", "Aéreo", "Água doce"], distribuicao: "América do Norte, próxima a grandes rios, lagos e litorais",
    alimentacao: "Carnívora — principalmente peixes, capturados em mergulhos rasantes sobre a água",
    conservacao: "Pouco preocupante (recuperada após quase entrar em extinção no século 20)", tamanho: "70–102 cm de comprimento; até 2,3 m de envergadura", expectativa: "20–30 anos na natureza",
    caracteristicas: "Cabeça e cauda brancas contrastando com o corpo marrom-escuro, características que só aparecem por volta dos 4-5 anos de idade.",
    comportamento: "Constrói um dos maiores ninhos entre as aves, reutilizado e ampliado ano após ano pelo mesmo casal.",
    reproducao: "Geralmente põe 1 a 3 ovos; o casal costuma permanecer junto por vários anos, às vezes para a vida toda.",
    importancia: "Símbolo nacional dos Estados Unidos e um caso célebre de recuperação de espécie após o banimento do pesticida DDT.",
    curiosidade: "Apesar do nome, não é careca: 'bald' no nome em inglês vem de um termo antigo para 'cabeça branca', não de falta de penas.",
    mitos: [{ afirmacao: "O grito estridente ouvido em filmes representando a águia-careca é o som real que ela emite.", veredito: "mito", explicacao: "O canto real da águia-careca é uma vocalização aguda e fraca; o grito poderoso usado em filmes geralmente é, na real, o som de uma águia-de-cauda-vermelha (red-tailed hawk)." }],
  },
  {
    id: "rinoceronte-branco", nome: "Rinoceronte-branco", cientifico: "Ceratotherium simum", grupo: "mamiferos",
    imagem: "White rhinoceros africa.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Savanas do sul e leste da África",
    alimentacao: "Herbívoro — gramíneas curtas, cortadas com os lábios largos e quadrados",
    conservacao: "Quase ameaçado", tamanho: "3,4–4 m de corpo", expectativa: "40–50 anos",
    caracteristicas: "Segundo maior mamífero terrestre, com dois chifres feitos de queratina, a mesma proteína das unhas humanas.",
    comportamento: "Mais social que outras espécies de rinoceronte, forma grupos chamados 'crash', principalmente de fêmeas e filhotes.",
    reproducao: "Gestação de cerca de 16 meses; nasce geralmente um único filhote.",
    importancia: "Ao pastar intensamente, ajuda a manter savanas abertas, beneficiando outras espécies herbívoras.",
    curiosidade: "O nome 'branco' não vem da cor, e sim de uma tradução equivocada da palavra em africâner 'wyd' (largo), referente à boca larga do animal.",
    mitos: [{ afirmacao: "O chifre do rinoceronte tem propriedades medicinais comprovadas.", veredito: "mito", explicacao: "É feito de queratina, a mesma substância do cabelo e das unhas humanas; não há evidência científica de efeito medicinal, mas a crença alimenta a caça ilegal que ameaça a espécie." }],
  },
  {
    id: "chimpanze", nome: "Chimpanzé", cientifico: "Pan troglodytes", grupo: "mamiferos",
    imagem: "Chimpanzee (Pan troglodytes).jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Florestas tropicais e savanas da África Central e Ocidental",
    alimentacao: "Onívoro — frutas, folhas, insetos e ocasionalmente carne de pequenos mamíferos",
    conservacao: "Em perigo", tamanho: "0,9–1,2 m em pé", expectativa: "Até 50 anos",
    caracteristicas: "Um dos parentes vivos mais próximos dos humanos, compartilhando cerca de 98,7% do DNA.",
    comportamento: "Vive em comunidades complexas, usa ferramentas simples como gravetos para pescar cupins e demonstra comportamento cultural transmitido entre gerações.",
    reproducao: "Gestação de cerca de 8 meses; o filhote depende da mãe por vários anos.",
    importancia: "Como dispersor de sementes e por sua proximidade evolutiva com os humanos, é fundamental para estudos de comportamento, cognição e conservação de florestas tropicais.",
    curiosidade: "Chimpanzés de diferentes regiões usam ferramentas diferentes para tarefas similares, um exemplo do que pesquisadores chamam de 'cultura' animal.",
    mitos: [{ afirmacao: "Chimpanzés são apenas versões mais simples dos humanos.", veredito: "mito", explicacao: "São uma espécie com sua própria linha evolutiva, tão distante dos humanos quanto os humanos são deles desde a divergência há milhões de anos — não um estágio anterior da evolução humana." }],
  },
  {
    id: "coala", nome: "Coala", cientifico: "Phascolarctos cinereus", grupo: "mamiferos",
    imagem: "Koala (Phascolarctos cinereus) (3).jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Florestas de eucalipto do leste e sul da Austrália",
    alimentacao: "Herbívoro — quase exclusivamente folhas de eucalipto",
    conservacao: "Vulnerável", tamanho: "60–85 cm", expectativa: "10–15 anos",
    caracteristicas: "Marsupial com bolsa voltada para trás, adaptado a uma dieta pobre em nutrientes e tóxica para a maioria dos outros animais.",
    comportamento: "Dorme entre 18 e 20 horas por dia, em parte para economizar energia diante da dieta pouco calórica de eucalipto.",
    reproducao: "Gestação de cerca de 35 dias; o filhote se desenvolve dentro da bolsa da mãe por vários meses.",
    importancia: "Espécie-símbolo dos esforços de conservação na Austrália, especialmente após grandes incêndios florestais.",
    curiosidade: "O fígado do coala consegue neutralizar as toxinas presentes nas folhas de eucalipto, que seriam venenosas para a maioria dos mamíferos.",
    mitos: [{ afirmacao: "O coala é um tipo de urso.", veredito: "mito", explicacao: "É um marsupial, mais próximo parentesco de cangurus e wombats do que de qualquer urso — o nome 'urso-coala' é apenas uma semelhança de aparência." }],
  },
  {
    id: "tamandua-bandeira", nome: "Tamanduá-bandeira", cientifico: "Myrmecophaga tridactyla", grupo: "mamiferos",
    imagem: "Myrmecophaga tridactyla 33554995.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "América Central e do Sul, incluindo Cerrado e Pantanal brasileiros",
    alimentacao: "Insetívoro — especializado em formigas e cupins",
    conservacao: "Vulnerável", tamanho: "1–1,3 m de corpo, mais a cauda", expectativa: "14–16 anos",
    caracteristicas: "Focinho longo e tubular sem dentes, língua pegajosa de até 60 cm e cauda com pelos longos usada como cobertor.",
    comportamento: "Solitário, de hábitos diurnos ou noturnos conforme a temperatura da região; usa as garras dianteiras para abrir cupinzeiros.",
    reproducao: "Gestação de cerca de 190 dias; nasce um único filhote, carregado nas costas da mãe por meses.",
    importancia: "Controla naturalmente populações de formigas e cupins, evitando desequilíbrios nesses insetos sociais.",
    curiosidade: "Pode comer até 30 mil formigas e cupins em um único dia, sem nunca destruir completamente um formigueiro — costuma se alimentar rapidamente e seguir adiante.",
    mitos: [{ afirmacao: "O tamanduá-bandeira ataca pessoas com frequência.", veredito: "mito", explicacao: "É um animal pacífico que evita confronto; acidentes com garras afiadas só ocorrem em raras situações de autodefesa quando o animal se sente encurralado." }],
  },
  {
    id: "preguica", nome: "Preguiça-comum", cientifico: "Bradypus variegatus", grupo: "mamiferos",
    imagem: "Bradypus.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Florestas tropicais da América Central e do Sul, incluindo a Amazônia",
    alimentacao: "Herbívora — folhas, brotos e frutos de árvores",
    conservacao: "Pouco preocupante", tamanho: "40–60 cm", expectativa: "Até 30 anos",
    caracteristicas: "Metabolismo extremamente lento, o que a torna um dos mamíferos com menor gasto de energia diário do planeta.",
    comportamento: "Passa a maior parte da vida pendurada de cabeça para baixo em árvores, descendo ao solo raramente, principalmente para defecar.",
    reproducao: "Gestação de cerca de 6 meses; o filhote se agarra ao pelo da mãe por meses após o nascimento.",
    importancia: "Abriga um microecossistema próprio em seu pelo, com algas e insetos que vivem em associação com o animal.",
    curiosidade: "É tão lenta que algas chegam a crescer em seu pelo, dando uma coloração esverdeada que ajuda na camuflagem entre as árvores.",
    mitos: [{ afirmacao: "A preguiça é lenta porque é um animal doente ou fraco.", veredito: "mito", explicacao: "A lentidão é uma estratégia evolutiva de economia de energia, adaptada a uma dieta pobre em calorias — não um sinal de doença." }],
  },
  {
    id: "guepardo", nome: "Guepardo", cientifico: "Acinonyx jubatus", grupo: "mamiferos",
    imagem: "Cheetah (Acinonyx jubatus) female 2.jpg",
    classe: "Mamífero", habitat: ["Terrestre"], distribuicao: "Savanas e áreas abertas da África, com uma pequena população no Irã",
    alimentacao: "Carnívoro — gazelas e outros pequenos a médios ungulados",
    conservacao: "Vulnerável", tamanho: "1,1–1,5 m de corpo, mais a cauda", expectativa: "10–12 anos na natureza",
    caracteristicas: "Animal terrestre mais rápido do mundo, podendo atingir mais de 100 km/h em curtas distâncias.",
    comportamento: "Caça durante o dia, ao contrário da maioria dos grandes felinos, para evitar competição com leões e hienas.",
    reproducao: "Gestação de cerca de 93 dias; a fêmea cuida sozinha da ninhada, que pode ter até 6 filhotes.",
    importancia: "Como predador especializado em corridas curtas, regula populações de herbívoros ágeis nas savanas africanas.",
    curiosidade: "As garras do guepardo são apenas parcialmente retráteis, funcionando como cravos de corrida para dar tração durante a perseguição.",
    mitos: [{ afirmacao: "O guepardo consegue manter a velocidade máxima por longas distâncias.", veredito: "mito", explicacao: "Consegue sustentar sua velocidade máxima por apenas 20 a 30 segundos antes de superaquecer e precisar desacelerar." }],
  },
  {
    id: "flamingo", nome: "Flamingo", cientifico: "Phoenicopterus ruber", grupo: "aves",
    imagem: "American flamingo (Phoenicopterus ruber).JPG",
    classe: "Ave", habitat: ["Água doce", "Terrestre"], distribuicao: "Litoral do Caribe, norte da América do Sul e Galápagos",
    alimentacao: "Filtradora — pequenos crustáceos, algas e larvas, filtrados da água com o bico especializado",
    conservacao: "Pouco preocupante", tamanho: "1,2–1,45 m", expectativa: "20–30 anos",
    caracteristicas: "Plumagem rosada que vem diretamente da dieta rica em pigmentos carotenoides presentes em algas e crustáceos.",
    comportamento: "Extremamente social, vive em grandes colônias que podem reunir milhares de indivíduos.",
    reproducao: "Constrói ninhos de barro em forma de monte; geralmente põe um único ovo por temporada.",
    importancia: "Indicador da saúde de lagoas rasas e salinas onde se alimenta, sensível a poluição da água.",
    curiosidade: "Filhotes de flamingo nascem com penas cinza-esbranquiçadas; a cor rosada só aparece após meses se alimentando da dieta rica em carotenoides.",
    mitos: [{ afirmacao: "O flamingo já nasce rosa.", veredito: "mito", explicacao: "Nasce com penas acinzentadas; a coloração rosa se desenvolve aos poucos, conforme os pigmentos da dieta se acumulam nas penas." }],
  },
  {
    id: "avestruz", nome: "Avestruz", cientifico: "Struthio camelus", grupo: "aves",
    imagem: "Struthio camelus.jpg",
    classe: "Ave", habitat: ["Terrestre"], distribuicao: "Savanas e regiões semiáridas da África",
    alimentacao: "Onívora — plantas, sementes, insetos e pequenos répteis",
    conservacao: "Pouco preocupante", tamanho: "Até 2,8 m de altura", expectativa: "40–45 anos",
    caracteristicas: "Maior e mais pesada ave viva do mundo, incapaz de voar, mas com pernas longas e potentes adaptadas para corrida.",
    comportamento: "Vive em pequenos grupos; quando ameaçada, prefere fugir correndo, podendo atingir até 70 km/h.",
    reproducao: "Põe o maior ovo entre todas as aves vivas; várias fêmeas podem depositar ovos no mesmo ninho comunitário.",
    importancia: "Como grande herbívoro/onívoro das savanas, ajuda a dispersar sementes de plantas ao longo de grandes distâncias.",
    curiosidade: "Apesar da lenda popular, o avestruz não enfia a cabeça na areia; esse mito provavelmente surgiu da forma como abaixa a cabeça para virar os ovos no ninho.",
    mitos: [{ afirmacao: "O avestruz enfia a cabeça na areia quando está com medo.", veredito: "mito", explicacao: "Esse comportamento nunca foi comprovado cientificamente; diante de perigo, o avestruz corre ou se deita rente ao chão para se camuflar, sem enterrar a cabeça." }],
  },
  {
    id: "jiboia", nome: "Jiboia", cientifico: "Boa constrictor", grupo: "repteis",
    imagem: "Boa constrictor, Vaňkovka, Brno (2).jpg",
    classe: "Réptil", habitat: ["Terrestre"], distribuicao: "América Central e do Sul, incluindo grande parte do Brasil",
    alimentacao: "Carnívora — roedores, aves e outros pequenos vertebrados",
    conservacao: "Pouco preocupante", tamanho: "2–3 m, podendo passar de 4 m", expectativa: "20–30 anos",
    caracteristicas: "Serpente não peçonhenta que mata por constrição, enrolando o corpo em torno da presa até interromper sua circulação sanguínea.",
    comportamento: "Solitária, de hábitos principalmente noturnos, boa nadadora e capaz de subir em árvores.",
    reproducao: "Ovovivípara — os filhotes nascem já formados, sem a fêmea depositar ovos.",
    importancia: "Como predadora, ajuda a controlar populações de roedores, incluindo espécies que danificam plantações.",
    curiosidade: "Diferente do que a lenda popular sugere, a constrição não quebra os ossos da presa — a morte ocorre por interrupção da circulação sanguínea em segundos.",
    mitos: [{ afirmacao: "A jiboia é uma cobra peçonhenta.", veredito: "mito", explicacao: "Não produz veneno; mata suas presas por constrição, imobilizando a circulação sanguínea do animal capturado." }],
  },
  {
    id: "cascavel", nome: "Cascavel", cientifico: "Crotalus durissus", grupo: "repteis",
    imagem: "Cascavel - crotalus durissus.jpg",
    classe: "Réptil", habitat: ["Terrestre"], distribuicao: "Cerrado, Caatinga e áreas abertas da América do Sul",
    alimentacao: "Carnívora — pequenos roedores e outros vertebrados",
    conservacao: "Pouco preocupante", tamanho: "1–1,5 m", expectativa: "Até 20 anos",
    caracteristicas: "Possui um chocalho na ponta da cauda, formado por anéis de queratina que se acumulam a cada muda de pele.",
    comportamento: "De hábitos principalmente noturnos; usa o chocalho como aviso antes de um possível ataque defensivo.",
    reproducao: "Ovovivípara; a fêmea pode gerar de 6 a 20 filhotes por ninhada.",
    importancia: "Seu veneno é usado na produção de soro antiofídico e também é estudado para o desenvolvimento de medicamentos.",
    curiosidade: "Possui fossetas loreais, órgãos sensíveis ao calor entre o olho e a narina, que detectam a temperatura corporal de presas mesmo no escuro total.",
    mitos: [{ afirmacao: "A cascavel sempre chocalha antes de atacar.", veredito: "mito", explicacao: "Na maioria das vezes chocalha como aviso, mas em situações de susto repentino pode atacar sem dar esse sinal prévio." }],
  },
  {
    id: "iguana", nome: "Iguana-verde", cientifico: "Iguana iguana", grupo: "repteis",
    imagem: "Green iguana (Iguana iguana).JPG",
    classe: "Réptil", habitat: ["Terrestre"], distribuicao: "América Central e do Sul, incluindo o Brasil",
    alimentacao: "Principalmente herbívora — folhas, flores e frutos",
    conservacao: "Pouco preocupante", tamanho: "1,2–2 m", expectativa: "Até 20 anos",
    caracteristicas: "Crista de espinhos ao longo do dorso e uma bolsa de pele sob o queixo (papada), usada em exibições sociais.",
    comportamento: "Excelente escaladora e nadadora; costuma tomar sol em galhos próximos à água, de onde pula se ameaçada.",
    reproducao: "Ovípara; a fêmea pode depositar entre 20 e 70 ovos em um único ninho escavado no solo.",
    importancia: "Dispersa sementes de diversas plantas ao se alimentar de frutos, contribuindo para a regeneração da vegetação.",
    curiosidade: "Se capturada pela cauda, consegue se soltar destacando parte dela, que volta a crescer parcialmente com o tempo.",
    mitos: [{ afirmacao: "A iguana-verde é sempre verde, mesmo na fase adulta.", veredito: "mito", explicacao: "A coloração pode variar bastante com idade, temperatura e humor do animal, indo do verde intenso a tons acinzentados ou alaranjados." }],
  },
  {
    id: "orca", nome: "Orca", cientifico: "Orcinus orca", grupo: "marinhos",
    imagem: "Killerwhales jumping.jpg",
    classe: "Mamífero", habitat: ["Marinho"], distribuicao: "Todos os oceanos do mundo, do Ártico à Antártida",
    alimentacao: "Carnívora — peixes, focas, aves marinhas e até outras baleias, dependendo da população",
    conservacao: "Dados insuficientes", tamanho: "6–8 m", expectativa: "Até 90 anos (fêmeas)",
    caracteristicas: "Maior membro da família dos golfinhos, com padrão preto e branco característico e nadadeira dorsal alta.",
    comportamento: "Extremamente social, vive em grupos familiares matriarcais que podem permanecer juntos por gerações.",
    reproducao: "Gestação de 15 a 18 meses; filhotes machos frequentemente permanecem com a mãe por toda a vida.",
    importancia: "Predador de topo dos oceanos, essencial para regular populações de outras espécies marinhas.",
    curiosidade: "Diferentes populações de orcas desenvolvem 'dialetos' próprios de vocalizações e até técnicas de caça exclusivas, transmitidas culturalmente entre gerações.",
    mitos: [{ afirmacao: "A orca é uma baleia.", veredito: "mito", explicacao: "É, na verdade, a maior espécie da família dos golfinhos (Delphinidae), apesar do nome popular 'baleia-assassinha' em outros idiomas." }],
  },
  {
    id: "foca", nome: "Foca-comum", cientifico: "Phoca vitulina", grupo: "marinhos",
    imagem: "Common seal (Phoca vitulina) 2.jpg",
    classe: "Mamífero", habitat: ["Marinho", "Terrestre"], distribuicao: "Costas temperadas e árticas do Hemisfério Norte",
    alimentacao: "Carnívora — peixes, moluscos e crustáceos",
    conservacao: "Pouco preocupante", tamanho: "1,4–1,9 m", expectativa: "25–30 anos",
    caracteristicas: "Corpo fusiforme adaptado à natação, com nadadeiras dianteiras curtas e camada espessa de gordura isolante.",
    comportamento: "Costuma descansar em bancos de areia ou rochas entre os períodos de alimentação no mar.",
    reproducao: "Gestação de cerca de 9 meses; o filhote já sabe nadar poucas horas após o nascimento.",
    importancia: "Como predadora de peixes e presa de orcas e tubarões, é parte importante das cadeias alimentares costeiras.",
    curiosidade: "Consegue reduzir os batimentos cardíacos para economizar oxigênio durante mergulhos, permanecendo submersa por até 30 minutos.",
    mitos: [{ afirmacao: "Foca e leão-marinho são o mesmo animal.", veredito: "mito", explicacao: "São famílias diferentes: leões-marinhos têm orelhas externas visíveis e conseguem 'andar' apoiados nas nadadeiras, enquanto focas verdadeiras não têm orelhas externas e se arrastam no chão." }],
  },
  {
    id: "peixe-boi", nome: "Peixe-boi-marinho", cientifico: "Trichechus manatus", grupo: "marinhos",
    imagem: "Endangered Florida manatee (Trichechus manatus) (7636816484).jpg",
    classe: "Mamífero", habitat: ["Marinho", "Água doce"], distribuicao: "Costa atlântica das Américas, incluindo o litoral do Nordeste brasileiro",
    alimentacao: "Herbívoro — plantas aquáticas e algas",
    conservacao: "Vulnerável", tamanho: "3–4,5 m", expectativa: "Até 60 anos",
    caracteristicas: "Corpo robusto e lento, com nadadeiras dianteiras em forma de remo e ausência de nadadeira dorsal.",
    comportamento: "Movimenta-se lentamente, alimentando-se por várias horas ao dia; precisa vir à superfície para respirar a cada poucos minutos.",
    reproducao: "Gestação de cerca de 12 meses; nasce geralmente um único filhote, que mama debaixo d'água.",
    importancia: "Ao consumir grandes quantidades de vegetação aquática, ajuda a manter o equilíbrio de rios, estuários e baías costeiras.",
    curiosidade: "É o parente vivo mais próximo do elefante entre os mamíferos, apesar do modo de vida totalmente aquático.",
    mitos: [{ afirmacao: "As lendas antigas de sereias avistadas por marinheiros eram baseadas no peixe-boi.", veredito: "verdade", explicacao: "Historiadores e biólogos apontam o peixe-boi e o dugongo como prováveis origens de avistamentos que alimentaram lendas de sereias, confundidos à distância por marinheiros." }],
  },
  {
    id: "formiga-cortadeira", nome: "Formiga-cortadeira", cientifico: "Atta spp.", grupo: "invertebrados",
    imagem: "Leafcutter ants transporting leaves.jpg",
    classe: "Inseto", habitat: ["Terrestre", "Subterrâneo"], distribuicao: "América Central e do Sul, incluindo praticamente todo o Brasil",
    alimentacao: "Cultiva fungo especial para se alimentar, usando pedaços de folhas cortadas como adubo para esse fungo",
    conservacao: "Não avaliada", tamanho: "Operárias de 2 mm a 1,4 cm, rainha maior", expectativa: "Rainha pode viver mais de 10 anos",
    caracteristicas: "Vive em colônias subterrâneas gigantescas, que podem abrigar milhões de indivíduos e se estender por dezenas de metros.",
    comportamento: "Organização social extremamente complexa, com diferentes castas de operárias especializadas em cortar, carregar ou cuidar do fungo.",
    reproducao: "Apenas a rainha se reproduz; novas rainhas saem em voos nupciais para fundar colônias próprias.",
    importancia: "Apesar de serem consideradas pragas agrícolas em plantações, também revolvem e aeram o solo, contribuindo para a ciclagem de nutrientes.",
    curiosidade: "Não comem as folhas diretamente — elas servem de substrato para cultivar um fungo específico, que é o verdadeiro alimento da colônia.",
    mitos: [{ afirmacao: "As formigas-cortadeiras comem as folhas que carregam.", veredito: "mito", explicacao: "As folhas são usadas como adubo para cultivar um fungo dentro do formigueiro; é esse fungo, e não as folhas, que serve de alimento para a colônia." }],
  },
  {
    id: "joaninha", nome: "Joaninha", cientifico: "Coccinella septempunctata", grupo: "invertebrados",
    imagem: "7-Spotted-Ladybug-Coccinella-septempunctata-sq1.jpg",
    classe: "Inseto", habitat: ["Terrestre"], distribuicao: "Europa, Ásia e norte da África; introduzida em outras regiões do mundo",
    alimentacao: "Carnívora — pulgões e outros pequenos insetos que atacam plantas",
    conservacao: "Não avaliada", tamanho: "7–8 mm", expectativa: "1–2 anos",
    caracteristicas: "Élitros (asas duras) vermelhos com sete pontos pretos característicos, que dão nome à espécie.",
    comportamento: "Quando ameaçada, pode secretar um líquido de sabor desagradável pelas articulações das patas, além de fingir estar morta.",
    reproducao: "A fêmea põe os ovos próximo a colônias de pulgões, garantindo alimento imediato às larvas recém-nascidas.",
    importancia: "Uma das principais controladoras naturais de pulgões, sendo usada inclusive em programas de controle biológico de pragas agrícolas.",
    curiosidade: "Uma única joaninha pode devorar centenas de pulgões ao longo da vida, tanto na fase larval quanto na fase adulta.",
    mitos: [{ afirmacao: "O número de pontos na joaninha indica sua idade.", veredito: "mito", explicacao: "O número de pontos é uma característica da espécie, definida geneticamente, e não muda com a idade do inseto." }],
  },
  {
    id: "caranguejo-uca", nome: "Caranguejo-uçá", cientifico: "Ucides cordatus", grupo: "invertebrados",
    imagem: "Caranguejo Uça.jpg",
    classe: "Crustáceo", habitat: ["Terrestre", "Água doce"], distribuicao: "Manguezais da costa atlântica das Américas, da Flórida ao Brasil",
    alimentacao: "Detritívoro — folhas em decomposição e matéria orgânica do manguezal",
    conservacao: "Dados insuficientes (sobre-explorado pela pesca artesanal em algumas regiões)", tamanho: "Até 6 cm de carapaça", expectativa: "Estimada em vários anos",
    caracteristicas: "Uma das duas garras é maior e usada para triturar alimento; vive em tocas profundas cavadas na lama do mangue.",
    comportamento: "Passa parte do tempo dentro da toca, saindo principalmente para se alimentar e durante o período reprodutivo.",
    reproducao: "As fêmeas liberam as larvas na água durante marés específicas, sincronizadas com o ciclo lunar.",
    importancia: "Suas tocas ajudam a arejar o solo do manguezal e reciclar nutrientes, além de ser espécie de grande importância econômica para comunidades pesqueiras.",
    curiosidade: "É a base de subsistência de milhares de famílias de catadores de caranguejo ao longo da costa brasileira, sendo símbolo cultural de várias regiões costeiras.",
    mitos: [{ afirmacao: "O caranguejo-uçá pode ser capturado em qualquer época do ano sem prejuízo à espécie.", veredito: "mito", explicacao: "Existem períodos de defeso (proibição da captura) durante a fase reprodutiva, justamente para proteger a espécie da sobre-exploração." }],
  },
  {
    id: "louva-a-deus", nome: "Louva-a-deus", cientifico: "Mantis religiosa", grupo: "invertebrados",
    imagem: "Praying mantis india.jpg",
    classe: "Inseto", habitat: ["Terrestre"], distribuicao: "Europa, Ásia e África; introduzida em outras regiões, incluindo partes da América",
    alimentacao: "Carnívoro — outros insetos, capturados com as patas dianteiras especializadas em forma de pinça",
    conservacao: "Não avaliada", tamanho: "5–7,5 cm", expectativa: "Cerca de 1 ano",
    caracteristicas: "Cabeça triangular capaz de girar quase 180 graus, e patas dianteiras adaptadas para capturar presas em um golpe muito rápido.",
    comportamento: "Predador de emboscada: fica parado e camuflado esperando a presa se aproximar antes de atacar.",
    reproducao: "Em algumas espécies, a fêmea pode devorar o macho durante ou após o acasalamento, comportamento chamado de canibalismo sexual.",
    importancia: "Controla naturalmente populações de outros insetos, sendo por isso usado em algumas lavouras como agente de controle biológico.",
    curiosidade: "É o único inseto conhecido capaz de girar a cabeça de forma independente do corpo para observar o ambiente ao redor.",
    mitos: [{ afirmacao: "Toda fêmea de louva-a-deus sempre devora o macho após o acasalamento.", veredito: "mito", explicacao: "O canibalismo sexual ocorre em algumas espécies e situações, mas está longe de ser uma regra universal em todos os acasalamentos observados." }],
  },
  {
    id: "salmao", nome: "Salmão-do-atlântico", cientifico: "Salmo salar", grupo: "peixes",
    imagem: "Salmo salar.jpg",
    classe: "Peixe", habitat: ["Água doce", "Marinho"], distribuicao: "Rios e costas do Atlântico Norte, na Europa e América do Norte",
    alimentacao: "Carnívoro — pequenos peixes, crustáceos e insetos aquáticos",
    conservacao: "Pouco preocupante (populações selvagens em declínio em parte da área de ocorrência)", tamanho: "Até 1,5 m", expectativa: "4–6 anos, podendo passar de 10",
    caracteristicas: "Espécie anádroma: nasce em água doce, migra para o mar para crescer e retorna ao rio de origem para se reproduzir.",
    comportamento: "Realiza migrações que podem somar milhares de quilômetros ao longo da vida, entre o rio natal e o oceano.",
    reproducao: "A fêmea cava um ninho no leito do rio, chamado 'redd', onde deposita os ovos fecundados pelo macho.",
    importancia: "Espécie-chave em rios do Hemisfério Norte, transportando nutrientes do oceano de volta para ecossistemas de água doce ao morrer após a desova.",
    curiosidade: "Consegue encontrar o caminho de volta ao rio exato onde nasceu, guiado por um sentido de olfato extremamente sensível às características químicas da água natal.",
    mitos: [{ afirmacao: "Todo salmão vendido é pescado na natureza.", veredito: "mito", explicacao: "Boa parte do salmão consumido no mundo hoje vem de aquicultura (criação em cativeiro), não de populações selvagens capturadas em rios ou no mar." }],
  },
  {
    id: "tubarao-martelo", nome: "Tubarão-martelo", cientifico: "Sphyrna spp.", grupo: "peixes",
    imagem: "Hammerhead shark.jpg",
    classe: "Peixe cartilaginoso", habitat: ["Marinho"], distribuicao: "Águas tropicais e temperadas de todo o mundo",
    alimentacao: "Carnívoro — peixes, polvos, lulas e arraias",
    conservacao: "Criticamente ameaçado (algumas espécies do gênero)", tamanho: "3–6 m, conforme a espécie", expectativa: "20–30 anos",
    caracteristicas: "Cabeça achatada e alongada lateralmente, chamada cefalofoil, com um olho e uma narina em cada extremidade.",
    comportamento: "Algumas espécies formam grandes cardumes durante o dia, dispersando-se para caçar sozinhas à noite.",
    reproducao: "Vivíparo — os filhotes se desenvolvem dentro do corpo da mãe, recebendo nutrientes por uma estrutura parecida com uma placenta.",
    importancia: "Como predador de topo, ajuda a manter o equilíbrio das populações de presas em recifes e mar aberto.",
    curiosidade: "O formato da cabeça amplia a área de eletrorrecepção e melhora a visão binocular, ajudando a localizar arraias escondidas na areia.",
    mitos: [{ afirmacao: "O tubarão-martelo usa a cabeça em formato de martelo para golpear presas.", veredito: "mito", explicacao: "A cabeça em formato de martelo funciona principalmente como sensor ampliado — melhorando visão, olfato e detecção elétrica — e não como arma de ataque." }],
  },
  {
    id: "arraia", nome: "Arraia", cientifico: "Dasyatis spp.", grupo: "peixes",
    imagem: "Dasyatis americana bonaire.jpg",
    classe: "Peixe cartilaginoso", habitat: ["Marinho"], distribuicao: "Águas costeiras tropicais e subtropicais do Atlântico, incluindo o litoral brasileiro",
    alimentacao: "Carnívora — moluscos, crustáceos e pequenos peixes encontrados no fundo do mar",
    conservacao: "Varia por espécie", tamanho: "Até 1,5 m de envergadura", expectativa: "Até 20 anos",
    caracteristicas: "Corpo achatado em formato de disco e uma cauda longa e fina, com um ou mais ferrões serrilhados na base.",
    comportamento: "Passa grande parte do tempo semienterrada na areia, à espreita de pequenas presas ou camuflada de predadores.",
    reproducao: "Vivípara — os filhotes se desenvolvem dentro do corpo da mãe e nascem já formados.",
    importancia: "Ao revirar o fundo do mar em busca de alimento, ajuda a arejar o sedimento e expor nutrientes para outros organismos marinhos.",
    curiosidade: "O ferrão só é usado em defesa, quando a arraia é pisada ou pressionada — por isso recomenda-se arrastar os pés na areia rasa para avisar sua presença.",
    mitos: [{ afirmacao: "A arraia ataca nadadores de forma proposital.", veredito: "mito", explicacao: "É um animal defensivo, não agressivo; a maioria dos acidentes ocorre quando uma pessoa pisa sem querer sobre o animal semienterrado na areia." }],
  },
  {
    id: "peixe-voador", nome: "Peixe-voador", cientifico: "Família Exocoetidae", grupo: "peixes",
    imagem: "Juvenile Flying Fish (Exocoetidae) (8467227249).jpg",
    classe: "Peixe", habitat: ["Marinho"], distribuicao: "Águas tropicais e subtropicais de todos os oceanos",
    alimentacao: "Planctívoro — zooplâncton e pequenos organismos marinhos",
    conservacao: "Não avaliada", tamanho: "15–30 cm", expectativa: "1–5 anos",
    caracteristicas: "Nadadeiras peitorais enormes, em forma de asa, que permitem planar por dezenas de metros acima da água.",
    comportamento: "Ao ser perseguido por predadores, ganha velocidade debaixo d'água e salta para fora, planando para escapar.",
    reproducao: "Deposita ovos que aderem a algas ou detritos flutuantes na superfície do mar.",
    importancia: "Importante presa de atuns, golfinhos e aves marinhas, sendo elo relevante nas cadeias alimentares oceânicas.",
    curiosidade: "Consegue planar por distâncias de até 200 metros em um único salto, batendo a cauda na água para ganhar impulso extra durante o voo.",
    mitos: [{ afirmacao: "O peixe-voador bate as nadadeiras como um pássaro para voar.", veredito: "mito", explicacao: "Ele não bate as nadadeiras; apenas as abre rigidamente para planar, usando o impulso ganho ao sair da água em alta velocidade." }],
  },
  {
    id: "baiacu", nome: "Baiacu", cientifico: "Família Tetraodontidae", grupo: "peixes",
    imagem: "Inflated pufferfish.jpg",
    classe: "Peixe", habitat: ["Marinho", "Água doce"], distribuicao: "Águas tropicais e subtropicais de todo o mundo, incluindo o litoral brasileiro",
    alimentacao: "Onívoro — moluscos, crustáceos, algas e pequenos invertebrados",
    conservacao: "Varia por espécie", tamanho: "5–100 cm, conforme a espécie", expectativa: "Até 10 anos",
    caracteristicas: "Capaz de inflar rapidamente o corpo enchendo o estômago elástico com água ou ar, formando uma bola coberta de espinhos.",
    comportamento: "Nadador lento; usa a capacidade de inflar o corpo como principal defesa contra predadores.",
    reproducao: "Varia conforme a espécie; muitas depositam ovos em ninhos no fundo, guardados por um dos pais.",
    importancia: "Estudado tanto pela toxina que produz quanto pelo genoma extremamente compacto, usado como referência em pesquisas genéticas.",
    curiosidade: "Muitas espécies acumulam tetrodotoxina, uma das substâncias mais letais encontradas na natureza — no Japão, o preparo do peixe como prato (fugu) exige licença especial de chefs de cozinha.",
    mitos: [{ afirmacao: "O baiacu produz a própria toxina no corpo.", veredito: "depende", explicacao: "Em muitas espécies, a toxina vem originalmente de bactérias presentes na cadeia alimentar que o baiacu consome, sendo acumulada e não sintetizada do zero pelo próprio peixe." }],
  },
  {
    id: "mariposa-atlas", nome: "Mariposa-atlas", cientifico: "Attacus atlas", grupo: "voadores",
    imagem: "Attacus atlas London Zoo 01118-2.jpg",
    classe: "Inseto", habitat: ["Aéreo", "Terrestre"], distribuicao: "Florestas tropicais e subtropicais do Sudeste Asiático",
    alimentacao: "Nenhuma na fase adulta — os adultos não se alimentam, vivendo das reservas acumuladas na fase de lagarta",
    conservacao: "Não avaliada", tamanho: "Envergadura de até 30 cm, uma das maiores entre os insetos", expectativa: "1–2 semanas na fase adulta",
    caracteristicas: "Pontas das asas dianteiras com desenhos que lembram cabeças de cobra, uma possível estratégia de defesa contra predadores.",
    comportamento: "De hábitos noturnos; por não se alimentar quando adulta, vive pouquíssimo tempo, focada exclusivamente na reprodução.",
    reproducao: "A fêmea libera feromônios para atrair machos, que conseguem detectá-la a vários quilômetros de distância pelas antenas sensíveis.",
    importancia: "Seus casulos são usados tradicionalmente na produção de um tipo de seda silvestre em algumas regiões da Ásia.",
    curiosidade: "É uma das maiores mariposas do mundo em área de asa, e o nome vem de Atlas, o titã da mitologia grega que carregava o mundo nos ombros.",
    mitos: [{ afirmacao: "A mariposa-atlas pode picar ou morder pessoas.", veredito: "mito", explicacao: "Como não se alimenta na fase adulta, sequer possui aparelho bucal funcional — é totalmente inofensiva a humanos." }],
  },
  {
    id: "vaga-lume", nome: "Vaga-lume", cientifico: "Família Lampyridae", grupo: "voadores",
    imagem: "Photinus pyralis Firefly 3.jpg",
    classe: "Inseto", habitat: ["Aéreo", "Terrestre"], distribuicao: "Regiões tropicais e temperadas de todo o mundo",
    alimentacao: "Varia conforme a fase de vida — larvas são carnívoras, comendo caramujos e lesmas; muitos adultos não se alimentam",
    conservacao: "Não avaliada (várias espécies em declínio por poluição luminosa)", tamanho: "1–2,5 cm", expectativa: "1–2 anos, a maior parte como larva",
    caracteristicas: "Produz luz própria (bioluminescência) através de uma reação química no abdômen, controlada com grande precisão.",
    comportamento: "Usa padrões específicos de piscadas luminosas para atrair parceiros durante o crepúsculo e à noite.",
    reproducao: "Cada espécie tem um padrão de piscar único, funcionando como um 'código' para reconhecimento entre machos e fêmeas da mesma espécie.",
    importancia: "As larvas predam caramujos e lesmas, ajudando a controlar essas populações em jardins e áreas úmidas.",
    curiosidade: "A luz do vaga-lume é uma das formas de produção de luz mais eficientes da natureza, com quase toda a energia convertida em luz e pouquíssima perdida como calor.",
    mitos: [{ afirmacao: "Todo vaga-lume pisca da mesma forma.", veredito: "mito", explicacao: "Cada espécie tem um padrão característico de cor, duração e intervalo de piscadas, usado justamente para reconhecer parceiros da própria espécie." }],
  },
  {
    id: "cigarra", nome: "Cigarra", cientifico: "Família Cicadidae", grupo: "voadores",
    imagem: "Cicadidae - Cicada orni-3.JPG",
    classe: "Inseto", habitat: ["Aéreo", "Terrestre", "Subterrâneo"], distribuicao: "Regiões tropicais e temperadas de todo o mundo",
    alimentacao: "Herbívora — seiva extraída de raízes (fase de ninfa) e de galhos de árvores (fase adulta)",
    conservacao: "Não avaliada", tamanho: "2–5 cm, conforme a espécie", expectativa: "Ninfa pode viver anos no solo; adulto vive poucas semanas",
    caracteristicas: "Machos possuem órgãos especiais chamados timbais, membranas que vibram rapidamente para produzir o canto característico.",
    comportamento: "Passa a maior parte da vida como ninfa subterrânea, sugando seiva de raízes antes de emergir como adulto alado.",
    reproducao: "Após o acasalamento, a fêmea deposita os ovos em fendas de galhos; as ninfas recém-nascidas caem no solo e se enterram.",
    importancia: "Ao se alimentar de seiva e depois morrer em massa, devolve nutrientes ao solo florestal, além de servir de alimento para diversos predadores.",
    curiosidade: "Algumas espécies de cigarra periódica passam a maior parte da vida — até 17 anos — enterradas como ninfas antes de emergir todas juntas.",
    mitos: [{ afirmacao: "Todas as cigarras vivem 17 anos.", veredito: "mito", explicacao: "Esse ciclo longo é característico de poucas espécies periódicas da América do Norte; a maioria das cigarras do mundo, incluindo as brasileiras, tem ciclos de vida bem mais curtos." }],
  },
  {
    id: "ra-de-vidro", nome: "Rã-de-vidro", cientifico: "Hyalinobatrachium valerioi", grupo: "anfibios",
    imagem: "Hyalinobatrachium valerioi Costa Rica.JPG",
    classe: "Anfíbio", habitat: ["Terrestre", "Água doce"], distribuicao: "Florestas tropicais da América Central e norte da América do Sul",
    alimentacao: "Carnívora — pequenos insetos",
    conservacao: "Pouco preocupante", tamanho: "2–3 cm", expectativa: "Estimada em vários anos",
    caracteristicas: "Pele ventral parcialmente transparente, através da qual é possível ver órgãos internos, incluindo o coração batendo.",
    comportamento: "Vive em vegetação próxima a riachos, sendo mais ativa e vocal durante a noite, na época chuvosa.",
    reproducao: "Os ovos são depositados em folhas acima da água; ao eclodirem, os girinos caem diretamente no riacho abaixo.",
    importancia: "Indicadora sensível da qualidade da água de riachos de floresta, já que depende de ambientes bem preservados para se reproduzir.",
    curiosidade: "A transparência parcial funciona como camuflagem: quando parada sobre uma folha, a borda do corpo praticamente desaparece contra o fundo verde.",
    mitos: [{ afirmacao: "É possível ver todos os órgãos da rã-de-vidro através da pele.", veredito: "mito", explicacao: "Apenas a região ventral (barriga) é parcialmente transparente; o dorso do animal é opaco e verde, funcionando como camuflagem entre as folhas." }],
  },
  {
    id: "sapo-comum-europeu", nome: "Sapo-comum-europeu", cientifico: "Bufo bufo", grupo: "anfibios",
    imagem: "Bufo bufo.jpg",
    classe: "Anfíbio", habitat: ["Terrestre", "Água doce"], distribuicao: "Grande parte da Europa, oeste da Ásia e norte da África",
    alimentacao: "Carnívoro — insetos, minhocas, lesmas e outros pequenos invertebrados",
    conservacao: "Pouco preocupante (em declínio em partes de sua área de ocorrência)", tamanho: "8–15 cm", expectativa: "10–12 anos, podendo passar de 15",
    caracteristicas: "Pele seca e verrucosa, com glândulas paratoides atrás dos olhos que secretam substância defensiva de sabor desagradável.",
    comportamento: "Hábitos terrestres e noturnos na maior parte do ano, retornando a corpos d'água apenas na época de reprodução.",
    reproducao: "Realiza migrações em massa até charcos e lagoas na primavera, muitas vezes atravessando estradas — motivo de projetos de proteção em várias cidades europeias.",
    importancia: "Controla populações de insetos e invertebrados em jardins, hortas e florestas.",
    curiosidade: "Em muitas cidades europeias, voluntários montam 'túneis de sapo' e patrulhas noturnas durante a migração reprodutiva para reduzir mortes por atropelamento.",
    mitos: [{ afirmacao: "Tocar um sapo causa verrugas na pele humana.", veredito: "mito", explicacao: "Verrugas em humanos são causadas por um vírus (HPV), sem nenhuma relação com o contato com a pele de sapos ou rãs." }],
  },
  {
    id: "perereca-verde", nome: "Perereca-verde-americana", cientifico: "Hyla cinerea", grupo: "anfibios",
    imagem: "Green treefrog.jpg",
    classe: "Anfíbio", habitat: ["Terrestre", "Água doce"], distribuicao: "Sudeste dos Estados Unidos",
    alimentacao: "Carnívora — mosquitos, moscas e outros pequenos insetos",
    conservacao: "Pouco preocupante", tamanho: "3–6 cm", expectativa: "Até 6 anos na natureza",
    caracteristicas: "Coloração verde brilhante a marrom-avermelhada, muitas vezes com uma faixa clara na lateral do corpo.",
    comportamento: "Arborícola e noturna, passa o dia camuflada entre folhas e é bastante vocal em noites quentes e úmidas.",
    reproducao: "Reproduz-se em corpos d'água parados; os machos formam coros audíveis a longa distância para atrair fêmeas.",
    importancia: "Controla populações de insetos, incluindo mosquitos, em ambientes próximos a rios, lagos e áreas urbanas.",
    curiosidade: "É uma das espécies de anfíbio mais popularmente criadas como animal de estimação no mundo, por seu tamanho pequeno e cores vivas.",
    mitos: [{ afirmacao: "A perereca-verde é sempre da mesma tonalidade de verde.", veredito: "mito", explicacao: "A coloração pode variar de verde vivo a marrom-acinzentado dependendo da temperatura, umidade e estado emocional do animal." }],
  },
  {
    id: "tritao-comum", nome: "Tritão-comum", cientifico: "Lissotriton vulgaris", grupo: "anfibios",
    imagem: "LissotritonVulgarisMaleWater.JPG",
    classe: "Anfíbio", habitat: ["Terrestre", "Água doce"], distribuicao: "Grande parte da Europa e oeste da Ásia",
    alimentacao: "Carnívoro — pequenos invertebrados aquáticos e terrestres, como larvas e vermes",
    conservacao: "Pouco preocupante", tamanho: "8–11 cm", expectativa: "6–10 anos, podendo passar de 15 em cativeiro",
    caracteristicas: "Corpo alongado tipo salamandra; machos desenvolvem uma crista dorsal ondulada vistosa durante a época de reprodução.",
    comportamento: "Vive em terra a maior parte do ano, migrando para lagoas e poças na primavera para se reproduzir.",
    reproducao: "O macho realiza uma dança de corte diante da fêmea antes de depositar um pacote de espermatozoides que ela recolhe com a cloaca.",
    importancia: "Como predador de pequenos invertebrados aquáticos, ajuda a regular esses organismos em poças e lagoas temporárias.",
    curiosidade: "Assim como salamandras, é capaz de regenerar partes do corpo perdidas, incluindo partes de patas e da cauda.",
    mitos: [{ afirmacao: "Tritão e salamandra são exatamente o mesmo tipo de animal.", veredito: "mito", explicacao: "Tritões pertencem a gêneros específicos dentro da família das salamandras verdadeiras, mas têm hábitos mais aquáticos que muitas salamandras terrestres — o termo 'tritão' é usado para as espécies com essa vida mais ligada à água." }],
  },
];

const CURIOSIDADES = [
  { animalId: "polvo", titulo: "O polvo possui três corações", texto: "Dois corações bombeiam sangue para as brânquias e um terceiro bombeia sangue para o restante do corpo — por isso o polvo cansa mais rápido quando nada do que quando rasteja." },
  { animalId: "axolote", titulo: "O axolote regenera partes do corpo", texto: "Patas, cauda e até estruturas internas podem ser regeneradas quase sem cicatriz, o que faz do axolote um dos animais mais estudados na medicina regenerativa." },
  { animalId: "elefante", titulo: "Elefantes se reconhecem no espelho", texto: "Junto com humanos, grandes primatas e golfinhos, os elefantes estão entre os poucos animais que passam no chamado 'teste do espelho', indicando autoconsciência." },
  { animalId: "golfinho", titulo: "Cada golfinho tem um 'nome' sonoro", texto: "O assovio-assinatura é único para cada indivíduo e usado por toda a vida para que outros golfinhos o reconheçam à distância." },
  { animalId: "onca-pintada", titulo: "A onça-pintada tem a mordida mais forte entre os grandes felinos", texto: "Proporcionalmente ao tamanho do corpo, sua força de mordida é a maior entre os grandes felinos, suficiente para perfurar o casco de um jacaré." },
  { animalId: "mico-leao-dourado", titulo: "Quase extinto, hoje é símbolo de conservação", texto: "Restavam poucas centenas de indivíduos na natureza nos anos 1970; hoje a espécie se recupera graças a décadas de reintrodução e proteção de habitat." },
  { animalId: "girafa", titulo: "A girafa dorme muito pouco", texto: "Entre 30 minutos e poucas horas por dia, em cochilos curtos — um dos menores tempos de sono entre os mamíferos." },
  { animalId: "baleia-azul", titulo: "O coração da baleia-azul pode pesar mais de 180 kg", texto: "É o maior animal já existente no planeta, maior até que os maiores dinossauros conhecidos." },
  { animalId: "abelha", titulo: "Abelhas 'dançam' para se comunicar", texto: "Operárias indicam a direção e a distância de fontes de alimento a outras abelhas por meio de movimentos específicos do corpo." },
  { animalId: "peixe-palhaco", titulo: "Todo peixe-palhaço nasce macho", texto: "O indivíduo dominante do grupo se transforma em fêmea ao longo da vida — um fenômeno chamado hermafroditismo sequencial." },
];

const DUVIDAS = [
  {
    pergunta: "Por que o axolote consegue regenerar partes do corpo?",
    resposta: "Porque mantém, mesmo na fase adulta, células com alta plasticidade que conseguem se reorganizar para reconstruir tecidos perdidos.",
    comoFunciona: "Ao redor do ferimento, células se desdiferenciam, formam um agrupamento chamado blastema e depois se reprogramam para virar músculo, osso, pele ou nervo — como se reiniciassem parte do desenvolvimento embrionário.",
    curiosidade: "Esse processo pode se repetir muitas vezes ao longo da vida do animal, na mesma pata ou órgão.",
    importancia: "Entender esse mecanismo ajuda pesquisas sobre cicatrização e regeneração de tecidos em humanos.",
    animalId: "axolote",
  },
  {
    pergunta: "A aranha-marrom é realmente perigosa?",
    resposta: "Pode ser, mas a gravidade varia muito de caso para caso — a maioria das picadas causa apenas uma lesão local que cicatriza sozinha.",
    comoFunciona: "O veneno tem ação sobre tecidos e vasos sanguíneos próximos à picada; em uma pequena parcela dos casos pode causar reações mais amplas no organismo.",
    curiosidade: "A aranha só pica em defesa, geralmente quando é comprimida contra o corpo dentro de roupas ou calçados.",
    importancia: "Sacudir roupas e calçados guardados, e vedar frestas em casa, reduz bastante o risco de acidentes.",
    animalId: "aranha-marrom",
  },
  {
    pergunta: "Por que alguns sapos são venenosos?",
    resposta: "Porque desenvolveram glândulas na pele que produzem toxinas como defesa contra predadores.",
    comoFunciona: "As glândulas paratoides, geralmente atrás dos olhos, liberam secreção quando o animal é pressionado ou mordido — não há picada nem injeção ativa de veneno.",
    curiosidade: "A cor viva de muitos sapos e rãs venenosos é um aviso visual para predadores, estratégia chamada de aposematismo.",
    importancia: "Essas defesas químicas fazem parte do equilíbrio predador-presa nos ecossistemas onde vivem.",
    animalId: "sapo-boi",
  },
  {
    pergunta: "Como os tubarões percebem suas presas?",
    resposta: "Combinam olfato apurado, visão, audição e um sentido elétrico exclusivo para localizar presas mesmo escondidas ou no escuro.",
    comoFunciona: "As ampolas de Lorenzini, poros sensíveis no focinho, detectam os campos elétricos fracos gerados pelos músculos de qualquer animal vivo por perto.",
    curiosidade: "Esse sentido é tão sensível que alguns tubarões conseguem localizar presas enterradas na areia do fundo do mar.",
    importancia: "Como predadores de topo, dependem dessa percepção apurada para manter o equilíbrio das cadeias alimentares marinhas.",
    animalId: "tubarao",
  },
];

const MITOS = [
  { afirmacao: "Todo morcego é cego.", veredito: "mito", explicacao: "A maioria das espécies de morcego enxerga normalmente; muitas usam ecolocalização como sentido complementar, não substituto, da visão." },
  { afirmacao: "O camaleão muda de cor apenas para se camuflar.", veredito: "mito", explicacao: "A mudança de cor também comunica humor e intenções territoriais e ajuda a regular a temperatura do corpo." },
  { afirmacao: "Toda cobra venenosa é perigosa para humanos.", veredito: "depende", explicacao: "A periculosidade depende da espécie, da quantidade de veneno inoculado e do tempo até o atendimento médico; nem toda picada evolui para quadro grave." },
  { afirmacao: "Aranhas são insetos.", veredito: "mito", explicacao: "Aranhas são aracnídeos: têm oito patas e o corpo dividido em duas partes, enquanto insetos têm seis patas e três partes no corpo." },
  { afirmacao: "Tubarões precisam nadar o tempo inteiro.", veredito: "depende", explicacao: "Vale para espécies que dependem do movimento para respirar, mas outras conseguem bombear água ativamente pelas brânquias e descansar." },
];

const BLOG = [
  { titulo: "Por que a onça-pintada é essencial para o Pantanal", categoria: "Conservação", resumo: "Como um único predador de topo sustenta o equilíbrio de um dos biomas mais ricos do planeta.", data: "3 ago 2026", leitura: "6 min", grupo: "mamiferos" },
  { titulo: "Ecolocalização: como os animais 'enxergam' com o som", categoria: "Comportamento animal", resumo: "Do golfinho ao morcego, entenda o princípio físico por trás de um dos sentidos mais surpreendentes da natureza.", data: "27 jul 2026", leitura: "5 min", grupo: "marinhos" },
  { titulo: "Regeneração animal: o que a ciência aprende com o axolote", categoria: "Ciência", resumo: "Pesquisadores estudam a espécie há décadas em busca de respostas para a medicina regenerativa humana.", data: "18 jul 2026", leitura: "7 min", grupo: "anfibios" },
  { titulo: "Aranhas em casa: quando se preocupar de verdade", categoria: "Animais perigosos", resumo: "Um guia prático e baseado em ciência para diferenciar risco real de mito popular.", data: "9 jul 2026", leitura: "4 min", grupo: "invertebrados" },
];

const QUIZ = [
  // FÁCIL
  { dificuldade: "facil", pergunta: "Qual animal possui três corações?", opcoes: ["Tubarão", "Polvo", "Golfinho", "Tartaruga"], correta: 1, explicacao: "O polvo tem três corações: dois bombeiam sangue para as brânquias e um para o restante do corpo." },
  { dificuldade: "facil", pergunta: "Qual é o maior animal terrestre do mundo?", opcoes: ["Girafa", "Onça-pintada", "Elefante-africano", "Urso-polar"], correta: 2, explicacao: "O elefante-africano é o maior animal terrestre vivo, podendo pesar mais de 6 toneladas." },
  { dificuldade: "facil", pergunta: "Golfinhos são:", opcoes: ["Peixes", "Mamíferos", "Répteis", "Anfíbios"], correta: 1, explicacao: "Golfinhos respiram ar pelos pulmões, são de sangue quente e amamentam os filhotes — por isso são mamíferos." },
  { dificuldade: "facil", pergunta: "Qual é a maior espécie de arara do mundo?", opcoes: ["Arara-azul-grande", "Arara-canindé", "Arara-vermelha", "Maritaca"], correta: 0, explicacao: "A arara-azul-grande (Anodorhynchus hyacinthinus) é a maior espécie de arara do mundo." },
  { dificuldade: "facil", pergunta: "O peixe-palhaço vive em parceria com qual animal?", opcoes: ["Estrela-do-mar", "Anêmona-do-mar", "Água-viva", "Coral"], correta: 1, explicacao: "O peixe-palhaço vive em mutualismo com anêmonas-do-mar, protegido por um muco especial na pele." },
  { dificuldade: "facil", pergunta: "Qual desses animais é um inseto?", opcoes: ["Aranha-lobo", "Escorpião", "Abelha-europeia", "Estrela-do-mar"], correta: 2, explicacao: "A abelha é um inseto; aranhas e escorpiões são aracnídeos, e a estrela-do-mar é um equinodermo." },
  { dificuldade: "facil", pergunta: "Qual destas corujas é ativa também durante o dia?", opcoes: ["Coruja-buraqueira", "Coruja-orelhuda", "Coruja-das-torres", "Murucututu"], correta: 0, explicacao: "Diferente da maioria das corujas, a coruja-buraqueira caça e forrageia também de dia." },
  { dificuldade: "facil", pergunta: "O gavião-real se alimenta principalmente de:", opcoes: ["Peixes", "Preguiças e macacos", "Insetos", "Frutas"], correta: 1, explicacao: "O gavião-real é especializado em caçar mamíferos arborícolas de médio porte, como preguiças e macacos." },
  { dificuldade: "facil", pergunta: "Qual é o maior primata vivo do mundo?", opcoes: ["Chimpanzé", "Gorila", "Orangotango", "Mico-leão-dourado"], correta: 1, explicacao: "O gorila é o maior primata vivo, podendo ultrapassar 180 kg em machos adultos." },
  { dificuldade: "facil", pergunta: "A capivara é um(a):", opcoes: ["Porco selvagem", "Roedor", "Marsupial", "Anfíbio"], correta: 1, explicacao: "A capivara é o maior roedor vivo do mundo, parente de cutias e preás." },
  { dificuldade: "facil", pergunta: "Qual é o animal terrestre mais rápido do mundo?", opcoes: ["Leão", "Zebra", "Guepardo", "Avestruz"], correta: 2, explicacao: "O guepardo pode atingir mais de 100 km/h em curtas distâncias, sendo o animal terrestre mais rápido do planeta." },
  { dificuldade: "facil", pergunta: "O coala se alimenta quase exclusivamente de:", opcoes: ["Bambu", "Folhas de eucalipto", "Frutas", "Insetos"], correta: 1, explicacao: "O coala tem uma dieta especializada quase exclusivamente em folhas de eucalipto." },
  { dificuldade: "facil", pergunta: "O que o baiacu faz quando se sente ameaçado?", opcoes: ["Muda de cor", "Infla o corpo com água ou ar", "Solta tinta", "Se enterra na areia"], correta: 1, explicacao: "O baiacu enche o estômago elástico com água ou ar, formando uma bola coberta de espinhos como defesa." },
  { dificuldade: "facil", pergunta: "O vaga-lume produz luz própria através de:", opcoes: ["Reflexo do sol", "Bioluminescência, uma reação química no corpo", "Aquecimento do corpo", "Absorção de luz de outros animais"], correta: 1, explicacao: "A bioluminescência é uma reação química que ocorre no abdômen do vaga-lume, convertendo quase toda a energia em luz." },
  // MÉDIO
  { dificuldade: "medio", pergunta: "Quem carrega os ovos no cavalo-marinho?", opcoes: ["A fêmea", "O macho", "Nenhum dos dois cuida dos ovos", "Ambos revezam"], correta: 1, explicacao: "No cavalo-marinho, é o macho quem carrega os ovos em uma bolsa ventral até o nascimento dos filhotes." },
  { dificuldade: "medio", pergunta: "O escorpião-amarelo se reproduz principalmente por:", opcoes: ["Fecundação externa", "Partenogênese, sem macho", "Divisão do corpo", "Só em cativeiro"], correta: 1, explicacao: "Fêmeas de escorpião-amarelo costumam se reproduzir por partenogênese, gerando filhotes sem fertilização de um macho." },
  { dificuldade: "medio", pergunta: "O axolote é capaz de:", opcoes: ["Voar curtas distâncias", "Regenerar partes do corpo", "Mudar de cor à vontade", "Viver fora da água por anos"], correta: 1, explicacao: "O axolote regenera patas, cauda e até estruturas internas ao longo de toda a vida." },
  { dificuldade: "medio", pergunta: "A onça-pintada é diferente da maioria dos grandes felinos porque:", opcoes: ["Não caça sozinha", "É excelente nadadora", "Vive apenas em grupos", "Não tem território"], correta: 1, explicacao: "Ao contrário da maioria dos felinos, a onça-pintada nada muito bem e frequenta ambientes alagados." },
  { dificuldade: "medio", pergunta: "O mico-leão-dourado é nativo de qual bioma brasileiro?", opcoes: ["Cerrado", "Caatinga", "Mata Atlântica", "Pampa"], correta: 2, explicacao: "É endêmico da Mata Atlântica do Rio de Janeiro e símbolo de sua conservação." },
  { dificuldade: "medio", pergunta: "Camaleões mudam de cor:", opcoes: ["Só para se camuflar", "Só quando têm frio", "Também para se comunicar", "Apenas filhotes mudam"], correta: 2, explicacao: "A mudança de cor comunica humor e intenções territoriais, além de ajudar na regulação térmica." },
  { dificuldade: "medio", pergunta: "Por que a girafa raramente dorme por longos períodos?", opcoes: ["Não sente sono", "É um dos mamíferos que menos dorme, em cochilos curtos", "Só dorme durante migrações", "Dorme apenas em pé o dia todo"], correta: 1, explicacao: "Girafas costumam dormir só de 30 minutos a poucas horas por dia, entre os menores tempos de sono de qualquer mamífero." },
  { dificuldade: "medio", pergunta: "A borboleta-monarca é famosa por:", opcoes: ["Ser a maior borboleta do mundo", "Fazer uma das migrações mais longas entre os insetos", "Viver só no fundo do oceano", "Não ter predadores naturais"], correta: 1, explicacao: "Sua migração pode percorrer milhares de quilômetros, geralmente ao longo de várias gerações." },
  { dificuldade: "medio", pergunta: "O que protege o peixe-palhaço das células urticantes da anêmona?", opcoes: ["Escamas grossas", "Um muco especial na pele", "Veneno próprio", "Ele nunca encosta na anêmona"], correta: 1, explicacao: "Um muco na pele do peixe-palhaço o protege das células urticantes das anêmonas com as quais vive em parceria." },
  { dificuldade: "medio", pergunta: "O panda-vermelho é próximo geneticamente do:", opcoes: ["Panda-gigante", "Guaxinim e sua própria família única", "Urso-pardo", "Gato doméstico"], correta: 1, explicacao: "Apesar do nome parecido, o panda-vermelho não é próximo do panda-gigante — é o único membro vivo de sua própria família, os Ailuridae." },
  { dificuldade: "medio", pergunta: "A jiboia mata suas presas por:", opcoes: ["Veneno", "Constrição", "Mordida venenosa lenta", "Sufocamento com terra"], correta: 1, explicacao: "A jiboia não é peçonhenta; ela mata enrolando o corpo na presa e interrompendo sua circulação sanguínea." },
  { dificuldade: "medio", pergunta: "As formigas-cortadeiras usam as folhas que carregam para:", opcoes: ["Comer diretamente", "Cultivar um fungo do qual se alimentam", "Construir o formigueiro por fora", "Atrair outras formigas"], correta: 1, explicacao: "As folhas servem de adubo para cultivar um fungo específico dentro do formigueiro — é esse fungo que alimenta a colônia." },
  { dificuldade: "medio", pergunta: "O salmão-do-atlântico é uma espécie:", opcoes: ["Que vive só em água doce", "Que vive só no mar", "Anádroma, migrando entre rio e mar", "Que não se reproduz"], correta: 2, explicacao: "É anádroma: nasce em água doce, migra para o mar para crescer, e retorna ao rio de origem para se reproduzir." },
  { dificuldade: "medio", pergunta: "A pele ventral da rã-de-vidro é conhecida por ser:", opcoes: ["Extremamente grossa", "Parcialmente transparente", "Coberta de espinhos", "Impermeável à água"], correta: 1, explicacao: "A pele da barriga é parcialmente transparente, permitindo ver órgãos internos como o coração batendo." },
  // DIFÍCIL
  { dificuldade: "dificil", pergunta: "Como o axolote regenera partes do corpo?", opcoes: ["Formando um agrupamento de células chamado blastema", "Absorvendo células de outros animais", "Apenas na fase larval", "Trocando de pele periodicamente"], correta: 0, explicacao: "Ao redor do ferimento, células se desdiferenciam e formam o blastema, que se reprograma para reconstruir o tecido perdido." },
  { dificuldade: "dificil", pergunta: "O peixe-palhaço nasce macho ou fêmea?", opcoes: ["Sempre fêmea", "Sempre macho, podendo virar fêmea depois", "Metade macho, metade fêmea", "Varia aleatoriamente ao nascer"], correta: 1, explicacao: "Todos nascem machos; o indivíduo dominante do grupo se transforma em fêmea, fenômeno chamado hermafroditismo sequencial." },
  { dificuldade: "dificil", pergunta: "O que determina o sexo dos filhotes de tartaruga-verde?", opcoes: ["A genética dos pais", "A temperatura do ninho", "A profundidade da praia", "A época do ano apenas"], correta: 1, explicacao: "Em tartarugas marinhas, a temperatura de incubação dos ovos define se os filhotes nascerão machos ou fêmeas." },
  { dificuldade: "dificil", pergunta: "As ampolas de Lorenzini, presentes em tubarões, detectam:", opcoes: ["Vibrações sonoras", "Campos elétricos de outros animais", "Variações de temperatura da água", "Correntes marítimas"], correta: 1, explicacao: "Esses poros sensíveis no focinho do tubarão detectam os campos elétricos fracos gerados pelos músculos de animais próximos." },
  { dificuldade: "dificil", pergunta: "Por que a rã-touro é considerada uma ameaça fora da América do Norte?", opcoes: ["Por ser venenosa para humanos", "Por predar espécies nativas de anfíbios em áreas onde foi introduzida", "Por transmitir doenças às plantas", "Por competir apenas com aves"], correta: 1, explicacao: "Fora de sua área nativa, a rã-touro é espécie invasora e predadora de anfíbios e outros pequenos animais nativos." },
  { dificuldade: "dificil", pergunta: "O que caracteriza a neotenia do axolote?", opcoes: ["Ele nunca se reproduz", "Atinge a maturidade sexual sem sofrer metamorfose completa", "Muda de cor a cada estação", "Vive fora da água na fase adulta"], correta: 1, explicacao: "O axolote é neotênico: chega à vida adulta e se reproduz mantendo características de larva, como as brânquias externas." },
  { dificuldade: "dificil", pergunta: "Como o dragão-de-komodo ajuda a imobilizar suas presas?", opcoes: ["Apenas com força bruta", "Por glândulas de veneno que dificultam a coagulação do sangue", "Enrolando o corpo como uma cobra", "Cuspindo ácido"], correta: 1, explicacao: "Pesquisas mostraram que o dragão-de-komodo possui glândulas de veneno que causam queda de pressão e dificultam a coagulação do sangue da presa." },
  { dificuldade: "dificil", pergunta: "De onde vem principalmente a toxina da pele da rã-venenosa Dendrobates?", opcoes: ["É produzida do zero pelo próprio corpo", "Vem da dieta de formigas e ácaros específicos", "Só existe em cativeiro", "É herdada geneticamente sem relação com a alimentação"], correta: 1, explicacao: "A toxicidade da pele está fortemente ligada à dieta natural de formigas e ácaros da floresta; sem essa dieta, a espécie perde grande parte da toxicidade em cativeiro." },
  { dificuldade: "dificil", pergunta: "Por que a pele da zebra é considerada, na base, escura?", opcoes: ["Estudos embriológicos indicam que a pele de base é escura e as listras brancas são a variação", "A pele muda de cor com a idade", "É apenas um mito sem base científica", "Só os machos têm pele escura"], correta: 0, explicacao: "Estudos embriológicos indicam que a base da pele da zebra é escura, e as listras brancas surgem como variação — o oposto do que a intuição popular sugere." },
  { dificuldade: "dificil", pergunta: "Qual órgão sensorial permite à cascavel detectar presas mesmo no escuro total?", opcoes: ["Ampolas de Lorenzini", "Fossetas loreais sensíveis ao calor", "Bigodes táteis", "Olfato ultrassensível apenas"], correta: 1, explicacao: "As fossetas loreais, entre o olho e a narina, detectam o calor corporal de presas próximas, funcionando como um sentido térmico." },
  { dificuldade: "dificil", pergunta: "Por que o peixe-boi-marinho é considerado a provável origem das lendas de sereia?", opcoes: ["Porque tem cauda de peixe e canta", "Por ser confundido à distância por marinheiros, segundo historiadores", "Porque vive apenas em cavernas submersas", "Não há nenhuma relação real com essas lendas"], correta: 1, explicacao: "Historiadores e biólogos apontam o peixe-boi e o dugongo como prováveis origens de avistamentos que alimentaram lendas de sereias ao longo da história." },
  { dificuldade: "dificil", pergunta: "Por que o formato de martelo da cabeça do tubarão-martelo é vantajoso?", opcoes: ["Serve como arma de ataque contra presas", "Amplia a área de eletrorrecepção e a visão binocular", "Ajuda apenas na flutuação", "Não tem nenhuma função conhecida"], correta: 1, explicacao: "O formato amplia a área sensorial do animal, melhorando a detecção elétrica e a visão, principalmente útil para localizar arraias escondidas na areia." },
  { dificuldade: "dificil", pergunta: "De onde vem, em muitas espécies, a toxina tetrodotoxina encontrada no baiacu?", opcoes: ["É produzida do zero pelo próprio peixe", "Vem originalmente de bactérias da cadeia alimentar que ele consome", "É sintetizada apenas em cativeiro", "Vem exclusivamente da água do mar"], correta: 1, explicacao: "Em muitas espécies, a toxina é acumulada a partir de bactérias presentes na cadeia alimentar, não sintetizada do zero pelo próprio peixe." },
];

const NIVEIS_DIFICULDADE = [
  { key: "facil", label: "Fácil", emoji: "🌱" },
  { key: "medio", label: "Médio", emoji: "🔬" },
  { key: "dificil", label: "Difícil", emoji: "🏆" },
];

const REGIOES = [
  { key: "america-sul", nome: "América do Sul", emoji: "🌎", animais: ["onca-pintada", "mico-leao-dourado", "sapo-boi", "ra-touro", "aranha-lobo", "aranha-marrom", "arara-azul", "piranha-vermelha", "jacare-papo-amarelo", "cobra-coral", "gaviao-real", "morcego-vampiro", "cavalo-marinho", "escorpiao-amarelo", "ra-venenosa", "tucano-toco", "coruja-buraqueira", "tamandua-bandeira", "preguica", "jiboia", "cascavel", "iguana", "peixe-boi", "formiga-cortadeira", "caranguejo-uca", "ra-de-vidro"], texto: "Abriga a Amazônia e a Mata Atlântica, dois dos biomas mais ricos em biodiversidade do planeta." },
  { key: "america-norte", nome: "América do Norte", emoji: "🌎", animais: ["ra-touro", "borboleta-monarca", "aguia-careca", "salmao", "vaga-lume", "perereca-verde"], texto: "Florestas temperadas, pradarias e grandes lagos formam habitats diversos; a borboleta-monarca migra por todo o continente." },
  { key: "europa", nome: "Europa", emoji: "🌍", animais: ["camaleao", "salamandra", "urso-pardo", "joaninha", "louva-a-deus", "sapo-comum-europeu", "tritao-comum", "cigarra"], texto: "Ambientes mais frios e sazonais abrigam poucas espécies de répteis tropicais, com exceções em regiões mediterrâneas." },
  { key: "africa", nome: "África", emoji: "🌍", animais: ["elefante", "camaleao", "leao", "girafa", "hipopotamo", "zebra", "gorila", "rinoceronte-branco", "chimpanze", "guepardo", "avestruz", "flamingo"], texto: "Savanas, florestas tropicais e Madagascar concentram uma das maiores diversidades de mamíferos e répteis do mundo." },
  { key: "asia", nome: "Ásia", emoji: "🌏", animais: ["peixe-palhaco", "dragao-komodo", "tigre", "panda-vermelho", "mariposa-atlas"], texto: "De florestas tropicais a estepes geladas, o continente reúne uma enorme variedade de climas e espécies, incluindo os recifes do Indo-Pacífico." },
  { key: "oceania", nome: "Oceania", emoji: "🌏", animais: ["peixe-palhaco"], texto: "Isolamento geográfico favoreceu a evolução de espécies únicas, muitas encontradas apenas nessa região." },
  { key: "antartida", nome: "Antártida", emoji: "🧊", animais: ["pinguim-imperador"], texto: "Clima extremo permite vida adaptada ao frio intenso, concentrada principalmente na costa e no oceano ao redor." },
  { key: "oceanos", nome: "Oceanos", emoji: "🌊", animais: ["tubarao", "polvo", "golfinho", "baleia-azul", "tartaruga-marinha", "agua-viva", "estrela-do-mar", "orca", "foca", "tubarao-martelo", "arraia", "peixe-voador", "baiacu"], texto: "Cobrem mais de 70% do planeta e concentram uma biodiversidade marinha ainda pouco explorada pela ciência." },
];

const BIOMAS_BR = [
  { nome: "Amazônia", emoji: "🌳", animais: ["onca-pintada", "arara-azul", "piranha-vermelha", "gaviao-real", "ra-venenosa", "morcego-vampiro", "preguica"], texto: "Maior floresta tropical do planeta, com a maior diversidade de espécies terrestres do mundo." },
  { nome: "Mata Atlântica", emoji: "🌿", animais: ["mico-leao-dourado", "jiboia"], texto: "Um dos biomas mais ameaçados do Brasil, com altíssimo grau de endemismo — espécies que não existem em nenhum outro lugar." },
  { nome: "Cerrado", emoji: "🌾", animais: ["sapo-boi", "coruja-buraqueira", "tucano-toco", "tamandua-bandeira", "cascavel"], texto: "Savana brasileira com vegetação adaptada ao fogo e às estações bem definidas de seca e chuva." },
  { nome: "Caatinga", emoji: "🌵", animais: [], texto: "Único bioma exclusivamente brasileiro, com espécies adaptadas à escassez de água do semiárido." },
  { nome: "Pantanal", emoji: "💧", animais: ["onca-pintada", "arara-azul", "jacare-papo-amarelo", "capivara"], texto: "Maior planície alagável do mundo, com altíssima concentração de fauna visível, incluindo a onça-pintada." },
  { nome: "Pampa", emoji: "🌱", animais: [], texto: "Campos abertos no extremo sul do Brasil, com fauna adaptada a pastagens naturais." },
];

const NIVEIS = [
  { min: 0, nome: "Curioso", emoji: "🌱" },
  { min: 2, nome: "Aprendiz", emoji: "🔬" },
  { min: 3, nome: "Explorador", emoji: "🧬" },
  { min: 4, nome: "Biólogo Júnior", emoji: "🦁" },
  { min: 5, nome: "Mestre da Biodiversidade", emoji: "🏆" },
];

const VEREDITO_UI = {
  mito: { label: "MITO", color: "#B4453B", Icon: XCircle },
  verdade: { label: "VERDADE", color: "#2F6F4F", Icon: CheckCircle2 },
  depende: { label: "DEPENDE", color: "#B8862F", Icon: ShieldAlert },
};

/* ============================================================
   SMALL UI PRIMITIVES
   ============================================================ */

function DnaRule({ color = "#8FBF8B" }) {
  return (
    <svg width="100%" height="14" viewBox="0 0 200 14" preserveAspectRatio="none" className="block">
      <path d="M0 2 Q 25 12 50 2 T 100 2 T 150 2 T 200 2" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M0 12 Q 25 2 50 12 T 100 12 T 150 12 T 200 12" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

function CatalogNumber({ n }) {
  return (
    <span
      style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}
      className="text-[11px] uppercase text-[#6f8072]"
    >
      Espécime Nº {String(n).padStart(3, "0")}
    </span>
  );
}

function SectionEyebrow({ children, color = "#2F6F4F" }) {
  return (
    <div
      style={{ fontFamily: "'IBM Plex Mono', monospace", color }}
      className="text-xs uppercase tracking-[0.18em] mb-3 flex items-center gap-2"
    >
      <span className="w-6 h-px" style={{ background: color }} />
      {children}
    </div>
  );
}

function Pill({ children, active, onClick, color = "#2F6F4F" }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-sm font-medium border transition-colors"
      style={
        active
          ? { background: color, borderColor: color, color: "#F6F3EA" }
          : { background: "transparent", borderColor: "#D9D2C2", color: "#3A4A3D" }
      }
    >
      {children}
    </button>
  );
}

/* ============================================================
   HEADER / FOOTER
   ============================================================ */

function Header({ page, go, query, setQuery, onSearchSubmit }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["home", "Início"], ["animais", "Animais"], ["curiosidades", "Curiosidades"],
    ["duvida", "Tire sua Dúvida"], ["quiz", "Quiz"], ["comparar", "Compare"],
    ["estudos", "Estudos"], ["mapa", "Mapa"], ["conservacao", "Conservação"], ["blog", "Blog"], ["sobre", "Sobre"],
  ];
  return (
    <header className="sticky top-0 z-40 bg-[#F6F3EA]/95 backdrop-blur border-b border-[#E3DCC8]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center gap-6">
        <button onClick={() => go("home")} className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#16342A] flex items-center justify-center">
            <Dna size={18} color="#8FBF8B" />
          </div>
          <span style={{ fontFamily: "'Fraunces', serif" }} className="text-lg font-semibold tracking-tight text-[#16342A]">
            D.RODRIGUES<span className="text-[#2F6F4F]">BIO</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1 text-sm flex-1">
          {links.map(([key, label]) => (
            <button
              key={key}
              onClick={() => go(key)}
              className="px-3 py-2 rounded-md transition-colors"
              style={{
                color: page === key ? "#16342A" : "#5C6B5F",
                fontWeight: page === key ? 600 : 500,
                background: page === key ? "#E9E3D0" : "transparent",
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <form
          onSubmit={(e) => { e.preventDefault(); onSearchSubmit(); }}
          className="hidden md:flex items-center gap-2 bg-white rounded-full border border-[#E3DCC8] px-3 py-1.5 ml-auto w-56"
        >
          <Search size={15} color="#8A9585" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar animal..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#A6AE9C]"
          />
        </form>

        <button className="lg:hidden ml-auto" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#E3DCC8] px-5 pb-4 pt-2 bg-[#F6F3EA]">
          <form
            onSubmit={(e) => { e.preventDefault(); onSearchSubmit(); setOpen(false); }}
            className="flex items-center gap-2 bg-white rounded-full border border-[#E3DCC8] px-3 py-2 mb-3"
          >
            <Search size={15} color="#8A9585" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar animal..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </form>
          <div className="flex flex-col gap-1">
            {links.map(([key, label]) => (
              <button
                key={key}
                onClick={() => { go(key); setOpen(false); }}
                className="text-left px-3 py-2 rounded-md text-sm font-medium"
                style={{ background: page === key ? "#E9E3D0" : "transparent", color: "#16342A" }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="bg-[#16342A] text-[#E9E3D0] mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#8FBF8B] flex items-center justify-center">
              <Dna size={16} color="#16342A" />
            </div>
            <span style={{ fontFamily: "'Fraunces', serif" }} className="text-lg font-semibold">D.RODRIGUESBIO</span>
          </div>
          <p className="text-sm text-[#B7C4B2] leading-relaxed">
            Biologia, curiosidade e conhecimento sobre o mundo animal.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-[#8FBF8B] mb-3">Navegue</div>
          <ul className="space-y-2 text-sm text-[#D8E0D3]">
            {["home", "animais", "curiosidades", "estudos", "mapa", "blog", "conservacao", "sobre"].map((k) => (
              <li key={k}>
                <button onClick={() => go(k)} className="hover:text-white capitalize">
                  {{ home: "Início", animais: "Animais", curiosidades: "Curiosidades", estudos: "Estudos", mapa: "Mapa", blog: "Blog", conservacao: "Conservação", sobre: "Sobre" }[k]}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-[#8FBF8B] mb-3">Redes</div>
          <a href="#" className="flex items-center gap-2 text-sm text-[#D8E0D3] hover:text-white w-fit">
            <Instagram size={16} /> @d.rodriguesbio
          </a>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-[#8FBF8B] mb-3">Criador</div>
          <div className="flex items-center gap-2">
            <img src={DANIEL_PHOTO_PLACEHOLDER} alt="Daniel Rodrigues" className="w-9 h-9 rounded-full object-cover border border-[#8FBF8B]" />
            <span className="text-sm text-[#D8E0D3]">Daniel Rodrigues, biólogo</span>
          </div>
        </div>
      </div>
      <div className="border-t border-[#2A4A3B] py-5 text-center text-xs text-[#8FA089] space-y-1">
        <p>© 2026 D.RODRIGUESBIO — Daniel Rodrigues. Todos os direitos reservados.</p>
        <p>Fotos das espécies: Wikimedia Commons, sob licenças livres — créditos de cada autor preservados nas páginas de origem.</p>
      </div>
    </footer>
  );
}

/* ============================================================
   HOME
   ============================================================ */

function AnimalDoDia({ animal, go }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-[#8FBF8B] bg-[#F0EEE0] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
      <AnimalPhoto animal={animal} className="w-24 h-24 rounded-full shrink-0" emojiSize="text-4xl" />
      <div className="flex-1 text-center md:text-left">
        <div className="text-xs uppercase tracking-[0.15em] text-[#B8862F] font-semibold mb-1">🐾 Animal do dia</div>
        <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-semibold text-[#16342A]">{animal.nome}</h3>
        <p style={{ fontFamily: "'Fraunces', serif" }} className="italic text-[#5C6B5F] mb-2">{animal.cientifico}</p>
        <p className="text-sm text-[#3A4A3D] max-w-xl">{animal.curiosidade}</p>
      </div>
      <button
        onClick={() => go("ficha", animal.id)}
        className="shrink-0 px-5 py-2.5 rounded-full bg-[#16342A] text-[#F6F3EA] text-sm font-medium hover:bg-[#2F6F4F] transition-colors flex items-center gap-2"
      >
        Conhecer este animal <ArrowRight size={15} />
      </button>
    </div>
  );
}

function Home({ go, query, setQuery, onSearchSubmit }) {
  const animalDoDia = ANIMALS[3];
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#16342A] text-[#F6F3EA]">
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="xMidYMid slice">
          <pattern id="leaves" width="90" height="90" patternUnits="userSpaceOnUse">
            <path d="M10 70 Q10 30 45 15 Q45 55 10 70Z" fill="#8FBF8B" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaves)" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-center">
          <div>
            <SectionEyebrow color="#8FBF8B">Portal de divulgação científica</SectionEyebrow>
            <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight mb-5">
              Descubra o<br />mundo animal
            </h1>
            <p className="text-lg text-[#D8E0D3] max-w-lg mb-2">
              Curiosidades, ciência e conhecimento para você entender melhor os animais e a natureza.
            </p>
            <p className="text-sm text-[#B7C4B2] max-w-lg mb-8">
              Tem uma dúvida sobre algum animal? Descubra respostas, curiosidades e informações científicas de forma simples, visual e confiável.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => go("animais")} className="px-6 py-3 rounded-full bg-[#8FBF8B] text-[#16342A] font-semibold text-sm hover:bg-[#a4d0a0] transition-colors">
                Explorar animais
              </button>
              <button onClick={() => go("duvida")} className="px-6 py-3 rounded-full border border-[#8FA089] text-[#F6F3EA] font-semibold text-sm hover:bg-white/10 transition-colors">
                Tire sua dúvida
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["🦁", "🐬", "🦈", "🦜", "🐢", "🐙", "🐍", "🐘", "🐸"].map((e, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl backdrop-blur-sm">
                {e}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="max-w-3xl mx-auto px-5 -mt-8 relative z-10">
        <form onSubmit={(e) => { e.preventDefault(); onSearchSubmit(); }} className="bg-white rounded-2xl shadow-lg border border-[#E3DCC8] p-2 flex items-center gap-2">
          <Search size={18} color="#8A9585" className="ml-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome de um animal... (ex: axolote, tubarão, camaleão)"
            className="flex-1 bg-transparent outline-none text-sm py-2.5"
          />
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#16342A] text-[#F6F3EA] text-sm font-medium">
            Buscar
          </button>
        </form>
        <p className="text-center text-xs text-[#8A9585] mt-2">Qual animal você quer conhecer?</p>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <SectionEyebrow>Explore por grupo</SectionEyebrow>
        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl font-semibold text-[#16342A] mb-8">Explore o mundo animal</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GRUPOS.map((g) => (
            <button
              key={g.key}
              onClick={() => go("animais", null, g.key)}
              className="group text-left rounded-2xl p-5 border border-[#E3DCC8] bg-white hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: g.color + "33" }}>
                {g.emoji}
              </div>
              <div className="font-semibold text-[#16342A] mb-1">{g.label}</div>
              <div className="text-xs text-[#7A8A7C]">
                {ANIMALS.filter((a) => a.grupo === g.key).length} espécies em destaque
              </div>
              <div className="flex items-center gap-1 text-xs font-medium mt-3 text-[#2F6F4F] opacity-0 group-hover:opacity-100 transition-opacity">
                Conhecer <ChevronRight size={13} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* VOCE SABIA */}
      <section className="bg-[#EFEADA]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
          <SectionEyebrow color="#B8862F">Curiosidades</SectionEyebrow>
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl font-semibold text-[#16342A]">Você sabia?</h2>
            <button onClick={() => go("curiosidades")} className="text-sm font-medium text-[#2F6F4F] flex items-center gap-1">
              Ver todas <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {CURIOSIDADES.slice(0, 4).map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E3DCC8] p-6 flex gap-4">
                <AnimalPhoto animal={ANIMALS.find((a) => a.id === c.animalId)} className="w-12 h-12 rounded-full shrink-0" emojiSize="text-2xl" />
                <div>
                  <h3 className="font-semibold text-[#16342A] mb-1.5">{c.titulo}</h3>
                  <p className="text-sm text-[#5C6B5F] leading-relaxed mb-3">{c.texto}</p>
                  <button onClick={() => go("ficha", c.animalId)} className="text-xs font-semibold text-[#2F6F4F] flex items-center gap-1">
                    Quero saber mais <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANIMAL DO DIA */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <AnimalDoDia animal={animalDoDia} go={go} />
      </section>

      {/* MAPA TEASER */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-4">
        <button onClick={() => go("mapa")} className="w-full rounded-2xl bg-[#0B4F6C] text-[#F6F3EA] p-8 flex flex-wrap items-center justify-between gap-4 text-left hover:bg-[#0d5a7a] transition-colors">
          <div>
            <div className="text-xs uppercase tracking-[0.15em] text-[#8FBF8B] mb-1">🌎 Onde vivem os animais?</div>
            <div style={{ fontFamily: "'Fraunces', serif" }} className="text-xl font-semibold">Explore o mapa da biodiversidade e os biomas do Brasil</div>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold shrink-0">Ver mapa <ArrowRight size={15} /></span>
        </button>
      </section>

      {/* SOBRE O BIOLOGO HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-20">
        <div className="rounded-2xl bg-[#0B4F6C] text-[#F6F3EA] p-8 md:p-10 grid md:grid-cols-[auto,1fr,auto] gap-6 items-center">
          <img
            src={DANIEL_PHOTO_PLACEHOLDER}
            alt="Daniel Rodrigues, biólogo"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#8FBF8B] shrink-0 mx-auto md:mx-0"
          />
          <div className="text-center md:text-left">
            <div className="text-xs uppercase tracking-[0.15em] text-[#8FBF8B] mb-1">🧬 Conheça o D.RODRIGUESBIO</div>
            <p style={{ fontFamily: "'Fraunces', serif" }} className="text-xl italic mb-1">
              "A ciência fica ainda mais interessante quando a curiosidade encontra conhecimento."
            </p>
            <p className="text-sm text-[#CFE0D9]">Daniel Rodrigues, biólogo por trás do D.RODRIGUESBIO.</p>
          </div>
          <button onClick={() => go("sobre")} className="shrink-0 px-5 py-2.5 rounded-full bg-[#8FBF8B] text-[#0B4F6C] text-sm font-semibold whitespace-nowrap mx-auto md:mx-0">
            Conheça minha história
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   ANIMAIS (lista + filtros)
   ============================================================ */

function AnimalPhoto({ animal, className, grupoColor, emojiSize = "text-5xl" }) {
  const [failed, setFailed] = useState(false);
  const grupo = GRUPOS.find((g) => g.key === animal.grupo);
  if (!animal.imagem || failed) {
    return (
      <div className={`flex items-center justify-center ${emojiSize} ${className}`} style={{ background: (grupoColor || grupo?.color) + "26" }}>
        {grupo?.emoji}
      </div>
    );
  }
  return (
    <img
      src={commonsPhoto(animal.imagem, 700)}
      alt={animal.nome}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

function AnimalCard({ animal, go, index }) {
  const grupo = GRUPOS.find((g) => g.key === animal.grupo);
  return (
    <button onClick={() => go("ficha", animal.id)} className="text-left rounded-2xl border border-[#E3DCC8] bg-white overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 group">
      <AnimalPhoto animal={animal} className="h-32 w-full" />
      <div className="p-4 border-t-2 border-dashed" style={{ borderColor: grupo?.color }}>
        <CatalogNumber n={index + 1} />
        <div className="font-semibold text-[#16342A] mt-1">{animal.nome}</div>
        <div style={{ fontFamily: "'Fraunces', serif" }} className="italic text-xs text-[#7A8A7C] mb-2">{animal.cientifico}</div>
        <div className="flex flex-wrap gap-1.5">
          {animal.habitat.map((h) => (
            <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFEADA] text-[#5C6B5F]">{h}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

function Animais({ go, query, setQuery, initialGrupo }) {
  const [grupo, setGrupo] = useState(initialGrupo || null);
  const [habitat, setHabitat] = useState(null);

  const filtered = useMemo(() => {
    return ANIMALS.filter((a) => {
      const matchQuery = !query || a.nome.toLowerCase().includes(query.toLowerCase()) || a.cientifico.toLowerCase().includes(query.toLowerCase());
      const matchGrupo = !grupo || a.grupo === grupo;
      const matchHabitat = !habitat || a.habitat.includes(habitat);
      return matchQuery && matchGrupo && matchHabitat;
    });
  }, [query, grupo, habitat]);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow>Enciclopédia em construção</SectionEyebrow>
      <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A] mb-6">Animais</h1>

      <div className="flex items-center gap-2 bg-white rounded-full border border-[#E3DCC8] px-4 py-2.5 mb-6 max-w-lg">
        <Search size={16} color="#8A9585" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome popular ou científico..." className="flex-1 bg-transparent outline-none text-sm" />
      </div>

      <div className="mb-4">
        <div className="text-xs uppercase tracking-[0.1em] text-[#7A8A7C] mb-2">Grupo</div>
        <div className="flex flex-wrap gap-2">
          <Pill active={!grupo} onClick={() => setGrupo(null)}>Todos</Pill>
          {GRUPOS.map((g) => (
            <Pill key={g.key} active={grupo === g.key} onClick={() => setGrupo(grupo === g.key ? null : g.key)} color={g.color}>
              {g.emoji} {g.label}
            </Pill>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.1em] text-[#7A8A7C] mb-2">Habitat</div>
        <div className="flex flex-wrap gap-2">
          <Pill active={!habitat} onClick={() => setHabitat(null)}>Todos</Pill>
          {HABITATS.map((h) => (
            <Pill key={h} active={habitat === h} onClick={() => setHabitat(habitat === h ? null : h)}>{h}</Pill>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#7A8A7C]">
          Nenhum animal encontrado com esses filtros — em breve o catálogo terá muito mais espécies.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((a, i) => <AnimalCard key={a.id} animal={a} go={go} index={ANIMALS.indexOf(a)} />)}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   FICHA (detalhe do animal)
   ============================================================ */

function Ficha({ animal, go }) {
  if (!animal) return null;
  const grupo = GRUPOS.find((g) => g.key === animal.grupo);
  const rows = [
    ["Nome científico", animal.cientifico, true],
    ["Classificação", animal.classe],
    ["Habitat", animal.habitat.join(", ")],
    ["Distribuição", animal.distribuicao],
    ["Alimentação", animal.alimentacao],
    ["Tamanho", animal.tamanho],
    ["Expectativa de vida", animal.expectativa],
    ["Conservação", animal.conservacao],
  ];
  const secoes = [
    ["🔬 Características", animal.caracteristicas],
    ["🌎 Habitat", `Encontrado principalmente em: ${animal.habitat.join(", ")}. Distribuição: ${animal.distribuicao}.`],
    ["🍽️ Alimentação", animal.alimentacao],
    ["🧬 Reprodução", animal.reproducao],
    ["🧠 Comportamento", animal.comportamento],
    ["🌱 Importância ecológica", animal.importancia],
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-8 py-10">
      <button onClick={() => go("animais")} className="flex items-center gap-1 text-sm text-[#2F6F4F] font-medium mb-6">
        <ArrowLeft size={15} /> Voltar para Animais
      </button>

      <div className="rounded-3xl border-2 border-dashed p-6 md:p-10" style={{ borderColor: grupo?.color, background: "#FFFFFF" }}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <CatalogNumber n={ANIMALS.indexOf(animal) + 1} />
            <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl font-semibold text-[#16342A] mt-1">{animal.nome}</h1>
            <p style={{ fontFamily: "'Fraunces', serif" }} className="italic text-lg text-[#5C6B5F]">{animal.cientifico}</p>
          </div>
          <AnimalPhoto animal={animal} className="w-28 h-28 rounded-2xl shrink-0" emojiSize="text-4xl" />
        </div>

        <DnaRule color={grupo?.color} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {rows.map(([label, value, italic]) => (
            <div key={label} className="bg-[#F6F3EA] rounded-xl p-4">
              <div style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[10px] uppercase tracking-[0.1em] text-[#7A8A7C] mb-1">{label}</div>
              <div className={`text-sm font-medium text-[#16342A] ${italic ? "italic" : ""}`}>{value}</div>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-8">
          {secoes.map(([title, text]) => (
            <div key={title}>
              <h3 className="font-semibold text-[#16342A] mb-1.5">{title}</h3>
              <p className="text-sm text-[#3A4A3D] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-[#EFEADA] p-5 mb-8">
          <h3 className="font-semibold text-[#16342A] mb-1.5 flex items-center gap-2"><Sparkles size={16} color="#B8862F" /> Curiosidade</h3>
          <p className="text-sm text-[#3A4A3D] leading-relaxed">{animal.curiosidade}</p>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-[#16342A] mb-3">Mito ou verdade?</h3>
          {animal.mitos.map((m, i) => {
            const ui = VEREDITO_UI[m.veredito];
            return (
              <div key={i} className="rounded-xl border border-[#E3DCC8] p-4 flex gap-3">
                <ui.Icon size={20} color={ui.color} className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#16342A] font-medium mb-1">"{m.afirmacao}"</p>
                  <span style={{ color: ui.color }} className="text-xs font-bold uppercase tracking-wide">{ui.label}</span>
                  <p className="text-sm text-[#5C6B5F] mt-1">{m.explicacao}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-[#E3DCC8] pt-5">
          <h3 className="text-xs uppercase tracking-[0.1em] text-[#7A8A7C] mb-2">Fontes e referências</h3>
          <p className="text-xs text-[#8A9585] leading-relaxed">
            Espaço reservado para artigos científicos, instituições de pesquisa e órgãos de conservação consultados
            na elaboração desta ficha. Referências específicas serão adicionadas por Daniel Rodrigues conforme o
            catálogo de espécies for expandido.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CURIOSIDADES PAGE
   ============================================================ */

function Curiosidades({ go }) {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow color="#B8862F">Você sabia?</SectionEyebrow>
      <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A] mb-8">Curiosidades sobre o mundo animal</h1>
      <div className="grid md:grid-cols-2 gap-5">
        {CURIOSIDADES.map((c, i) => {
          const animal = ANIMALS.find((a) => a.id === c.animalId);
          return (
            <div key={i} className="bg-white rounded-2xl border border-[#E3DCC8] p-6 flex gap-4">
              <AnimalPhoto animal={animal} className="w-12 h-12 rounded-full shrink-0" emojiSize="text-2xl" />
              <div>
                <h3 className="font-semibold text-[#16342A] mb-1.5">{c.titulo}</h3>
                <p className="text-sm text-[#5C6B5F] leading-relaxed mb-3">{c.texto}</p>
                <button onClick={() => go("ficha", c.animalId)} className="text-xs font-semibold text-[#2F6F4F] flex items-center gap-1">
                  Quero saber mais <ChevronRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16">
        <SectionEyebrow color="#B4453B">Mito ou verdade</SectionEyebrow>
        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-semibold text-[#16342A] mb-6">Separando fato de folclore</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {MITOS.map((m, i) => {
            const ui = VEREDITO_UI[m.veredito];
            return (
              <div key={i} className="rounded-xl border border-[#E3DCC8] bg-white p-5 flex gap-3">
                <ui.Icon size={20} color={ui.color} className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#16342A] font-medium mb-1">"{m.afirmacao}"</p>
                  <span style={{ color: ui.color }} className="text-xs font-bold uppercase tracking-wide">{ui.label}</span>
                  <p className="text-sm text-[#5C6B5F] mt-1">{m.explicacao}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TIRE SUA DUVIDA
   ============================================================ */

function Duvida({ go }) {
  const [open, setOpen] = useState(0);
  const [customQ, setCustomQ] = useState("");
  return (
    <div className="max-w-4xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow>Pergunte. Pesquise. Descubra.</SectionEyebrow>
      <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A] mb-3">Tem uma dúvida sobre animais?</h1>
      <p className="text-[#5C6B5F] mb-8">Escolha uma pergunta abaixo ou escreva a sua — o catálogo de respostas cresce a cada nova dúvida.</p>

      <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mb-10">
        <input
          value={customQ}
          onChange={(e) => setCustomQ(e.target.value)}
          placeholder='Ex: "Por que a aranha-lobo não faz teia?"'
          className="flex-1 bg-white border border-[#E3DCC8] rounded-full px-4 py-3 text-sm outline-none"
        />
        <button className="px-5 py-3 rounded-full bg-[#16342A] text-[#F6F3EA] text-sm font-medium shrink-0">Perguntar</button>
      </form>
      {customQ && (
        <div className="text-sm text-[#7A8A7C] -mt-6 mb-8">
          Essa pergunta ainda não está no catálogo — em breve o D.RODRIGUESBIO vai respondê-la. Enquanto isso, explore as perguntas abaixo.
        </div>
      )}

      <div className="space-y-3">
        {DUVIDAS.map((d, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="rounded-2xl border border-[#E3DCC8] bg-white overflow-hidden">
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className="font-semibold text-[#16342A]">{d.pergunta}</span>
                <ChevronRight size={18} className={`shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} color="#7A8A7C" />
              </button>
              {isOpen && (
                <div className="px-5 pb-6 space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.1em] text-[#2F6F4F] font-semibold mb-1">Resposta</div>
                    <p className="text-sm text-[#3A4A3D]">{d.resposta}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.1em] text-[#0B4F6C] font-semibold mb-1">Como funciona?</div>
                    <p className="text-sm text-[#3A4A3D]">{d.comoFunciona}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.1em] text-[#B8862F] font-semibold mb-1">Curiosidade</div>
                    <p className="text-sm text-[#3A4A3D]">{d.curiosidade}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.1em] text-[#B4453B] font-semibold mb-1">Importância ecológica</div>
                    <p className="text-sm text-[#3A4A3D]">{d.importancia}</p>
                  </div>
                  <button onClick={() => go("ficha", d.animalId)} className="text-xs font-semibold text-[#2F6F4F] flex items-center gap-1">
                    Ver ficha completa do animal <ChevronRight size={12} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   QUIZ
   ============================================================ */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Quiz() {
  const [dificuldade, setDificuldade] = useState(null);
  const [perguntas, setPerguntas] = useState([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [finished, setFinished] = useState(false);

  function iniciar(dif) {
    const pool = dif === "misto" ? QUIZ : QUIZ.filter((q) => q.dificuldade === dif);
    setPerguntas(shuffle(pool).slice(0, dif === "misto" ? 10 : pool.length));
    setDificuldade(dif);
    setStep(0); setScore(0); setPicked(null); setFinished(false);
  }

  if (!dificuldade) {
    return (
      <div className="max-w-2xl mx-auto px-5 lg:px-8 py-12">
        <SectionEyebrow>Teste seus conhecimentos</SectionEyebrow>
        <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A] mb-2">Quiz de Biologia</h1>
        <p className="text-[#5C6B5F] mb-8">Escolha um nível de dificuldade para começar.</p>
        <div className="grid gap-3">
          {NIVEIS_DIFICULDADE.map((n) => (
            <button key={n.key} onClick={() => iniciar(n.key)} className="flex items-center justify-between rounded-2xl border border-[#E3DCC8] bg-white p-5 hover:shadow-md transition-shadow text-left">
              <span className="font-semibold text-[#16342A] flex items-center gap-2 text-lg">{n.emoji} {n.label}</span>
              <span className="text-xs text-[#7A8A7C]">{QUIZ.filter((q) => q.dificuldade === n.key).length} perguntas</span>
            </button>
          ))}
          <button onClick={() => iniciar("misto")} className="flex items-center justify-between rounded-2xl border-2 border-dashed border-[#8FBF8B] bg-[#EAF3EA] p-5 hover:shadow-md transition-shadow text-left">
            <span className="font-semibold text-[#16342A] flex items-center gap-2 text-lg">🎲 Desafio misto</span>
            <span className="text-xs text-[#7A8A7C]">10 perguntas de todos os níveis</span>
          </button>
        </div>
      </div>
    );
  }

  const q = perguntas[step];
  const total = perguntas.length;
  const nivel = [...NIVEIS].reverse().find((n) => score >= Math.round((n.min / 5) * total));
  const difUI = NIVEIS_DIFICULDADE.find((d) => d.key === q?.dificuldade);

  function pick(i) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correta) setScore((s) => s + 1);
  }
  function next() {
    if (step + 1 < total) { setStep(step + 1); setPicked(null); }
    else setFinished(true);
  }
  function restart() { setDificuldade(null); }

  return (
    <div className="max-w-2xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow>Teste seus conhecimentos</SectionEyebrow>
      <div className="flex items-center justify-between mb-2">
        <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A]">Quiz de Biologia</h1>
        <button onClick={() => setDificuldade(null)} className="text-xs font-medium text-[#2F6F4F] flex items-center gap-1 shrink-0"><ArrowLeft size={12} /> Trocar nível</button>
      </div>
      <p className="text-[#5C6B5F] mb-8">Será que você consegue responder tudo certo?</p>

      {!finished ? (
        <div className="bg-white rounded-2xl border border-[#E3DCC8] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <span className="text-xs text-[#7A8A7C]">Pergunta {step + 1} de {total}</span>
            {difUI && <span className="text-xs px-2 py-0.5 rounded-full bg-[#EFEADA] text-[#5C6B5F] font-medium">{difUI.emoji} {difUI.label}</span>}
            <span className="text-xs font-semibold text-[#2F6F4F]">Pontuação: {score}/{total}</span>
          </div>
          <h2 className="text-lg font-semibold text-[#16342A] mb-5">{q.pergunta}</h2>
          <div className="space-y-2.5 mb-5">
            {q.opcoes.map((op, i) => {
              const isCorrect = i === q.correta;
              const isPicked = i === picked;
              let style = { borderColor: "#E3DCC8", background: "white" };
              if (picked !== null) {
                if (isCorrect) style = { borderColor: "#2F6F4F", background: "#EAF3EA" };
                else if (isPicked) style = { borderColor: "#B4453B", background: "#FBEAE8" };
              }
              return (
                <button key={i} onClick={() => pick(i)} className="w-full text-left px-4 py-3 rounded-xl border text-sm font-medium text-[#16342A] flex items-center justify-between" style={style}>
                  {op}
                  {picked !== null && isCorrect && <CheckCircle2 size={16} color="#2F6F4F" />}
                  {picked !== null && isPicked && !isCorrect && <XCircle size={16} color="#B4453B" />}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="rounded-xl bg-[#F6F3EA] p-4 mb-5 text-sm text-[#3A4A3D]">
              <span className="font-semibold">{picked === q.correta ? "Resposta correta! " : "Quase! "}</span>
              {q.explicacao}
            </div>
          )}
          <button onClick={next} disabled={picked === null} className="w-full py-3 rounded-xl bg-[#16342A] text-[#F6F3EA] text-sm font-semibold disabled:opacity-40">
            {step + 1 < total ? "Próxima pergunta" : "Ver resultado"}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E3DCC8] p-8 text-center">
          <div className="text-5xl mb-3">{nivel.emoji}</div>
          <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-semibold text-[#16342A] mb-1">Pontuação: {score}/{total}</h2>
          <p className="text-[#5C6B5F] mb-6">Seu nível: <span className="font-semibold text-[#2F6F4F]">{nivel.nome}</span></p>
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {NIVEIS.map((n) => (
              <span key={n.nome} className="text-xs px-2.5 py-1 rounded-full" style={{ background: n.nome === nivel.nome ? "#16342A" : "#EFEADA", color: n.nome === nivel.nome ? "#F6F3EA" : "#7A8A7C" }}>
                {n.emoji} {n.nome}
              </span>
            ))}
          </div>
          <button onClick={restart} className="px-6 py-2.5 rounded-full bg-[#16342A] text-[#F6F3EA] text-sm font-semibold">Tentar novamente</button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   COMPARADOR
   ============================================================ */

function Comparar() {
  const [aId, setAId] = useState("onca-pintada");
  const [bId, setBId] = useState("elefante");
  const a = ANIMALS.find((x) => x.id === aId);
  const b = ANIMALS.find((x) => x.id === bId);
  const campos = [
    ["Tamanho", "tamanho"], ["Alimentação", "alimentacao"], ["Habitat", (x) => x.habitat.join(", ")],
    ["Expectativa de vida", "expectativa"], ["Distribuição", "distribuicao"], ["Comportamento", "comportamento"],
    ["Conservação", "conservacao"],
  ];
  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow>Ferramenta interativa</SectionEyebrow>
      <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A] mb-8">Compare dois animais</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[[aId, setAId, a], [bId, setBId, b]].map(([id, setId, animal], idx) => (
          <select key={idx} value={id} onChange={(e) => setId(e.target.value)} className="border border-[#E3DCC8] rounded-xl px-4 py-3 text-sm font-medium bg-white text-[#16342A]">
            {ANIMALS.map((x) => <option key={x.id} value={x.id}>{x.nome}</option>)}
          </select>
        ))}
      </div>

      <div className="text-center mb-8">
        <span style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-semibold text-[#16342A]">
          {a.nome} <span className="text-[#B8862F]">×</span> {b.nome}
        </span>
      </div>

      <div className="rounded-2xl border border-[#E3DCC8] overflow-hidden bg-white">
        <div className="grid grid-cols-[1fr,1.4fr,1fr]">
          <div className="p-4 bg-[#EFEADA] text-center font-semibold text-[#16342A]">{a.nome}</div>
          <div className="p-4 bg-[#F6F3EA] text-center text-xs uppercase tracking-[0.1em] text-[#7A8A7C] flex items-center justify-center">Característica</div>
          <div className="p-4 bg-[#EFEADA] text-center font-semibold text-[#16342A]">{b.nome}</div>
        </div>
        {campos.map(([label, get], i) => (
          <div key={label} className={`grid grid-cols-[1fr,1.4fr,1fr] ${i % 2 ? "bg-[#FBFAF5]" : "bg-white"}`}>
            <div className="p-4 text-sm text-[#3A4A3D] border-t border-[#EFEADA]">{typeof get === "function" ? get(a) : a[get]}</div>
            <div className="p-4 text-xs font-semibold text-center text-[#5C6B5F] border-t border-[#EFEADA] flex items-center justify-center">{label}</div>
            <div className="p-4 text-sm text-[#3A4A3D] border-t border-[#EFEADA]">{typeof get === "function" ? get(b) : b[get]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ESTUDOS (Cantinho do Estudante)
   ============================================================ */

function Estudos({ go }) {
  const categorias = [
    ["Ensino Fundamental", "Introdução aos grandes grupos animais, de forma visual e simples."],
    ["Ensino Médio", "Classificação, fisiologia e comportamento animal com mais profundidade."],
    ["Vestibular", "Conteúdos revisados com foco nos temas mais cobrados sobre zoologia."],
    ["ENEM", "Biodiversidade, ecologia e conservação conectadas a questões atuais."],
    ["Curiosidades científicas", "Fatos surpreendentes para despertar o interesse pela Biologia."],
    ["Revisão de Biologia", "Resumos rápidos dos principais conceitos sobre o reino animal."],
  ];
  const desafios = [
    ["Quiz de Biologia", "Teste seus conhecimentos gerais sobre o mundo animal.", () => go("quiz")],
    ["Você consegue identificar o animal?", "Pistas e características para descobrir a espécie.", () => go("quiz")],
    ["Verdadeiro ou falso", "Afirmações populares para você separar mito de ciência.", () => go("curiosidades")],
    ["Quem sou eu?", "Charadas biológicas com dicas progressivas.", () => go("quiz")],
    ["Desafio do Biólogo", "Perguntas mais avançadas para quem já é Explorador ou Biólogo Júnior.", () => go("quiz")],
  ];
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow>Aprenda brincando</SectionEyebrow>
      <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A] mb-2">Cantinho do estudante</h1>
      <p className="text-[#5C6B5F] mb-10 max-w-2xl">Conteúdos organizados para ajudar você a estudar Biologia de um jeito mais interessante, do fundamental ao ENEM.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {categorias.map(([titulo, texto]) => (
          <div key={titulo} className="rounded-2xl border border-[#E3DCC8] bg-white p-5">
            <GraduationCap size={20} color="#2F6F4F" className="mb-3" />
            <h3 className="font-semibold text-[#16342A] mb-1.5">{titulo}</h3>
            <p className="text-sm text-[#5C6B5F]">{texto}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-semibold text-[#16342A] mb-6">Desafios</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {desafios.map(([titulo, texto, action]) => (
          <button key={titulo} onClick={action} className="text-left rounded-2xl border border-[#E3DCC8] bg-white p-5 hover:shadow-md transition-shadow flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-[#16342A] mb-1">{titulo}</h3>
              <p className="text-sm text-[#5C6B5F]">{texto}</p>
            </div>
            <ChevronRight size={18} color="#8A9585" className="shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   CONSERVACAO
   ============================================================ */

function Conservacao({ go }) {
  const topicos = [
    ["Extinção", "Desaparecimento definitivo de uma espécie, geralmente resultado de pressões acumuladas ao longo do tempo."],
    ["Espécies ameaçadas", "Populações cujo risco de extinção é avaliado e classificado por critérios científicos."],
    ["Perda de habitat", "Desmatamento e ocupação humana reduzem o espaço onde as espécies conseguem viver e se reproduzir."],
    ["Caça ilegal", "Captura ou abate fora da lei, muitas vezes voltado ao comércio ilegal de partes de animais."],
    ["Tráfico de animais", "Comércio ilegal de espécies silvestres, uma das maiores ameaças à fauna brasileira."],
    ["Poluição", "Resíduos e substâncias tóxicas afetam diretamente a saúde e o habitat de inúmeras espécies."],
    ["Mudanças climáticas", "Alterações no clima afetam migração, reprodução e disponibilidade de alimento."],
    ["Conservação da biodiversidade", "Conjunto de ações científicas e comunitárias para proteger espécies e ecossistemas."],
  ];
  const micoLeao = ANIMALS.find((a) => a.id === "mico-leao-dourado");
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow color="#B4453B">Conservação</SectionEyebrow>
      <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A] mb-2">Proteger também é conhecer</h1>
      <p className="text-[#5C6B5F] mb-10 max-w-2xl">Entender as ameaças à fauna é o primeiro passo para valorizar e apoiar a conservação da biodiversidade.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {topicos.map(([titulo, texto]) => (
          <div key={titulo} className="rounded-2xl border border-[#E3DCC8] bg-white p-5">
            <ShieldAlert size={18} color="#B4453B" className="mb-3" />
            <h3 className="font-semibold text-[#16342A] mb-1.5 text-sm">{titulo}</h3>
            <p className="text-xs text-[#5C6B5F] leading-relaxed">{texto}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-[#16342A] text-[#F6F3EA] p-8 md:p-10 grid md:grid-cols-[auto,1fr] gap-8 items-start">
        <div className="w-16 h-16 rounded-2xl bg-[#8FBF8B] flex items-center justify-center text-3xl">🦁</div>
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-[#8FBF8B] mb-2">Espécie em destaque</div>
          <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-semibold mb-1">{micoLeao.nome}</h2>
          <p style={{ fontFamily: "'Fraunces', serif" }} className="italic text-[#CFE0D9] mb-4">{micoLeao.cientifico}</p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div><div className="text-[#8FBF8B] text-xs mb-1">Onde vive</div>{micoLeao.distribuicao}</div>
            <div><div className="text-[#8FBF8B] text-xs mb-1">Por que está ameaçado</div>Perda histórica de habitat na Mata Atlântica.</div>
            <div><div className="text-[#8FBF8B] text-xs mb-1">Como a conservação ajuda</div>{micoLeao.curiosidade}</div>
          </div>
          <button onClick={() => go("ficha", "mico-leao-dourado")} className="mt-6 px-5 py-2.5 rounded-full bg-[#8FBF8B] text-[#16342A] text-sm font-semibold">Ver ficha completa</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAPA DA BIODIVERSIDADE
   ============================================================ */

function RegionCard({ r, go, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border p-5 text-left transition-all"
      style={active ? { borderColor: "#2F6F4F", background: "#EAF3EA" } : { borderColor: "#E3DCC8", background: "white" }}
    >
      <div className="text-3xl mb-2">{r.emoji}</div>
      <div className="font-semibold text-[#16342A] text-sm">{r.nome}</div>
      <div className="text-xs text-[#7A8A7C] mt-1">{r.animais.length} espécie{r.animais.length === 1 ? "" : "s"} em destaque</div>
    </button>
  );
}

function MapaBiodiversidade({ go }) {
  const [regiao, setRegiao] = useState(REGIOES[0].key);
  const [tab, setTab] = useState("mundo");
  const r = REGIOES.find((x) => x.key === regiao);

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow color="#0B4F6C">Onde vivem os animais?</SectionEyebrow>
      <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A] mb-6">Mapa da biodiversidade</h1>

      <div className="flex gap-2 mb-8">
        <Pill active={tab === "mundo"} onClick={() => setTab("mundo")} color="#0B4F6C">Regiões do mundo</Pill>
        <Pill active={tab === "brasil"} onClick={() => setTab("brasil")} color="#2F6F4F">Biomas do Brasil</Pill>
      </div>

      {tab === "mundo" ? (
        <div className="grid md:grid-cols-[1fr,1.2fr] gap-8">
          <div className="grid grid-cols-2 gap-3">
            {REGIOES.map((reg) => (
              <RegionCard key={reg.key} r={reg} active={regiao === reg.key} onClick={() => setRegiao(reg.key)} />
            ))}
          </div>
          <div className="rounded-2xl border border-[#E3DCC8] bg-white p-6">
            <div className="text-4xl mb-2">{r.emoji}</div>
            <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl font-semibold text-[#16342A] mb-2">{r.nome}</h2>
            <p className="text-sm text-[#5C6B5F] mb-5">{r.texto}</p>
            {r.animais.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {r.animais.map((id) => {
                  const a = ANIMALS.find((x) => x.id === id);
                  const g = GRUPOS.find((x) => x.key === a.grupo);
                  return (
                    <button key={id} onClick={() => go("ficha", id)} className="flex items-center gap-2 rounded-xl border border-[#E3DCC8] p-3 text-left hover:shadow-sm">
                      <span className="text-xl">{g?.emoji}</span>
                      <span className="text-sm font-medium text-[#16342A]">{a.nome}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-[#8A9585]">Ainda não há espécies do catálogo cadastradas para esta região — em breve.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BIOMAS_BR.map((b) => (
            <div key={b.nome} className="rounded-2xl border border-[#E3DCC8] bg-white p-5">
              <div className="text-3xl mb-2">{b.emoji}</div>
              <h3 className="font-semibold text-[#16342A] mb-1.5">{b.nome}</h3>
              <p className="text-sm text-[#5C6B5F] leading-relaxed mb-3">{b.texto}</p>
              {b.animais.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {b.animais.map((id) => {
                    const a = ANIMALS.find((x) => x.id === id);
                    return (
                      <button key={id} onClick={() => go("ficha", id)} className="text-xs px-2.5 py-1 rounded-full bg-[#EFEADA] text-[#2F6F4F] font-medium">
                        {a.nome}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   BLOG
   ============================================================ */

function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow>Blog D.RODRIGUESBIO</SectionEyebrow>
      <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl font-semibold text-[#16342A] mb-10">Artigos e reportagens</h1>
      <div className="grid sm:grid-cols-2 gap-6">
        {BLOG.map((p, i) => {
          const grupo = GRUPOS.find((g) => g.key === p.grupo);
          return (
            <div key={i} className="rounded-2xl border border-[#E3DCC8] bg-white overflow-hidden">
              <div className="h-36 flex items-center justify-center text-5xl" style={{ background: grupo?.color + "26" }}>{grupo?.emoji}</div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-[#7A8A7C] mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#EFEADA] text-[#5C6B5F]">{p.categoria}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.leitura}</span>
                  <span>{p.data}</span>
                </div>
                <h3 className="font-semibold text-[#16342A] mb-2">{p.titulo}</h3>
                <p className="text-sm text-[#5C6B5F] mb-4">{p.resumo}</p>
                <div className="flex items-center gap-2 mb-3 text-xs text-[#7A8A7C]">
                  <img src={DANIEL_PHOTO_PLACEHOLDER} alt="Daniel Rodrigues" className="w-6 h-6 rounded-full object-cover" />
                  Conteúdo por Daniel Rodrigues
                </div>
                <button className="text-xs font-semibold text-[#2F6F4F] flex items-center gap-1">Ler artigo <ChevronRight size={12} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   SOBRE
   ============================================================ */

function Sobre() {
  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-8 py-12">
      <SectionEyebrow>Sobre o D.RODRIGUESBIO</SectionEyebrow>
      <div className="grid md:grid-cols-[280px,1fr] gap-10 items-start mb-14">
        <div className="mx-auto md:mx-0">
          <img
            src={DANIEL_PHOTO_PLACEHOLDER}
            alt="Daniel Rodrigues, biólogo e criador do D.RODRIGUESBIO"
            className="w-56 h-56 rounded-full object-cover border-4 border-[#8FBF8B] shadow-lg"
          />
        </div>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl font-semibold text-[#16342A] mb-1">Daniel Rodrigues</h1>
          <p className="text-[#2F6F4F] font-medium mb-6">Biólogo | Educação | Ciência | Biodiversidade</p>
          <p className="text-[#3A4A3D] leading-relaxed mb-6">
            Sou Daniel Rodrigues, biólogo e criador do D.RODRIGUESBIO. Este projeto nasceu com o objetivo de
            aproximar a ciência das pessoas e transformar curiosidade em conhecimento.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {["Divulgar conhecimento científico", "Incentivar o interesse pela Biologia", "Despertar curiosidade", "Auxiliar estudantes", "Valorizar a biodiversidade", "Promover educação ambiental"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-[#3A4A3D]">
                <Leaf size={14} color="#2F6F4F" className="shrink-0" /> {t}
              </div>
            ))}
          </div>
          <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16342A] text-[#F6F3EA] text-sm font-semibold">
            <Instagram size={15} /> Acompanhe o D.RODRIGUESBIO — @d.rodriguesbio
          </a>
        </div>
      </div>

      <div className="rounded-2xl bg-[#EFEADA] p-8 flex items-start gap-4">
        <Quote size={24} color="#B8862F" className="shrink-0 mt-1" />
        <p style={{ fontFamily: "'Fraunces', serif" }} className="italic text-lg text-[#16342A]">
          "A ciência fica ainda mais interessante quando a curiosidade encontra conhecimento."
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   APP SHELL
   ============================================================ */

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [initialGrupo, setInitialGrupo] = useState(null);
  const [query, setQuery] = useState("");

  function go(nextPage, animalId = null, grupo = null) {
    setPage(nextPage);
    if (animalId) setSelectedId(animalId);
    setInitialGrupo(grupo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onSearchSubmit() {
    if (!query.trim()) return;
    const match = ANIMALS.find((a) => a.nome.toLowerCase().includes(query.toLowerCase()));
    if (match) go("ficha", match.id);
    else go("animais");
  }

  const selectedAnimal = ANIMALS.find((a) => a.id === selectedId);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#F6F3EA] text-[#17211D]">
      <style>{`@import url('${FONT_LINK}');`}</style>
      <Header page={page} go={go} query={query} setQuery={setQuery} onSearchSubmit={onSearchSubmit} />
      {page === "home" && <Home go={go} query={query} setQuery={setQuery} onSearchSubmit={onSearchSubmit} />}
      {page === "animais" && <Animais go={go} query={query} setQuery={setQuery} initialGrupo={initialGrupo} />}
      {page === "ficha" && <Ficha animal={selectedAnimal} go={go} />}
      {page === "curiosidades" && <Curiosidades go={go} />}
      {page === "duvida" && <Duvida go={go} />}
      {page === "quiz" && <Quiz />}
      {page === "comparar" && <Comparar />}
      {page === "estudos" && <Estudos go={go} />}
      {page === "mapa" && <MapaBiodiversidade go={go} />}
      {page === "conservacao" && <Conservacao go={go} />}
      {page === "blog" && <Blog />}
      {page === "sobre" && <Sobre />}
      <Footer go={go} />
    </div>
  );
}
