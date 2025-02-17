import React, { useState, useEffect } from "react";

const InvoiceItem = ({appendDescription, addTotal}) => {
    const [itemType, setItemType] = useState("");
    const [isItemTypeVisible, setIsItemTypeVisible] = useState(true);
    
    const [itemAmount, setItemAmount] = useState("");
    const [isItemAmountVisible, setIsItemAmountVisible] = useState(true);

    const handleAppendDescription = () => {
        if (!isItemTypeVisible && !isItemAmountVisible && itemType && itemAmount) {
            appendDescription(`${itemType} $${parseFloat(itemAmount).toFixed(2)}`);  // Append itemType and itemAmount
            addTotal(itemAmount);
        }
    };

    useEffect(() => {
        return handleAppendDescription();
    }, [itemType, itemAmount, isItemTypeVisible, isItemAmountVisible]);

    return (
        <div id="description-item">
            {isItemTypeVisible ? 
            (
                <select
                    defaultValue=""
                    onChange={(e) => {
                        setItemType(e.target.value)
                        setIsItemTypeVisible(false)
                    }}
                >
                    <option value="" disabled>Select Item Type</option>
                    <option value="Confectionary 5035">Confectionary 5035</option>
                    <option value="Tobacco Purchases 5020">Tobacco Purchases 5020</option>
                    <option value="Grocery Purchase 5040">Grocery Purchase 5040</option>
                    <option value="Non Food 5050">Non Food 5050</option>
                    <option value="Fuel 5300">Fuel 5300</option>
                    <option value="GST Payable 2315">GST Payable 2315</option>
                    <option value="PST Payable 2300">PST Payable 2300</option>
                    <option value="Meals for Meetings 5675">Meals for Meetings 5675</option>
                    <option value="Store Expense 5730">Store Expense 5730</option>
                    <option value="Fast Food 5045">Fast Food 5045</option>
                    <option value="Advertising/Promotion 5615">Advertising/Promotion 5615</option>
                </select>
            ) : (
                null
            )}

            {isItemAmountVisible ?
            (
                <input
                type="text"
                value={itemAmount}
                onChange={(e) => {
                    // Allow leading minus, digits, and at most one decimal point
                    const value = e.target.value;
                    if (/^-?\d*\.?\d*$/.test(value)) {
                        setItemAmount(value);
                    }
                }}
                onBlur={() => setIsItemAmountVisible(false)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") setIsItemAmountVisible(false);
                }}
                placeholder="Amount"
                />
            ) : (
                null
            )}
        </div>
    );
}

export default InvoiceItem;