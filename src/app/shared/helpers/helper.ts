// Чтоб запустить этот файл: 1) cd src/app/shared/helpers 2) tsc helper.ts 3) node helper

let num1 = 123_456_789;
let num2 = 2e7;
let num3 = 4e-4;

// ---//--- Пример 1: ---//---

type TObjType1 = {
    one: string,
    two: number
}

type TObjType2 = {
    three: boolean
}

type objCommonType = TObjType1 & TObjType2;

// ---//--- Пример 2: ---//---

interface IMy1 {
    one: string,
    two: number
}

interface IMy2 extends IMy1 {
    three: boolean
}

// ---//--- Пример 3: ---//---

interface IHuman {
    age: number,
    name: string,
    walk: () => number
}

type THuman = {
    talk: (always?: boolean) => void
}

class Human implements IHuman, THuman {
    age: 19;
    name: 'Ivan';
    walk() {
        return 4
    }
    talk() {
        console.log('Hello' + this.name)
    }
}

// ---//--- Пример 4 (когда не можем указать тип или интерфейс для переменной): ---//---

const str4 = 'Hello';
const anyString: typeof str4 = 'Hello';

const obj4 = {
    name: 'Ivan',
    age: 12
}
const func4 = (myObject: typeof obj4) => { }
func4({name: 'Petr', age: 32});

// ---//--- Пример 5: ---//---

type Role = 'Admin';

// ---//--- Пример 6 (разница между enum и type): ---//---

type TUserTypes = 'admin' | 'user';

enum UserTypes {
    Admin = 'admin',
    User = 'user'
}

// так не правильно:
function bad(type: TUserTypes) {
    console.log(`Hello ${type}`);
}
bad('admin');
bad('user');

// а так правильно:
function good(type: UserTypes): void {
    console.log(`Hello ${type}`);
}
good(UserTypes.Admin);
good(UserTypes.User);

// потому что если например admin изменится на superAdmin это придется менять в 2 местах а в случае с enum  - в одном

// ---//--- Пример 7: ---//---

interface User {
    name: string;
    age: number
}

type UserKeys = keyof User;

let prop: UserKeys;
prop = 'age'; // или 'name'

// ---//--- Пример 8: ---//---

class Person {
    static version = 'v1';
    name: string = 'Ivan';
    private age: number = 43;
}

let personField: keyof Person = 'name'; // "version" и "age" нельзя присвоить!

// ---//--- Пример 9: ---//---

enum Colors {
    white = '#fff',
    black = '#000'
}

type AvailableColors = keyof typeof Colors;
let color: AvailableColors = 'white';

// изза того что enum это объект, те он существует во время выполнения а не только во время компиляции поэтому сначала надо исп typeof для распознавания типа и далее keyof для получения ключей этого типа

// ---//--- Пример 10: ---//---

const formData1 = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
}

// interface IValidationResult {
//     firstName: boolean;
//     lastName: boolean;
//     age: boolean;
// }
// чтоб не привязываться к интерфейсу потому что набор полей в formData1 может извениться можно поступить так:

type ValidationResult = {
    [key in keyof typeof formData1]: boolean;
}

declare function validate<T>(data: T): ValidationResult; // c помощью ключевого слова declare в программу на TS подключается определение глобальной переменной (подробности как этим пользоваться надо загуглить).

const r = validate(formData1);

// ---//--- Пример 11: ---//---

const formData2 = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
}

declare function validate<T>(data: T): { [key in keyof T]: boolean };

// ---//--- Пример 12: ---//---

type TExample12 = {
    birthday?: string;
    createAt?: string;
    adminRole: boolean
}

const adminStatus: TExample12['adminRole'] = true;