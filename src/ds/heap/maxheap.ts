import { Heap } from './heap';
import { CompareFunction } from '../../util/comparator';

export class MaxHeap<T> extends Heap<T> {

    public constructor(compareFunction?: CompareFunction) {
        super(compareFunction);
    }

    protected pairIsInCorrectOrder(firstItem: T, secondItem: T): boolean {
        return this.comparator.greaterThanOrEqual(firstItem, secondItem);
    }
}
