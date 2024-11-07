export class PrefetchCacheScopes {
    evict() {
        for (const [key, value] of this.cacheScopes){
            if (value.timestamp < Date.now() - 5000) {
                this.cacheScopes.delete(key);
            }
        }
    }
    // TODO: should this key include query params if so we need to
    // filter _rsc query
    get(url) {
        setImmediate(()=>this.evict());
        const currentScope = this.cacheScopes.get(url);
        if (currentScope) {
            if (currentScope.timestamp < Date.now() - 5000) {
                return undefined;
            }
            return currentScope.cache;
        }
        return undefined;
    }
    set(url, cache) {
        setImmediate(()=>this.evict());
        return this.cacheScopes.set(url, {
            cache,
            timestamp: Date.now()
        });
    }
    del(url) {
        this.cacheScopes.delete(url);
    }
    constructor(){
        this.cacheScopes = new Map();
    }
}

//# sourceMappingURL=prefetch-cache-scopes.js.map