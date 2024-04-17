// Чтоб запустить этот файл: 1) tsc helper 2) node helper

let num1 = 123_456_789;
let num2 = 2e7;
let num3 = 4e-4;

// ---//--- Пример 1: ---//---
type objType1 = {
    one: string,
    two: number
}

type objType2 = {
    three: boolean
}

type objCommonType = objType1 & objType2;

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
interface IGeneric<R> {
    field: R
}

class Class5 implements IGeneric<number> {
    field = 45;
}

function func5<T, U>(val: T): T {
    return val;
}

func5<number, string>(6);

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

// ---//--- Пример 7 (утилиты typescript): ---//---

enum MessProfileInfoEnum {
    Username = 'username',
    Firstname = 'firstname',
    Lastname = 'lastname'
}

type FullProfile = {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    birthday?: string;
    createAt?: string;
}

// 1)
type MessProfileInfo2 = Pick<FullProfile, MessProfileInfoEnum>;

// 2)
type EditableProfileFields1 = Omit<FullProfile, 'id' | 'createAt'>;

// 3)
function sendNewProfileData(profileData: Partial<FullProfile>): void { }
sendNewProfileData({ birthday: '21.02.2023' }); // благодаря Partial не требуется передавать остальные обязательные свойства

// 4)
type EditableProfileFields2 = Required<FullProfile>; // делает все поля типа обязательными

// 5)
type Message1 = {
    readonly id: number;
    chatId: number;
    text: string;
} // чтоб не писать модификатор readonly для каждого поля

type Message2 = Readonly<{
    id: number;
    chatId: number;
    text: string;
}> // можно применить утилиту которая делает все поля доступными только для чтения

// 6) 
type ChatsData1 = {[key: number]: Message1[]}

type ChatsData2 = Record<string, Message1[]> // позволяет более лаконично создавать простые типы
type ChatsData3 = Record<'key1' | 'key2', string> // позволяет более лаконично создавать простые типы