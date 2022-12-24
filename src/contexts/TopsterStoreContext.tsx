import { createContext } from "react";
import TopsterStore from "../data/datastores/TopsterStore";

export const topsterStore: TopsterStore = new TopsterStore();
export const TopsterStoreContext = createContext<TopsterStore>(topsterStore);
