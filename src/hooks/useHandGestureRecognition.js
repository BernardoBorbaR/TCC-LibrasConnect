import { useState, useEffect, useRef, useCallback } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export const useHandGestureRecognition = () => {
  const [handLandmarker, setHandLandmarker] = useState(null);
  const [detectedGesture, setDetectedGesture] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestRef = useRef();

  useEffect(() => {
    const initializeHandLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );

        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: 'CPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        });

        setHandLandmarker(landmarker);
        console.log('HandLandmarker inicializado com sucesso!');
      } catch (e) {
        console.error('Erro detalhado ao inicializar o HandLandmarker:', e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    initializeHandLandmarker();

    return () => {
      handLandmarker?.close();
    };
  }, []);

  const recognizeGesture = (landmarks) => {
    if (!landmarks || landmarks.length === 0) {
      return '';
    }
    const hand = landmarks[0];

    // --- INÍCIO DAS MODIFICAÇÕES ---
    // Adicionamos os gestos mais específicos primeiro para evitar conflitos.

    // Lógica para "Eu te amo" (I Love You)
    // Polegar (4), Indicador (8) e Mínimo (20) esticados.
    // Médio (12) e Anelar (16) dobrados.
    const isILY =
      hand[4].y < hand[3].y &&   // Polegar para cima
      hand[8].y < hand[6].y &&   // Indicador esticado
      hand[20].y < hand[18].y && // Mínimo esticado
      hand[12].y > hand[10].y && // Médio dobrado
      hand[16].y > hand[14].y;  // Anelar dobrado
    if (isILY) return 'Eu te amo';

    // Lógica para "Paz" (Peace)
    // Indicador (8) e Médio (12) esticados.
    // Anelar (16) e Mínimo (20) dobrados.
    const isPeace =
      hand[8].y < hand[6].y &&   // Indicador esticado
      hand[12].y < hand[10].y && // Médio esticado
      hand[16].y > hand[14].y && // Anelar dobrado
      hand[20].y > hand[18].y;  // Mínimo dobrado
    if (isPeace) return 'Paz';

    // Lógica para "OK"
    // Polegar (4) e Indicador (8) se tocam, formando um círculo.
    // Outros dedos esticados.
    const thumbTip = hand[4];
    const indexTip = hand[8];
    const distance = Math.sqrt(
      Math.pow(thumbTip.x - indexTip.x, 2) + Math.pow(thumbTip.y - indexTip.y, 2)
    );
    const isOk =
      distance < 0.07 && // Limiar de distância para o círculo (ajustável)
      hand[12].y < hand[10].y && // Médio esticado
      hand[16].y < hand[14].y && // Anelar esticado
      hand[20].y < hand[18].y;  // Mínimo esticado
    if (isOk) return 'OK';

    // --- FIM DAS MODIFICAÇÕES ---

    // Lógica para "Polegar para Cima"
    const isThumbsUp =
      hand[4].y < hand[3].y && hand[4].y < hand[2].y &&
      hand[8].y > hand[6].y &&
      hand[12].y > hand[10].y &&
      hand[16].y > hand[14].y &&
      hand[20].y > hand[18].y;
    if (isThumbsUp) return 'Polegar para Cima';

    // Lógica para "Mão Aberta"
    const isOpenHand =
      hand[4].x < hand[5].x &&
      hand[8].y < hand[6].y &&
      hand[12].y < hand[10].y &&
      hand[16].y < hand[14].y &&
      hand[20].y < hand[18].y;
    if (isOpenHand) return 'Mão Aberta';

    return '';
  };

  const stopPrediction = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      setDetectedGesture('');
    }
  }, []);

  const predictWebcam = useCallback((video) => {
    if (!handLandmarker || !video) return;

    const animate = () => {
      if (video.readyState >= 2) {
        const startTimeMs = performance.now();
        const results = handLandmarker.detectForVideo(video, startTimeMs);

        if (results.landmarks && results.landmarks.length > 0) {
          const gesture = recognizeGesture(results.landmarks);
          setDetectedGesture(gesture);
        } else {
          setDetectedGesture('');
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
  }, [handLandmarker]);

  return { detectedGesture, loading, error, predictWebcam, stopPrediction };
};