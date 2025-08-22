import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const LibrasDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todas')

  const categories = ['Todas', 'Cumprimentos', 'Necessidades', 'Respostas', 'Lugares']

  const signs = [
    {
      id: 1,
      word: 'Olá',
      category: 'Cumprimentos',
      description: 'Saudação básica em libras',
      instructions: [
        'Levante a mão direita na altura do ombro',
        'Mantenha a palma voltada para frente',
        'Balance suavemente de um lado para o outro'
      ]
    },
    {
      id: 2,
      word: 'Obrigado',
      category: 'Cumprimentos',
      description: 'Expressão de gratidão',
      instructions: [
        'Coloque a mão direita no peito',
        'Mova a mão para frente em direção à pessoa',
        'Mantenha a palma voltada para cima'
      ]
    },
    {
      id: 3,
      word: 'Por favor',
      category: 'Cumprimentos',
      description: 'Pedido educado',
      instructions: [
        'Una as duas mãos em posição de oração',
        'Mova as mãos para frente e para baixo',
        'Mantenha expressão facial educada'
      ]
    },
    {
      id: 4,
      word: 'Desculpa',
      category: 'Cumprimentos',
      description: 'Pedido de desculpas',
      instructions: [
        'Coloque a mão direita na testa',
        'Mova a mão para baixo até o queixo',
        'Expressão facial de arrependimento'
      ]
    },
    {
      id: 5,
      word: 'Água',
      category: 'Necessidades',
      description: 'Sinal para água',
      instructions: [
        'Forme a letra \'A\' com a mão direita',
        'Leve a mão até a boca',
        'Faça movimento como se estivesse bebendo'
      ]
    },
    {
      id: 6,
      word: 'Comer',
      category: 'Necessidades',
      description: 'Ação de comer',
      instructions: [
        'Junte os dedos da mão direita',
        'Leve a mão até a boca repetidamente',
        'Simule o movimento de comer'
      ]
    },
    {
      id: 7,
      word: 'Ajuda',
      category: 'Necessidades',
      description: 'Pedido de auxílio',
      instructions: [
        'Coloque a mão direita sobre a esquerda',
        'Levante ambas as mãos',
        'Expressão facial de necessidade'
      ]
    },
    {
      id: 8,
      word: 'Sim',
      category: 'Respostas',
      description: 'Resposta afirmativa',
      instructions: [
        'Forme punho com a mão direita',
        'Balance para cima e para baixo',
        'Como um aceno de cabeça com a mão'
      ]
    },
    {
      id: 9,
      word: 'Não',
      category: 'Respostas',
      description: 'Resposta negativa',
      instructions: [
        'Estenda o dedo indicador',
        'Balance de um lado para o outro',
        'Expressão facial negativa'
      ]
    },
    {
      id: 10,
      word: 'Casa',
      category: 'Lugares',
      description: 'Local de moradia',
      instructions: [
        'Forme um triângulo com as duas mãos',
        'Coloque as pontas dos dedos juntas',
        'Simule o telhado de uma casa'
      ]
    }
  ]

  const filteredSigns = signs.filter(sign => {
    const matchesSearch = sign.word.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'Todas' || sign.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1">Dicionário de Libras</h1>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar sinais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-slate-800 hover:bg-slate-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Signs Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSigns.map(sign => (
            <div key={sign.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-1">{sign.word}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {sign.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{sign.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Como fazer:</h4>
                <ol className="text-sm text-gray-600 space-y-1">
                  {sign.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="font-semibold mr-2">{index + 1}.</span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
              
              <Button variant="outline" className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Ver Demonstração
                <span className="text-xs ml-2 text-gray-500">(Em breve)</span>
              </Button>
            </div>
          ))}
        </div>

        {filteredSigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum sinal encontrado para "{searchTerm}"</p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Estatísticas do Dicionário</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-800">10</div>
              <div className="text-sm text-gray-600">Total de Sinais</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-800">4</div>
              <div className="text-sm text-gray-600">Categorias</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-800">10</div>
              <div className="text-sm text-gray-600">Resultados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-800">100%</div>
              <div className="text-sm text-gray-600">Gratuito</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LibrasDictionary

