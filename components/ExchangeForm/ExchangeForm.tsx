'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import React from 'react';
import { useCurrencyStore } from '@/lib/stores/currencyStore';


export default function ExchangeForm() {
  const setIsLoading = useCurrencyStore(state => state.setIsLoading)
  const setIsError = useCurrencyStore(state => state.setIsError)
  const setExchangeInfo = useCurrencyStore(state => state.setExchangeInfo)
  const handleInput= async (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input = formData.get("currency") as string;
    const [amount, from, , to] = input.split(" ")
    
    
  try{
    setExchangeInfo(null)
    setIsError(false)
    setIsLoading(true)
    const data = await  exchangeCurrency({amount, from, to})
    if(data){
      setExchangeInfo(data)
    }
  }
  catch{
    setIsError(true)
  }finally{
    setIsLoading(false)
  }
  }
  
  
  return (
    <form className={styles.form} onSubmit={handleInput}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
