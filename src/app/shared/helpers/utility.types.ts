// Утилиты это такие дженерик типы

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
type ChatsData1 = { [key: number]: Message1[] }

type ChatsData2 = Record<string, Message1[]> // позволяет более лаконично создавать простые типы
type ChatsData3 = Record<'key1' | 'key2', string> // позволяет более лаконично создавать простые типы

// 6.1)
type Theme = 'light' | 'dark';

type ThemeParams = {
    fontSize: number;
    color: string;
}

type AppTheme = Record<Theme, ThemeParams>;

const t: AppTheme = {
    light: {
        fontSize: 12,
        color: 'green'
    },
    dark: {
        fontSize: 14,
        color: 'red'
    }
}

// 7)
type PublicFields = Exclude<keyof FullProfile, 'createAt' | 'id'>;
const example7: PublicFields = 'firstname';

// 8)

type UserSchemaType = {
    username: string;
    phoneNumber: string;
    email: string;
}

type Intersection1 = Extract<'id' | 'name', 'name'>;
type Intersection2 = Extract<keyof UserSchemaType, keyof FullProfile>;

const example8: Intersection1 = 'name';

// 9)

function myFunc(a: string, b: number): number {
    return 4;
}

const tv: Parameters<typeof myFunc> = ['gvt', 4]; // массив только из 2 элементов, не более!

// 10)

// ConstructorParameters (позволяет получить тип данных из аргументов конструктора)
// NonNullable (удаляет типы null и undefined)
// ReturnType (тип возвращаемого значения из функции)

// 11)

declare function fetch(): Promise<string>

type FetchResult = ReturnType<typeof fetch>;
type FetchResultType = Awaited<ReturnType<typeof fetch>>;

// 12)

// Uppercase, Lowercase, Capitalize, Uncapitalize
type UTExample12 = Uppercase<'name'>;

// 12.1)

const user = {
    name: 'Jonh',
    age: 40
}

type UTUser = typeof user;
type WithGetters<T extends string> = Record<`get${Capitalize<T>}`, () => string>

declare function createGetters(u: UTUser): UTUser & WithGetters<keyof UTUser>

const userWithGetters = createGetters(user);

userWithGetters.getAge();
userWithGetters.getName();