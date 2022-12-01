const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const doSomething = () =>{
    return new Promise((resolve) =>{
        resolve('Valor 1');
        setTimeout(() => {
            resolve('Valor 3')
        }, 3000);
    })
}

const doSomething$ = () =>{
    return new Observable((observer) =>{
        observer.next('Valor 1 $');
        observer.next('Valor 2 $');
        observer.next('Valor 3 $');
        observer.next(null);
        setTimeout(() => {
            observer.next('Valor 4')
        }, 5000);
        setTimeout(() => {
            observer.next(null)
        }, 3000);
        setTimeout(() => {
            observer.next('Valor 5')
        }, 5000);
    })
}

(async () =>{
    const rta = await doSomething();
    console.log(rta);
})();

(() =>{
    const obs$ = doSomething$();
    obs$.pipe(filter(value => value !== null))
    obs$.subscribe(rta=>{
        console.log(rta);
    })
})();