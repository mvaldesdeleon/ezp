function ezp(magic = {}, escape) {
    const handler = {
        get(propsFn, prop) {
            if (prop === escape) {
                if (!magic.get) return Reflect.get(propsFn, prop);

                const props = propsFn();

                return magic.get(props, prop);
            } else {
                return new Proxy(() => [...propsFn(), prop], handler);
            }
        },
        deleteProperty(propsFn, prop) {
            if (!magic.delete) return Reflect.deleteProperty(propsFn, prop);

            const props = propsFn();

            return magic.delete(props, prop);
        },
        has(propsFn, prop) {
            if (!magic.has) return Reflect.has(propsFn, prop);

            const props = propsFn();

            return magic.has(props, prop);
        },
        set(propsFn, prop, value) {
            if (!magic.set) return Reflect.set(propsFn, prop, value);

            const props = propsFn();

            return magic.set(props, prop, value);
        },
        apply(propsFn, thisArg, args) {
            if (!magic.apply) return Reflect.apply(propsFn, thisArg, args);

            const props = propsFn();

            return magic.apply(props, ...args);
        }
    };

    return new Proxy(() => [], handler);
}

module.exports = ezp;
