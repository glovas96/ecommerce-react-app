import { useEffect, useState } from 'react';

import {
  loadPopularHighlights,
  loadLatestHighlights,
  loadDiscountHighlights,
} from '@/entities/home/services/homeService';

// Hook for fetching various highlight collections
export const useHomeHighlights = () => {
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        setError(err);
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
