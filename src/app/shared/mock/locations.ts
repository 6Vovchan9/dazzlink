import { ILocationCategories, RovraggeRespLocationsData } from "@app/shared/interfaces";

export const MOCK_LOCATIONS_FOR_SKELETON: RovraggeRespLocationsData = {
    placeCount: 2,
    cityPlaceList: [
        {
            "cityCode": "ALMATY",
            "cityTitle": "Алматы",
            "placeList": [
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "10abcdefgh",
                    "subtitle": "Итальянская",
                    "subcategory": "Ресторан",
                    "rating": 5,
                    "address": "просп. Название",
                },
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "4abc",
                    "subtitle": "Европейская",
                    "subcategory": "Ресто-бар",
                    "rating": 3.9,
                    "address": "ул. Достык, 16",
                },
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "5abcd",
                    "subtitle": "Европейская",
                    "subcategory": "Кафе",
                    "rating": 4.9,
                    "address": "5-й микрорайон, 16",
                }
            ]
        },
        {
            cityCode: "TASHKENT",
            cityTitle: "Ташкент",
            placeList: [
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "10qwertyuiopasdfghjklzxcvbnmqwertyuiop",
                    "subtitle": "Итальянская",
                    "subcategory": "Ресторан",
                    "rating": 5.4,
                    "address": "просп. Кабанбай Батыра, 1",
                },
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "4abctyy",
                    "subtitle": "Европейская",
                    "subcategory": "Ресто-бар",
                    "rating": 3,
                    "address": "ул. Достык, 16",
                },
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "5abcbnytrv",
                    "subtitle": "Европейская",
                    "subcategory": "Кафе",
                    "rating": 4.9,
                    "address": "5-й микрорайон",
                }
            ]
        },
        {
            "cityCode": "ASTANA",
            "cityTitle": "Астана",
            "placeList": [
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "La Riviere",
                    "subtitle": "Итальянская",
                    "subcategory": "Ресторан",
                    "rating": 5.4,
                    "address": "просп. Кабанбай Батыра, 1",
                },
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "Ozen",
                    "subtitle": "Европейская",
                    "subcategory": "Ресто-бар",
                    "rating": 3.9,
                    "address": "ул. Достык, 16",
                },
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "Zamin",
                    "subtitle": "Европейская",
                    "subcategory": "Кафе",
                    "rating": 4,
                    "address": "5-й микрорайон, 16",
                }
            ]
        }
    ]
}

export const MOCK_CATEGORIES_FOR_SKELETON: Array<ILocationCategories> = [
    {
        code: 'RESTAURANTS',
        title: 'Еда',
    },
    {
        code: 'MUSEUMS',
        title: 'Искусство'
    },
    {
        code: 'NATURE',
        title: 'Природа'
    }
];

export const MOCK_LOCATIONS: any | RovraggeRespLocationsData = {
    "placeCount": 5,
    "cityPlaceList": [
        {
            "cityCode": "Tashkent",
            "cityTitle": "Ташкент",
            "placeList": [
                {
                    "id": "-NgTNTZzxh9cram2eEd2",
                    "categoryCode": "RESTAURANTS",
                    "title": "Чайхана Navat и еще очень много всего инетересного",
                    "subtitle": "Узбекская кухня",
                    "subcategory": "Бар",
                    "priceRange": 23,
                    "rating": 4.5,
                    "address": "ул. Ислама Каримова, 15",
                    "imageList": [
                        {
                            "type": null,
                            "href": 'assets/images/home-page/linkToArticlesX2.jpg'
                        }
                    ]
                },
                {
                    "id": "-NgVSDcz4AMZ_2JA8yMZ",
                    "title": "Кафе у Лидии",
                    "subtitle": "Русская кухня",
                    "subcategory": "Бистро",
                    "priceRange": 0,
                    "rating": 5,
                    "address": "ул. Гагарина, 37",
                    "imageList": [
                        {
                            "type": null,
                            "href": 'https://store.rosbank.ru/static/images/dbo/range_rover.png'
                        }
                    ]
                },
                {
                    "id": "-NgYZORk7JcAD5y9fYvM",
                    "title": "Angry Birds",
                    "subcategory": "Кафе",
                    "priceRange": null,
                    "rating": 3.98,
                    "address": "ул. Флерова, 4а",
                },
                {
                    "id": "-NgYZORk7JcAD5y9ffSl",
                    // "title": "Люксор",
                    "subtitle": "Боевик",
                    "subcategory": "Кинотеатр",
                    "priceRange": '1',
                    "rating": 4,
                    "address": "ул. Трубецкая, 106",
                },
            ]
        },
        {
            "cityCode": null,
            "cityTitle": "Алматы",
            "placeList": [
                {
                    "id": "-NgVRC20Iit-rnFDKsza",
                    "categoryCode": "RESTAURANTS",
                    "title": "Старый город",
                    "displayName": "Старичок",
                    "subtitle": "Европейская",
                    "subcategory": "Ресторан",
                    "priceRange": 2,
                    "rating": 4.2,
                    "address": "проспект Ленина, 17",
                    "imageList": null
                }
            ]
        },
        {
            "cityTitle": "Москва",
            "placeList": []
        },
        {
            "cityTitle": "Ереван",
        }
    ]
}