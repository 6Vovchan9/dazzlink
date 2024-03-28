// Пример 1:
type objType1 = {
    one: string,
    two: number
}

type objType2 = {
    three: boolean
}

type objCommonType = objType1 & objType2;

// Пример 2:
interface IMy1 {
    one: string,
    two: number
}

interface IMy2 extends IMy1 {
    three: boolean
}

// Пример 3:
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

// Пример 4 (когда не можем указать тип или интерфейс для переменной):
const str4 = 'Hello';
const anyString: typeof str4 = 'Hello';

const obj4 = {
    name: 'Ivan',
    age: 12
}
const func4 = (myObject: typeof obj4) => { }
func4({name: 'Petr', age: 32});

// Пример 5:
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

// Остальное:
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