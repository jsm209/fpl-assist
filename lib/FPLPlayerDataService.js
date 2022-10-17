import { order } from "./filter";

export function getHighestTransferredInPlayers(players) {
    return order(players, "transfer_in")
}