function ezp(ezHandler = {}, escape) {
    const handler = {
        get(propsFn, prop) {
            if (prop === escape) {
                if (!ezHandler.get) return Reflect.get(propsFn, prop);

                const props = propsFn();

                return ezHandler.get([...props]);
            } else {
                return new Proxy(() => [...propsFn(), prop], handler);
            }
        },
        deleteProperty(propsFn, prop) {
            if (!ezHandler.delete) return Reflect.deleteProperty(propsFn, prop);

            const props = propsFn();

            return ezHandler.delete([...props, prop]);
        },
        has(propsFn, prop) {
            if (!ezHandler.has) return Reflect.has(propsFn, prop);

            const props = propsFn();

            return ezHandler.has(props, prop);
        },
        set(propsFn, prop, value) {
            if (!ezHandler.set) return Reflect.set(propsFn, prop, value);

            const props = propsFn();

            return ezHandler.set([...props, prop], value);
        },
        apply(propsFn, thisArg, args) {
            if (!ezHandler.apply) return Reflect.apply(propsFn, thisArg, args);

            const props = propsFn();

            return ezHandler.apply(props, args);
        }
    };

    return new Proxy(() => [], handler);
}

module.exports = ezp;
