import { useState } from "react";

export type Account = {
    id: string;
    relation: string;
    name: string;
    bank: string;
    accountNumber: string;
};

export type AccountGroup = {
    id: "groom" | "bride";
    title: string;
    subtitle: string;
    accounts: Account[];
};

export const accountGroups: AccountGroup[] = [
    {
        id: "groom",
        title: "신랑측",
        subtitle: "GROOM'S FAMILY",
        accounts: [
            {
                id: "groom-self",
                relation: "신랑",
                name: "김재민",
                bank: "신한은행",
                accountNumber: "110373494850",
            },
            {
                id: "groom-father",
                relation: "신랑 아버지",
                name: "김승준",
                bank: "",
                accountNumber: "",
            },
            {
                id: "groom-mother",
                relation: "신랑 어머니",
                name: "조춘열",
                bank: "",
                accountNumber: "",
            },
        ],
    },
    {
        id: "bride",
        title: "신부측",
        subtitle: "BRIDE'S FAMILY",
        accounts: [
            {
                id: "bride-self",
                relation: "신부",
                name: "공국명",
                bank: "",
                accountNumber: "",
            },
            {
                id: "bride-father",
                relation: "신부 아버지",
                name: "공진환",
                bank: "",
                accountNumber: "",
            },
            {
                id: "bride-mother",
                relation: "신부 어머니",
                name: "안미환",
                bank: "",
                accountNumber: "",
            },
        ],
    },
];

export default function AccountSection() {
    const [openGroup, setOpenGroup] = useState<"groom" | "bride" | null>(null);

    const [feedback, setFeedback] = useState<{
        accountId: string;
        message: string;
    } | null>(null);

    const handleToggle = (groupId: "groom" | "bride") => {
        setOpenGroup((current) => current === groupId ? null : groupId
        );
        setFeedback(null);
    }

    const handleCopy = async (account: Account) => {
        if (!account.accountNumber.trim()) {
            setFeedback({
                accountId: account.id,
                message: "계좌번호를 먼저 입력해 주세요."
            });
            return;
        }

        const accountText = account.accountNumber.trim();

        try {
            if (!navigator.clipboard?.writeText) {
                throw new Error();
            }

            await navigator.clipboard.writeText(accountText);

            setFeedback({
                accountId: account.id,
                message: "계좌번호가 복사되었습니다.",
            });
        } catch {
            setFeedback({
                accountId: account.id,
                message: "복사할 수 없습니다. 계좌번호를 직접 복사해 주세요.",
            });
        }
    };

    return (
        <section className="account-section" id="account">
            <div className="account-heading">
                <p className="account-eyebrow">WITH LOVE</p>

                <h2 className="account-title">마음 전하실 곳</h2>

                <p className="account-description">
                    축하의 마음을 전해주실 분들을 위해
                    <br />
                    계좌번호를 안내드립니다.
                </p>
            </div>

            <div className="account-groups">
                {accountGroups.map((group) => {
                    const isOpen = openGroup === group.id;

                    return (
                        <div
                            className={`account-group ${isOpen ? "is-open" : ""
                                }`}
                            key={group.id}
                        >
                            <button
                                type="button"
                                className="account-group-toggle"
                                onClick={() => handleToggle(group.id)}
                                aria-expanded={isOpen}
                                aria-controls={`account-panel-${group.id}`}
                            >
                                <span className="account-group-text">
                                    <span className="account-group-title">
                                        {group.title}
                                    </span>
                                    <span className="account-group-subtitle">
                                        {group.subtitle}
                                    </span>
                                </span>

                                <span
                                    className={`account-chevron ${isOpen ? "is-open" : ""
                                        }`}
                                    aria-hidden="true"
                                >
                                    ⌄
                                </span>
                            </button>

                            {isOpen && (
                                <div
                                    className="account-panel"
                                    id={`account-panel-${group.id}`}
                                >
                                    {group.accounts.map((account, index) => {
                                        const hasAccount = account.accountNumber.trim().length > 0;

                                        const currentFeedback = feedback?.accountId === account.id
                                            ? feedback.message
                                            : "";

                                        return (
                                            <div
                                                className="account-item"
                                                key={account.id}
                                            >
                                                <div className="account-item-info">
                                                    <span className="account-relation">
                                                        {account.relation}
                                                    </span>

                                                    <span className="account-holder">
                                                        {account.name}
                                                    </span>

                                                    <span className="account-number">
                                                        {hasAccount
                                                            ? `${account.bank} ${account.bank ? "· " : ""
                                                            }${account.accountNumber}`
                                                            : "계좌정보를 입력해 주세요"}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="account-copy-button"
                                                    onClick={() => handleCopy(account)}
                                                    aria-label={`${account.name} 계좌번호 복사`}
                                                >
                                                    복사
                                                </button>

                                                {currentFeedback && (
                                                    <p
                                                        className="account-feedback"
                                                        role="status"
                                                    >
                                                        {currentFeedback}
                                                    </p>
                                                )}

                                                {index < group.accounts.length - 1 && (
                                                    <span
                                                        className="account-item-divider"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )
                }
                )}
            </div>
            <p className="account-footer">
                보내주시는 따뜻한 마음에 감사드립니다.
            </p>
        </section>
    )
}