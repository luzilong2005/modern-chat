import type { Constructor } from "type-fest";
export abstract class BaseSingleton {
    private static instances = new Map<Constructor<BaseSingleton>, BaseSingleton>();

    protected constructor() {
        if (new.target === BaseSingleton) {
            throw new Error(
                "[BaseSingleton] This is an abstract class and cannot be instantiated directly. " +
                    "Please extend it and call SubClass.getInstance() to obtain the singleton.",
            );
        }
        if (BaseSingleton.instances.has(new.target as any)) {
            throw new Error(
                `[BaseSingleton] Singleton for derived class ${new.target.name} already exists. ` +
                    `Do not invoke 'new' manually; use ${new.target.name}.getInstance() instead.`,
            );
        }
        BaseSingleton.instances.set(new.target as any, this);
    }

    public static getInstance<T extends Constructor<BaseSingleton>>(this: T) {
        let ins = BaseSingleton.instances.get(this);
        if (!ins) {
            ins = new this();
            BaseSingleton.instances.set(this, ins);
        }
        return ins as InstanceType<T>;
    }
}
