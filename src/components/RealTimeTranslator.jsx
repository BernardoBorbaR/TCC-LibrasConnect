import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Camera, Volume2, Trash2, LoaderCircle, Hand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useHandGestureRecognition } from '@/hooks/useHandGestureRecognition'
import { signs } from '@/data/signs'

const detectableSignNames = [
  'Eu te amo',
  'Paz',
  'OK',
  'Polegar para Cima',
  'Mão Aberta',
]

const detectableSigns = signs.filter(sign => detectableSignNames.includes(sign.word))
if (!detectableSigns.find(s => s.word === 'Polegar para Cima')) {
  detectableSigns.push({
    id: 998,
    word: 'Polegar para Cima',
    instructions: ['Levante o polegar', 'Mantenha os outros dedos fechados']
  })
}
if (!detectableSigns.find(s => s.word === 'Mão Aberta')) {
  detectableSigns.push({
    id: 999,
    word: 'Mão Aberta',
    instructions: ['Abra a mão completamente', 'Mantenha os dedos esticados e separados']
  })
}

const RealTimeTranslator = () => {
  const [isDetecting, setIsDetecting] = useState(false)
  const [translatedText, setTranslatedText] = useState('Aponte a câmera para sua mão para começar.')
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  // --- MODIFICAÇÃO 1: Adicionar um useRef para o timeout ---
  const gestureTimeoutRef = useRef(null)

  const { detectedGesture, loading, error, predictWebcam, stopPrediction } = useHandGestureRecognition();

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
        videoRef.current.onloadedmetadata = () => {
          predictWebcam(videoRef.current);
        };
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error)
      alert('Não foi possível acessar a câmera. Verifique as permissões.')
    }
  }

  const stopCamera = () => {
    stopPrediction();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsCameraActive(false)
      setIsDetecting(false)
    }
    // Limpa qualquer timeout pendente ao parar a câmera
    if (gestureTimeoutRef.current) {
      clearTimeout(gestureTimeoutRef.current)
    }
  }

  const handleDetectionClick = () => {
    if (isDetecting) {
      stopCamera();
    } else {
      setIsDetecting(true);
      startCamera();
    }
  }

  const clearText = () => {
    setTranslatedText('Aponte a câmera para sua mão para começar.')
    if (gestureTimeoutRef.current) {
      clearTimeout(gestureTimeoutRef.current)
    }
  }

  const speakText = () => {
    const textToSpeak = translatedText.replace(/👍|✋/g, '').trim();
    if ('speechSynthesis' in window && textToSpeak && textToSpeak !== 'Carregando sinal...') {
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.lang = 'pt-BR'
      speechSynthesis.speak(utterance)
    }
  }

  // --- MODIFICAÇÃO 2: Lógica de exibição com delay ---
  useEffect(() => {
    // Limpa o timeout anterior sempre que um novo gesto é detectado ou a detecção para.
    // Isso evita que um gesto antigo apareça após um novo ser detectado.
    if (gestureTimeoutRef.current) {
      clearTimeout(gestureTimeoutRef.current)
    }

    if (isDetecting) {
      if (detectedGesture) {
        // 1. Mostra a mensagem de carregamento imediatamente
        setTranslatedText('Carregando sinal...')

        // 2. Define um timeout para mostrar o resultado após 2 segundos
        gestureTimeoutRef.current = setTimeout(() => {
          setTranslatedText(detectedGesture)
        }, 1000) // 2000ms = 2 segundos
      } else {
        // Se nenhum gesto for detectado, mostra o placeholder
        setTranslatedText('...')
      }
    } else {
      // Se a detecção não estiver ativa, mostra a mensagem inicial
      setTranslatedText('Aponte a câmera para sua mão para começar.')
    }

    // Função de limpeza para o useEffect: garante que o timeout seja limpo
    // se o componente for desmontado.
    return () => {
      if (gestureTimeoutRef.current) {
        clearTimeout(gestureTimeoutRef.current)
      }
    }
  }, [detectedGesture, isDetecting]) // O efeito é re-executado quando o gesto ou o estado de detecção mudam

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
          <Link to="/" className="flex items-center text-foreground hover:text-foreground/80">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-center flex-1 text-foreground">Tradutor em Tempo Real</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Câmera Frontal</h2>
            
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
              onClick={handleDetectionClick}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Camera className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Carregando IA...' : (isDetecting ? 'Parar Detecção' : 'Iniciar Detecção')}
            </Button>
            {error && <p className="text-destructive text-sm mt-2">Erro ao carregar modelo de IA.</p>}
          </div>

          {/* Translation Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Texto Traduzido</h2>
            
            {/* --- MODIFICAÇÃO 3: Melhoria visual para o estado de carregamento --- */}
            <div className="bg-muted rounded-lg p-4 min-h-32 mb-4 flex items-center justify-center">
              {translatedText === 'Carregando sinal...' ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                  <span>{translatedText}</span>
                </div>
              ) : (
                <p className="text-muted-foreground text-center">{translatedText}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={clearText}
                variant="outline"
                className="flex-1 text-foreground"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
              <Button 
                onClick={speakText}
                variant="outline"
                className="flex-1 text-foreground"
                disabled={!translatedText || translatedText.startsWith('Aponte') || translatedText === '...' || translatedText === 'Carregando sinal...'}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Falar Texto
              </Button>
            </div>
          </div>
        </div>

        {/* Sinais Reconhecidos Atualmente */}
        <div className="mt-8 bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center mb-4">
            <Hand className="w-5 h-5 mr-3 text-foreground" />
            <h3 className="text-lg font-semibold text-card-foreground">Sinais Reconhecidos Atualmente</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            A versão atual do nosso tradutor pode reconhecer os seguintes sinais estáticos. Faça-os de forma clara em frente à câmera.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {detectableSigns.map(sign => (
              <div key={sign.id} className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold text-foreground mb-2">{sign.word}</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  {sign.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">Como usar:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Clique em "Iniciar Detecção" para ligar a câmera e começar o reconhecimento.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Posicione-se de frente para a câmera com boa iluminação.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              Faça um dos sinais listados acima de forma clara e pausada.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              O texto traduzido aparecerá em tempo real na tela.
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default RealTimeTranslator