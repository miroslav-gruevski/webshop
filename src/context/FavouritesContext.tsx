'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavouritesContextType {
  favourites: string[];
  favouriteCount: number;
  addToFavourites: (productId: string) => void;
  removeFromFavourites: (productId: string) => void;
  toggleFavourite: (productId: string) => void;
  isFavourite: (productId: string) => boolean;
  clearFavourites: () => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

const FAVOURITES_STORAGE_KEY = 'ecs-favourites';

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load favourites from localStorage on mount
  useEffect(() => {
    const savedFavourites = localStorage.getItem(FAVOURITES_STORAGE_KEY);
    if (savedFavourites) {
      try {
        const parsedFavourites = JSON.parse(savedFavourites);
        if (Array.isArray(parsedFavourites)) {
          setFavourites(parsedFavourites);
        }
      } catch (e) {
        console.error('Failed to parse favourites from localStorage:', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save favourites to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
    }
  }, [favourites, isHydrated]);

  const favouriteCount = favourites.length;

  const addToFavourites = (productId: string) => {
    setFavourites((current) => {
      if (current.includes(productId)) {
        return current;
      }
      return [...current, productId];
    });
  };

  const removeFromFavourites = (productId: string) => {
    setFavourites((current) => current.filter((id) => id !== productId));
  };

  const toggleFavourite = (productId: string) => {
    setFavourites((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      }
      return [...current, productId];
    });
  };

  const isFavourite = (productId: string) => {
    return favourites.includes(productId);
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        favouriteCount,
        addToFavourites,
        removeFromFavourites,
        toggleFavourite,
        isFavourite,
        clearFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
}
