# callbag-sample-when

Callbag operator that samples from source when provided listenable emits. Works like [Rx's sample](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-sample).

## Example

```js
import fromEvent from 'callbag-from-event'
import forEach from 'callbag-for-each'
import map from 'callbag-map'
import merge from 'callbag-merge'
import pipe from 'callbag-pipe'
import sample from 'callbag-sample'

pipe(
  merge(
    map(() => false)(fromEvent(element, 'mousedown')),
    map(() => true)(fromEvent(element, 'mousemove')),
  ),
  sample(fromEvent(element, 'mouseup')),
  forEach(isDragging => {
    console.log('Were you dragging?', isDragging)
  }),
)
```
