abstract class Persistency {
    static #storage: Storage;
    static save(dataKey: string, serializedData: string): void {};
    static retrieve(dataKey: string): string { return ""; };
}

class SessionPersistency extends Persistency {
    static #storage: Storage = window.sessionStorage;
    static save(dataKey:string, serializedData: string): void {
        if (this.#storage) this.#storage.setItem(dataKey, serializedData);
        else {
            throw new Error("Local Storage is not initialized.");
        }
    }
    static retrieve(dataKey: string): any {
        if (this.#storage) return this.#storage.getItem(dataKey);
        else return "";
    }
}

class LocalPersistency implements Persistency {
    static #storage: Storage = window.localStorage;
    static save(dataKey:string, serializedData: string): void {
        if (this.#storage) this.#storage.setItem(dataKey, serializedData);
        else {
            throw new Error("Local Storage is not initialized.");
        }
    }
    static retrieve(dataKey: string): any {
        if (this.#storage) return this.#storage.getItem(dataKey);
        else return "";
    }
}

export{ SessionPersistency, LocalPersistency };