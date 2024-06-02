// Все файлы в этой папке это конспекты в основном посвященные теме typescript

if (true) {

// ---//--- Пример 1: ---//---

let value: unknown;

value = 'Max';

// const s = (value as string).toUpperCase();
const s = (<string>value).toUpperCase();

// ---//--- Пример 2: ---//---

interface UserData {
    name: string;
    age: number;
}

// const user: UserData = {} as UserData;
const user: UserData = <UserData>{}; // без явного утверждения типа тут будет ошибка

user.name = 'Max';
user.age = 27;

// ---//--- Пример 3: ---//---

const test1 = {
    name: 'User',
    age: 20
} as const

const test2 = <const>{
    name: 'User',
    age: 20
}

type U = typeof test1;
const month = ['January', 'February', 'Martch'] as const;

}