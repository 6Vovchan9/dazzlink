if (true) {

// ---//--- Пример 1: ---//---
interface IGeneric<R = string> {
    field: R
} // интерфейс IGeneric использует 1 генерик тип

class Class5 implements IGeneric<number> {
    field = 45;
}

function func5<T, U>(val: T): T {
    return val;
}

let gte1 = func5<number, string>(6);
let gte2 = func5('string');

// ---//--- Пример 2: ---//---
function getRandomElement<M>(items: Array<M>) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

let el1 = getRandomElement([1, 2, 3]);
let el2 = getRandomElement(['el1', 'el2', 'el3']);
let el3 = getRandomElement([1, 'el2', 3, null, true]);

// ---//--- Пример 3: ---//---
function merge<U, V>(o1: U, o2: V): U & V {
    return {
        ...o1,
        ...o2
    }
}

let r1 = merge({a: 1}, {b: 2});
let r2 = merge({a: 1, c: 'elem'}, {b: 2});

// ---//--- Пример 4: ---//---
function len<T extends { length: number }>(collection: T) {
    return collection.length;
}

let l1 = len('Hello');
let l2 = len([1, 2, 3]);
// let l3 = len(3); // Error

// ---//--- Пример 5: ---//---
function getValue<H extends object, U extends keyof H>(obj: H, prop: U) {
    return obj[prop];
}

let val = getValue({
    name: 'Ivan',
    age: 18
}, 'age');

// ---//--- Пример 6: ---//---
function getKey<H extends object, U extends keyof H>(obj: H, value: H[U]): U {
    const key = (Object.keys(obj) as Array<U>).find(k => obj[k] === value);

    return key;
}

let key = getKey({
    name: 'Ivan',
    age: 18
}, 'Ivan');

// ---//--- Пример 7: ---//---
function patchField<
    H extends object,
    V extends keyof H,
    S extends H[V]
>(obj: H, field: V, newVal: S) { }

patchField({f: 3}, 'f', 4);
}