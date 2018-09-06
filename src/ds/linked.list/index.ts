import { Comparator, CompareFunction } from '../../util/comparator';
import { Node } from './node';

export class LinkedList<T> {
    private head: Node<T>;

    private tail: Node<T>;

    private comparator: Comparator<T>;

    public constructor(compareFunction?: CompareFunction) {
        this.head = null;
        this.tail = null;

        this.comparator = new Comparator(compareFunction);
    }

    public size(): number {
        let count = 0;
        let currentNode = this.head;

        while(currentNode) {
            count++;
            currentNode = currentNode.next;
        }

        return count;
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public append(item: T): LinkedList<T> {
        const node = new Node(item, null);

        if (!this.head) {
            this.head = node;
            this.tail = node;

            return this;
        }

        this.tail.next = node;
        this.tail = node;

        return this;
    }

    public prepend(item: T): LinkedList<T> {
        this.head = new Node(item, this.head);

        if (!this.tail) {
            this.tail = this.head;
        }

        return this;
    }

    public find(item: T): Node<T> {
        let res = null;

        if (!this.head) {
            return res;
        }

        let currentNode = this.head;

        while (currentNode) {
            if (this.comparator.equal(currentNode.value, item)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    public iterator(): Iterator<T> {
        // TODO:
        return null;
    }

    public toArray(): T[] {
        const arr = [];
        let currentNode = this.head;

        while (currentNode) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return arr;
    }

    public removeHead(): T {
        let item: T = null;

        if (this.head) {
            item = this.head.value;

            // NOTE: no need to update the tail in case of single node in the list as the
            // below assignment update both the head and tail
            // TODO: test the validity of above note
            this.head = this.head.next;
        }

        return item;
    }

    public removeTail(): T {
        let item: T = null;

        let currentNode: Node<T> = this.head;

        // when only one node is there in the list
        if (currentNode && !currentNode.next) {
            item = currentNode.value;
            // NOTE: no need to update the head in case of single node in the list as the
            // below assignment update both the head and tail
            // TODO: test the validity of above note
            this.tail = null;

            return item;
        }

        while (currentNode) {
            if (!currentNode.next.next) {
                item = currentNode.next.value;

                currentNode.next = null;
                this.tail = currentNode;

                break;
            }

            currentNode = currentNode.next;
        }

        return item;
    }

    public remove(item: T) {
        let removedItem: T = null;
        let currentNode = this.head;
        let prevNode: Node<T> = null;

        if (!this.head) {
            return removedItem;
        }

        // when only one node is there in the list
        if (currentNode && !currentNode.next) {
            if (this.comparator.equal(currentNode.value, item)) {
                removedItem = currentNode.value;
                // NOTE: no need to update the tail in case of single node in the list as the
                // below assignment will update both head and the tail
                // TODO: test the validity of above note
                this.head = null;
            }

            return removedItem;
        }

        while (currentNode) {
            if (this.comparator.equal(currentNode.value, item)) {
                if (prevNode) {
                    prevNode.next = currentNode.next;
                } else {
                    this.head = currentNode.next;
                }
                removedItem = currentNode.value;
                break;
            }

            prevNode = currentNode;
            currentNode = currentNode.next;
        }

        return
    }

    public clear() {
        this.head = null;
        this.tail = null;
    }
}
