import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { ChildrenProps } from '../types';
import { getUsers } from '../api/api-actions';

const QuoteContext = createContext({});

export const QuoteProvider = ({ children }: ChildrenProps) => {
    const [quotes, setQuotes] = useState([]);
    const [favQuotes, setFavQuotes] = useState([]);
    

    // useEffect(() => {
        
    // }, []);

    const providerValue = {
        quotes,
        setQuotes,
        favQuotes,
        setFavQuotes,
    };


    return (
        <QuoteContext.Provider value={providerValue}>
            {children}
        </QuoteContext.Provider>
    );
}

export const useQuoteContext = () => useContext(QuoteContext);