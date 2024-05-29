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