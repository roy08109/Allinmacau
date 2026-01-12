// Data Store for All in Macau
// This file contains all the static content for the application in 3 languages.

const APP_DATA = {
    concerts: [
        {
            id: 'c1',
            date: '2025-10-15',
            artist: { cn: '陈奕迅', tw: '陳奕迅', en: 'Eason Chan' },
            title: { cn: 'Fear and Dreams 世界巡回演唱会', tw: 'Fear and Dreams 世界巡迴演唱會', en: 'Fear and Dreams World Tour' },
            venue: { cn: '威尼斯人金光综艺馆', tw: '威尼斯人金光綜藝館', en: 'Cotai Arena, The Venetian Macao' },
            price: 'MOP 580 - 1680',
            image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80',
            tags: ['pop']
        },
        {
            id: 'c2',
            date: '2025-11-05',
            artist: { cn: '西城男孩', tw: '西城男孩', en: 'Westlife' },
            title: { cn: 'The Wild Dreams Tour', tw: 'The Wild Dreams Tour', en: 'The Wild Dreams Tour' },
            venue: { cn: '澳门伦敦人综艺馆', tw: '澳門倫敦人綜藝館', en: 'The Londoner Arena' },
            price: 'MOP 688 - 1888',
            image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
            tags: ['pop', 'international']
        }
    ],
    food: {
        categories: [
            { id: 'old_brand', label: { cn: '老字号', tw: '老字號', en: 'Heritage' } },
            { id: 'cuisine', label: { cn: '特色菜', tw: '特色菜', en: 'Cuisine' } },
            { id: 'snack', label: { cn: '网红小吃', tw: '網紅小吃', en: 'Snacks' } }
        ],
        items: [
            {
                id: 'f1',
                category: 'old_brand',
                name: { cn: '安德鲁饼店', tw: '安德魯餅店', en: 'Lord Stow\'s Bakery' },
                dish: { cn: '葡式蛋挞', tw: '葡式蛋撻', en: 'Portuguese Egg Tart' },
                price: 'MOP 10-20',
                location: { cn: '路环市区', tw: '路環市區', en: 'Coloane Village' },
                image: 'https://images.unsplash.com/photo-1563532930263-d3493722510b?w=800&q=80'
            },
            {
                id: 'f2',
                category: 'cuisine',
                name: { cn: '番茄屋葡式美食', tw: '番茄屋葡式美食', en: 'Tomato House' },
                dish: { cn: '葡国鸡, 阿里巴巴焗鸡扒', tw: '葡國雞, 阿里巴巴焗雞扒', en: 'Portuguese Chicken' },
                price: 'MOP 50-100',
                location: { cn: '大三巴附近', tw: '大三巴附近', en: 'Near Ruins of St. Paul\'s' },
                image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80'
            }
        ]
    },
    attractions: [
        {
            id: 'a1',
            category: 'history',
            name: { cn: '大三巴牌坊', tw: '大三巴牌坊', en: 'Ruins of St. Paul\'s' },
            desc: { cn: '澳门标志性建筑，圣保禄学院天主之母教堂遗址。', tw: '澳門標誌性建築，聖保祿學院天主之母教堂遺址。', en: 'The most famous landmark of Macau, ruins of a 17th-century Catholic religious complex.' },
            tips: { cn: '建议上午9点前到达避开人流。', tw: '建議上午9點前到達避開人流。', en: 'Arrive before 9 AM to avoid crowds.' },
            transport: { cn: '公交 3, 3X, 4, 6A', tw: '公交 3, 3X, 4, 6A', en: 'Bus 3, 3X, 4, 6A' },
            image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80'
        },
        {
            id: 'a2',
            category: 'leisure',
            name: { cn: '澳门旅游塔', tw: '澳門旅遊塔', en: 'Macau Tower' },
            desc: { cn: '集观光、美食、冒险于一体的地标。', tw: '集觀光、美食、冒險於一體的地標。', en: 'Convention & Entertainment Centre with panoramic views.' },
            tips: { cn: '下午6点看日落最美。', tw: '下午6點看日落最美。', en: 'Sunset views at 6 PM are best.' },
            transport: { cn: '公交 9A, 18, 23, 32', tw: '公交 9A, 18, 23, 32', en: 'Bus 9A, 18, 23, 32' },
            image: 'https://images.unsplash.com/photo-1518182170546-0766aa6f79fa?w=800&q=80'
        }
    ],
    transport: {
        shuttle: [
            {
                route: { cn: '关闸 ↔ 威尼斯人', tw: '關閘 ↔ 威尼斯人', en: 'Border Gate ↔ Venetian' },
                time: '09:00 - 23:30',
                freq: '15-20 min'
            },
            {
                route: { cn: '关闸 ↔ 银河', tw: '關閘 ↔ 銀河', en: 'Border Gate ↔ Galaxy' },
                time: '09:00 - 23:00',
                freq: '10-15 min'
            }
        ]
    },
    tips: {
        emergency: [
            { label: { cn: '旅游热线', tw: '旅遊熱線', en: 'Tourism Hotline' }, number: '+853 2833 3000' },
            { label: { cn: '报警/急救', tw: '報警/急救', en: 'Emergency' }, number: '999' }
        ],
        cantonese: [
            { cn: '你好', tw: '你好', en: 'Hello', canto: 'Nei Hou (雷好)' },
            { cn: '谢谢', tw: '謝謝', en: 'Thank you', canto: 'Mm Goi (唔该)' },
            { cn: '多少钱', tw: '多少錢', en: 'How much', canto: 'Gei Do Cin (几多钱)' }
        ]
    }
};

window.APP_DATA = APP_DATA;
