import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Camera, Volume2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const RealTimeTranslator = () => {
  const [isDetecting, setIsDetecting] = useState(false)
  const [translatedText, setTranslatedText] = useState('O texto traduzido aparecerá aqui...')
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error)
      alert('Não foi possível acessar a câmera. Verifique as permissões.')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsCameraActive(false)
      setIsDetecting(false)
    }
  }

  const startDetection = () => {
    if (!isCameraActive) {
      startCamera()
    }
    setIsDetecting(true)
    // Simulação de detecção - em uma implementação real, aqui seria integrada a IA
    setTimeout(() => {
      setTranslatedText('Olá! Como você está?')
    }, 2000)
  }

  const clearText = () => {
    setTranslatedText('O texto traduzido aparecerá aqui...')
  }

  const speakText = () => {
    if ('speechSynthesis' in window && translatedText !== 'O texto traduzido aparecerá aqui...') {
      const utterance = new SpeechSynthesisUtterance(translatedText)
      utterance.lang = 'pt-BR'
      speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1">Tradutor em Tempo Real</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Câmera Frontal</h2>
            
            <div className="relative bg-black rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
              {!isCameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <Camera className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            <Button 
              onClick={startDetection}
              disabled={isDetecting}
              className="w-full"
            >
              <Camera className="w-4 h-4 mr-2" />
              {isDetecting ? 'Detectando...' : 'Iniciar Detecção'}
            </Button>
          </div>

          {/* Translation Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Texto Traduzido</h2>
            
            <div className="bg-muted rounded-lg p-4 min-h-32 mb-4">
              <p className="text-muted-foreground">{translatedText}</p>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={clearText}
                variant="outline"
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
              <Button 
                onClick={speakText}
                variant="outline"
                className="flex-1"
                disabled={translatedText === 'O texto traduzido aparecerá aqui...'}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Falar Texto
              </Button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Como usar:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              A detecção de sinais funciona automaticamente com a câmera ativada
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Posicione-se de frente para a câmera com boa iluminação
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Faça os sinais de libras de forma clara e pausada
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              O texto traduzido aparecerá em tempo real na tela
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Use "Falar Texto" para reproduzir o áudio da tradução
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Clique em "Iniciar Detecção" para começar o reconhecimento
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default RealTimeTranslator