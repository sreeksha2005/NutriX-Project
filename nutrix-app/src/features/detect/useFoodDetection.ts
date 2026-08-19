import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { detectFood } from "@/services/detectionService";
import type { DetectionResult } from "@/types";

/** Owns the pick → analyze → result flow so the screen stays presentational. */
export function useFoodDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = useCallback(async (source: "library" | "camera") => {
    setError(null);
    const permission =
      source === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setError("Permission denied — enable it in your device settings.");
      return;
    }

    const result =
      source === "camera"
        ? await ImagePicker.launchCameraAsync({ quality: 0.7 })
        : await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });

    if (!result.canceled && result.assets[0]) setImage(result.assets[0].uri);
  }, []);

  const analyze = useCallback(async (): Promise<DetectionResult | null> => {
    if (!image) return null;
    setAnalyzing(true);
    setError(null);
    try {
      return await detectFood(image);
    } catch {
      setError("Could not reach the analysis server. Check the API URL in app.json.");
      return null;
    } finally {
      setAnalyzing(false);
    }
  }, [image]);

  const reset = useCallback(() => {
    setImage(null);
    setError(null);
  }, []);

  return { image, analyzing, error, pickImage, analyze, reset };
}
