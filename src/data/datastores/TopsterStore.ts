import { makeAutoObservable } from 'mobx';
import { LocalPersistency } from "../../services/Persistency";
import { Topster } from "../models/Topster";

export class TopsterStore {
    topster: Topster = new Topster();
    selectedIdx: number = -1;

    constructor() {
        makeAutoObservable(this);
    }

    private saveLocally(): void {
        if (!this.topster) return;
        try {
            LocalPersistency.save('topster', this.topster.toString());
        }
        catch(e) {
            throw new Error('local persistency saving failed');
        }
    }

    private initializeTopster() {
        const savedTopster = LocalPersistency.retrieve('topster');
        const topster = new Topster();
        if (savedTopster) {
            topster.fromJson(JSON.parse(savedTopster));
        }
        this.topster = topster;
    }
}