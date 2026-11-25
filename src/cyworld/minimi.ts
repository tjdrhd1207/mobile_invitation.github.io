import { pixelArtToPng } from './pixelImage';

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

// SVG가 아닌 PNG로: 삼성인터넷 다크모드에서 색(특히 검은 눈)이 바뀌지 않도록 (pixelImage.ts 참고)
export const MINIMI_SRC = pixelArtToPng(ROWS, ch => PALETTE[ch]);
