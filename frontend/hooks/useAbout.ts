import { useState, useEffect } from "react";
import { getAboutData, AboutData } from "@/services/api";

export function useAbout() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    getAboutData()
      .then((data) => {
        if (active) {
          setAboutData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { aboutData, loading, error };
}
