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

export interface RovraggeRespLocationsData {
    placeCount: number;
    cityPlaceList: {
        cityCode: string,
        cityName: string,
        placeList: Array<Place>
    }
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
    id?: string,
    address?: string, // ул. Ислама Каримова, 17
    categoryCode: string, // RESTAURANTS
    subcategory?: string, // Бар
    title?: string,// Чайхана
    subtitle?: string, // Узбекская кухня
    priceRange?: number, // Средний чек: $, $$ или $$$
    rating: number,
    imageList?: Array<{
        type?: string,
        href: string
    }>
}

export interface VisitsAmount {
    amount: number;
}

export interface FbCreateResponse {
    name: string;
}