import { useEffect, useState } from 'react';

import {
  loadPopularHighlights,
  loadLatestHighlights,
  loadDiscountHighlights,
} from '@/entities/home/services/homeService';
import type { HomeHighlightsState, HighlightProductList } from '@/entities/home/types';

// Hook for fetching various highlight collections
export const useHomeHighlights = (): HomeHighlightsState => {
  const [popular, setPopular] = useState<HighlightProductList>([]);
  const [latest, setLatest] = useState<HighlightProductList>([]);
  const [discounts, setDiscounts] = useState<HighlightProductList>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchHighlights = async () => {
      setLoading(true);
      try {
        const [pop, lat, disc] = await Promise.all([
          loadPopularHighlights(),
          loadLatestHighlights(),
          loadDiscountHighlights(),
        ]);
        if (!active) return;
        setPopular(pop);
        setLatest(lat);
        setDiscounts(disc);
        setError(null);
      } catch (err) {
        if (!active) return;
        const message = err instanceof Error ? err.message : 'Unable to load highlights';
        setError(message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchHighlights();

    return () => {
      // Cancel state updates if component unmounts early
      active = false;
    };
  }, []);

  return { popular, latest, discounts, loading, error };
};
