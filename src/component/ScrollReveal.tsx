import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // 한 번 보이면 고정 (숨김 ↔ 보임 반복으로 위아래로 흔들리는 현상 방지)
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`scroll-reveal ${visible ? 'visible' : ''}`}
        >
            {children}
        </div>
    );
}