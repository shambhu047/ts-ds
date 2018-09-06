export class Node<T = any> {
    public value: T;

    public next: Node<T>;

    public constructor(value: T, next: Node<T> = null) {
        this.value = value;
        this.next = next;
    }
}
