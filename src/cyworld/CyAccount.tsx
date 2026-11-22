import { useState, type CSSProperties } from 'react';
import { accountGroups, type Account } from '../component/AccountSection';
import { envelopeSrc } from './envelope';

const COLUMNS = 3;

export default function CyAccount() {
    const [selectedId, setSelectedId] = useState(accountGroups[0].accounts[0].id);
    const [message, setMessage] = useState('');
    // 펼쳐진 그룹(신랑측/신부측) id 목록. 처음에는 모두 접힌 상태
    const [openGroups, setOpenGroups] = useState<string[]>([]);

    const toggleGroup = (id: string) =>
        setOpenGroups(prev => (prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]));

    const select = (id: string) => {
        setSelectedId(id);
        setMessage('');
    };

    const copy = async (account: Account) => {
        try {
            await navigator.clipboard.writeText(account.accountNumber.trim());
            setMessage('계좌번호가 복사되었습니다.');
        } catch {
            setMessage('복사할 수 없어요. 직접 복사해 주세요.');
        }
    };

    return (
        <div className="cy-account">
            <p className="cy-account-guide">신랑측·신부측을 눌러 마음 전하실 곳을 선택해 주세요.</p>

            {accountGroups.map(group => {
                const selectedIndex = group.accounts.findIndex(a => a.id === selectedId);
                const selected = group.accounts[selectedIndex];
                const isOpen = openGroups.includes(group.id);
                const panelId = `cy-account-panel-${group.id}`;

                return (
                    <div key={group.id} className={`cy-account-group ${isOpen ? 'open' : ''}`}>
                        {/* 제목줄을 누르면 계좌 선택 영역을 접고 펼침 */}
                        <button
                            type="button"
                            className="cy-account-group-title"
                            onClick={() => toggleGroup(group.id)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                        >
                            {group.title}
                            <span className="cy-account-arrow" aria-hidden="true">▼</span>
                        </button>

                        {isOpen && (
                        <div id={panelId}>
                        <div className="cy-account-options">
                            {group.accounts.map((account, index) => (
                                <label
                                    key={account.id}
                                    className={`cy-account-option ${account.id === selectedId ? 'selected' : ''}`}
                                >
                                    <span className="cy-account-radio">
                                        <input
                                            type="radio"
                                            name="cy-account"
                                            checked={account.id === selectedId}
                                            onChange={() => select(account.id)}
                                        />
                                        {account.relation}
                                    </span>

                                    {/* 도트 편지봉투 썸네일 */}
                                    <span className="cy-account-thumb" aria-hidden="true">
                                        <img className="cy-envelope" src={envelopeSrc(group.id, index, account.id === selectedId)} alt="" />
                                    </span>
                                </label>
                            ))}
                        </div>

                        {selected && (
                            <div
                                className="cy-account-tip"
                                style={{ '--tip-left': `${((selectedIndex % COLUMNS) + 0.5) * (100 / COLUMNS)}%` } as CSSProperties}
                            >
                                {selected.accountNumber.trim() ? (
                                    <>
                                        <div>
                                            <b>{selected.bank}</b> {selected.accountNumber}
                                        </div>
                                        <div className="cy-account-holder">예금주 {selected.name}</div>
                                    </>
                                ) : (
                                    <div>계좌 정보를 준비 중이에요.</div>
                                )}
                                {message && <div className="cy-account-message">{message}</div>}
                            </div>
                        )}

                        {selected && (
                            <div className="cy-account-actions">
                                <button
                                    type="button"
                                    className="cy-btn"
                                    disabled={!selected.accountNumber.trim()}
                                    onClick={() => copy(selected)}
                                >
                                    계좌복사
                                </button>
                            </div>
                        )}
                        </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
