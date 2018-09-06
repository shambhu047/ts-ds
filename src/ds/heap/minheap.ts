import { Heap } from './heap';
import { CompareFunction } from '../../util/comparator';

export class MinHeap<T> extends Heap<T> {

    public constructor(compareFunction?: CompareFunction) {
        super(compareFunction);
    }

    protected pairIsInCorrectOrder(firstItem: T, secondItem: T) {
        return this.comparator.lessThanOrEqual(firstItem, secondItem);
    }
}
