import { generateCode } from "../util/util";

export default function usePlayerId() {
  const savedPlayerID = localStorage.getItem("playerID");

  if (savedPlayerID) {
    return savedPlayerID;
  } else {
    const newPlayerID = generateCode();
    localStorage.setItem("playerID", newPlayerID);
    return newPlayerID;
  }
}
