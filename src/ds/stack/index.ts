export class Stack<T> {
    private data: T[];

    public constructor(items: T[] = []) {
        this.data = [...items];
    }

    public push(...args: [T]) {
        args.forEach((item) => this.data.push(item));
    }

    public pop(): T {
        return this.pop();
    }

    public isEmpty(): boolean {
        return this.data.length ? true : false;
    }
}