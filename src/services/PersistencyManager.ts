interface PersistencyManager {
    save(serializedData: string): void;
    retrieve(): any;
}

class LocalPersistencyManager implements PersistencyManager {
    #sessionStorage = window.sessionStorage;
    save(serializedData: string): void {
        if (this.#sessionStorage) this.#sessionStorage.setItem("cachedData", serializedData);
        else {
            throw new Error("Local Storage is not initialized");
        }
    }
    retrieve(): any {
        
        throw new Error("Method not implemented.");
    }
}


export default LocalPersistencyManager;