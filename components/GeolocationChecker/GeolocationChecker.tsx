'use client';

import { useEffect } from 'react';

import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const setCurrency = useCurrencyStore((state) => state.setBaseCurrency);
  const hasHydrated = useCurrencyStore((state) => state.hasHydrated);
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);

  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      const data = await getUserInfo(coords);
      setCurrency(data.results[0].annotations.currency.iso_code);
      return data.results[0].annotations.currency.iso_code;
    };

    const error = () => {
      setCurrency('USD');
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [setCurrency, hasHydrated, baseCurrency]);

  return null;
}
