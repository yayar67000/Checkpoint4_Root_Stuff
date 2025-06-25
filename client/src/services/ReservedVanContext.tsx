import { createContext, useContext, useEffect, useState } from "react";
import {
  addReservedVan,
  deleteReservedVan,
  getReservedVans,
  updateReservedVan,
} from "../services/requests";

const ReservedContext = createContext<ReservedVanContextProps | undefined>(
  undefined,
);

export const ReservedVanProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [reservedVans, setReservedVans] = useState<ReservedVansData[]>([]);

  useEffect(() => {
    const fetchReservedVans = async () => {
      try {
        const reserved = await getReservedVans();
        setReservedVans(reserved || []);
      } catch (error) {
        console.error("Erreur lors du chargement des vans réservés :", error);
        setReservedVans([]);
      }
    };

    fetchReservedVans();
  }, []);

  const isReserved = (vanId: number) => {
    return reservedVans?.some((reserved) => reserved.van_id === vanId) || false;
  };

  const addToReserved = async (
    vanId: number,
    startDate: string,
    endDate: string,
  ) => {
    try {
      await addReservedVan({
        van_id: vanId,
        start_date: startDate,
        end_date: endDate,
      });
      const updatedReserved = await getReservedVans();
      setReservedVans(updatedReserved);
      getReservedVans();
    } catch (error) {
      console.error("Erreur lors de l'ajout à la réservation :", error);
    }
  };

  const updateReservation = async (
    reservedVanId: number,
    startDate: string,
    endDate: string,
  ) => {
    await updateReservedVan(reservedVanId, startDate, endDate);
    const updatedReserved = await getReservedVans();
    setReservedVans(updatedReserved);
  };

  const removeFromReserved = async (vanId: number) => {
    try {
      await deleteReservedVan(vanId);
      const updatedReserved = await getReservedVans();
      setReservedVans(updatedReserved);
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation :", error);
    }
  };

  return (
    <ReservedContext.Provider
      value={{
        reservedVans,
        isReserved,
        addToReserved,
        removeFromReserved,
        updateReservation,
      }}
    >
      {children}
    </ReservedContext.Provider>
  );
};

export const useReservedVans = () => {
  const context = useContext(ReservedContext);
  if (!context) {
    throw new Error(
      "useReservedVans doit être utilisé dans un ReservedVanProvider",
    );
  }
  return context;
};
