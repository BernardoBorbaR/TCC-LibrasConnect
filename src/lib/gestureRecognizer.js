// Pontos de referência (landmarks) da mão do MediaPipe
// https://developers.google.com/mediapipe/solutions/vision/hand_landmarker#hand_landmarks
const HandLandmarks = {
  WRIST: 0,
  THUMB_CMC: 1,
  THUMB_MCP: 2,
  THUMB_IP: 3,
  THUMB_TIP: 4,
  INDEX_FINGER_MCP: 5,
  INDEX_FINGER_PIP: 6,
  INDEX_FINGER_DIP: 7,
  INDEX_FINGER_TIP: 8,
  MIDDLE_FINGER_MCP: 9,
  MIDDLE_FINGER_PIP: 10,
  MIDDLE_FINGER_DIP: 11,
  MIDDLE_FINGER_TIP: 12,
  RING_FINGER_MCP: 13,
  RING_FINGER_PIP: 14,
  RING_FINGER_DIP: 15,
  RING_FINGER_TIP: 16,
  PINKY_MCP: 17,
  PINKY_PIP: 18,
  PINKY_DIP: 19,
  PINKY_TIP: 20,
};

/**
 * Reconhece o gesto de "Polegar para Cima" (👍).
 * @param {Array} landmarks - Array com os 21 pontos de referência da mão.
 * @returns {string|null} - Retorna "Polegar para Cima!" se o gesto for detectado, senão null.
 */
export function recognizeThumbsUp(landmarks) {
  if (!landmarks || landmarks.length === 0) {
    return null;
  }

  // Condição 1: A ponta do polegar está acima da base do polegar e da articulação do indicador.
  const isThumbUp =
    landmarks[HandLandmarks.THUMB_TIP].y < landmarks[HandLandmarks.THUMB_IP].y &&
    landmarks[HandLandmarks.THUMB_TIP].y < landmarks[HandLandmarks.INDEX_FINGER_MCP].y;

  // Condição 2: Os outros quatro dedos estão dobrados (suas pontas estão abaixo de suas articulações do meio).
  const areFingersDown =
    landmarks[HandLandmarks.INDEX_FINGER_TIP].y > landmarks[HandLandmarks.INDEX_FINGER_PIP].y &&
    landmarks[HandLandmarks.MIDDLE_FINGER_TIP].y > landmarks[HandLandmarks.MIDDLE_FINGER_PIP].y &&
    landmarks[HandLandmarks.RING_FINGER_TIP].y > landmarks[HandLandmarks.RING_FINGER_PIP].y &&
    landmarks[HandLandmarks.PINKY_TIP].y > landmarks[HandLandmarks.PINKY_PIP].y;

  if (isThumbUp && areFingersDown) {
    return "Polegar para Cima!";
  }

  return null;
}