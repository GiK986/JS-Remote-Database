export class Client {

    #apiId;
    #collection;
    #base_url;

    constructor(apiId, collection) {
        if (!apiId) {
            throw new Error("apiId can't be empty");
        }
        if (!collection) {
            throw new Error("collection can't be empty");
        }
        this.#apiId = apiId;
        this.#collection = collection;
        this.#base_url = `${this.#apiId}/${this.#collection}`;
    }

    /**
     *
     * Create new entry
     * @param {Object} entry - Object entry
     * @returns {Promise<{name: string}>}
     * @memberof Client
     */
    async Create(entry){
        const url = `${this.#base_url}.json`;

        const options = { method: 'POST', body: JSON.stringify(entry) };
        const response = await fetch(url, options);
        const result = await response.json();

        return result;
    }

    /**
     *
     * Update existing book by id.
     * @param {string} entryId
     * @param {Object} entry - Object entry
     * @returns {Promise<Object>} - modified Object entry
     * @memberof Client
     */
    async Update(entryId, entry){
        const url = `${this.#base_url}/${entryId}.json`;

        const options = { method: 'PUT', body: JSON.stringify(entry) };
        const response = await fetch(url, options);
        const result = await response.json();
           
        return result;
    }

    /**
     *
     *
     * @param {string} entryId
     * @returns {Promise<boolean>}
     * @memberof Client
     */
    async Delete(entryId){
        const url = `${this.#base_url}/${entryId}.json`;

        const options = { method: 'DELETE' };
        const response = await fetch(url, options);
        const data = await response.json();

        return data === null;
    }

    /**
     *
     * Return all collections
     * @returns {Promise<[{id:string, entry:Object}]>}
     * @memberof Client
     */
    async GetAllEntries() {
        const url = `${this.#base_url}.json`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data === null) {
            return null;
        }

        let dataArr = Object.entries(data);
        let entries = dataArr.map(item => {
            return {
                id: item[0],
                entry: item[1],
            }
        });

        return entries;
    } 

    /**
     *
     *
     * @param {string} entryId
     * @returns {Promise<Object>}
     * @memberof Client
     */
    async GetEntryById(entryId) {
        const url = `${this.#base_url}/${entryId}.json`;
        
        const response = await fetch(url);
        const result = await response.json();

        return result;
    } 
}