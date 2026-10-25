// vite-imagetools 로 변환한 이미지 import (예: photo.webp?w=1280&format=webp&imagetools)
declare module '*&imagetools' {
  const src: string;
  export default src;
}
