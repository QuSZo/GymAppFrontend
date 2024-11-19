"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type LoaderContextProps = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const LoaderContext = createContext<LoaderContextProps>({
  loading: false,
  setLoading: () => {},
});

export default function LoaderContextProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return <LoaderContext.Provider value={{ loading, setLoading }}>{children}</LoaderContext.Provider>;
}

export function useLoaderContext() {
  return useContext(LoaderContext);
}
