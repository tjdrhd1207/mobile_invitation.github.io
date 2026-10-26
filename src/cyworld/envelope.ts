// 계좌 선택용 도트 편지봉투 (minimi.ts 와 같은 방식: 한 칸 = 한 픽셀)
// o: 테두리, b: 봉투 몸통, f: 봉투 덮개, h: 하트, '.': 투명
const W = 32;
const H = 22;

type Palette = { o: string; b: string; f: string; h: string };

// 신랑측: 크림 + 주황 테두리 + 금색 하트 / 신부측: 핑크 + 진분홍 테두리 + 빨간 하트
const PALETTES: Record<'groom' | 'bride', Palette[]> = {
    groom: [
        { o: '#d9921f', b: '#f8efd9', f: '#f3e6c6', h: '#c9a046' },
        { o: '#d9921f', b: '#f1e8cf', f: '#f1e8cf', h: '#c9a046' },
        { o: '#c9a46a', b: '#e3dccb', f: '#d9d0bb', h: '#c9a046' },
    ],
    bride: [
        { o: '#b0687e', b: '#f9dbe3', f: '#f1c4d1', h: '#d0303f' },
        { o: '#b0687e', b: '#f3c9d6', f: '#e9b3c4', h: '#d0303f' },
        { o: '#a35a71', b: '#e6b6c8', f: '#d29ab0', h: '#d0303f' },
    ],
};

const HEART = [
    '.hh.hh.',
    'hhhhhhh',
    'hhhhhhh',
    '.hhhhh.',
    '..hhh..',
    '...h...',
];

// 위에서 x 위치의 대각선 높이 (가운데로 갈수록 내려가거나 올라가는 계단 모양)
const diagonal = (x: number, edgeY: number, centerY: number) => {
    const t = Math.min(x, W - 1 - x) / ((W - 1) / 2);
    return Math.round(edgeY + (centerY - edgeY) * t);
};

// 닫힌 봉투: 직사각형 몸통 + V자 덮개
function closedEnvelope() {
    const top = 2;
    return Array.from({ length: H }, (_, y) =>
        Array.from({ length: W }, (_, x) => {
            if (y < top) return '.';
            if (y === top || y === H - 1 || x === 0 || x === W - 1) return 'o';
            const flapY = diagonal(x, top, 12);
            if (y === flapY) return 'o';
            return y < flapY ? 'f' : 'b';
        }).join('')
    );
}

// 열린 봉투: 지붕처럼 위로 솟은 덮개
function openEnvelope() {
    const shoulder = 8;
    return Array.from({ length: H }, (_, y) =>
        Array.from({ length: W }, (_, x) => {
            const roofY = diagonal(x, shoulder, 0);
            if (y < roofY) return '.';
            if (y === roofY || y === H - 1 || x === 0 || x === W - 1) return 'o';
            return 'b';
        }).join('')
    );
}

function withHeart(rows: string[]) {
    const left = Math.floor((W - HEART[0].length) / 2);
    const top = 11;
    return rows.map((row, y) => {
        const heartRow = HEART[y - top];
        if (!heartRow) return row;
        return [...row].map((ch, x) => (heartRow[x - left] === 'h' ? 'h' : ch)).join('');
    });
}

function toSvg(rows: string[], palette: Palette) {
    const rects = rows.flatMap((row, y) =>
        [...row].map((ch, x) => {
            const color = palette[ch as keyof Palette];
            return color ? `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>` : '';
        })
    ).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">${rects}</svg>`;
}

const CLOSED = withHeart(closedEnvelope());
const OPEN = withHeart(openEnvelope());

// 선택된 칸은 열린 봉투, 나머지는 닫힌 봉투
export function envelopeSrc(groupId: 'groom' | 'bride', index: number, selected: boolean) {
    const palettes = PALETTES[groupId];
    const palette = palettes[index % palettes.length];
    const rows = selected ? OPEN : CLOSED;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(toSvg(rows, palette))}`;
}
