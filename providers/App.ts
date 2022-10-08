import { APP_NAME } from 'lib/config';
import { createContext } from 'react';

interface AppProps {
    defaultGridSpacing: number;
}
export interface Data {
    spent: string;
    saved: string;
    date: string;
}

export interface UserSettings {
    totalSpent: string;
    totalSaved: string;
    data: Data[];
}

export const initialUserSettingsState: UserSettings = {
    totalSpent: '0',
    totalSaved: '0',
    data: [],
};

export const initialAppState: AppProps = {
    defaultGridSpacing: 2,
};

export const localStorageKey = `${APP_NAME}-settings`;

export const AppContext = createContext<AppProps>(initialAppState);
