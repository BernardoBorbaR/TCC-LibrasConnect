import { useState, useEffect } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export const useHandGestureRecognition = () => {
  const [handLandmarker, setHandLandmarker] = useState(null);
  const [detectedGesture, setDetectedGesture] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeHandLandmarker = async () => {
      try {
        // --- MODIFICAÇÃO AQUI ---
        // Carrega os arquivos necessários para o modelo de visão
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        );

        // Cria e configura o detector de mãos
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/latest/hand_landmarker.task`,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO', // Essencial para processar streams de vídeo
          numHands: 1, // Vamos detectar apenas uma mão para começar
        });

        setHandLandmarker(landmarker);
        console.log('HandLandmarker inicializado com sucesso!');
        // --- FIM DA MODIFICAÇÃO ---
      } catch (e) {
        console.error('Erro ao inicializar o HandLandmarker:', e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    initializeHandLandmarker();

    // Função de limpeza para descarregar o modelo quando o componente for desmontado
    return () => {
      handLandmarker?.close();
    };
  }, []); // O array vazio garante que isso rode apenas uma vez

  // Por enquanto, vamos retornar apenas o estado. As funções de detecção virão no próximo passo.
  return { detectedGesture, loading, error };
};