export type Money = {
    amount: number;
    currency: string;
}

export const toMoney = (value: Money | null | undefined, label: string): Money => {
    if (!value) {
        throw new Error(`Price is not available for ${label}. Check the channel settings in Saleor.`);
    }
    return {amount: value.amount, currency: value.currency};
}
