//Cria um contexto para o usuário, permitindo que o e-mail fique disponível em qualquer tela do app
//Sem a necessidade de passar props

import { useSortedScreens } from 'expo-router/build/useScreens';
import React, { createContext, useContext, ReactNode, useState } from 'react';

type User = {
    email: string
};

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser usado dentro de UserProvider');
    }
    return context;
};