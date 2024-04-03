import { ECategoryCodes, ILocationCategories } from "../interfaces";

export const headerHeightInDesktop = 80;
export const headerHeightInMobile = 64;

export const locationInfoMapping = {
    WORKING_HOURS: 'Время работы',
    MAP: 'Адрес',
    PHONE: 'Контакты',
    DESCRIPTION: 'Описание',
    AWARDS: 'Награды\nи подборки',
    INFO_SOURCE: 'Источники информации',
    rating2GIS: '2gis',
    ratingGoogle: 'Google Maps',
    ratingTripadvisor: 'Tripadvisor',
    ratingYandex: 'Яндекс Карты'
};

export const CATEGORYCODES: Array<ILocationCategories> = [
    {
        code: ECategoryCodes.Restaurants,
        name: 'Еда'
    },
    {
        code: ECategoryCodes.Museums,
        name: 'Искусство'
    },
    {
        code: ECategoryCodes.Nature,
        name: 'Природа'
    }
];

export const allRatingName: Array<string> = ['rating2GIS', 'ratingGoogle', 'ratingTripadvisor', 'ratingYandex'];