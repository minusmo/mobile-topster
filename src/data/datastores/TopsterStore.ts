import { makeAutoObservable, reaction } from 'mobx';
import { LocalPersistency } from "../../services/Persistency";
import { Topster } from "../models/Topster";

type SelectedPosition = {
    row: number;
    col: number;
}

export default class TopsterStore {
    topster: Topster | undefined;
    selectedPosition: SelectedPosition = {
        row: 0,
        col: 0,
    };

    constructor() {
        makeAutoObservable(this);
        this.initializeTopster();
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

    private effect = reaction(
        () => (this.topster),
        topster => {
            this.saveLocally();
        }
    )

    public getSelectedIdx(): number {
        return this.selectedPosition.row + this.selectedPosition.col;
    }
}