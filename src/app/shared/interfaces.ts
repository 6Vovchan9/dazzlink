export interface AdminData {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface MainLayoutOptions {
    header: {
        withAnimation: boolean,
        fixed: boolean
    },
    footerFixed: boolean
}

export interface RovraggeRespWrapper {
    result: {
        code: string,
        messages: Array<any>,
        timestamp: Date
    },
    data: any
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: string;
}

export type AuthorData = {
    name?: string,
    imageUrl?: string,
    occupation?: string,
    link?: string,
}

export interface Post {
    id?: string;
    title: string;
    html?: string;
    authorList?: Array<AuthorData>;
    published: Date;
    viewCount?: number;
    likeCount?: number;
    dislikeCount?: number;
    imageUrl?: string;
}

export type Place = {
    country?: string, // Узбекистан
    city: string, // Ташкент
    address?: string, // ул. Ислама Каримова, 17
    category: string, // Ресторан
    subcategory?: string, // Бар
    kitchen?: string, // Узбекская
    title?: string,// Чайхана
    imageUrl?: string
    price_range?: number, // Средний чек: $, $$ или $$$
    rating_2gis?: number,
    rating_yandex?: number,
    rating_google?: number,
    rating_tripadvisor?: number
}

export interface VisitsAmount {
    amount: number;
}

export interface FbCreateResponse {
    name: string;
}