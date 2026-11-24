import { useEffect, useRef, type RefObject } from 'react';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_DISTANCE = 24;

type Point = { x: number; y: number };
type Transform = { scale: number; x: number; y: number };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/**
 * 사진 확대/이동
 * - 모바일: 두 손가락 핀치, 확대 상태에서 한 손가락으로 이동, 두 번 탭으로 확대/원래대로
 * - PC: 휠로 확대/축소, 드래그로 이동, 더블클릭으로 확대/원래대로
 * 화면 다시 그리기 없이 img의 transform만 직접 바꿔서 손가락을 부드럽게 따라가게 함.
 *
 * @param boxRef 사진을 감싼 상자 (확대 기준 중심, 이벤트를 받는 곳)
 * @param imgRef 실제로 확대되는 이미지
 * @param resetKey 이 값이 바뀌면(다른 사진으로 넘기면) 원래 크기로
 */
export function useZoomPan(
    boxRef: RefObject<HTMLElement | null>,
    imgRef: RefObject<HTMLImageElement | null>,
    resetKey: unknown,
) {
    const t = useRef<Transform>({ scale: 1, x: 0, y: 0 });
    // 핀치/드래그를 한 번이라도 했으면 이번 터치는 '사진 넘기기'로 보지 않음
    const gestured = useRef(false);

    const apply = (next: Transform, animate = false) => {
        const img = imgRef.current;
        if (!img) return;

        // 사진이 상자 밖으로 끌려 나가 빈 공간이 생기지 않도록 이동 범위 제한
        const maxX = ((next.scale - 1) * img.offsetWidth) / 2;
        const maxY = ((next.scale - 1) * img.offsetHeight) / 2;
        t.current = {
            scale: next.scale,
            x: clamp(next.x, -maxX, maxX),
            y: clamp(next.y, -maxY, maxY),
        };
        img.style.transition = animate ? 'transform 0.2s ease-out' : 'none';
        img.style.transform = `translate(${t.current.x}px, ${t.current.y}px) scale(${t.current.scale})`;
    };

    // focus(화면 좌표)에 있는 사진 부분이 그 자리에 머물도록 배율을 바꿈
    const zoomAt = (from: Transform, focusStart: Point, focusNow: Point, scale: number, animate = false) => {
        const box = boxRef.current;
        if (!box) return;
        const rect = box.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // 처음 손가락 위치에 있던 사진 속 지점 (확대 전 기준 좌표)
        const qx = (focusStart.x - cx - from.x) / from.scale;
        const qy = (focusStart.y - cy - from.y) / from.scale;
        const s = clamp(scale, MIN_SCALE, MAX_SCALE);
        apply({ scale: s, x: focusNow.x - cx - s * qx, y: focusNow.y - cy - s * qy }, animate);
    };

    const toggleZoom = (at: Point) => {
        if (t.current.scale > 1) apply({ scale: 1, x: 0, y: 0 }, true);
        else zoomAt(t.current, at, at, DOUBLE_TAP_SCALE, true);
    };

    // 사진을 넘기면 원래 크기로
    useEffect(() => {
        t.current = { scale: 1, x: 0, y: 0 };
        gestured.current = false;
    }, [resetKey]);

    useEffect(() => {
        const box = boxRef.current;
        if (!box) return;

        const pointers = new Map<number, Point>();
        let start: { t: Transform; p1: Point; p2?: Point } | null = null;
        let lastTap: { time: number; at: Point } | null = null;
        let downAt: Point | null = null;

        // 화살표 같은 버튼을 누른 건 확대/이동으로 처리하지 않음
        const isButton = (e: PointerEvent) => e.target instanceof Element && e.target.closest('button') !== null;

        const begin = () => {
            const [p1, p2] = [...pointers.values()];
            start = { t: { ...t.current }, p1, p2 };
        };

        const onDown = (e: PointerEvent) => {
            if (isButton(e)) return;
            box.setPointerCapture(e.pointerId);
            pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
            if (pointers.size === 1) downAt = { x: e.clientX, y: e.clientY };
            if (pointers.size === 2) gestured.current = true;
            begin();
        };

        const onMove = (e: PointerEvent) => {
            if (!pointers.has(e.pointerId) || !start) return;
            pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
            const [p1, p2] = [...pointers.values()];

            if (p2 && start.p2) {
                // 두 손가락: 벌린 비율만큼 확대, 두 손가락 가운데를 따라 이동
                const scale = start.t.scale * (distance(p1, p2) / distance(start.p1, start.p2));
                zoomAt(start.t, midpoint(start.p1, start.p2), midpoint(p1, p2), scale);
            } else if (start.t.scale > 1) {
                // 확대된 상태에서 한 손가락/마우스: 사진 이동
                if (distance(p1, start.p1) > 4) gestured.current = true;
                apply({ ...start.t, x: start.t.x + p1.x - start.p1.x, y: start.t.y + p1.y - start.p1.y });
            }
        };

        const onUp = (e: PointerEvent) => {
            if (!pointers.has(e.pointerId)) return;
            pointers.delete(e.pointerId);

            // 거의 안 움직이고 뗀 탭이 짧은 간격으로 두 번이면 확대/원래대로
            if (pointers.size === 0 && downAt && distance(downAt, { x: e.clientX, y: e.clientY }) < 10) {
                const now = performance.now();
                const at = { x: e.clientX, y: e.clientY };
                if (lastTap && now - lastTap.time < DOUBLE_TAP_MS && distance(lastTap.at, at) < DOUBLE_TAP_DISTANCE) {
                    toggleZoom(at);
                    gestured.current = true;
                    lastTap = null;
                } else {
                    lastTap = { time: now, at };
                }
            }

            // 손가락 하나가 남으면 그 손가락 기준으로 이어서 이동
            if (pointers.size > 0) begin();
            else start = null;

            // 너무 작게 줄였다가 놓으면 원래 크기로
            if (pointers.size === 0 && t.current.scale < 1.05) apply({ scale: 1, x: 0, y: 0 }, true);
        };

        // PC: 휠로 확대/축소 (마우스 위치 기준)
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const at = { x: e.clientX, y: e.clientY };
            zoomAt(t.current, at, at, t.current.scale * Math.exp(-e.deltaY * 0.002));
        };

        box.addEventListener('pointerdown', onDown);
        box.addEventListener('pointermove', onMove);
        box.addEventListener('pointerup', onUp);
        box.addEventListener('pointercancel', onUp);
        box.addEventListener('wheel', onWheel, { passive: false });
        return () => {
            box.removeEventListener('pointerdown', onDown);
            box.removeEventListener('pointermove', onMove);
            box.removeEventListener('pointerup', onUp);
            box.removeEventListener('pointercancel', onUp);
            box.removeEventListener('wheel', onWheel);
        };
        // apply/zoomAt은 ref만 읽으므로 처음 한 번만 등록해도 항상 최신 값으로 동작
    }, []);

    return {
        /** 확대 중이거나 방금 핀치/드래그/두 번 탭을 했으면 true → 사진 넘기기 무시 */
        shouldBlockSwipe: () => t.current.scale > 1 || gestured.current,
        /** 새 터치를 시작할 때 이전 제스처 기록 지우기 */
        clearGesture: () => {
            gestured.current = false;
        },
    };
}
