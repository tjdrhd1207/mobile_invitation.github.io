import { useState, type CSSProperties } from 'react';
import { accountGroups, type Account } from '../component/AccountSection';

const COLUMNS = 3;

export default function CyAccount() {
    const [selectedId, setSelectedId] = useState(accountGroups[0].accounts[0].id);
    const [message, setMessage] = useState('');

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
            <p className="cy-account-guide">마음 전하실 곳을 선택하시면 계좌를 확인하실 수 있습니다.</p>

            {accountGroups.map(group => {
                const selectedIndex = group.accounts.findIndex(a => a.id === selectedId);
                const selected = group.accounts[selectedIndex];

                return (
                    <div key={group.id} className="cy-account-group">
                        <div className="cy-account-group-title">{group.title}</div>

                        <div className="cy-account-options">
                            {group.accounts.map(account => (
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

                                    {/* 편지봉투 썸네일: 바깥은 선택 테두리, 안쪽은 봉투 모양 */}
                                    <span className={`cy-account-thumb ${group.id}`} aria-hidden="true">
                                        <span className="cy-envelope">
                                            <span className="cy-envelope-seal" />
                                        </span>
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
                );
            })}
        </div>
    );
}
