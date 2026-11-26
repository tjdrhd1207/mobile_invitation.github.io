// 도트 그림(한 글자 = 한 칸)을 PNG 이미지 주소(data:image/png)로 만든다.
//
// 예전에는 SVG로 만들었는데, 삼성인터넷 다크모드가 SVG 안의 색을 하나하나 바꿔서
// 미니미의 검은 눈이 밝게 변해 사라지는 문제가 있었다.
// PNG 같은 일반 이미지는 색을 바꾸지 않으므로 다크모드에서도 그대로 보인다.

// 작은 그림을 화면에서 키우면 흐려지므로 처음부터 크게 그려서 또렷하게
const SCALE = 8;

/**
 * @param background 배경색을 그림 안에 같이 칠함 (CSS 배경은 다크모드에서 어두워지지만 이미지 안의 색은 그대로)
 */
export function pixelArtToPng(
    rows: ArrayLike<ArrayLike<string>>,
    colorOf: (ch: string) => string | undefined,
    background?: string,
): string {
    const height = rows.length;
    const width = rows[0]?.length ?? 0;

    const canvas = document.createElement('canvas');
    canvas.width = width * SCALE;
    canvas.height = height * SCALE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    for (let y = 0; y < height; y++) {
        const row = rows[y];
        for (let x = 0; x < width; x++) {
            const color = colorOf(row[x]);
            if (!color) continue;
            ctx.fillStyle = color;
            ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
        }
    }
    return canvas.toDataURL('image/png');
}

const swatchCache = new Map<string, string>();

/**
 * 색 고르기 동그라미 (흰 테두리 + 가운데 색) PNG
 * CSS 배경색으로 칠하면 삼성인터넷 다크모드가 색을 바꿔서, 고른 색과 미니미 색이 달라 보였음
 */
export function swatchPng(color: string): string {
    let uri = swatchCache.get(color);
    if (uri) return uri;

    // 너무 작은 이미지는 다크모드가 '아이콘'으로 보고 색을 뒤집을 수 있어서 크게 만듦
    // (화면에서는 20px로 줄여서 보여줌)
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // 모서리까지 흰색으로 채워 투명한 부분이 없게 함 (투명 부분이 있으면 아이콘으로 보고 색을 뒤집음)
    // 동그란 모양은 CSS(border-radius)로 잘라서 보여줌
    const center = size / 2;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(center, center, center * 0.8, 0, Math.PI * 2);
    ctx.fill();

    uri = canvas.toDataURL('image/png');
    swatchCache.set(color, uri);
    return uri;
}
