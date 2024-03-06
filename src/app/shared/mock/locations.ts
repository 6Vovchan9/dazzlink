import { RovraggeRespLocationsData } from "@app/shared/interfaces";

export const MOCK_LOCATIONS_FOR_SKELETON: RovraggeRespLocationsData = {
    placeCount: 2,
    cityPlaceList: [
        {
            cityCode: "TASHKENT",
            cityTitle: "Ташкент",
            placeList: [
                {
                    "categoryCode": "RESTAURANTS",
                    "title": "Чайхана Navat и еще очень много всего инетересного",
                    "subtitle": "Узбекская кухня",
                    "subcategory": "Бар",
                    "rating": 4.5,
                    "address": "ул. Ислама Каримова, 15"
                },
                {
                    categoryCode: "RESTAURANTS",
                    "title": "Кафе у Лидии",
                    "subtitle": "Русская кухня",
                    "subcategory": "Бистро",
                    "rating": 5,
                    "address": "ул. Гагарина, 37"
                }
            ]
        },
        // {
        //   "cityCode": "ALMATY",
        //   "cityTitle": "Алматы",
        //   "placeList": [
        //     {
        //       "categoryCode": "RESTAURANTS",
        //       "title": "Старый город",
        //       "subtitle": "Европейская",
        //       "subcategory": "Ресторан",
        //       "rating": 4.2,
        //       "address": "проспект Ленина, 17",
        //     }
        //   ]
        // }
    ]
}