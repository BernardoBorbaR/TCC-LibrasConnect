// src/data/signs.js

export const signs = [
  // ... (todos os 100 sinais existentes)
  {
    id: 100,
    word: 'Roxo',
    category: 'Cores',
    description: 'Cor secundária',
    instructions: [
      'Faça a letra "R" e balance-a',
    ],
  },

  // --- INÍCIO DAS MODIFICAÇÕES ---
  // Nova categoria: Expressões (101-103)
  {
    id: 101,
    word: 'Eu te amo',
    category: 'Expressões',
    description: 'Sinal universal para "Eu te amo"',
    instructions: [
      'Levante o dedo polegar (letra "I" em ASL)',
      'Levante o dedo indicador (letra "L" em ASL)',
      'Levante o dedo mínimo (letra "Y" em ASL)',
      'Mantenha os dedos médio e anelar abaixados',
    ],
  },
  {
    id: 102,
    word: 'OK',
    category: 'Expressões',
    description: 'Sinal para indicar que está tudo bem ou correto',
    instructions: [
      'Forme um círculo com o dedo indicador e o polegar',
      'Mantenha os outros três dedos esticados para cima',
      'A palma da mão pode estar voltada para frente',
    ],
  },
  {
    id: 103,
    word: 'Paz',
    category: 'Expressões',
    description: 'Sinal universal para "Paz"',
    instructions: [
      'Levante os dedos indicador e médio, formando um "V"',
      'Mantenha os outros dedos abaixados, segurados pelo polegar',
      'A palma da mão pode estar voltada para frente ou para trás',
    ],
  },
  // --- FIM DAS MODIFICAÇÕES ---
];