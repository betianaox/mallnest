import { useEffect, useState, type DependencyList } from 'react';

/** Carga datos de un servicio asíncrono (hoy mock, después AWS o Shopify). */
export function useAsync<T>(
  load: () => Promise<T>,
  deps: DependencyList,
): { data: T | undefined; loading: boolean } {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    load().then((result) => {
      if (active) {
        setData(result);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading };
}
