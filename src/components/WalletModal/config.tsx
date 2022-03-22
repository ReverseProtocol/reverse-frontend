import Metamask from "./icons/Metamask";
import { Config } from "./types";

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
  },
];

export default connectors;
export const localStorageKey = "accountStatus";
