import { Comparator, CompareFunction } from '../../util/comparator';

export abstract class Heap<T = any> {

    protected comparator: Comparator<T>;

    private container: T[];

    public constructor(compareFunction: CompareFunction) {
        this.container = [];
        this.comparator = new Comparator(compareFunction);
    }

    public peek(): T {
        return this.container.length ? this.container[0] : null;
    }

    public poll(): T {
        if (this.container.length === 0) {
            return null;
        } else if (this.container.length === 1) {
            return this.container.pop();
        }

        const ret = this.container[0];

        this.container[0] = this.container.pop();
        this.heapifyDown();

        return ret;
    }

    public add(item: T): Heap<T> {
        this.container.push(item);
        this.heapifyUp();

        return this;
    }

    public find(item: T) {
        const founItemIndices: number[] = [];

        for(let i = 0; i < this.container.length; i++) {
            if(this.comparator.equal(item, this.container[i])) {
                founItemIndices.push(i);
            }
        }

        return founItemIndices;
    }

    public remove(item: T): Heap<T> {
        const numberOfItemsToRemove: number = this.find(item).length;

        for(let i = 0; i < numberOfItemsToRemove; i++) {
            const indexToRemove = this.find(item).pop();

            if (indexToRemove === this.container.length - 1) {
                this.container.pop();
            } else {
                this.container[indexToRemove] = this.container.pop();

                const parent = this.parent(indexToRemove);

                if (this.hasLeftChild(indexToRemove) && (!parent || this.pairIsInCorrectOrder(parent, this.container[indexToRemove]))) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }
        return this;
    }

    public isEmpty(): boolean {
        return !this.container.length;
    }

    public toString() {
        // TODO:
    }

    public toObjectTree() {
        // TODO:
    }

    protected abstract pairIsInCorrectOrder(firstItem, seconItem): boolean;

    private getLeftChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 1;
    }

    private getRightChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 2
    }

    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    private hasParent(childIndex: number): boolean {
        return this.getParentIndex(childIndex) >= 0;
    }

    private hasLeftChild(parentIndex: number): boolean {
        return this.getLeftChildIndex(parentIndex) < this.container.length;
    }

    private hasRightChild(parentIndex: number): boolean {
        return this.getRightChildIndex(parentIndex) < this.container.length;
    }

    private leftChild(parentIndex: number): T {
        return this.container[this.getLeftChildIndex(parentIndex)];
    }

    private rightChild(parentIndex: number): T {
        return this.container[this.getRightChildIndex(parentIndex)];
    }

    private parent(childIndex: number): T {
        return this.container[this.getParentIndex(childIndex)];
    }

    private swap(firstIndex: number, secondIndex) {
        const temp = this.container[firstIndex];

        this.container[firstIndex] = this.container[secondIndex];
        this.container[secondIndex] = temp;
    }

    private heapifyUp(stratIndex?: number) {
        let currentindex: number = stratIndex || this.container.length - 1;

        while(this.hasParent(currentindex) && !this.pairIsInCorrectOrder(this.parent[currentindex], this.container[currentindex])) {
            this.swap(currentindex, this.getParentIndex(currentindex));
            currentindex = this.getParentIndex(currentindex);
        }
    }

    private heapifyDown(startIndex?: number) {
        let currentindex: number = startIndex || 0;
        let nextIndex: number = null;

        while(this.hasLeftChild(currentindex)) {
            if (this.hasRightChild(currentindex) && this.pairIsInCorrectOrder(this.rightChild(currentindex), this.leftChild(currentindex))) {
                nextIndex = this.getRightChildIndex(currentindex);
            } else {
                nextIndex = this.getLeftChildIndex(currentindex);
            }

            if (this.pairIsInCorrectOrder(this.container[currentindex], this.container[nextIndex])) {
                break;
            }

            this.swap(currentindex, nextIndex);
            currentindex = nextIndex;
        }
    }
}