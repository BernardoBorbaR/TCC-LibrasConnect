import { useState, useEffect } from 'react'
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

export const useHandTracking = () => {
  const [handLandmarker, setHandLandmarker] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const createHandLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        )
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/latest1/hand_landmarker.task`,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        })
        setHandLandmarker(landmarker)
        setIsInitialized(true)
        console.log('HandLandmarker inicializado com sucesso.')
      } catch (error) {
        console.error('Erro ao inicializar o HandLandmarker:', error)
      }
    }

    createHandLandmarker()

    // Função de limpeza para fechar o landmarker quando o componente for desmontado
    return () => {
      handLandmarker?.close()
    }
    // O ESLint pode reclamar da dependência 'handLandmarker', mas queremos que isso rode apenas uma vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { handLandmarker, isInitialized }
}