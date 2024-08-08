import { RespArticlesData } from "@app/shared/interfaces";

export const MOCK_ARTICLES_FOR_SKELETON: any = [
    {
        "id": "6d65891f-624f-48cb-9a1d-705og53bc9ff",
        "title": "Статья 1",
        "viewCount": 22,
        "published": new Date('2024-03-12T10:43:04.31')
    },
    {
        "id": "a3f799d2-cb68-44b1-8fa6-3dkf5t554f0e",
        "title": "Статья 2",
        "viewCount": 122,
        "published": new Date('2024-02-11T11:08:04.31')
    },
    {
        "id": "akf999d2-cb68-44b1-8fa6-3dkf5t554f0e",
        "title": "Статья 3",
        "viewCount": 2,
        "published": new Date('2024-02-11T11:08:04.31')
    },
    {
        "id": "a3f799d2-cb68-44b1-8fa6-3dchwt554f0e",
        "title": "Статья 4",
        "viewCount": 52,
        "published": new Date('2024-02-11T11:08:04.31')
    }
];

export const MOCK_ARTICLES: RespArticlesData = {
    size: 5,
    totalElements: 17,
    totalPages: 3,
    last: false,
    first: true,
    content: [
        {
            "id": "6d65891f-624f-48cb-9a1d-7059ad3bc9ff",
            "title": "Статья 1",
            "imageUrl": "https://static.dazzlink.asia/article/new/article_1.jpg",
            "viewCount": 22,
            "published": new Date('2024-02-12T11:08:04.31')
        },
        {
            "id": "a3f799d2-cb68-44b1-8fa6-3dbd6t554f0e",
            "title": "Статья 2",
            "imageUrl": "https://static.dazzlink.asia/article/new/article_2.jpg",
            "viewCount": 12,
            "published": new Date('2024-02-11T11:08:04.31')
        },
        {
            "id": "a3f799d2-cb68-44b1-8fa6-3d6d6e554f0e",
            "title": "Статья 3",
            "imageUrl": "https://static.dazzlink.asia/article/new/article_3.jpg",
            "viewCount": 12,
            "published": new Date('2024-02-11T12:08:04.31')
        },
        {
            "id": "a3f799d2-cb68-44b1-8fa6-3dbo6e554f0e",
            "title": "Статья 4",
            "imageUrl": "https://static.dazzlink.asia/article/new/article_4.jpg",
            "viewCount": 12,
            "published": new Date('2024-02-11T11:09:04.31')
        },
        {
            "id": "a3f799d2-cb68-44b1-8fa6-3dbx6e554f0e",
            "title": "Статья 5",
            "imageUrl": "https://static.dazzlink.asia/article/new/article_5.jpg",
            "viewCount": 12,
            "published": new Date('2024-02-13T11:08:04.31')
        },
        {
            "id": "a3f799d2-cb68-44b1-8fa6-3dmd6e554f0e",
            "title": "Статья 6",
            "imageUrl": "https://static.dazzlink.asia/article/new/article_6.jpg",
            "viewCount": 12,
            "published": new Date('2024-02-14T11:08:04.31')
        },
        {
            "id": "a3f799d2-cb68-44b1-8fa6-3dsd6e554f0e",
            "title": "Статья 7",
            "imageUrl": "https://static.dazzlink.asia/article/new/article_7.jpg",
            "viewCount": 12,
            "published": new Date('2024-02-14T11:08:04.31')
        },
        {
            "id": "a3f799d2-cb68-44b1-8fa6-3dfd6e554f0e",
            "title": "Статья 8",
            "imageUrl": "https://static.dazzlink.asia/article/new/article_8.jpg",
            "viewCount": 12,
            "published": new Date('2024-02-14T11:08:04.31')
        }
    ]
};