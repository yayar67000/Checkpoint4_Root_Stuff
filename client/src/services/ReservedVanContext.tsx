import { createContext, useContext, useEffect, useState } from "react";
import {
  addReservedVan,
  deleteReservedVan,
  getReservedVan,
} from "../services/requests";

const ReservedVanContext = createContext<ReservedVanContextProps | undefined>(
  undefined,
);

export const ReservedProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [reservedVans, setReservedVans] = useState<ReservedVansData[]>([]);

  useEffect(() => {
    const fetchReserved = async () => {
      try {
        const reserved = await getReservedVan();
        setReservedVans(reserved || []);
      } catch (error) {
        console.error("Erreur lors du chargement des réservés:", error);
        setReservedVans([]);
      }
    };
    fetchReserved();
  }, []);

  const isReserved = (vanId: number) => {
    return reservedVans?.some((van) => van.id === vanId) || false;
  };

  const addToReserved = async (vanId: number) => {
    try {
      await addReservedVan(vanId);
      const updatedReserved = await getReservedVan();
      setReservedVans(updatedReserved);
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
    }
  };

  const removeFromReserved = async (vanId: number) => {
    try {
      await deleteReservedVan(vanId);
      const updatedReserved = await getReservedVan();
      setReservedVans(updatedReserved);
    } catch (error) {
      console.error("Erreur lors de la suppression des favoris:", error);
    }
  };

  return (
    <ReservedVanContext.Provider
      value={{ reservedVans, isReserved, addToReserved, removeFromReserved }}
    >
      {children}
    </ReservedVanContext.Provider>
  );
};

export const useReserved = () => {
  const reservedContext = useContext(ReservedVanContext);
  if (!reservedContext) {
    throw new Error("useReserved doit être utilisé dans un ReservedProvider");
  }
  return reservedContext;
};
