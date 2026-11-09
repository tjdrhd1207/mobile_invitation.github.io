// 방명록 미니미 꾸미기용 도트 파츠
// 캔버스 16 x 24, 한 글자 = 한 픽셀, '.'은 투명
// 그리는 순서: 몸 → 의상 → 머리 (뒤 레이어가 앞 레이어를 덮는다)
//
// 글자 의미
//   K 외곽선   E 눈   R 볼/리본   M 입   W 속옷   w 흰색 장식
//   S 피부     s 피부 그림자
//   H 머리색   h 머리 그림자
//   O 의상색   o 의상 그림자
//   P 바지(남색)   Y 금색 장식
//
// 나중에 PNG 파츠로 바꿀 때는 renderMinimi()만 이미지 겹치기로 바꾸면 된다.

export const WIDTH = 16;
export const HEIGHT = 24;

type Part = { name: string; top: number; rows: string[] };

const BODY: Part = {
    name: '몸',
    top: 2,
    rows: [
        '.....KKKKKK.....',
        '...KKSSSSSSKK...',
        '..KSSSSSSSSSSK..',
        '.KSSSSSSSSSSSSK.',
        '.KSSSSSSSSSSSSK.',
        '.KSSSESSSSESSSK.',
        '.KSSSESSSSESSSK.',
        '.KSRRSSSSSSRRSK.',
        '..KSSSSMMSSSSK..',
        '...KKSSSSSSKK...',
        '......KSSK......',
        '...KKWWWWWWKK...',
        '..KSKWWWWWWKSK..',
        '..KSKWWWWWWKSK..',
        '..KSKWWWWWWKSK..',
        '..KSKWWWWWWKSK..',
        '...KKWWWWWWKK...',
        '....KWWKKWWK....',
        '....KSSKKSSK....',
        '....KSSKKSSK....',
        '...KKKK..KKKK...',
    ],
};

export const SKINS = [
    { name: '밝은 피부', color: '#ffe3c8' },
    { name: '보통 피부', color: '#f5c59b' },
    { name: '구릿빛 피부', color: '#c98b5e' },
];

export const HAIRS: Part[] = [
    { name: '없음', top: 0, rows: [] },
    {
        name: '짧은 머리',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHHHHHK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHHHK.',
            '.KHHHHHhHHHHHHK.',
            '.KHHHhHHHhHHHHK.',
            '.KH..........HK.',
            '.KK..........KK.',
        ],
    },
    {
        name: '긴 생머리',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHHHHHK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHHHK.',
            '.KHHHHHHHHHHHHK.',
            'KHHHhHHHHHHhHHHK',
            'KHH..........HHK',
            'KHH..........HHK',
            'KHH..........HHK',
            'KHH..........HHK',
            'KHHK........KHHK',
            'KHHK........KHHK',
            'KHHK........KHHK',
            '.KK..........KK.',
        ],
    },
    {
        name: '단발',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHHHHHK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHHHK.',
            '.KHHHHHHHHHHHHK.',
            'KHHHhHHHHHHhHHHK',
            'KHH..........HHK',
            'KHH..........HHK',
            'KHH..........HHK',
            '.KHhK......KhHK.',
            '..KK........KK..',
        ],
    },
    {
        name: '양갈래',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHHHHHK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHHHK.',
            '.KHHHHHHHHHHHHK.',
            '.KHHHhHHHhHHHHK.',
            'RRK..........KRR',
            'KHK..........KHK',
            'KHK..........KHK',
            'KHHK........KHHK',
            'KhHK........KHhK',
            '.KK..........KK.',
        ],
    },
    {
        name: '스포츠머리',
        top: 2,
        rows: [
            '.....KKKKKK.....',
            '...KKHHHHHHKK...',
            '..KHHHHHHHHHHK..',
            '.KHhHhHhHhHhHHK.',
            '.KH..........HK.',
        ],
    },
    {
        name: '가르마펌',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHKHHHK...',
            '..KHHHHHKHHHHK..',
            '.KHHHHHHKhHHHHK.',
            '.KHHHHHHHhhHHHK.',
            '.KHHHHHhh..hHHK.',
            '.KH.........hHK.',
            '.KK..........KK.',
        ],
    },
    {
        name: '웨이브펌',
        top: 1,
        rows: [
            '...KKKKKKKKKK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHHHK.',
            'KHHHHHHHHHHHHHHK',
            'KHHHHhHHHHhHHHHK',
            'KHHHhHHHHHHhHHHK',
            'KHh..........hHK',
            '.KHH........HHK.',
            'KHHh........hHHK',
            'KhHK........KHhK',
            '.KHHK......KHHK.',
            'KHHhK......KhHHK',
            'KhHHK......KHHhK',
            '.KHHK......KHHK.',
            'KHhK........KhHK',
            '.KK..........KK.',
        ],
    },
    {
        name: '뽀글펌',
        top: 0,
        rows: [
            '....KKK..KKK....',
            '...KHHHKKHHHK...',
            '..KHHhHHHHhHHK..',
            '.KHHHHHHHHHHHHK.',
            'KHHhHHHhHHHhHHHK',
            'KHHHHHHHHHHHHHHK',
            'KHhHhHhHHhHhHhHK',
            'KHH..........HHK',
            'KhH..........HhK',
            '.KHH........HHK.',
            'KHHhK......KhHHK',
            '.KHHK......KHHK.',
            '..KK........KK..',
        ],
    },
    {
        name: '꽃핀단발',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHHHHHK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHRRK.',
            '.KHHHHHHHHHRYRK.',
            'KHHHhHHHHHHhRRHK',
            'KHH..........HHK',
            'KHH..........HHK',
            'KHH..........HHK',
            '.KHhK......KhHK.',
            '..KK........KK..',
        ],
    },
    {
        name: '아줌마파마',
        top: 0,
        rows: [
            '...KKK.KK.KKK...',
            '..KHHHKHHKHHHK..',
            '.KHhHHHhHHhHHHK.',
            'KHHHhHHHHhHHhHHK',
            'KHhHHHhHHHHhHHhK',
            'KHHHHhHHhHHHHhHK',
            'KHhHhHhHhHhHhHhK',
            'KHH..........HHK',
            'KHh..........hHK',
            'KhHH........HHhK',
            '.KHH........HHK.',
            '..KK........KK..',
        ],
    },
    {
        name: '여고생머리',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHKHHHK...',
            '..KHHHHHKHHHHK..',
            '.KHHHHHHKHHHHHK.',
            '.KHHHHHhhHHHHHK.',
            'KHHHhHHHHHHhHHHK',
            'KHH..........HHK',
            'KHH..........HHK',
            'KHH..........HHK',
            'KHH..........HHK',
            'KHHK........KHHK',
            'KHHK........KHHK',
            '.KK..........KK.',
        ],
    },
    {
        name: '땋은머리',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHHHHHK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHHHK.',
            '.KHHHHhHHhHHHHK.',
            '.KHHH......HHHK.',
            'KHK..........KHK',
            'KHK..........KHK',
            'KHK..........KHK',
            'KhK..........KhK',
            'KHK..........KHK',
            'KhK..........KhK',
            'KHK..........KHK',
            '.R............R.',
            '.H............H.',
        ],
    },
    {
        name: '큐트쇼트',
        top: 0,
        rows: [
            '.........K......',
            '....KKKKKHKK....',
            '...KHHHHHHHHK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHHHK.',
            '.KHHhHHhHHhHHHK.',
            '.KHHKHHKHHKHHHK.',
            '.KH..........HK.',
            '.KH..........HK.',
            '.KK..........KK.',
        ],
    },
    {
        name: '큐티웨이브',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHHHHHK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHHHK.',
            'KHHHhHHHHHHhHHHK',
            'KHhHH......HHhHK',
            'KHH..........HHK',
            '.KHH........HHK.',
            'KHHh........hHHK',
            'KhHHK......KHHhK',
            '.KHHK......KHHK.',
            '..KK........KK..',
        ],
    },
    {
        name: '업스타일',
        top: 0,
        rows: [
            '......KKKK......',
            '.....KHHhHK.....',
            '....KKRRRRKK....',
            '..KKHHHHHHHHKK..',
            '.KHHHHHHHHHHHHK.',
            '.KHHHHhHHhHHHHK.',
            '.KHH........HHK.',
            '.KH..........HK.',
            '.KK..........KK.',
        ],
    },
    {
        name: '울프컷',
        top: 1,
        rows: [
            '....KKKKKKKK....',
            '...KHHHHHHHHK...',
            '..KHHHHHHHHHHK..',
            '.KHHHHHHHHHHHHK.',
            'KHHHHhHHHHhHHHHK',
            'KHHKHHKHHKHHKHHK',
            'KHH..........HHK',
            'KHHK........KHHK',
            'KHH..........HHK',
            '.KHK........KHK.',
            'KHHK........KHHK',
            'KHK..........KHK',
            '.K............K.',
        ],
    },
];

// 상의만 있는 의상에 붙이는 긴 바지 (몸의 18~21행)
const LONG_PANTS = [
    '...KKPPPPPPKK...',
    '....KPPKKPPK....',
    '....KPPKKPPK....',
    '....KPPKKPPK....',
];

export const OUTFITS: Part[] = [
    { name: '기본', top: 0, rows: [] },
    {
        name: '티셔츠',
        top: 13,
        rows: [
            '...KKOwwwwOKK...',
            '..KOKOOOOOOKOK..',
            '..KSKOOOOOOKSK..',
            '..KSKOOOOOOKSK..',
            '..KSKOOOOOOKSK..',
            '...KKooooooKK...',
            '....KooKKooK....',
        ],
    },
    {
        name: '원피스',
        top: 13,
        rows: [
            '...KKOwwwwOKK...',
            '..KOKOOOOOOKOK..',
            '..KSKOOOOOOKSK..',
            '..KSKOooooOKSK..',
            '..KSKOOOOOOKSK..',
            '...KOOOOOOOOK...',
            '...KOOOOOOOOK...',
            '...KKKKKKKKKK...',
        ],
    },
    {
        name: '턱시도',
        top: 13,
        rows: [
            '...KKOwRRwOKK...',
            '..KOKOOwwOOKOK..',
            '..KOKOOwwOOKOK..',
            '..KOKOOwwOOKOK..',
            '..KSKOOOOOOKSK..',
            '...KKooooooKK...',
            '....KooKKooK....',
            '....KooKKooK....',
            '....KooKKooK....',
        ],
    },
    {
        name: '웨딩드레스',
        top: 13,
        rows: [
            '...KKwwwwwwKK...',
            '..KSKwwwwwwKSK..',
            '..KSKwwwwwwKSK..',
            '..KSKwOOOOwKSK..',
            '..KSKwwwwwwKSK..',
            '..KwwwwwwwwwwK..',
            '..KwwwwwwwwwwK..',
            '.KwwwwwwwwwwwwK.',
            '.KwwwwwwwwwwwwK.',
            '.KKKKKKKKKKKKKK.',
        ],
    },
    {
        name: '패딩점퍼',
        top: 13,
        rows: [
            '..KKOOwwwwOOKK..',
            '.KOOKOOOOOOKOOK.',
            '.KooKooooooKooK.',
            '.KOOKOOOOOOKOOK.',
            '.KYYKYYYYYYKYYK.',
            '..KSKKKKKKKKSK..',
            ...LONG_PANTS.slice(1),
        ],
    },
    {
        name: '후드조끼',
        top: 13,
        rows: [
            '..KKOOOwwOOOKK..',
            '..KwKOOwwOOKwK..',
            '..KwKOOwwOOKwK..',
            '..KwKOOYwOOKwK..',
            '..KSKOOOOOOKSK..',
            ...LONG_PANTS,
        ],
    },
    {
        name: '캐주얼정장',
        top: 13,
        rows: [
            '...KKOwYYwOKK...',
            '..KOKOwYYwOKOK..',
            '..KOKOOYYOOKOK..',
            '..KOKOOOOOOKOK..',
            '..KSKOOOOOOKSK..',
            ...LONG_PANTS,
        ],
    },
    {
        name: '도트원피스',
        top: 13,
        rows: [
            '...KKOOOOOOKK...',
            '..KSKOwOOwOKSK..',
            '..KSKRRRRRRKSK..',
            '..KSKOOwOOOKSK..',
            '..KSKOwOOwOKSK..',
            '...KOOOwOOOOK...',
            '...KOwOOOOwOK...',
            '...KwwwwwwwwK...',
            '...KKKKKKKKKK...',
        ],
    },
    {
        name: '레이어드후드',
        top: 13,
        rows: [
            '..KKOOOOOOOOKK..',
            '..KOKOwOOwOKOK..',
            '..KOKOwOOwOKOK..',
            '..KwKOOOOOOKwK..',
            '..KSKooooooKSK..',
            ...LONG_PANTS,
        ],
    },
    {
        name: '도트셔츠',
        top: 13,
        rows: [
            '...KKwwKKwwKK...',
            '..KwKwOwwOwKwK..',
            '..KSKOwwOwwKSK..',
            '..KSKwwOwwOKSK..',
            '..KSKwOwwOwKSK..',
            ...LONG_PANTS,
        ],
    },
    {
        name: '하트티셔츠',
        top: 13,
        rows: [
            '...KKOOOOOOKK...',
            '..KOKOROROOKOK..',
            '..KOKORRROOKOK..',
            '..KOKOOROOOKOK..',
            '..KSKOOOOOOKSK..',
            ...LONG_PANTS,
        ],
    },
    {
        name: '베스트블라우스',
        top: 13,
        rows: [
            '...KKwwRRwwKK...',
            '..KwKOwwwwOKwK..',
            '..KSKOOwwOOKSK..',
            '..KSKOOwwOOKSK..',
            '..KSKOOOOOOKSK..',
            '...KOOOOOOOOK...',
            '...KoOoOoOoOK...',
            '...KKKKKKKKKK...',
        ],
    },
    {
        name: '세일러셔츠',
        top: 13,
        rows: [
            '..KOOOwwwwOOOK..',
            '..KwKwOooOwKwK..',
            '..KwKwwoowwKwK..',
            '..KSKwwwwwwKSK..',
            '..KSKwwwwwwKSK..',
            '...KPPPPPPPPK...',
            '...KPPPPPPPPK...',
            '...KKKKKKKKKK...',
        ],
    },
    {
        name: '퍼프블라우스',
        top: 13,
        rows: [
            '...KKOwOOwOKK...',
            '.KOOKOOwOOOKOOK.',
            '.KOOKOOOOOOKOOK.',
            '..KSKOOwOOOKSK..',
            '..KSKOOOOOOKSK..',
            ...LONG_PANTS,
        ],
    },
    {
        name: '트레이닝복',
        top: 13,
        rows: [
            '...KKwOOOOwKK...',
            '..KwKOOwOOOKwK..',
            '..KwKOOwOROKwK..',
            '..KwKOOwOOOKwK..',
            '..KSKwwwwwwKSK..',
            '...KKOOOOOOKK...',
            '....KOwKKwOK....',
            '....KOwKKwOK....',
            '....KOwKKwOK....',
        ],
    },
    {
        name: '파자마원피스',
        top: 13,
        rows: [
            '...KKwwwwwwKK...',
            '..KOKOOOOOOKOK..',
            '..KOKOOOOOOKOK..',
            '..KwKOOOOOOKwK..',
            '..KSKOOOOOOKSK..',
            '..KOOOOOOOOOOK..',
            '..KOOOOOOOOOOK..',
            '..KOOOOOOOOOOK..',
            '..KwwwwwwwwwwK..',
            '..KKKKKKKKKKKK..',
        ],
    },
];

// 저장된 방명록은 색 순번(index)을 기억하므로, 새 색은 항상 뒤에 추가한다
export const HAIR_COLORS = [
    '#2b2b2b', // 검정
    '#6b3a22', // 진갈색
    '#b5733a', // 갈색
    '#e8c25a', // 금발
    '#f08fb0', // 핑크
    '#8e2c3e', // 와인
    '#d9653b', // 오렌지
    '#9a9a9a', // 애쉬그레이
    '#3d5aa8', // 블루
    '#8a6bc8', // 보라
    '#4a3328', // 다크브라운
    '#c9a27a', // 밀크브라운
    '#f3e2a9', // 플래티넘 블론드
    '#e8e8e8', // 은발
    '#c0392b', // 레드
    '#ff9e7a', // 코랄
    '#f6b8d1', // 베이비핑크
    '#5fc2b0', // 민트
    '#2f6b4f', // 딥그린
    '#1f2a4d', // 네이비
];
export const OUTFIT_COLORS = [
    '#3d8fd6', // 파랑
    '#f29bb5', // 분홍
    '#333333', // 검정
    '#f2c94c', // 노랑
    '#6cc08b', // 초록
    '#9b7fd1', // 보라
    '#e5484d', // 빨강
    '#9fd3f2', // 하늘
    '#f4efe4', // 아이보리
    '#8b5a3c', // 브라운
    '#1f2a4d', // 네이비
    '#f28c38', // 주황
    '#7fcfc0', // 민트
    '#c9b6e8', // 라벤더
    '#ffd6e0', // 연분홍
    '#fff3a8', // 레몬
    '#8a1c2b', // 버건디
    '#5a6b3a', // 카키
    '#9aa3ad', // 그레이
    '#c8a882', // 베이지
];

export type MinimiConfig = {
    skin: number;
    hair: number;
    hairColor: number;
    outfit: number;
    outfitColor: number;
};

export const DEFAULT_MINIMI: MinimiConfig = { skin: 0, hair: 1, hairColor: 0, outfit: 1, outfitColor: 0 };

// 저장된 값이 범위를 벗어나도 깨지지 않게 보정
const pick = (value: unknown, length: number) =>
    Number.isInteger(value) && (value as number) >= 0 && (value as number) < length ? (value as number) : 0;

export function normalizeMinimi(value: Partial<MinimiConfig> | undefined): MinimiConfig {
    return {
        skin: pick(value?.skin, SKINS.length),
        hair: pick(value?.hair, HAIRS.length),
        hairColor: pick(value?.hairColor, HAIR_COLORS.length),
        outfit: pick(value?.outfit, OUTFITS.length),
        outfitColor: pick(value?.outfitColor, OUTFIT_COLORS.length),
    };
}

function shade(hex: string, amount = 0.25) {
    const n = parseInt(hex.slice(1), 16);
    const ch = (shift: number) => Math.round(((n >> shift) & 255) * (1 - amount));
    return `#${[16, 8, 0].map(s => ch(s).toString(16).padStart(2, '0')).join('')}`;
}

function paletteFor(cfg: MinimiConfig): Record<string, string> {
    const skin = SKINS[cfg.skin].color;
    const hair = HAIR_COLORS[cfg.hairColor];
    const outfit = OUTFIT_COLORS[cfg.outfitColor];
    return {
        K: '#3b2b2b',
        E: '#2b2b2b',
        R: '#ff8fa3',
        M: '#d9566e',
        W: '#ffffff',
        w: '#ffffff',
        P: '#3b4a6b',
        Y: '#f2c94c',
        S: skin,
        s: shade(skin, 0.15),
        H: hair,
        h: shade(hair),
        O: outfit,
        o: shade(outfit),
    };
}

function toDataUri(grid: string[][], palette: Record<string, string>) {
    // 같은 색이 가로로 이어지면 사각형 하나로 합쳐 SVG 크기를 줄인다
    const rects: string[] = [];
    grid.forEach((row, y) => {
        let x = 0;
        while (x < row.length) {
            const color = palette[row[x]];
            let end = x + 1;
            while (end < row.length && row[end] === row[x]) end++;
            if (color) rects.push(`<rect x="${x}" y="${y}" width="${end - x}" height="1" fill="${color}"/>`);
            x = end;
        }
    });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" shape-rendering="crispEdges">${rects.join('')}</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function compose(parts: Part[]) {
    const grid = Array.from({ length: HEIGHT }, () => Array<string>(WIDTH).fill('.'));
    for (const part of parts) {
        part.rows.forEach((row, dy) => {
            [...row].forEach((ch, x) => {
                if (ch !== '.') grid[part.top + dy][x] = ch;
            });
        });
    }
    return grid;
}

const cache = new Map<string, string>();

function render(key: string, parts: Part[], cfg: MinimiConfig) {
    let uri = cache.get(key);
    if (!uri) {
        uri = toDataUri(compose(parts), paletteFor(cfg));
        cache.set(key, uri);
    }
    return uri;
}

/** 몸 + 의상 + 머리를 겹친 미니미 이미지 */
export function renderMinimi(value: Partial<MinimiConfig> | undefined) {
    const cfg = normalizeMinimi(value);
    const key = `m:${cfg.skin}-${cfg.hair}-${cfg.hairColor}-${cfg.outfit}-${cfg.outfitColor}`;
    return render(key, [BODY, OUTFITS[cfg.outfit], HAIRS[cfg.hair]], cfg);
}

/** 선택 목록에 보여줄 파츠 단독 이미지 */
export function renderPart(kind: 'hair' | 'outfit', index: number, colorIndex: number) {
    const cfg = normalizeMinimi(
        kind === 'hair' ? { hair: index, hairColor: colorIndex } : { outfit: index, outfitColor: colorIndex },
    );
    const part = kind === 'hair' ? HAIRS[cfg.hair] : OUTFITS[cfg.outfit];
    return render(`${kind}:${index}-${colorIndex}`, [part], cfg);
}
