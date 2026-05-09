import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface EschangeInfoProm{
  to:string,
  from:string,
  amount:string,
  rate:number,
  result:number
}


type CurrencyState = {
  exchangeInfo: EschangeInfoProm | null
  baseCurrency: string;
  hasHydrated: boolean;
  isLoading: boolean;
  isError:boolean;
  setIsLoading:(loading: boolean)=> void;
  setIsError:(error:boolean)=> void;
  setHasHydrated: (state: boolean) => void;
  setBaseCurrency: (currency: string) => void;
  setExchangeInfo:(info:EschangeInfoProm | null) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      hasHydrated: false,
      exchangeInfo: null,
      isLoading:false,
      isError:false,
      setIsLoading:(loading)=>set({isLoading: loading}),
      setIsError:(error)=>set({isError: error}),
      setExchangeInfo: (info) => set({ exchangeInfo: info}),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
