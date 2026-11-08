import { useState } from 'react';
import {
    HAIRS,
    HAIR_COLORS,
    OUTFITS,
    OUTFIT_COLORS,
    SKINS,
    renderMinimi,
    renderPart,
    type MinimiConfig,
} from './minimiParts';

type Tab = 'body' | 'hair' | 'outfit';

type Props = {
    value: MinimiConfig;
    onChange: (next: MinimiConfig) => void;
};

const TABS: { id: Tab; label: string; icon: () => string }[] = [
    { id: 'body', label: '미니미', icon: () => renderMinimi({ hair: 0, outfit: 0 }) },
    { id: 'hair', label: '머리', icon: () => renderPart('hair', 2, 2) },
    { id: 'outfit', label: '의상', icon: () => renderPart('outfit', 2, 0) },
];

export default function MinimiEditor({ value, onChange }: Props) {
    const [tab, setTab] = useState<Tab>('body');
    const set = (patch: Partial<MinimiConfig>) => onChange({ ...value, ...patch });

    return (
        <div className="cy-minimi-editor">
            <div className="cy-minimi-preview">
                <img src={renderMinimi(value)} alt="내 미니미" />
            </div>

            <div className="cy-minimi-panel">
                <div className="cy-minimi-tabs" role="tablist">
                    {TABS.map(t => (
                        <button
                            key={t.id}
                            type="button"
                            role="tab"
                            aria-selected={tab === t.id}
                            className={tab === t.id ? 'active' : ''}
                            onClick={() => setTab(t.id)}
                        >
                            <img src={t.icon()} alt="" />
                            <span>{t.label}</span>
                        </button>
                    ))}
                </div>

                <div className="cy-minimi-items">
                    {tab === 'body' &&
                        SKINS.map((skin, i) => (
                            <ItemButton
                                key={skin.name}
                                label={skin.name}
                                src={renderMinimi({ ...value, skin: i, hair: 0, outfit: 0 })}
                                selected={value.skin === i}
                                onClick={() => set({ skin: i })}
                            />
                        ))}
                    {tab === 'hair' &&
                        HAIRS.map((hair, i) => (
                            <ItemButton
                                key={hair.name}
                                label={hair.name}
                                src={i === 0 ? null : renderPart('hair', i, value.hairColor)}
                                selected={value.hair === i}
                                onClick={() => set({ hair: i })}
                            />
                        ))}
                    {tab === 'outfit' &&
                        OUTFITS.map((outfit, i) => (
                            <ItemButton
                                key={outfit.name}
                                label={outfit.name}
                                src={i === 0 ? null : renderPart('outfit', i, value.outfitColor)}
                                selected={value.outfit === i}
                                onClick={() => set({ outfit: i })}
                            />
                        ))}
                </div>

                {tab === 'hair' && (
                    <ColorSwatches
                        colors={HAIR_COLORS}
                        selected={value.hairColor}
                        onSelect={i => set({ hairColor: i })}
                        label="머리 색"
                    />
                )}
                {tab === 'outfit' && (
                    <ColorSwatches
                        colors={OUTFIT_COLORS}
                        selected={value.outfitColor}
                        onSelect={i => set({ outfitColor: i })}
                        label="의상 색"
                    />
                )}
            </div>
        </div>
    );
}

function ItemButton({
    label,
    src,
    selected,
    onClick,
}: {
    label: string;
    src: string | null;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            className={`cy-minimi-item ${selected ? 'selected' : ''}`}
            onClick={onClick}
            aria-pressed={selected}
            title={label}
        >
            {src ? <img src={src} alt="" /> : <span className="cy-minimi-none">없음</span>}
            <span className="cy-minimi-item-label">{label}</span>
        </button>
    );
}

function ColorSwatches({
    colors,
    selected,
    onSelect,
    label,
}: {
    colors: string[];
    selected: number;
    onSelect: (i: number) => void;
    label: string;
}) {
    return (
        <div className="cy-minimi-colors" role="radiogroup" aria-label={label}>
            {colors.map((color, i) => (
                <button
                    key={color}
                    type="button"
                    role="radio"
                    aria-checked={selected === i}
                    aria-label={`${label} ${i + 1}`}
                    className={selected === i ? 'selected' : ''}
                    style={{ background: color }}
                    onClick={() => onSelect(i)}
                />
            ))}
        </div>
    );
}
