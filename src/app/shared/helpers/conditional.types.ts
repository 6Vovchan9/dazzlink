if (true) {

// ---//--- Пример 1: ---//---

interface CIUser {
    id: string
}

interface CIMessage {
    id: number
}

function getId<T extends { id: any }>(obj: T): T extends { id: string } ? string : number {
    return obj.id
}

const frw1 = getId({} as CIUser);
const frw2 = getId({} as CIMessage);

// ---//--- Пример 2: ---//---

type Test<T> = T extends string ? true : false; // объявим дженерик тип "Test" и проверим что переданный типа T принадлежит строковому типу. Extends указывает не на наследование а определяет принадлежность
type R = Test<'str'>; // true

// ---//--- Пример 3: ---//---

type NotFalsy<T = null> = T extends (null | undefined | false | 0) ? never : T;
let verr: NotFalsy<string>;

// ---//--- Пример 4: ---//---

type MyFilter<T, U> = T extends U ? never : T;
type Ffrv = MyFilter<'a' | 'b' | 'c', 'b'>; // в typescript есть встроенный тип с таким поведением под название "Exclude"

// ---//--- Пример 4: ---//---

type GetStatus<E> = E extends object ? E extends {status: string} ? E['status'] : null : null;
type Status = GetStatus<{status: 'STR'}>;

// правильней эту задачу было решить через ключевое слово infer (исп только в условных типах после ключевого слова extends)
}