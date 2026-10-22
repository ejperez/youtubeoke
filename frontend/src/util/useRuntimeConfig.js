import { useContext } from "react";
import { RuntimeConfigContext } from "./runtimeConfigContext";

export default function useRuntimeConfig() {
  const config = useContext(RuntimeConfigContext);
  if (!config) {
    throw new Error(
      "useRuntimeConfig must be used within a RuntimeConfigProvider.",
    );
  }
  return config;
}
