// app/app.js
import { notasService as service } from './nota/service.js';
import './utils/array-helpers.js';
import { takeUntil, debounceTime, partialize, compose } from './utils/operators.js';
import { timeoutPromise, retry } from './utils/promise-helpers.js';
import { EventEmmiter } from './utils/event-emmiter.js'

const operations = compose(
    partialize(debounceTime, 500),
    partialize(takeUntil, 3)
);

const action = operations(() => 
    retry(3, 3000, () => timeoutPromise(200, service.sumItems('2143')))
    .then(total => EventEmmiter.emit('itensTotalizados', total))
    .catch(console.log)
)

document
.querySelector('#myButton')
.onclick = action;
    