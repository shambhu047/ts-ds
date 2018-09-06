export class Queue<T> {
    private data: T[];

    public constructor(items: T[] = []) {
        this.data = [...items];
    }

    public enque(item: T) {
        this.data.push(item);
    }

    public deque(): T {
        return this.data.shift();
    }

    public peek(): T {
        return this.data[0];
    }

    public isEmpty(): boolean {
        return this.data.length ? true : false;
    }

    public flush() {
        this.data.length = 0;
    }
}
