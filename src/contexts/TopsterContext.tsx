import { createContext } from "react";
import { Topster } from "../data/models/Topster";

export const TopsterContext = createContext<Topster>(new Topster());
