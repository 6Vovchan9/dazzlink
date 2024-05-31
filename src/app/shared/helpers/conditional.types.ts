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