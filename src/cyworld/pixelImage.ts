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
