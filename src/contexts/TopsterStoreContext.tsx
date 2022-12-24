import { createContext } from "react";
import TopsterStore from "../data/datastores/TopsterStore";

export const TopsterStoreContext = createContext<TopsterStore>(new TopsterStore());
