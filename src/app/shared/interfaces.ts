export interface AdminData {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export type IVotingService = {
    dislikeCount: number,
    likeCount: number,
    id: string
}

export interface MainLayoutOptions {
    header: {
        withAnimation: boolean,
        fixed: boolean
    },
    footerFixed: boolean
}

export interface IAboutPersonalData {
    name: string,
    position: string,
    photo?: string,
    details?: {
        vita: string
    }
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
    cityPlaceList: Array<RespCityPlaceList>
}

export interface RespCityPlaceList {
    cityCode: string,
    cityTitle: string,
    placeList: Array<Place>
}

export interface RovraggeRespFiltersData {
    sort: Array<{
        name: string,
        value: string
    }>,
    filter: Array<{
        code: string,
        group: Array<CountryFilterItem>
    }>
}

export interface CountryFilterItem {
    countryTitle: string,
    cityList: Array<{
        selected?: boolean,
        title: string,
        code: string,
        count: number
    }>
    selectedСities?: Array<string>
}

export interface ILocationCategories {
    category: string,
    title?: string,
    active?: boolean,
    subcategoryList?: Array<{ title: string, code: string }>
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

export interface IToast {
    type: ToastType;
    text: string
}

export type ToastType = 'success' | 'warning' | 'danger';

export type PlaceDetails = {
    id?: string,
    address?: string, // ул. Ислама Каримова, 17
    categoryCode: string, // RESTAURANTS
    cityName: string, // Ташкент
    subcategory?: string, // Бар
    title?: string,// Чайхана
    subtitle?: string, // Узбекская кухня
    priceRange?: number, // Средний чек: $, $$ или $$$
    rating2GIS: number,
    ratingYandex: number,
    ratingGoogle: number,
    ratingTripadvisor: number,
    likeCount: number,
    dislikeCount: number,
    imageList?: Array<{
        type?: string,
        href: string
    }>,
    attributeList: Array<PlaceAttributeList>
}

export type PlaceAttributeList = {
    group?: number,
    type: TypeOfPlaceDetails, // DESCRIPTION | WORKING_HOURS | CUISINE | MAP | SITE | PHONE
    value: any,
    href?: {
        coordinates?: {
            lat: number,
            lon: number
        },
        phone?: string,
        link?: string,
        yandexOrgId?: number
    }
}

export enum ECategoryCodes {
    restaurants = 'food',
    museums = 'art',
    nature = 'nature'
}

export enum TypeOfPlaceDetails {
    description = 'DESCRIPTION',
    hours = 'WORKING_HOURS',
    cuisine = 'CUISINE',
    map = 'MAP',
    site = 'SITE',
    phone = 'PHONE',
    infoSource = 'INFO_SOURCE',
    awards = 'AWARDS'
}

export enum HelpPageSections {
    Contacts = 'phones',
    Support = 'support',
    Questions = 'questions'
}

export interface VisitsAmount {
    amount: number;
}

export interface FbCreateResponse {
    name: string;
}