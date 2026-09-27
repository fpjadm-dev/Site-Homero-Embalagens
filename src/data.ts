import { Product, Differential } from "./types";
import customImagesData from "./assets/custom_images_data.json";

const getCustomImg = (id: string, fallback: string): string => (customImagesData as Record<string, string>)[id] || fallback;
// @ts-ignore
import sacosPadariaImg from "./assets/images/sacos_padaria_1784137926048.jpg";
// @ts-ignore
import sacoKraftLisaImg from "./assets/images/saco_kraft_lisa_novo_1784480950328.jpg";
// @ts-ignore
import sacoSosMonoKraftImg from "./assets/images/saco_sos_mono_kraft_1786656798516.jpg";

export const PRODUCTS: Product[] = [
  {
    id: "sacos-padaria",
    number: "01",
    name: "Sacos de Padaria",
    description: "Sacos de papel tradicionais e de alta qualidade para panificação, pastelaria e uso geral.",
    image: getCustomImg("sacos-padaria", sacosPadariaImg),
    category: "Papel",
    subgroups: [
      {
        id: "sacos-padaria-lisa-kraft-natural",
        number: "01A",
        name: "Saco de Padaria - LISA (Kraft Natural)",
        description: "Saco de papel Kraft Natural liso, ideal para pão francês quente, pão de queijo e salgados, com alta resistência e porosidade.",
        image: getCustomImg("sacos-padaria-lisa-kraft-natural", sacoKraftLisaImg),
        category: "Papel",
        linha: "LISA",
        papel: "Kraft Natural 35g/m²",
        tabela: [
          { codigo: "32430", modelo: "0,5KG", dimensoes: "32 x 19 cm", qtdFardo: "500 un" },
          { codigo: "32428", modelo: "01KG-SP", dimensoes: "32 x 24 cm", qtdFardo: "500 un" },
          { codigo: "32429", modelo: "02KG-SP", dimensoes: "38 x 28 cm", qtdFardo: "500 un" },
          { codigo: "32511", modelo: "03KG-SP", dimensoes: "43 x 31 cm", qtdFardo: "500 un" }
        ]
      },
      {
        id: "sacos-padaria-trigo-kraft-natural",
        number: "01B",
        name: "Saco de Padaria - TRIGO (Kraft Natural)",
        description: "Saco de papel Kraft Natural com estampa clássica temática de trigo para panificação tradicional.",
        image: getCustomImg("sacos-padaria-trigo-kraft-natural", "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "TRIGO",
        papel: "Kraft Natural 35g/m²",
        tabela: [
          { codigo: "28297", modelo: "0,5KG", dimensoes: "32 x 19 cm", qtdFardo: "500 un" },
          { codigo: "28290", modelo: "01KG-SP", dimensoes: "32 x 24 cm", qtdFardo: "500 un" },
          { codigo: "28291", modelo: "02KG-SP", dimensoes: "38 x 28 cm", qtdFardo: "500 un" },
          { codigo: "28292", modelo: "03KG-SP", dimensoes: "43 x 31 cm", qtdFardo: "500 un" },
          { codigo: "28293", modelo: "05KG-SP", dimensoes: "48 x 38 cm", qtdFardo: "500 un" },
          { codigo: "28294", modelo: "07,5KG-SP", dimensoes: "55 x 42 cm", qtdFardo: "500 un" },
          { codigo: "28295", modelo: "10KG-SP", dimensoes: "55 x 48 cm", qtdFardo: "500 un" },
          { codigo: "28296", modelo: "15KG-SP", dimensoes: "55 x 54 cm", qtdFardo: "500 un" },
          { codigo: "4327", modelo: "02PD", dimensoes: "38 x 21 cm", qtdFardo: "500 un" },
          { codigo: "4328", modelo: "03PD", dimensoes: "43 x 28 cm", qtdFardo: "500 un" },
          { codigo: "4329", modelo: "05PD", dimensoes: "48 x 31 cm", qtdFardo: "500 un" },
          { codigo: "4330", modelo: "06PD-CUCA", dimensoes: "55 x 34 cm", qtdFardo: "500 un" }
        ]
      },
      {
        id: "sacos-padaria-lisa-kraft-monolucido",
        number: "01C",
        name: "Saco de Padaria - LISA (Kraft Monolúcido)",
        description: "Saco em papel Kraft Monolúcido liso com excelente acabamento e brilho sutil em um dos lados.",
        image: getCustomImg("sacos-padaria-lisa-kraft-monolucido", "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "LISA",
        papel: "Kraft Monolúcido 35g/m²",
        tabela: [
          { codigo: "15035", modelo: "TALHER", dimensoes: "17 x 28 cm", qtdFardo: "500 un" },
          { codigo: "31", modelo: "01 KG", dimensoes: "32 x 28 cm", qtdFardo: "500 un" },
          { codigo: "34", modelo: "02 KG", dimensoes: "38 x 34 cm", qtdFardo: "500 un" },
          { codigo: "39", modelo: "03 KG", dimensoes: "42 x 38 cm", qtdFardo: "500 un" },
          { codigo: "42", modelo: "05 KG", dimensoes: "48 x 42 cm", qtdFardo: "500 un" },
          { codigo: "861", modelo: "07,5 KG", dimensoes: "55 x 48 cm", qtdFardo: "500 un" },
          { codigo: "4209", modelo: "10 KG", dimensoes: "60 x 48 cm", qtdFardo: "500 un" },
          { codigo: "1177", modelo: "15 KG", dimensoes: "64 x 54 cm", qtdFardo: "500 un" },
          { codigo: "10519", modelo: "20 KG", dimensoes: "75 x 62 cm", qtdFardo: "500 un" }
        ]
      },
      {
        id: "sacos-padaria-especial-kraft-monolucido",
        number: "01D",
        name: "Saco de Padaria - ESPECIAL PRA VOCÊ (Kraft Monolúcido)",
        description: "Saco em papel Kraft Monolúcido de alto brilho com estampa premium afetiva 'Especial Pra Você'.",
        image: getCustomImg("sacos-padaria-especial-kraft-monolucido", "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "ESPECIAL PRA VOCE",
        papel: "Kraft Monolúcido 35g/m²",
        tabela: [
          { codigo: "11630", modelo: "TALHER", dimensoes: "17 x 28 cm", qtdFardo: "500 un" },
          { codigo: "4326", modelo: "0,5 KG", dimensoes: "32 x 19 cm", qtdFardo: "500 un" },
          { codigo: "6108", modelo: "01 SP", dimensoes: "32 x 24 cm", qtdFardo: "500 un" },
          { codigo: "6112", modelo: "02 SP", dimensoes: "38 x 28 cm", qtdFardo: "500 un" },
          { codigo: "6114", modelo: "03 SP", dimensoes: "38 x 34 cm", qtdFardo: "500 un" },
          { codigo: "10762", modelo: "04 SP", dimensoes: "42 x 38 cm", qtdFardo: "500 un" },
          { codigo: "6116", modelo: "05 SP", dimensoes: "48 x 38 cm", qtdFardo: "500 un" },
          { codigo: "6118", modelo: "07,5 SP", dimensoes: "55 x 42 cm", qtdFardo: "500 un" },
          { codigo: "6117", modelo: "10 SP", dimensoes: "55 x 48 cm", qtdFardo: "500 un" },
          { codigo: "6105", modelo: "15 SP", dimensoes: "55 x 54 cm", qtdFardo: "500 un" },
          { codigo: "7557", modelo: "01 KG G", dimensoes: "38 x 28 cm", qtdFardo: "500 un" }
        ]
      },
      {
        id: "sacos-padaria-lisa-kraft-simples",
        number: "01E",
        name: "Saco de Padaria - LISA (Kraft Simples)",
        description: "Embalagem básica e funcional de papel Kraft Simples para alta rotatividade com excelente custo-benefício.",
        image: getCustomImg("sacos-padaria-lisa-kraft-simples", "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "LISA",
        papel: "Kraft Simples 35g/m²",
        tabela: [
          { codigo: "24619", modelo: "0,5KG", dimensoes: "32 x 19 cm", qtdFardo: "500 un" },
          { codigo: "24573", modelo: "01KG-RJ", dimensoes: "32 x 28 cm", qtdFardo: "500 un" },
          { codigo: "26816", modelo: "02KG-SP", dimensoes: "40 x 27 cm", qtdFardo: "500 un" },
          { codigo: "24574", modelo: "02KG-RJ", dimensoes: "40 x 34 cm", qtdFardo: "500 un" },
          { codigo: "7563", modelo: "03KG-RJ", dimensoes: "43 x 38 cm", qtdFardo: "500 un" },
          { codigo: "24575", modelo: "05KG-RJ", dimensoes: "48 x 42 cm", qtdFardo: "500 un" },
          { codigo: "24576", modelo: "07,5KG-RJ", dimensoes: "55 x 48 cm", qtdFardo: "500 un" },
          { codigo: "24577", modelo: "10KG-RJ", dimensoes: "55 x 54 cm", qtdFardo: "500 un" },
          { codigo: "24578", modelo: "15KG-RJ", dimensoes: "60 x 62 cm", qtdFardo: "500 un" }
        ]
      },
      {
        id: "sacos-padaria-aproveite-kraft-simples",
        number: "01F",
        name: "Saco de Padaria - APROVEITE SEU DIA (Kraft Simples)",
        description: "Saco em papel Kraft Simples personalizado com estampa acolhedora 'Aproveite Seu Dia'.",
        image: getCustomImg("sacos-padaria-aproveite-kraft-simples", "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "APROVEITE SEU DIA",
        papel: "Kraft Simples 35g/m²",
        tabela: [
          { codigo: "7554", modelo: "0,5KG", dimensoes: "32 x 19 cm", qtdFardo: "500 un" },
          { codigo: "59", modelo: "01KG-SP", dimensoes: "32 x 24 cm", qtdFardo: "500 un" },
          { codigo: "66", modelo: "02KG-SP", dimensoes: "40 x 27 cm", qtdFardo: "500 un" },
          { codigo: "10518", modelo: "03KG-SP", dimensoes: "43 x 31 cm", qtdFardo: "500 un" },
          { codigo: "72", modelo: "05KG-SP", dimensoes: "48 x 38 cm", qtdFardo: "500 un" },
          { codigo: "17189", modelo: "07,5KG-SP", dimensoes: "55 x 42 cm", qtdFardo: "500 un" },
          { codigo: "17190", modelo: "10KG-SP", dimensoes: "55 x 48 cm", qtdFardo: "500 un" },
          { codigo: "79", modelo: "15KG-SP", dimensoes: "60 x 54 cm", qtdFardo: "500 un" }
        ]
      },
      {
        id: "sacos-padaria-lisa-branco-monolucido",
        number: "01G",
        name: "Saco de Padaria - LISA (Branco Monolúcido)",
        description: "Visual extremamente limpo e higiênico em papel Branco Monolúcido liso de alta qualidade para panificação.",
        image: getCustomImg("sacos-padaria-lisa-branco-monolucido", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "LISA",
        papel: "Branco Monolúcido 35g/m²",
        tabela: [
          { codigo: "28809", modelo: "0,5KG", dimensoes: "34 x 19 cm", qtdFardo: "500 un" },
          { codigo: "28807", modelo: "01KG-SP", dimensoes: "34 x 24 cm", qtdFardo: "500 un" },
          { codigo: "4308", modelo: "01KG-RJ", dimensoes: "34 x 28 cm", qtdFardo: "500 un" },
          { codigo: "2852", modelo: "02KG-SP", dimensoes: "40 x 28 cm", qtdFardo: "500 un" },
          { codigo: "2853", modelo: "03KG-SP", dimensoes: "44 x 31 cm", qtdFardo: "500 un" },
          { codigo: "3011", modelo: "05KG-SP", dimensoes: "48 x 38 cm", qtdFardo: "500 un" },
          { codigo: "2610", modelo: "07,5KG-SP", dimensoes: "55 x 42 cm", qtdFardo: "500 un" },
          { codigo: "1538", modelo: "10KG-SP", dimensoes: "55 x 48 cm", qtdFardo: "500 un" },
          { codigo: "4511", modelo: "15KG-SP", dimensoes: "64 x 48 cm", qtdFardo: "500 un" },
          { codigo: "7912", modelo: "06PD-CUCA", dimensoes: "55 x 34 cm", qtdFardo: "500 un" },
          { codigo: "4321", modelo: "08PD-BOLO", dimensoes: "60 x 38 cm", qtdFardo: "500 un" },
          { codigo: "7914", modelo: "14PD-BOLÃO", dimensoes: "75 x 42 cm", qtdFardo: "500 un" }
        ]
      }
    ]
  },
  {
    id: "sacos-padaria-visor",
    number: "02",
    name: "Sacos de Padaria c/ Visor",
    description: "Visibilidade do produto com janela em filme transparente de alta qualidade.",
    image: getCustomImg("sacos-padaria-visor", "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=600&auto=format&fit=crop"),
    category: "Papel",
    subgroups: [
      {
        id: "sacos-padaria-visor-aproveite-kraft-monolucido",
        number: "02C",
        name: "Linha Aproveite seu dia - Kraft Monolúcido 35g",
        description: "Sacos decorados com a elegante estampa 'Aproveite seu dia' com visor para destacar os seus produtos com charme.",
        image: getCustomImg("sacos-padaria-visor-aproveite-kraft-monolucido", "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Aproveite seu dia",
        papel: "Kraft Monolúcido 35g",
        tabela: [
          { codigo: "10522", modelo: "0,5 KG", dimensoes: "32 x 19 cm", qtdFardo: "500 un" },
          { codigo: "10611", modelo: "01 SP", dimensoes: "32 x 24 cm", qtdFardo: "500 un" },
          { codigo: "10526", modelo: "02 SP", dimensoes: "40 x 28 cm", qtdFardo: "500 un" },
          { codigo: "10527", modelo: "03 SP", dimensoes: "43 x 31 cm", qtdFardo: "500 un" },
          { codigo: "10528", modelo: "05 SP", dimensoes: "48 x 38 cm", qtdFardo: "500 un" },
          { codigo: "10529", modelo: "07,5 SP", dimensoes: "55 x 42 cm", qtdFardo: "500 un" },
          { codigo: "10523", modelo: "10 SP", dimensoes: "55 x 48 cm", qtdFardo: "500 un" },
          { codigo: "10743", modelo: "15 SP", dimensoes: "60 x 54 cm", qtdFardo: "500 un" },
          { codigo: "24541", modelo: "02 PD", dimensoes: "40 x 21 cm", qtdFardo: "500 un" },
          { codigo: "25058", modelo: "03 PD", dimensoes: "43 x 28 cm", qtdFardo: "500 un" },
          { codigo: "10521", modelo: "BAGUETE-15 RJ", dimensoes: "32 x 62 cm", qtdFardo: "500 un" },
          { codigo: "29075", modelo: "BAGUETE-15 RJ", dimensoes: "32 x 62 cm", qtdFardo: "500 un" }
        ]
      },
      {
        id: "sacos-padaria-visor-aproveite-kraft-simples",
        number: "02D",
        name: "Linha Aproveite seu dia - Kraft Simples 35g",
        description: "Estampa especial 'Aproveite seu dia' em papel kraft simples com visor transparente, garantindo excelente custo-benefício.",
        image: getCustomImg("sacos-padaria-visor-aproveite-kraft-simples", "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Aproveite seu dia",
        papel: "Kraft Simples 35g",
        tabela: [
          { codigo: "26681", modelo: "0,5KG", dimensoes: "32 x 19 cm", qtdFardo: "500 un" },
          { codigo: "26682", modelo: "01KG-SP", dimensoes: "32 x 24 cm", qtdFardo: "500 un" },
          { codigo: "26683", modelo: "02KG-SP", dimensoes: "38 x 28 cm", qtdFardo: "500 un" },
          { codigo: "26684", modelo: "03KG-SP", dimensoes: "43 x 31 cm", qtdFardo: "500 un" },
          { codigo: "26685", modelo: "05KG-SP", dimensoes: "48 x 38 cm", qtdFardo: "500 un" },
          { codigo: "26686", modelo: "07,5KG-SP", dimensoes: "55 x 42 cm", qtdFardo: "500 un" },
          { codigo: "26687", modelo: "10KG-SP", dimensoes: "55 x 48 cm", qtdFardo: "500 un" },
          { codigo: "26688", modelo: "15KG-SP", dimensoes: "60 x 54 cm", qtdFardo: "500 un" }
        ]
      }
    ]
  },
  {
    id: "sacos-sacolas-delivery",
    number: "03",
    name: "Sacos e Sacolas Delivery",
    description: "Resistência reforçada para operações de delivery e take-away.",
    image: getCustomImg("sacos-sacolas-delivery", "https://images.unsplash.com/photo-1589365278144-c9e705b843ba?q=80&w=600&auto=format&fit=crop"),
    category: "Papel",
    subcategories: [
      {
        id: "sacos-delivery",
        name: "Sacos Delivery",
        description: "Sacos de papel de alta gramatura e fundo quadrado autoportante, ideais para lanches e fast food.",
        image: getCustomImg("sacos-delivery", "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop"),
        subgroups: [
          {
            id: "delivery-lisa-kraft-monolucido",
            number: "03A-1",
            name: "Sacos SOS Linha Lisa - Kraft Monolúcido",
            description: "Sacos de papel kraft monolúcido liso de 70 a 80g/m², ideais para embalar lanches e delivery de forma prática e segura.",
            image: getCustomImg("delivery-lisa-kraft-monolucido", sacoSosMonoKraftImg),
            category: "Papel",
            linha: "Lisa",
            papel: "Kraft Monolúcido 70 à 80gr",
            tabela: [
              { codigo: "20283", modelo: "02KG (14X21X9)", dimensoes: "47X28", qtdFardo: "5X100" },
              { codigo: "18682", modelo: "02,5KG (14X30X8)", dimensoes: "47X38", qtdFardo: "5X100" },
              { codigo: "19536", modelo: "03KG (16X26X10)", dimensoes: "55X34", qtdFardo: "5X100" },
              { codigo: "19537", modelo: "04KG (18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100" },
              { codigo: "19538", modelo: "05KG (18X30X10,5)", dimensoes: "60X38", qtdFardo: "5X100" },
              { codigo: "20012", modelo: "07KG (18X36X10,5)", dimensoes: "60X44", qtdFardo: "5X100" },
              { codigo: "19539", modelo: "10KG (22X28X13)", dimensoes: "73X38", qtdFardo: "5X100" },
              { codigo: "19540", modelo: "12KG (22X34X13)", dimensoes: "73X44", qtdFardo: "5X100" },
              { codigo: "19541", modelo: "15KG (22X38X13)", dimensoes: "73X48", qtdFardo: "5X100" },
              { codigo: "19542", modelo: "17KG (24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100" },
              { codigo: "19543", modelo: "18KG (24X38X15)", dimensoes: "80X48", qtdFardo: "5X100" },
              { codigo: "19954", modelo: "19KG (24X33X17)", dimensoes: "85X44", qtdFardo: "5X100" },
              { codigo: "19544", modelo: "20KG (26X38X15)", dimensoes: "85X48", qtdFardo: "5X100" },
              { codigo: "19545", modelo: "23KG (28X34X16,5)", dimensoes: "92X44", qtdFardo: "5X100" },
              { codigo: "19546", modelo: "24KG (30X31X18)", dimensoes: "99X44", qtdFardo: "5X100" },
              { codigo: "19547", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "5X100" },
              { codigo: "19707", modelo: "37KG (35X36X17,5)", dimensoes: "108X48", qtdFardo: "100" },
              { codigo: "19708", modelo: "38KG (35X44X17,5)", dimensoes: "108X56", qtdFardo: "100" },
              { codigo: "19709", modelo: "40KG (40X36X17)", dimensoes: "120X48", qtdFardo: "100" },
              { codigo: "19710", modelo: "44KG (40X50X17)", dimensoes: "120X62", qtdFardo: "100" },
              { codigo: "19705", modelo: "50KG (30X70X18)", dimensoes: "99X82", qtdFardo: "100" }
            ]
          },
          {
            id: "delivery-food-kraft-monolucido",
            number: "03A-2",
            name: "Sacos SOS Linha Food - Kraft Monolúcido",
            description: "Sacos SOS de papel kraft monolúcido de 70 a 80g/m² com estampa temática 'Food', perfeitos para delivery de lanches.",
            image: getCustomImg("delivery-food-kraft-monolucido", "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Food",
            papel: "Kraft Monolúcido 70 à 80gr",
            tabela: [
              { codigo: "20484", modelo: "04KG (18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100" },
              { codigo: "20485", modelo: "10KG (22X28X13)", dimensoes: "73X38", qtdFardo: "5X100" },
              { codigo: "20486", modelo: "17KG (24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100" },
              { codigo: "20487", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "5X100" }
            ]
          },
          {
            id: "delivery-panf-kraft-natural",
            number: "03A-3",
            name: "Sacos Linha Panf - Kraft Natural (ideal para pães)",
            description: "Sacos em papel Kraft Natural de 50g, ideal para panificação, mantendo a crocância e frescor dos pães.",
            image: getCustomImg("delivery-panf-kraft-natural", "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Panf",
            papel: "Kraft Natural 50gr, ideal para pães.",
            tabela: [
              { codigo: "23866", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100" },
              { codigo: "23867", modelo: "02,5KG(13X32X9)", dimensoes: "47X38", qtdFardo: "5X100" },
              { codigo: "23868", modelo: "07KG(18X36X10,5)", dimensoes: "60X44", qtdFardo: "5X100" },
              { codigo: "23869", modelo: "18KG(24X38X15)", dimensoes: "80X48", qtdFardo: "5X100" },
              { codigo: "23870", modelo: "26KG(30X45X18)", dimensoes: "99X56", qtdFardo: "5X100" }
            ]
          },
          {
            id: "delivery-lisa-kraft-natural-70-80",
            number: "03A-4",
            name: "Sacos SOS Linha Lisa - Kraft Natural 70 a 80g",
            description: "Sacos SOS de papel kraft natural liso com gramatura de 70 a 80g/m² para resistência ideal em entregas.",
            image: getCustomImg("delivery-lisa-kraft-natural-70-80", "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Lisa",
            papel: "Kraft Natural 70 à 80gr",
            tabela: [
              { codigo: "28800", modelo: "03KG (16X26X10)", dimensoes: "55X34", qtdFardo: "5X100" },
              { codigo: "30670", modelo: "05KG (18X30X10,5)", dimensoes: "60X38", qtdFardo: "5X100" },
              { codigo: "30672", modelo: "10KG (22X28X13)", dimensoes: "73X38", qtdFardo: "5X100" },
              { codigo: "30674", modelo: "17KG (24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100" },
              { codigo: "30676", modelo: "24KG (30X31X18)", dimensoes: "99X44", qtdFardo: "5X100" }
            ]
          },
          {
            id: "delivery-lisa-kraft-natural-120",
            number: "03A-5",
            name: "Sacos SOS Linha Lisa - Kraft Natural 120g",
            description: "Sacos SOS de alta gramatura (120g/m²), oferecendo excelente firmeza e sustentação para pacotes mais pesados.",
            image: getCustomImg("delivery-lisa-kraft-natural-120", "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Lisa",
            papel: "Kraft Natural 120gr",
            tabela: [
              { codigo: "27952", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "5X100" },
              { codigo: "27953", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100" },
              { codigo: "27954", modelo: "01,5KG(12X37X8)", dimensoes: "43X44", qtdFardo: "5X100" },
              { codigo: "27955", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100" },
              { codigo: "27318", modelo: "17KG(24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100" },
              { codigo: "27956", modelo: "17SL(24X36X11)", dimensoes: "73X44", qtdFardo: "5X100" },
              { codigo: "27319", modelo: "25KG(30X35X18)", dimensoes: "99X48", qtdFardo: "100" },
              { codigo: "28798", modelo: "26KG(30X45X18)", dimensoes: "99X56", qtdFardo: "100" },
              { codigo: "27957", modelo: "26SL(30X46X12)", dimensoes: "87X56", qtdFardo: "100" }
            ]
          },
          {
            id: "delivery-lisa-kraft-simples",
            number: "03A-6",
            name: "Sacos SOS Linha Lisa - Kraft Simples",
            description: "Sacos SOS de papel kraft simples de 70 a 80g/m² de acabamento clássico.",
            image: getCustomImg("delivery-lisa-kraft-simples", "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Lisa",
            papel: "Kraft Simples 70 à 80gr",
            tabela: [
              { codigo: "19172", modelo: "03KG (16X26X10)", dimensoes: "55X34", qtdFardo: "5X100" },
              { codigo: "19167", modelo: "05KG (18X30X10,5)", dimensoes: "60X38", qtdFardo: "5X100" },
              { codigo: "19168", modelo: "10KG (22X28X13)", dimensoes: "73X38", qtdFardo: "5X100" },
              { codigo: "19169", modelo: "17KG (24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100" },
              { codigo: "19170", modelo: "20KG (26X38X15)", dimensoes: "85X48", qtdFardo: "5X100" },
              { codigo: "19171", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "5X100" }
            ]
          },
          {
            id: "delivery-mordida-kraft-simples",
            number: "03A-7",
            name: "Sacos SOS Linha Mordida - Kraft Simples",
            description: "Sacos SOS de papel kraft simples de 70 a 80g/m² estampados com a linha 'Mordida'.",
            image: getCustomImg("delivery-mordida-kraft-simples", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Mordida",
            papel: "Kraft Simples 70 à 80gr",
            tabela: [
              { codigo: "19174", modelo: "05KG (18X30X10,5)", dimensoes: "60X38", qtdFardo: "5X100" },
              { codigo: "19175", modelo: "10KG (22X28X13)", dimensoes: "73X38", qtdFardo: "5X100" },
              { codigo: "19176", modelo: "17KG (24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100" },
              { codigo: "19177", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "5X100" }
            ]
          },
          {
            id: "delivery-lisa-branco-fibra-longa-70-80",
            number: "03A-8",
            name: "Sacos SOS Linha Lisa - Branco Fibra Longa 70 a 80g",
            description: "Sacos SOS fabricados em papel Branco Fibra Longa premium, garantindo excelente brancura, acabamento e resistência.",
            image: getCustomImg("delivery-lisa-branco-fibra-longa-70-80", "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Lisa",
            papel: "Branco Fibra Longa 70 à 80gr",
            tabela: [
              { codigo: "25996", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "5X100" },
              { codigo: "25997", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100" },
              { codigo: "22871", modelo: "03KG(16X26X10)", dimensoes: "55X34", qtdFardo: "5X100" },
              { codigo: "25998", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100" },
              { codigo: "22872", modelo: "05KG(18X30X10,5)", dimensoes: "60X38", qtdFardo: "5X100" },
              { codigo: "26000", modelo: "17KG(24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100" },
              { codigo: "25999", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "5X100" }
            ]
          },
          {
            id: "delivery-lisa-branco-fibra-longa-120",
            number: "03A-9",
            name: "Sacos SOS Linha Lisa - Branco Fibra Longa 120g",
            description: "Sacos SOS de papel Branco Fibra Longa com excelente espessura de 120g/m² para embalagens robustas e refinadas.",
            image: getCustomImg("delivery-lisa-branco-fibra-longa-120", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Lisa",
            papel: "Branco Fibra Longa 120gr",
            tabela: [
              { codigo: "27958", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "5X100" },
              { codigo: "27959", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100" },
              { codigo: "27960", modelo: "01,5KG(12X37X8)", dimensoes: "43X44", qtdFardo: "5X100" },
              { codigo: "27961", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100" },
              { codigo: "29985", modelo: "16KG(24X25X14,5)", dimensoes: "80X38", qtdFardo: "5X100" },
              { codigo: "27962", modelo: "17KG(24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100" },
              { codigo: "27963", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "5X100" },
              { codigo: "26002", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "100" },
              { codigo: "26001", modelo: "26SL(30X46X12)", dimensoes: "87X56", qtdFardo: "100" }
            ]
          },
          {
            id: "delivery-colorida-branco-fibra-longa-70-80",
            number: "03A-10",
            name: "Sacos SOS Linha Colorida - Branco Fibra Longa 70 a 80g",
            description: "Sacos SOS de papel Branco Fibra Longa de 70 a 80g/m² com identificadores circulares coloridos (Preto, Azul, Vermelho, Rosa, Amarelo).",
            image: getCustomImg("delivery-colorida-branco-fibra-longa-70-80", "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Colorida",
            papel: "Branco Fibra Longa 70 à 80gr",
            tabela: [
              // Preto
              { codigo: "26003", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "5X100", cor: "preto" },
              { codigo: "26004", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100", cor: "preto" },
              { codigo: "26005", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100", cor: "preto" },
              { codigo: "26007", modelo: "17KG(24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100", cor: "preto" },
              { codigo: "26006", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "5X100", cor: "preto" },
              // Azul
              { codigo: "26024", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "5X100", cor: "azul" },
              { codigo: "26025", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100", cor: "azul" },
              { codigo: "26026", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100", cor: "azul" },
              { codigo: "26028", modelo: "17KG(24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100", cor: "azul" },
              { codigo: "26027", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "5X100", cor: "azul" },
              // Vermelho
              { codigo: "26010", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "5X100", cor: "vermelho" },
              { codigo: "26011", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100", cor: "vermelho" },
              { codigo: "26012", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100", cor: "vermelho" },
              { codigo: "26014", modelo: "17KG(24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100", cor: "vermelho" },
              { codigo: "26013", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "5X100", cor: "vermelho" },
              // Rosa
              { codigo: "26031", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "5X100", cor: "rosa" },
              { codigo: "26032", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100", cor: "rosa" },
              { codigo: "26033", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100", cor: "rosa" },
              { codigo: "26035", modelo: "17KG(24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100", cor: "rosa" },
              { codigo: "26034", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "5X100", cor: "rosa" },
              // Amarelo
              { codigo: "26017", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "5X100", cor: "amarelo" },
              { codigo: "26018", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100", cor: "amarelo" },
              { codigo: "26019", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "5X100", cor: "amarelo" },
              { codigo: "26021", modelo: "17KG(24X34X14,5)", dimensoes: "80X44", qtdFardo: "5X100", cor: "amarelo" },
              { codigo: "26020", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "5X100", cor: "amarelo" }
            ]
          },
          {
            id: "delivery-colorida-branco-fibra-longa-120",
            number: "03A-11",
            name: "Sacos SOS Linha Colorida - Branco Fibra Longa 120g",
            description: "Sacos SOS de papel Branco Fibra Longa de 120g/m² extra-fortes com identificadores circulares coloridos.",
            image: getCustomImg("delivery-colorida-branco-fibra-longa-120", "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Colorida",
            papel: "Branco Fibra Longa 120gr",
            tabela: [
              // Preto
              { codigo: "26009", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "100", cor: "preto" },
              { codigo: "26008", modelo: "26SL(30X46X12)", dimensoes: "87X56", qtdFardo: "100", cor: "preto" },
              // Azul
              { codigo: "26030", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "100", cor: "azul" },
              { codigo: "26029", modelo: "26SL(30X46X12)", dimensoes: "87X56", qtdFardo: "100", cor: "azul" },
              // Vermelho
              { codigo: "26016", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "100", cor: "vermelho" },
              { codigo: "26015", modelo: "26SL(30X46X12)", dimensoes: "87X56", qtdFardo: "100", cor: "vermelho" },
              // Rosa
              { codigo: "26037", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "100", cor: "rosa" },
              { codigo: "26036", modelo: "26SL(30X46X12)", dimensoes: "87X56", qtdFardo: "100", cor: "rosa" },
              // Amarelo
              { codigo: "26023", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "100", cor: "amarelo" },
              { codigo: "26022", modelo: "26SL(30X46X12)", dimensoes: "87X56", qtdFardo: "100", cor: "amarelo" }
            ]
          },
          {
            id: "delivery-american-branco-fibra-longa-70-80",
            number: "03A-12",
            name: "Sacos SOS Linha American - Branco Fibra Longa 70 a 80g",
            description: "Sacos SOS de modelo American em papel Branco Fibra Longa de 70 a 80g/m².",
            image: getCustomImg("delivery-american-branco-fibra-longa-70-80", "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "American",
            papel: "Branco Fibra Longa 70 à 80gr",
            tabela: [
              { codigo: "22876", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "5X100" },
              { codigo: "22877", modelo: "03KG(16X26X10)", dimensoes: "54X34", qtdFardo: "5X100" },
              { codigo: "22878", modelo: "05KG(18X30X10,5)", dimensoes: "59X38", qtdFardo: "5X100" }
            ]
          },
          {
            id: "delivery-american-branco-fibra-longa-120",
            number: "03A-13",
            name: "Sacos SOS Linha American - Branco Fibra Longa 120g",
            description: "Sacos SOS de modelo American em papel Branco Fibra Longa de alta gramatura (120g/m²).",
            image: getCustomImg("delivery-american-branco-fibra-longa-120", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "American",
            papel: "Branco Fibra Longa 120gr",
            tabela: [
              { codigo: "28541", modelo: "01,5KG(12X37X8)", dimensoes: "43X44", qtdFardo: "250" }
            ]
          },
          {
            id: "delivery-pascoa-branco-fibra-longa",
            number: "03A-14",
            name: "Sacos SOS Linha Páscoa - Branco Fibra Longa",
            description: "Sacos SOS especiais com dimensões ideais para embalagens de ovos de Páscoa e chocolates.",
            image: getCustomImg("delivery-pascoa-branco-fibra-longa", "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Páscoa",
            papel: "Branco Fibra Longa 70 à 80gr",
            tabela: [
              { codigo: "24022", modelo: "12KG(22X34X13)", dimensoes: "72X44", qtdFardo: "250" }
            ]
          }
        ]
      },
      {
        id: "sacolas-delivery",
        name: "Sacolas Delivery",
        description: "Sacolas com alça reforçada e boca larga, perfeitas para pratos, bandejas e combos maiores.",
        image: getCustomImg("sacolas-delivery", "https://images.unsplash.com/photo-1589365278144-c9e705b843ba?q=80&w=600&auto=format&fit=crop"),
        subgroups: [
          {
            id: "delivery-sacolas",
            number: "03B-1",
            name: "Sacolas Kraft com Alça Torcida",
            description: "Sacolas reforçadas com alça torcida em Papel Kraft Monolúcido 70/80gr para transporte seguro e firme.",
            image: getCustomImg("delivery-sacolas", "https://images.unsplash.com/photo-1589365278144-c9e705b843ba?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Kraft Monolúcido",
            papel: "Papel Kraft Monolúcido 70/80gr",
            tabela: [
              { codigo: "20478", modelo: "02KG (14X21X9)", dimensoes: "47X28", qtdFardo: "250" },
              { codigo: "14379", modelo: "03KG (16X26X10)", dimensoes: "55X34", qtdFardo: "250" },
              { codigo: "14380", modelo: "05KG (18X30X10,5)", dimensoes: "60X38", qtdFardo: "250" },
              { codigo: "17106", modelo: "07KG (18X36X10,5)", dimensoes: "60X44", qtdFardo: "250" },
              { codigo: "14381", modelo: "10KG (22X28X13)", dimensoes: "73X38", qtdFardo: "250" },
              { codigo: "15062", modelo: "15KG (22X38X13)", dimensoes: "73X48", qtdFardo: "250" },
              { codigo: "14382", modelo: "17KG (24X34X14,5)", dimensoes: "80X44", qtdFardo: "250" },
              { codigo: "14385", modelo: "23KG (28X34X16,5)", dimensoes: "92X44", qtdFardo: "250" },
              { codigo: "14387", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "250" },
              { codigo: "14388", modelo: "38KG (35X44X17,5)", dimensoes: "108X56", qtdFardo: "250" },
              { codigo: "17112", modelo: "44KG (40X50X17)", dimensoes: "120X62", qtdFardo: "250" }
            ]
          },
          {
            id: "delivery-sacolas-kraft-natural",
            number: "03B-2",
            name: "Sacolas Kraft Natural 120gr",
            description: "Sacolas reforçadas com alça torcida em Papel Kraft Natural 120gr para delivery seguro e resistente.",
            image: getCustomImg("delivery-sacolas-kraft-natural", "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Kraft Natural",
            papel: "Papel Kraft Natural 120gr",
            tabela: [
              { codigo: "23452", modelo: "0,5KG (12X15X8)", dimensoes: "43X28", qtdFardo: "250" },
              { codigo: "23325", modelo: "01KG (12X21X8)", dimensoes: "43X34", qtdFardo: "250" },
              { codigo: "22308", modelo: "VINHO (12X37X8)", dimensoes: "43X44", qtdFardo: "250" },
              { codigo: "23326", modelo: "04KG (18X26X10,5)", dimensoes: "60X34", qtdFardo: "250" },
              { codigo: "23327", modelo: "17KG (24X34X14,5)", dimensoes: "80X44", qtdFardo: "250" },
              { codigo: "23453", modelo: "17SL (24X36X11)", dimensoes: "73X44", qtdFardo: "250" },
              { codigo: "23328", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "250" },
              { codigo: "23454", modelo: "26SL (30X46X12)", dimensoes: "85X56", qtdFardo: "250" }
            ]
          },
          {
            id: "delivery-sacolas-lisa-branco-fibra-longa-75",
            number: "03B-3",
            name: "Sacolas SOS Linha Lisa - Branco Fibra Longa 75gr",
            description: "Sacolas SOS fabricadas em papel Branco Fibra Longa 75g/m² com excelente brancura, alta resistência e acabamento de alto padrão.",
            image: getCustomImg("delivery-sacolas-lisa-branco-fibra-longa-75", "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Lisa",
            papel: "Branco Fibra Longa 75gr",
            tabela: [
              { codigo: "25949", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "250" },
              { codigo: "25954", modelo: "01KG (12X21X8)", dimensoes: "43X28", qtdFardo: "250" },
              { codigo: "25955", modelo: "04KG(18X26X10,5)", dimensoes: "59X38", qtdFardo: "250" },
              { codigo: "25957", modelo: "17KG(24X34X14,5)", dimensoes: "79X44", qtdFardo: "250" },
              { codigo: "25956", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "250" }
            ]
          },
          {
            id: "delivery-sacolas-lisa-branco-fibra-longa-120",
            number: "03B-4",
            name: "Sacolas SOS Linha Lisa - Branco Fibra Longa 120gr",
            description: "Sacolas SOS estruturadas em papel Branco Fibra Longa 120g/m² de alta densidade para máxima sustentação e requinte.",
            image: getCustomImg("delivery-sacolas-lisa-branco-fibra-longa-120", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Lisa",
            papel: "Branco Fibra Longa 120gr",
            tabela: [
              { codigo: "25423", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "250" },
              { codigo: "25425", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "250" },
              { codigo: "22886", modelo: "VINHO (12X37X8)", dimensoes: "43X44", qtdFardo: "250" },
              { codigo: "25426", modelo: "04KG(18X26X10,5)", dimensoes: "59X38", qtdFardo: "250" },
              { codigo: "25427", modelo: "17KG(24X34X14,5)", dimensoes: "79X44", qtdFardo: "250" },
              { codigo: "25428", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "250" },
              { codigo: "25959", modelo: "25KG(30X35X18)", dimensoes: "98X48", qtdFardo: "250" },
              { codigo: "25958", modelo: "26SL(30X46X12)", dimensoes: "86X56", qtdFardo: "250" }
            ]
          },
          {
            id: "delivery-sacolas-colorida-branco-fibra-longa-70-80",
            number: "03B-5",
            name: "Sacolas SOS Linha Colorida - Branco Fibra Longa 70 a 80g",
            description: "Sacolas SOS em papel Branco Fibra Longa 70 a 80g/m² com opções em diversas cores (Preto, Azul, Vermelho, Rosa e Amarelo).",
            image: getCustomImg("delivery-sacolas-colorida-branco-fibra-longa-70-80", "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Colorida",
            papel: "Branco Fibra Longa 70 à 80gr",
            tabela: [
              // PRETO
              { codigo: "25960", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "250", cor: "preto" },
              { codigo: "25962", modelo: "01KG (12X21X8)", dimensoes: "43X28", qtdFardo: "250", cor: "preto" },
              { codigo: "25963", modelo: "04KG(18X26X10,5)", dimensoes: "59X38", qtdFardo: "250", cor: "preto" },
              { codigo: "25965", modelo: "17KG(24X34X14,5)", dimensoes: "79X44", qtdFardo: "250", cor: "preto" },
              { codigo: "25964", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "250", cor: "preto" },
              // AZUL
              { codigo: "25982", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "250", cor: "azul" },
              { codigo: "25983", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "250", cor: "azul" },
              { codigo: "25984", modelo: "04KG(18X26X10,5)", dimensoes: "59X38", qtdFardo: "250", cor: "azul" },
              { codigo: "25986", modelo: "17KG(24X34X14,5)", dimensoes: "79X44", qtdFardo: "250", cor: "azul" },
              { codigo: "25985", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "250", cor: "azul" },
              // VERMELHO
              { codigo: "25968", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "250", cor: "vermelho" },
              { codigo: "25969", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "250", cor: "vermelho" },
              { codigo: "25970", modelo: "04KG(18X26X10,5)", dimensoes: "59X38", qtdFardo: "250", cor: "vermelho" },
              { codigo: "25972", modelo: "17KG(24X34X14,5)", dimensoes: "79X44", qtdFardo: "250", cor: "vermelho" },
              { codigo: "25971", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "250", cor: "vermelho" },
              // ROSA
              { codigo: "25989", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "250", cor: "rosa" },
              { codigo: "25990", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "250", cor: "rosa" },
              { codigo: "25991", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "250", cor: "rosa" },
              { codigo: "25993", modelo: "17KG(24X34X14,5)", dimensoes: "79X44", qtdFardo: "250", cor: "rosa" },
              { codigo: "25992", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "250", cor: "rosa" },
              // AMARELO
              { codigo: "25975", modelo: "0,5KG(12X15X8)", dimensoes: "43X22", qtdFardo: "250", cor: "amarelo" },
              { codigo: "25976", modelo: "01KG(12X22X8)", dimensoes: "43X28", qtdFardo: "250", cor: "amarelo" },
              { codigo: "25977", modelo: "04KG(18X26X10,5)", dimensoes: "60X34", qtdFardo: "250", cor: "amarelo" },
              { codigo: "25979", modelo: "17KG(24X34X14,5)", dimensoes: "79X44", qtdFardo: "250", cor: "amarelo" },
              { codigo: "25978", modelo: "17SL(24X36X11)", dimensoes: "72X44", qtdFardo: "250", cor: "amarelo" }
            ]
          },
          {
            id: "delivery-sacolas-colorida-branco-fibra-longa-120",
            number: "03B-6",
            name: "Sacolas SOS Linha Colorida - Branco Fibra Longa 120gr",
            description: "Sacolas SOS de alta gramatura (120g/m²) em papel Branco Fibra Longa nas cores Preto, Azul, Vermelho, Rosa e Amarelo.",
            image: getCustomImg("delivery-sacolas-colorida-branco-fibra-longa-120", "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Colorida",
            papel: "Branco Fibra Longa 120gr",
            tabela: [
              // PRETO
              { codigo: "25967", modelo: "25KG(30X35X18)", dimensoes: "98X48", qtdFardo: "250", cor: "preto" },
              { codigo: "25966", modelo: "26SL(30X46X12)", dimensoes: "86X56", qtdFardo: "250", cor: "preto" },
              // AZUL
              { codigo: "25988", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "250", cor: "azul" },
              { codigo: "25987", modelo: "26SL(30X46X12)", dimensoes: "86X56", qtdFardo: "250", cor: "azul" },
              // VERMELHO
              { codigo: "25974", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "250", cor: "vermelho" },
              { codigo: "25973", modelo: "26SL(30X46X12)", dimensoes: "86X56", qtdFardo: "250", cor: "vermelho" },
              // ROSA
              { codigo: "25995", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "250", cor: "rosa" },
              { codigo: "25994", modelo: "26SL(30X46X12)", dimensoes: "87X56", qtdFardo: "250", cor: "rosa" },
              // AMARELO
              { codigo: "25981", modelo: "25KG (30X35X18)", dimensoes: "99X48", qtdFardo: "250", cor: "amarelo" },
              { codigo: "25980", modelo: "26SL(30X46X12)", dimensoes: "86X56", qtdFardo: "250", cor: "amarelo" }
            ]
          },
          {
            id: "delivery-sacolas-american-branco-fibra-longa-75",
            number: "03B-7",
            name: "Sacolas SOS Linha American - Branco Fibra Longa 75gr",
            description: "Sacolas SOS com design e estampa estilo American em papel Branco Fibra Longa 75g/m², ideal para hamburguerias, lanchonetes e fast food.",
            image: getCustomImg("delivery-sacolas-american-branco-fibra-longa-75", "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "American",
            papel: "Branco Fibra Longa 75gr",
            tabela: [
              { codigo: "22883", modelo: "01KG(12X21X8)", dimensoes: "43X28", qtdFardo: "250" },
              { codigo: "23448", modelo: "05KG(18X30X10,5)", dimensoes: "59X38", qtdFardo: "250" }
            ]
          },
          {
            id: "delivery-sacolas-american-branco-fibra-longa-120",
            number: "03B-8",
            name: "Sacolas SOS Linha American - Branco Fibra Longa 120gr",
            description: "Sacolas SOS estruturadas em papel Branco Fibra Longa reforçado 120g/m² com estampa American, desenvolvida especialmente para garrafas e presentes de alto valor.",
            image: getCustomImg("delivery-sacolas-american-branco-fibra-longa-120", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "American",
            papel: "Branco Fibra Longa 120gr",
            tabela: [
              { codigo: "22887", modelo: "VINHO (12X37X8)", dimensoes: "43X44", qtdFardo: "250" }
            ]
          },
          {
            id: "delivery-sacolas-pascoa-branco-fibra-longa-75",
            number: "03B-9",
            name: "Sacolas SOS Linha Páscoa - Branco Fibra Longa 75gr",
            description: "Sacolas SOS temáticas especiais de Páscoa fabricadas em papel Branco Fibra Longa 75g/m², perfeitas para ovos de chocolate, doces e confeitarias artesanais.",
            image: getCustomImg("delivery-sacolas-pascoa-branco-fibra-longa-75", "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop"),
            category: "Papel",
            linha: "Páscoa",
            papel: "Branco Fibra Longa 75gr",
            tabela: [
              { codigo: "24022", modelo: "12KG(22X34X13)", dimensoes: "72X44", qtdFardo: "250" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "acoplados-embrulho",
    number: "04",
    name: "Acoplados, Embrulho, Forração e Bandeja",
    description: "Papéis acoplados térmicos, plásticos impermeáveis, antigordura, kraft e monolúcidos para proteção, embrulho e forração de alimentos.",
    image: getCustomImg("acoplados-embrulho", "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"),
    category: "Papel",
    subgroups: [
      {
        id: "acoplado-termico-lisa-branco-25",
        number: "04A-1",
        name: "Papel Acoplado Térmico Linha Lisa - Branco 25gr",
        description: "Papel acoplado térmico liso em papel Branco 25g/m² com filme protetor, ideal para reter a temperatura e o frescor de alimentos quentes.",
        image: getCustomImg("acoplado-termico-lisa-branco-25", "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Branco 25gr",
        tabela: [
          { codigo: "18048", modelo: "P", dimensoes: "28X40", qtdFardo: "250" },
          { codigo: "18049", modelo: "M", dimensoes: "34X40", qtdFardo: "250" },
          { codigo: "18050", modelo: "G", dimensoes: "40X40", qtdFardo: "250" }
        ]
      },
      {
        id: "acoplado-termico-food-branco-25",
        number: "04A-2",
        name: "Papel Acoplado Térmico Linha Food - Branco 25gr",
        description: "Papel acoplado térmico com estampa temática Food em papel Branco 25g/m², com excelente barreira térmica para lanches, hambúrgueres e porções.",
        image: getCustomImg("acoplado-termico-food-branco-25", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Food",
        papel: "Papel Branco 25gr",
        tabela: [
          { codigo: "16918", modelo: "P", dimensoes: "28X40", qtdFardo: "250" },
          { codigo: "17229", modelo: "M", dimensoes: "34X40", qtdFardo: "250" },
          { codigo: "17944", modelo: "G", dimensoes: "40X40", qtdFardo: "250" }
        ]
      },
      {
        id: "acoplado-termico-food-kraft-25",
        number: "04A-3",
        name: "Papel Acoplado Térmico Linha Food - Kraft 25gr",
        description: "Papel acoplado térmico com estampa temática Food em papel Kraft 25g/m², unindo estética rústica e proteção térmica para alimentos.",
        image: getCustomImg("acoplado-termico-food-kraft-25", "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Food",
        papel: "Papel Kraft 25gr",
        tabela: [
          { codigo: "28671", modelo: "P", dimensoes: "28X40", qtdFardo: "250" },
          { codigo: "28670", modelo: "M", dimensoes: "34X40", qtdFardo: "250" },
          { codigo: "28669", modelo: "G", dimensoes: "40X40", qtdFardo: "250" }
        ]
      },
      {
        id: "acoplado-plastico-lisa-branco-25",
        number: "04A-4",
        name: "Papel Acoplado Plástico Linha Lisa - Branco 25gr",
        description: "Papel acoplado com película plástica impermeabilizante em papel Branco 25g/m² para proteção total contra líquidos e gorduras.",
        image: getCustomImg("acoplado-plastico-lisa-branco-25", "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Branco 25gr",
        tabela: [
          { codigo: "3683", modelo: "P", dimensoes: "28X40", qtdFardo: "250" },
          { codigo: "6595", modelo: "M", dimensoes: "34X40", qtdFardo: "250" },
          { codigo: "7058", modelo: "G", dimensoes: "40X40", qtdFardo: "250" }
        ]
      },
      {
        id: "acoplado-plastico-food-branco-25",
        number: "04A-5",
        name: "Papel Acoplado Plástico Linha Food - Branco 25gr",
        description: "Papel acoplado com película plástica e estampa Food em papel Branco 25g/m², ideal para lanches, sanduíches e porções delivery.",
        image: getCustomImg("acoplado-plastico-food-branco-25", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Food",
        papel: "Papel Branco 25gr",
        tabela: [
          { codigo: "6397", modelo: "P", dimensoes: "28X40", qtdFardo: "250" },
          { codigo: "5941", modelo: "M", dimensoes: "34X40", qtdFardo: "250" },
          { codigo: "18731", modelo: "G", dimensoes: "40X40", qtdFardo: "250" }
        ]
      },
      {
        id: "acoplado-plastico-food-kraft-25",
        number: "04A-6",
        name: "Papel Acoplado Plástico Linha Food - Kraft 25gr",
        description: "Papel acoplado com película plástica e estampa Food em papel Kraft 25g/m², perfeito para hambúrgueres artesanais e lanches suculentos.",
        image: getCustomImg("acoplado-plastico-food-kraft-25", "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Food",
        papel: "Papel Kraft 25gr",
        tabela: [
          { codigo: "29241", modelo: "P", dimensoes: "28X40", qtdFardo: "250" },
          { codigo: "29243", modelo: "M", dimensoes: "34X40", qtdFardo: "250" },
          { codigo: "29637", modelo: "G", dimensoes: "40X40", qtdFardo: "250" }
        ]
      },
      {
        id: "acoplado-plastico-assados-kraft-35",
        number: "04A-7",
        name: "Papel Acoplado Plástico Linha Assados - Kraft 35gr",
        description: "Papel acoplado reforçado de 35g/m² com película plástica, desenvolvido especialmente para frangos assados, carnes e pratos com molho.",
        image: getCustomImg("acoplado-plastico-assados-kraft-35", "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Assados",
        papel: "Papel Kraft 35gr",
        tabela: [
          { codigo: "5942", modelo: "P", dimensoes: "40X50", qtdFardo: "200" },
          { codigo: "6367 / 31371", modelo: "M", dimensoes: "50X60", qtdFardo: "200" },
          { codigo: "6378 / 30261", modelo: "G", dimensoes: "50X70", qtdFardo: "200" }
        ]
      },
      {
        id: "acoplado-plastico-frios-branco-25",
        number: "04A-8",
        name: "Papel Acoplado Plástico Linha Frios - Branco 25gr",
        description: "Papel acoplado especial para queijos, presuntos, frios fatiados e embutidos, garantindo vedação e frescor prolongado.",
        image: getCustomImg("acoplado-plastico-frios-branco-25", "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Frios",
        papel: "Papel Branco 25gr",
        tabela: [
          { codigo: "4315", modelo: "P", dimensoes: "28X40", qtdFardo: "250" }
        ]
      },
      {
        id: "papel-antigordura-lisa-manteiga-35",
        number: "04A-9",
        name: "Papel Antigordura Linha Lisa - Manteiga 35gr",
        description: "Papel antigordura / papel manteiga 35g/m² com barreira natural contra óleos e gorduras, ideal para cestas, bandejas e embrulhos gourmet.",
        image: getCustomImg("papel-antigordura-lisa-manteiga-35", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Manteiga 35gr",
        tabela: [
          { codigo: "2828", modelo: "1 / 8", dimensoes: "17X25", qtdFardo: "400" },
          { codigo: "5946", modelo: "1 / 4", dimensoes: "25X35", qtdFardo: "400" },
          { codigo: "6037", modelo: "1 / 2", dimensoes: "35X50", qtdFardo: "400" },
          { codigo: "471", modelo: "1 / 1", dimensoes: "50X70", qtdFardo: "400" }
        ]
      },
      {
        id: "papel-kraft-lisa-fibra-longa-35",
        number: "04A-10",
        name: "Papel Kraft Linha Lisa - Fibra Longa 35gr",
        description: "Folhas de papel Kraft puro de Fibra Longa 35g/m², ideal para forração de mesas, bandejas, embrulho e proteção de mercadorias.",
        image: getCustomImg("papel-kraft-lisa-fibra-longa-35", "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Kraft Fibra Longa 35gr",
        tabela: [
          { codigo: "136", modelo: "1 / 1", dimensoes: "50 X 70", qtdFardo: "400" }
        ]
      },
      {
        id: "papel-kraft-wind-fibra-longa-35",
        number: "04A-11",
        name: "Papel Kraft Linha Wind - Fibra Longa 35gr",
        description: "Folhas em papel Kraft Fibra Longa 35g/m² com estampa elegante Linha Wind para forração de bandejas e apresentação de lanches.",
        image: getCustomImg("papel-kraft-wind-fibra-longa-35", "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Wind",
        papel: "Papel Kraft Fibra Longa 35gr",
        tabela: [
          { codigo: "28324", modelo: "PP", dimensoes: "28X34", qtdFardo: "250" }
        ]
      },
      {
        id: "papel-monolucido-lisa-branco-35",
        number: "04A-12",
        name: "Papel Monolúcido Linha Lisa - Branco 35gr",
        description: "Folhas de papel Branco Monolúcido 35g/m² com brilho especial, ideal para embrulhos higiênicos, doces e produtos de panificação.",
        image: getCustomImg("papel-monolucido-lisa-branco-35", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Branco 35gr",
        tabela: [
          { codigo: "28321", modelo: "PP", dimensoes: "28X34", qtdFardo: "250" }
        ]
      },
      {
        id: "papel-monolucido-food-branco-35",
        number: "04A-13",
        name: "Papel Monolúcido Linha Food - Branco 35gr",
        description: "Folhas de papel Branco Monolúcido 35g/m² com estampa temática Food para forração de bandejas, pratos e cestas de lanche.",
        image: getCustomImg("papel-monolucido-food-branco-35", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Food",
        papel: "Papel Branco 35gr",
        tabela: [
          { codigo: "28322", modelo: "PP", dimensoes: "28X34", qtdFardo: "250" }
        ]
      }
    ]
  },
  {
    id: "sacos-lanche",
    number: "05",
    name: "Sacos de Lanche",
    description: "Sacos de lanche em papel branco antigordura e monolúcido nos modelos Talher, Pipoca, Fritas, X-Salada, X-Largo, X-Tudo, X-Gaúcho, X-Aberto e Pastéis.",
    image: getCustomImg("sacos-lanche", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"),
    category: "Papel",
    subgroups: [
      {
        id: "saco-lanche-lisa-branco-antigordura-35",
        number: "05A-1",
        name: "Saco de Lanche Linha Lisa - Branco Antigordura 35gr",
        description: "Sacos de lanche lisos em papel Branco Antigordura 35g/m² com excelente barreira contra óleos e gorduras para hambúrgueres, porções e pastéis.",
        image: getCustomImg("saco-lanche-lisa-branco-antigordura-35", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Branco Antigordura 35gr",
        tabela: [
          { codigo: "16393", modelo: "FRITAS 01 (7,5X13X5)", dimensoes: "28X14", qtdFardo: "500" },
          { codigo: "9301", modelo: "FRITAS 02 (7,5X16X5)", dimensoes: "28X17", qtdFardo: "500" },
          { codigo: "6912", modelo: "X-SALADA (10,5X13X5,5)", dimensoes: "34X14", qtdFardo: "500" },
          { codigo: "6911", modelo: "X-LARGO (13X13X6)", dimensoes: "40X14", qtdFardo: "500" },
          { codigo: "6910", modelo: "X-TUDO (13X16X6)", dimensoes: "40X17", qtdFardo: "500" },
          { codigo: "25376", modelo: "X-GAUCHO 01 (15X16X7)", dimensoes: "46X17", qtdFardo: "500" },
          { codigo: "25377", modelo: "X-GAUCHO 02 (15X20X7)", dimensoes: "46X17", qtdFardo: "500" },
          { codigo: "25375", modelo: "X-CAXIAS (13X20X6)", dimensoes: "40X21", qtdFardo: "500" },
          { codigo: "11401", modelo: "X-ABERTO (17X16X0)", dimensoes: "34X17", qtdFardo: "500" },
          { codigo: "7134", modelo: "0,5KG (10,5X18X5)", dimensoes: "34X19", qtdFardo: "500" },
          { codigo: "24958", modelo: "01KG-SP (10,5X23X5)", dimensoes: "34X24", qtdFardo: "500" },
          { codigo: "23382", modelo: "01KG-RJ (10,5X27X5)", dimensoes: "34X28", qtdFardo: "500" },
          { codigo: "7012", modelo: "PASTEL M 02 SP(13X27X6)", dimensoes: "40X28", qtdFardo: "500" }
        ]
      },
      {
        id: "saco-lanche-food-branco-antigordura-35",
        number: "05A-2",
        name: "Saco de Lanche Linha Food - Branco Antigordura 35gr",
        description: "Sacos de lanche com estampa temática Food em papel Branco Antigordura 35g/m², ideal para hambúrgueres artesanais, batatas fritas e lanchonetes.",
        image: getCustomImg("saco-lanche-food-branco-antigordura-35", "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Food",
        papel: "Papel Branco Antigordura 35gr",
        tabela: [
          { codigo: "20025", modelo: "FRITAS 01 (7,5X13X5)", dimensoes: "28X14", qtdFardo: "500" },
          { codigo: "20026", modelo: "X-SALADA (10,5X13X5,5)", dimensoes: "34X14", qtdFardo: "500" },
          { codigo: "20027", modelo: "X-LARGO (13X13X6)", dimensoes: "40X14", qtdFardo: "500" },
          { codigo: "20028", modelo: "X-TUDO (13X16X6)", dimensoes: "40X17", qtdFardo: "500" },
          { codigo: "18336", modelo: "X-ABERTO (17X16X0)", dimensoes: "34X17", qtdFardo: "500" },
          { codigo: "20029", modelo: "PASTEL M 02 SP(13X27X6)", dimensoes: "40X28", qtdFardo: "500" }
        ]
      },
      {
        id: "saco-lanche-coelho-branco-antigordura-35",
        number: "05A-3",
        name: "Saco de Lanche Linha Coelho - Branco Antigordura 35gr",
        description: "Sacos de lanche com estampa temática Linha Coelho em papel Branco Antigordura 35g/m², unindo estética divertida e proteção total contra gordura.",
        image: getCustomImg("saco-lanche-coelho-branco-antigordura-35", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Coelho",
        papel: "Papel Branco Antigordura 35gr",
        tabela: [
          { codigo: "11955", modelo: "X-SALADA (10,5X13X5,5)", dimensoes: "34X14", qtdFardo: "500" },
          { codigo: "7512", modelo: "X-LARGO (13X13X6)", dimensoes: "40X14", qtdFardo: "500" },
          { codigo: "9475", modelo: "X-TUDO (13X16X6)", dimensoes: "40X17", qtdFardo: "500" }
        ]
      },
      {
        id: "saco-lanche-pontos-branco-antigordura-35",
        number: "05A-4",
        name: "Saco de Lanche Linha Pontos - Branco Antigordura 35gr",
        description: "Sacos de lanche com padrão gráfico Linha Pontos em papel Branco Antigordura 35g/m², perfeito para lanchonetes modernas e hamburguerias gourmet.",
        image: getCustomImg("saco-lanche-pontos-branco-antigordura-35", "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Pontos",
        papel: "Papel Branco Antigordura 35gr",
        tabela: [
          { codigo: "30102", modelo: "X-SALADA", dimensoes: "34X14", qtdFardo: "500" },
          { codigo: "11808", modelo: "X-SALADA", dimensoes: "34X14", qtdFardo: "500" },
          { codigo: "11807", modelo: "X-LARGO", dimensoes: "40X14", qtdFardo: "500" }
        ]
      },
      {
        id: "saco-lanche-lisa-branco-monolucido-35",
        number: "05A-5",
        name: "Saco de Lanche Linha Lisa - Branco Monolúcido 35gr",
        description: "Sacos de lanche em papel Branco Monolúcido 35g/m² com acabamento higiênico e brilhante, ideais para talheres, pipocas, lanches e pastéis.",
        image: getCustomImg("saco-lanche-lisa-branco-monolucido-35", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Branco Monolúcido 35gr",
        tabela: [
          { codigo: "6334", modelo: "TALHER", dimensoes: "17X28", qtdFardo: "500" },
          { codigo: "11633", modelo: "TALHER", dimensoes: "17X28", qtdFardo: "500" },
          { codigo: "5109", modelo: "PIPOCA 01", dimensoes: "25X14", qtdFardo: "500" },
          { codigo: "23130", modelo: "PIPOCA 01", dimensoes: "25X14", qtdFardo: "500" },
          { codigo: "94", modelo: "PIPOCA 02", dimensoes: "25X17", qtdFardo: "500" },
          { codigo: "17208", modelo: "PIPOCA 03", dimensoes: "25X19", qtdFardo: "500" },
          { codigo: "96", modelo: "X-SALADA", dimensoes: "34X14", qtdFardo: "500" },
          { codigo: "97", modelo: "X-LARGO", dimensoes: "40X14", qtdFardo: "500" },
          { codigo: "98", modelo: "X-TUDO", dimensoes: "40X17", qtdFardo: "500" },
          { codigo: "25670", modelo: "X-GAUCHO 01", dimensoes: "46X17", qtdFardo: "500" },
          { codigo: "25672", modelo: "X-GAUCHO 02", dimensoes: "46X21", qtdFardo: "500" },
          { codigo: "25945", modelo: "X-CAXIAS", dimensoes: "40X21", qtdFardo: "500" },
          { codigo: "25799", modelo: "PASTEL", dimensoes: "40X24", qtdFardo: "500" }
        ]
      }
    ]
  },
  {
    id: "bobinas-papel",
    number: "06",
    name: "Bobinas de Papel",
    description: "Bobinas kraft para equipamentos de embalagem automática e manual.",
    image: getCustomImg("bobinas-papel", "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=600&auto=format&fit=crop"),
    category: "Papel",
    subgroups: [
      {
        id: "bobina-kraft-monolucido-35",
        number: "06A-1",
        name: "Bobina de Papel Linha Lisa - Papel Kraft Monolúcido 35gr",
        description: "Bobinas em papel Kraft Monolúcido 35g/m² com acabamento acetinado de alto padrão, ideal para empacotamento, forração e proteção.",
        image: getCustomImg("bobina-kraft-monolucido-35", "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Kraft Monolúcido 35gr",
        tabela: [
          { codigo: "119", modelo: "40CM", dimensoes: "320MT", qtdFardo: "5KG" },
          { codigo: "120", modelo: "60CM", dimensoes: "320MT", qtdFardo: "7,5KG" }
        ]
      },
      {
        id: "bobina-kraft-monolucido-80",
        number: "06A-2",
        name: "Bobina de Papel Linha Lisa - Papel Kraft Monolúcido 80gr",
        description: "Bobinas de alta resistência mecânica em papel Kraft Monolúcido 80g/m² para embalagens reforçadas, pacotes pesados e proteção logística.",
        image: getCustomImg("bobina-kraft-monolucido-80", "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Kraft Monolúcido 80gr",
        tabela: [
          { codigo: "5173", modelo: "40CM", dimensoes: "140MT", qtdFardo: "5KG" },
          { codigo: "2415", modelo: "60CM", dimensoes: "140MT", qtdFardo: "7,5KG" },
          { codigo: "7682", modelo: "80CM", dimensoes: "140MT", qtdFardo: "10KG" },
          { codigo: "10586", modelo: "100CM", dimensoes: "170MT", qtdFardo: "15KG" },
          { codigo: "11978", modelo: "120CM", dimensoes: "190MT", qtdFardo: "20KG" }
        ]
      },
      {
        id: "bobina-kraft-simples-35",
        number: "06A-3",
        name: "Bobina de Papel Linha Lisa - Papel Kraft Simples 35gr",
        description: "Bobinas em papel Kraft Simples 35g/m² com excelente custo-benefício para empacotamento diário de comércio, proteção e forrações gerais.",
        image: getCustomImg("bobina-kraft-simples-35", "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Kraft Simples 35gr",
        tabela: [
          { codigo: "123", modelo: "40CM", dimensoes: "320MT", qtdFardo: "5KG" },
          { codigo: "124", modelo: "60CM", dimensoes: "320MT", qtdFardo: "7,5KG" }
        ]
      },
      {
        id: "bobina-branco-monolucido-35",
        number: "06A-4",
        name: "Bobina de Papel Linha Lisa - Papel Branco Monolúcido 35gr",
        description: "Bobinas em papel Branco Monolúcido 35g/m² com acabamento sedoso e higiênico para embrulho de alimentos, panificação e presentes.",
        image: getCustomImg("bobina-branco-monolucido-35", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Branco Monolúcido 35gr",
        tabela: [
          { codigo: "132", modelo: "25CM", dimensoes: "300MT", qtdFardo: "3KG" },
          { codigo: "3442", modelo: "40CM", dimensoes: "320MT", qtdFardo: "5KG" },
          { codigo: "6008", modelo: "60CM", dimensoes: "320MT", qtdFardo: "7,5KG" }
        ]
      },
      {
        id: "bobina-branco-monolucido-75",
        number: "06A-5",
        name: "Bobina de Papel Linha Lisa - Papel Branco Monolúcido 75gr",
        description: "Bobinas de alta gramatura em papel Branco Monolúcido 75g/m² para pacotes estruturados, embalagens premium e presentes.",
        image: getCustomImg("bobina-branco-monolucido-75", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Branco Monolúcido 75gr",
        tabela: [
          { codigo: "5174", modelo: "40CM", dimensoes: "150MT", qtdFardo: "5KG" },
          { codigo: "9961", modelo: "60CM", dimensoes: "150MT", qtdFardo: "7,5KG" },
          { codigo: "3444", modelo: "80CM", dimensoes: "150MT", qtdFardo: "10KG" }
        ]
      },
      {
        id: "bobina-cha-branco-monolucido-35",
        number: "06A-6",
        name: "Bobina de Papel Linha Chá - Papel Branco Monolúcido 35gr",
        description: "Bobinas especiais Linha Chá em papel Branco Monolúcido 35g/m², com corte e enrolamento precisos para comércio e mercearias.",
        image: getCustomImg("bobina-cha-branco-monolucido-35", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Chá",
        papel: "Papel Branco Monolúcido 35gr",
        tabela: [
          { codigo: "2400", modelo: "LISA", dimensoes: "40CM", qtdFardo: "320MT" },
          { codigo: "2401", modelo: "LISA", dimensoes: "60CM", qtdFardo: "320MT" }
        ]
      },
      {
        id: "bobina-manteiga-35",
        number: "06A-7",
        name: "Bobina de Papel Linha Lisa - Papel Manteiga 35gr",
        description: "Bobina em papel Manteiga 35g/m² com barreira natural contra gordura e umidade, ideal para panificação, confeitaria e rotisserias.",
        image: getCustomImg("bobina-manteiga-35", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Manteiga 35gr",
        tabela: [
          { codigo: "126", modelo: "33CM", dimensoes: "320MT", qtdFardo: "4KG" }
        ]
      },
      {
        id: "bobina-strong-55",
        number: "06A-8",
        name: "Bobina de Papel Linha Lisa - Papel Strong 55gr",
        description: "Bobina em papel Strong reforçado 55g/m² de extrema resistência à tração e rasgos, para empacotamento seguro de peças e encomendas industriais.",
        image: getCustomImg("bobina-strong-55", "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Lisa",
        papel: "Papel Strong 55gr",
        tabela: [
          { codigo: "7074", modelo: "20CM", dimensoes: "200MT", qtdFardo: "2,5KG" },
          { codigo: "7509", modelo: "40CM", dimensoes: "200MT", qtdFardo: "5KG" },
          { codigo: "7510", modelo: "60CM", dimensoes: "200MT", qtdFardo: "7,5KG" },
          { codigo: "8531", modelo: "80CM", dimensoes: "200MT", qtdFardo: "10KG" }
        ]
      }
    ]
  },
  {
    id: "copos-papel",
    number: "07",
    name: "Copos de Papel",
    description: "Copos descartáveis e ecológicos para bebidas quentes e frias, e tampas plásticas com encaixe vedado.",
    image: getCustomImg("copos-papel", "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"),
    category: "Copos",
    subgroups: [
      {
        id: "copos-papel-kraft",
        number: "07A-1",
        name: "Copos de Papel Kraft",
        description: "Copos descartáveis sustentáveis em papel Kraft para café, chá, sucos e bebidas quentes e frias.",
        image: getCustomImg("copos-papel-kraft", "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"),
        category: "Copos",
        linha: "Kraft",
        papel: "Papel Kraft Para Copos",
        tabela: [
          { codigo: "32073", modelo: "COPO 120ML", dimensoes: "120 ml", qtdFardo: "1000" },
          { codigo: "32075", modelo: "COPO 200ML", dimensoes: "200 ml", qtdFardo: "1000" },
          { codigo: "32077", modelo: "COPO 280ML", dimensoes: "280 ml", qtdFardo: "1000" }
        ]
      },
      {
        id: "copos-papel-branco",
        number: "07A-2",
        name: "Copos de Papel Branco",
        description: "Copos descartáveis higiênicos em papel Branco de alta resistência para bebidas em cafeterias, lanchonetes e eventos.",
        image: getCustomImg("copos-papel-branco", "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"),
        category: "Copos",
        linha: "Branco",
        papel: "Papel Branco Para Copos",
        tabela: [
          { codigo: "32072", modelo: "COPO 120ML", dimensoes: "120 ml", qtdFardo: "1000" },
          { codigo: "32074", modelo: "COPO 200ML", dimensoes: "200 ml", qtdFardo: "1000" },
          { codigo: "32076", modelo: "COPO 280ML", dimensoes: "280 ml", qtdFardo: "1000" },
          { codigo: "32078", modelo: "COPO 400ML", dimensoes: "400 ml", qtdFardo: "1000" }
        ]
      },
      {
        id: "tampas-para-copos",
        number: "07A-3",
        name: "Tampas Para Copos",
        description: "Tampas plásticas sob medida com bico dosador e vedação hermética para copos descartáveis de papel.",
        image: getCustomImg("tampas-para-copos", "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"),
        category: "Copos",
        linha: "Tampas",
        papel: "Plástico PS Virgem",
        tabela: [
          { codigo: "32081", modelo: "TAMPA 120ML", dimensoes: "120 ml", qtdFardo: "1000" },
          { codigo: "32082", modelo: "TAMPA 200ML", dimensoes: "200 ml", qtdFardo: "1000" },
          { codigo: "32083", modelo: "TAMPA 280ML", dimensoes: "280 ml", qtdFardo: "1000" },
          { codigo: "32071", modelo: "TAMPA 400ML", dimensoes: "400 ml", qtdFardo: "1000" }
        ]
      }
    ]
  },
  {
    id: "guardanapos",
    number: "08",
    name: "Guardanapos",
    description: "Guardanapos em diversos formatos: sachê individual, mesa e toalha.",
    image: getCustomImg("guardanapos", "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop"),
    category: "Papel",
    subgroups: [
      {
        id: "guardanapos-sache",
        number: "08A",
        name: "Guardanapo Sachê Individual",
        description: "Embalagem individual higiênica de folha dupla, essencial para delivery.",
        image: getCustomImg("guardanapos-sache", "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Sachê Individual",
        papel: "Seda Extra Macia Folha Dupla",
        tabela: [
          { codigo: "GUA-SA", modelo: "Sachê Duplo", dimensoes: "30 x 30 cm", qtdFardo: "1000 un" }
        ]
      },
      {
        id: "guardanapos-mesa",
        number: "08B",
        name: "Guardanapos de Mesa",
        description: "Guardanapos folha simples ou dupla de alta gramatura para restaurantes e mesa posta.",
        image: getCustomImg("guardanapos-mesa", "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Higiene & Food Service",
        papel: "100% Celulose Virgem Extra Macia",
        tabela: [
          { codigo: "GUA-DE", modelo: "Guardanapo Mesa", dimensoes: "33 x 33 cm", qtdFardo: "500 un" },
          { codigo: "GUA-CO", modelo: "Guardanapo Coquetel", dimensoes: "20 x 20 cm", qtdFardo: "1000 un" }
        ]
      }
    ]
  },
  {
    id: "caixas-lanches-doces",
    number: "09",
    name: "Caixas para Lanches/Doces",
    description: "Caixas estruturadas em kraft para hambúrguer, pizza, hot-dog e confeitaria.",
    image: getCustomImg("caixas-lanches-doces", "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=600&auto=format&fit=crop"),
    category: "Papel",
    subgroups: [
      {
        id: "caixas-hamburguer",
        number: "09A",
        name: "Caixas de Hambúrguer",
        description: "Caixas cartonadas robustas com abas de fechamento perfeito para manter a estrutura e calor do lanche.",
        image: getCustomImg("caixas-hamburguer", "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Caixas Estruturadas",
        papel: "Papel Cartão Duplex 300g/m²",
        tabela: [
          { codigo: "CX-HA", modelo: "Caixa de Hambúrguer", dimensoes: "11 x 11 x 8 cm", qtdFardo: "200 un" }
        ]
      },
      {
        id: "caixas-doces",
        number: "09B",
        name: "Caixas de Doces e Confeitaria",
        description: "Caixas elegantes para doces, salgados e bolos artesanais com visor de acetato.",
        image: getCustomImg("caixas-doces", "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=600&auto=format&fit=crop"),
        category: "Papel",
        linha: "Caixas Confeitaria",
        papel: "Papel Cartão Duplex Alvejado 320g/m²",
        tabela: [
          { codigo: "CX-DO", modelo: "Caixa de Docinhos", dimensoes: "20 x 20 x 6 cm", qtdFardo: "100 un" },
          { codigo: "CX-PI", modelo: "Caixa Pizza Oitavada", dimensoes: "35 x 35 x 4.5 cm", qtdFardo: "50 un" }
        ]
      }
    ]
  },
  {
    id: "embalagens-pet",
    number: "10",
    name: "Embalagens PET",
    description: "Embalagens plásticas transparentes com tampa, ideais para confeitaria, bolos, doces e salgados.",
    image: getCustomImg("embalagens-pet", "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=600&auto=format&fit=crop"),
    category: "Plástico",
    subgroups: [
      {
        id: "pet-boleiras",
        number: "10A",
        name: "Pratos e Boleiras PET",
        description: "Bases brancas ou pretas com tampas transparentes de alta cúpula, perfeitas para exposição em vitrines.",
        image: getCustomImg("pet-boleiras", "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=600&auto=format&fit=crop"),
        category: "Plástico",
        linha: "Confeitaria & Vitrine",
        papel: "PET Ultra Transparente Livre de BPA",
        tabela: [
          { codigo: "PET-64", modelo: "Bolo Alto G-640", dimensoes: "Diâmetro 18cm", qtdFardo: "50 un" }
        ]
      },
      {
        id: "pet-potes",
        number: "10B",
        name: "Potes Multiuso Articulados",
        description: "Potes retangulares com tampa articulada antivazamento, para saladas, doces e porções frias.",
        image: getCustomImg("pet-potes", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop"),
        category: "Plástico",
        linha: "Potes Multiuso",
        papel: "PET Cristal Termoformado",
        tabela: [
          { codigo: "PET-50", modelo: "Pote Doce G-350", dimensoes: "Volume 250ml", qtdFardo: "100 un" },
          { codigo: "PET-12", modelo: "Multiuso Retangular G-12", dimensoes: "16 x 16 x 6 cm", qtdFardo: "100 un" }
        ]
      }
    ]
  },
  {
    id: "embalagens-isopor",
    number: "11",
    name: "Embalagens de Isopor",
    description: "Marmitex e recipientes de isopor para lanches, marmitas e refeições. Leves e térmicos.",
    image: getCustomImg("embalagens-isopor", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop"),
    category: "Isopor",
    subgroups: [
      {
        id: "isopor-marmitex",
        number: "11A",
        name: "Marmitex EPS Redondos",
        description: "Potes térmicos de poliestireno para marmitas quentes e caldos, com excelente fechamento.",
        image: getCustomImg("isopor-marmitex", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop"),
        category: "Isopor",
        linha: "Marmitex Térmico",
        papel: "Poliestireno Expandido (EPS) Térmico",
        tabela: [
          { codigo: "EPS-08", modelo: "Marmitex Nº 8 (P)", dimensoes: "Volume 800ml", qtdFardo: "100 un" },
          { codigo: "EPS-09", modelo: "Marmitex Nº 9 (M)", dimensoes: "Volume 950ml", qtdFardo: "100 un" },
          { codigo: "EPS-10", modelo: "Marmitex Nº 10 (G)", dimensoes: "Volume 1100ml", qtdFardo: "100 un" }
        ]
      }
    ]
  },
  {
    id: "embalagens-aluminio",
    number: "12",
    name: "Embalagens de Alumínio",
    description: "Recipientes de alumínio resistentes ao forno, ideais para pratos quentes, assados e marmitas.",
    image: getCustomImg("embalagens-aluminio", "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=600&auto=format&fit=crop"),
    category: "Alumínio",
    subgroups: [
      {
        id: "aluminio-marmitas",
        number: "12A",
        name: "Marmitas Retangulares de Alumínio",
        description: "Embalagens descartáveis de alumínio com tampa cartonada aluminizada para congelados e pratos prontos.",
        image: getCustomImg("aluminio-marmitas", "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=600&auto=format&fit=crop"),
        category: "Alumínio",
        linha: "Alumínio Forno & Freezer",
        papel: "Alumínio Estampado Reciclável",
        tabela: [
          { codigo: "ALU-D1", modelo: "Retangular D12", dimensoes: "Volume 500ml", qtdFardo: "100 un" },
          { codigo: "ALU-D2", modelo: "Retangular D20", dimensoes: "Volume 750ml", qtdFardo: "100 un" }
        ]
      },
      {
        id: "aluminio-assadeiras",
        number: "12B",
        name: "Assadeiras Grandes de Alumínio",
        description: "Bandejas e assadeiras ovais ou retangulares para carnes e pratos assados volumosos.",
        image: getCustomImg("aluminio-assadeiras", "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=600&auto=format&fit=crop"),
        category: "Alumínio",
        linha: "Assadeiras Profissionais",
        papel: "Alumínio Estampado Reforçado",
        tabela: [
          { codigo: "ALU-22", modelo: "Prato Redondo D22", dimensoes: "Volume 1000ml", qtdFardo: "100 un" },
          { codigo: "ALU-FO", modelo: "Assadeira Grande", dimensoes: "Volume 3000ml", qtdFardo: "50 un" }
        ]
      }
    ]
  },
  {
    id: "descartaveis",
    number: "13",
    name: "Descartáveis",
    description: "Linha completa de descartáveis: pratos, copos, talheres e canudos plásticos.",
    image: getCustomImg("descartaveis", "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop"),
    category: "Outros",
    subgroups: [
      {
        id: "descartaveis-talheres",
        number: "13A",
        name: "Talheres Reforçados PS",
        description: "Garfos, facas e colheres de alta densidade que oferecem firmeza no manuseio de alimentos pesados.",
        image: getCustomImg("descartaveis-talheres", "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop"),
        category: "Outros",
        linha: "Consumo Prático",
        papel: "Poliestireno (PS) Virgem Reforçado",
        tabela: [
          { codigo: "TAL-FO", modelo: "Garfo Reforçado", dimensoes: "Comprimento 18cm", qtdFardo: "1000 un" },
          { codigo: "TAL-FA", modelo: "Faca Reforçada", dimensoes: "Comprimento 19cm", qtdFardo: "1000 un" }
        ]
      },
      {
        id: "descartaveis-pratos",
        number: "13B",
        name: "Pratos Descartáveis Premium",
        description: "Pratos plásticos rasos e fundos com borda reforçada para eventos corporativos e festas.",
        image: getCustomImg("descartaveis-pratos", "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop"),
        category: "Outros",
        linha: "Festas e Eventos",
        papel: "Polímeros PS / PP Alimentícios",
        tabela: [
          { codigo: "PRT-21", modelo: "Prato Plástico Raso", dimensoes: "Diâmetro 21cm", qtdFardo: "500 un" }
        ]
      }
    ]
  },
  {
    id: "sacos-sacolas-plasticas",
    number: "14",
    name: "Sacos e Sacolas Plásticas",
    description: "Sacolas plásticas, sacos e bobinas de filme para varejo, delivery e embalagem automática.",
    image: getCustomImg("sacos-sacolas-plasticas", "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600&auto=format&fit=crop"),
    category: "Plástico",
    subgroups: [
      {
        id: "plasticas-sacolas",
        number: "14A",
        name: "Sacolas Camiseta PEAD",
        description: "Sacolas plásticas tradicionais tipo camiseta, de alta densidade e excelente custo-benefício.",
        image: getCustomImg("plasticas-sacolas", "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=600&auto=format&fit=crop"),
        category: "Plástico",
        linha: "Embalagens Flexíveis",
        papel: "Polietileno de Alta Densidade (PEAD)",
        tabela: [
          { codigo: "SAC-30", modelo: "Sacola Camiseta P", dimensoes: "30 x 40 cm", qtdFardo: "1000 un" },
          { codigo: "SAC-40", modelo: "Sacola Camiseta M", dimensoes: "40 x 50 cm", qtdFardo: "1000 un" },
          { codigo: "SAC-50", modelo: "Sacola Camiseta G", dimensoes: "50 x 60 cm", qtdFardo: "500 un" }
        ]
      }
    ]
  }
];

export const DIFFERENTIALS: Differential[] = [
  {
    number: "01",
    title: "Escalabilidade de Volume",
    description: "Capacidade industrial para atender desde pequenas operações até redes com centenas de lojas, produção escalável sem comprometer prazos.",
    badge: "Capacidade: 10M+ unidades/mês"
  },
  {
    number: "02",
    title: "Personalização com sua Marca",
    description: "Impressão personalizada em serigrafia, flexografia ou off-set, conforme o tipo de material. Sua marca em cada embalagem, com fidelidade de cores e acabamento premium.",
    badge: "Serigrafia / Flexografia / Off-set"
  },
  {
    number: "03",
    title: "Logística Ágil e Nacional",
    description: "Distribuição direta com frota própria e parceiros logísticos estratégicos. Entrega rápida em todo o território nacional.",
    badge: "Cobertura: Brasil Inteiro"
  }
];
