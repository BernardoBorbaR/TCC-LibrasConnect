# LibrasConnect

Um site React com TypeScript que replica o design e funcionalidades do LibrasConnect, incluindo acesso à câmera para tradução de libras em tempo real.

## 🚀 Funcionalidades

- **Tradutor em Tempo Real**: Interface para captura de vídeo da câmera e simulação de tradução de libras
- **Dicionário de Libras**: Catálogo completo com 10 sinais organizados por categorias
- **Configurações de Acessibilidade**: Controles para modo escuro, alto contraste, tamanho de texto e gestos
- **Interface Responsiva**: Design adaptável para desktop e dispositivos móveis
- **Navegação Intuitiva**: Roteamento entre páginas com React Router

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca para construção da interface
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **React Router DOM** - Roteamento de páginas
- **Vite** - Bundler e servidor de desenvolvimento

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Passos para executar

1. **Clone ou acesse o diretório do projeto**
   ```bash
   cd libras-connect
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   pnpm run dev --host
   # ou
   npm run dev -- --host
   ```

4. **Acesse no navegador**
   - Local: http://localhost:5174
   - Rede: http://[seu-ip]:5174

## 📱 Páginas e Funcionalidades

### Página Inicial (/)
- Header com logo e descrição do projeto
- Cards de navegação para as principais funcionalidades
- Seção "Por que escolher o LibrasConnect?"
- Footer informativo

### Tradutor em Tempo Real (/translator)
- Interface de captura de vídeo da câmera frontal
- Área de exibição do texto traduzido
- Botões para iniciar detecção, limpar texto e reproduzir áudio
- Instruções de uso detalhadas

### Dicionário de Libras (/dictionary)
- Busca por sinais de libras
- Filtros por categoria (Cumprimentos, Necessidades, Respostas, Lugares)
- Cards com instruções passo a passo para cada sinal
- Estatísticas do dicionário

### Configurações (/settings)
- **Acessibilidade Visual**: Modo escuro, alto contraste, texto grande, tamanho dos gestos
- **Configurações de Áudio**: Feedback de áudio, velocidade da fala, vibração
- **Configurações da Câmera**: Qualidade de vídeo
- Botões para salvar e restaurar configurações

## 🎯 Funcionalidades Implementadas

### Acesso à Câmera
- Solicitação de permissão para usar a câmera frontal
- Exibição do feed de vídeo em tempo real
- Tratamento de erros de acesso à câmera

### Síntese de Voz
- Reprodução de texto em áudio usando Web Speech API
- Controle de velocidade da fala
- Suporte ao idioma português brasileiro

### Responsividade
- Layout adaptável para diferentes tamanhos de tela
- Grid responsivo para cards e componentes
- Navegação otimizada para dispositivos móveis

### Acessibilidade
- Controles de acessibilidade visual
- Feedback tátil (vibração) em dispositivos móveis
- Configurações de áudio personalizáveis

## 🔧 Estrutura do Projeto

```
libras-connect/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx          # Página inicial
│   │   ├── RealTimeTranslator.jsx # Tradutor em tempo real
│   │   ├── LibrasDictionary.jsx   # Dicionário de libras
│   │   └── Settings.jsx           # Configurações
│   ├── App.jsx                    # Componente principal com roteamento
│   ├── App.css                    # Estilos globais
│   └── main.jsx                   # Ponto de entrada
├── public/                        # Arquivos estáticos
├── package.json                   # Dependências e scripts
└── README.md                      # Documentação
```

## 🎨 Design

O design replica fielmente as imagens fornecidas, incluindo:
- Paleta de cores com tons de azul escuro (slate-800) e cinza
- Tipografia clara e legível
- Ícones consistentes da biblioteca Lucide
- Layout em cards com bordas arredondadas
- Hover effects e transições suaves

## 🚧 Limitações Atuais

- **Tradução de Libras**: A funcionalidade de tradução é simulada (não há IA real implementada)
- **Demonstrações de Sinais**: Os vídeos de demonstração estão marcados como "Em breve"
- **Persistência**: As configurações não são salvas permanentemente (apenas durante a sessão)

## 🔮 Possíveis Melhorias Futuras

- Integração com IA para tradução real de libras
- Vídeos demonstrativos para cada sinal do dicionário
- Persistência de configurações em localStorage
- Mais sinais no dicionário
- Modo offline com Service Workers
- Testes automatizados

## 📄 Licença

Este projeto foi desenvolvido como uma demonstração técnica e replica o design do LibrasConnect original.

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

---

**Desenvolvido com ❤️ para a comunidade surda**

# TCC-LibrasConnect
