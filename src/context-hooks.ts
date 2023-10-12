import { useContext } from 'react';
import { UserContext, UserContextType } from './providers/UserProvider';

export const useUser = (): UserContextType => {
    return useContext(UserContext);
}