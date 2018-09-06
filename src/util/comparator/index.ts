export class Comparator<T = any> {
    public static defaultCompareFn(a, b): ComparisionResult {
        if (a === b) {
            return 0;
        }

        return a < b ? -1 : 1;
    }

    private fn: CompareFunction;

    public constructor(compareFunction: CompareFunction = Comparator.defaultCompareFn) {
        this.fn = compareFunction;
    }

    public equal(a: T, b: T): boolean {
        return this.fn(a, b) === 0 ? true : false;
    }

    public lessThan(a: T, b: T): boolean {
        return this.fn(a, b) === -1 ? true : false;
    }

    public greaterThan(a: T, b: T): boolean {
        return this.fn(a, b) === 1 ? true : false;
    }

    public lessThanOrEqual(a: T, b: T): boolean {
        return this.fn(a, b) === 1 ? false : true;
    }

    public greaterThanOrEqual(a: T, b: T): boolean {
        return this.fn(a, b) === -1 ? false : true;
    }
}

export type CompareFunction<T = any> = (a: T, b: T) => ComparisionResult;

export type ComparisionResult = -1 | 0 | 1;
