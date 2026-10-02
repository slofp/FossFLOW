import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { LocaleProps, PartialLocaleProps } from '../types/isoflowProps';
import enUS from '../i18n/en-US';

const LocaleContext = createContext<LocaleProps>(enUS);

interface LocaleProviderProps {
  locale: PartialLocaleProps;
  children: ReactNode;
}

// Fill in any keys the locale does not translate with the en-US text
const withFallback = <T extends object>(fallback: T, locale: object): T => {
  const merged: Record<string, unknown> = { ...(fallback as Record<string, unknown>) };
  for (const [key, value] of Object.entries(locale)) {
    const base = merged[key];
    if (value && typeof value === 'object' && base && typeof base === 'object') {
      merged[key] = withFallback(base, value);
    } else if (value !== undefined) {
      merged[key] = value;
    }
  }
  return merged as T;
};

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ locale, children }) => {
  const value = useMemo(() => withFallback(enUS, locale), [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleProps => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

// Generic type helper for nested object access
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

// Overloaded useTranslation function
export function useTranslation(): {
  t: (key: NestedKeyOf<LocaleProps>) => string;
};

export function useTranslation<K extends keyof LocaleProps>(
  namespace: K
): {
  t: (key: keyof LocaleProps[K]) => string;
  };

export function useTranslation<K extends keyof LocaleProps>(namespace?: K) {
  const locale = useLocale();

  // Memoized so `t` stays stable and can be used in hook dependencies
  return useMemo(() => createTranslation(locale, namespace), [locale, namespace]);
}

function createTranslation<K extends keyof LocaleProps>(locale: LocaleProps, namespace?: K) {
  if (namespace) {
    // Return scoped translation function for specific namespace
    const namespaceData = locale[namespace];
    const t = (key: keyof LocaleProps[K]): string => {
      const value = namespaceData[key];
      return typeof value === 'string' ? value : String(key);
    };
    return { t };
  } else {
    // Return global translation function with dot notation
    const t = (key: NestedKeyOf<LocaleProps>): string => {
      const parts = key.split('.');
      let current: any = locale;
      
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return key; // Return key if path not found
        }
      }
      
      return typeof current === 'string' ? current : key;
    };
    return { t };
  }
}
