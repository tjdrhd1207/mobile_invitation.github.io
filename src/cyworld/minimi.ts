// 신랑·신부 도트 미니미 (한 글자 = 한 픽셀, '.'은 투명)
// 이미지로 바꾸고 싶으면 MINIMI_SRC 대신 import한 이미지 경로를 쓰면 된다.
const PALETTE: Record<string, string> = {
    k: '#2b2b2b', // 머리카락 / 정장
    b: '#8b4a2b', // 신부 머리
    s: '#ffd9b3', // 피부
    e: '#000000', // 눈
    r: '#ff6b8a', // 볼 / 넥타이
    w: '#ffffff', // 셔츠 / 드레스
};

const GROOM = [
    '.kkkkkk.',
    'kkkkkkkk',
    'kssssssk',
    'ssessess',
    'srssssrs',
    '.ssssss.',
    '..kwwk..',
    '.kkwwkk.',
    'kkkrrkkk',
    'skkrrkks',
    '.kkkkkk.',
    '.kkkkkk.',
    '.kk..kk.',
    '.kk..kk.',
    '.kk..kk.',
    'kkk..kkk',
];

const BRIDE = [
    '.bbbbbb.',
    'bbbbbbbb',
    'bssssssb',
    'bsessesb',
    'bsrssrsb',
    'bbssssbb',
    'b.wwww.b',
    '.wwwwww.',
    'swwwwwws',
    '.wwwwww.',
    '.wwwwww.',
    'wwwwwwww',
    'wwwwwwww',
    'wwwwwwww',
    '..s..s..',
    '..k..k..',
];

const GAP = '..';
const ROWS = GROOM.map((row, i) => row + GAP + BRIDE[i]);

function toSvg(rows: string[]) {
    const width = rows[0].length;
    const height = rows.length;
    const rects = rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
            PALETTE[ch]
                ? `<rect x="${x}" y="${y}" width="1" height="1" fill="${PALETTE[ch]}"/>`
                : ''
        )
    ).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">${rects}</svg>`;
}

export const MINIMI_SRC = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(toSvg(ROWS))}`;
