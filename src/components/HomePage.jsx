import { Link } from 'react-router-dom'
import { Camera, Book, Settings, Hand, Users, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Hand className="w-12 h-12 mr-3" />
            <h1 className="text-4xl font-bold">LibrasConnect</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Conectando mundos através da comunicação. Tradutor de libras completo e 
            intuitivo para facilitar a comunicação entre surdos e ouvintes.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Real Time Translator Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 text-slate-700" />
              <h3 className="text-xl font-semibold mb-2">Tradutor em Tempo Real</h3>
              <p className="text-gray-600 mb-6">
                Traduza seus sinais de libras para texto em tempo real
              </p>
              <Link to="/translator">
                <Button className="w-full bg-slate-800 hover:bg-slate-700">
                  Acessar
                </Button>
              </Link>
            </div>
          </div>

          {/* Dictionary Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <Book className="w-16 h-16 mx-auto mb-4 text-slate-700" />
              <h3 className="text-xl font-semibold mb-2">Dicionário de Libras</h3>
              <p className="text-gray-600 mb-6">
                Explore e aprenda novos sinais de libras
              </p>
              {/* --- MODIFICAÇÃO AQUI --- */}
              <Link to="/dictionary">
                <Button className="w-full bg-slate-800 hover:bg-slate-700">
                  Acessar
                </Button>
              </Link>
              {/* --- FIM DA MODIFICAÇÃO --- */}
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <Settings className="w-16 h-16 mx-auto mb-4 text-slate-700" />
              <h3 className="text-xl font-semibold mb-2">Configurações</h3>
              <p className="text-gray-600 mb-6">
                Ajustes de acessibilidade e preferências
              </p>
              {/* --- MODIFICAÇÃO AQUI --- */}
              <Link to="/settings">
                <Button className="w-full bg-slate-800 hover:bg-slate-700">
                  Acessar
                </Button>
              </Link>
              {/* --- FIM DA MODIFICAÇÃO --- */}
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Por que escolher o LibrasConnect?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Real Time Translation */}
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <Hand className="w-16 h-16 mx-auto mb-4 text-slate-700" />
              <h3 className="text-xl font-semibold mb-4">Tradução em Tempo Real</h3>
              <p className="text-gray-600">
                Tecnologia avançada para detectar e traduzir sinais de 
                libras instantaneamente usando sua câmera frontal.
              </p>
            </div>

            {/* Inclusive Communication */}
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <Users className="w-16 h-16 mx-auto mb-4 text-slate-700" />
              <h3 className="text-xl font-semibold mb-4">Comunicação Inclusiva</h3>
              <p className="text-gray-600">
                Quebra barreiras de comunicação, permitindo 
                conversas fluidas entre pessoas surdas e ouvintes.
              </p>
            </div>

            {/* Totally Free */}
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <Heart className="w-16 h-16 mx-auto mb-4 text-slate-700" />
              <h3 className="text-xl font-semibold mb-4">Totalmente Gratuito</h3>
              <p className="text-gray-600">
                Acesso completo e gratuito a todas as 
                funcionalidades. Nossa missão é democratizar a 
                comunicação.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Site construído para ajudar a comunidade surda
          </h3>
          <p className="text-slate-300">
            LibrasConnect - Conectando mundos através da comunicação acessível
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage