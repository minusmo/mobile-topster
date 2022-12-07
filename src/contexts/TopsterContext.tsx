import { createContext } from "react";
import { Topster } from "../models/Topster";

export const TopsterContext = createContext<Topster>(new Topster());
