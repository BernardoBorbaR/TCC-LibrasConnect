import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signs } from '@/data/signs'

const LibrasDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todas')

  const categories = useMemo(() => {
    const allCategories = signs.map(sign => sign.category)
    return ['Todas', ...new Set(allCategories)]
  }, [])

  const filteredSigns = signs.filter(sign => {
    const matchesSearch = sign.word.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'Todas' || sign.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1 text-foreground">Dicionário de Libras</h1>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-card border-b border-border p-4">
        <div className="container mx-auto">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
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
                className={activeCategory !== category ? "text-foreground" : ""}
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
            <div key={sign.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-1 text-card-foreground">{sign.word}</h3>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  {sign.category}
                </span>
              </div>
              
              <p className="text-muted-foreground mb-4">{sign.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-card-foreground">Como fazer:</h4>
                <ol className="text-sm text-muted-foreground space-y-1">
                  {sign.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="font-semibold mr-2">{index + 1}.</span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
              
              {/* --- MODIFICAÇÃO AQUI --- */}
              <Button variant="outline" className="w-full text-foreground">
                <Play className="w-4 h-4 mr-2" />
                Ver Demonstração
                <span className="text-xs ml-2 text-muted-foreground">(Em breve)</span>
              </Button>
              {/* --- FIM DA MODIFICAÇÃO --- */}
            </div>
          ))}
        </div>

        {filteredSigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum sinal encontrado para "{searchTerm}"</p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">Estatísticas do Dicionário</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground">{signs.length}</div>
              <div className="text-sm text-muted-foreground">Total de Sinais</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{filteredSigns.length}</div>
              <div className="text-sm text-muted-foreground">Resultados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Gratuito</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LibrasDictionary