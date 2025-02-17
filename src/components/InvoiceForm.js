import React, { useState, useRef } from "react";
import InvoiceItem from "./InvoiceItem";

const InvoiceForm = () => {
    const divRef = useRef(null);
    const [description, setDescription] = useState("");
    const [total, setTotal] = useState(0);

    const [name, setName] = useState("");
    const [isNameInputVisible, setIsNameInputVisible] = useState(true);

    const [date, setDate] = useState("");
    const [isDateInputVisible, setIsDateInputVisible] = useState(true);

    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [isInvoiceNumberInputVisible, setIsInvoiceNumberInputVisible] = useState(true);

    const [items, setItems] = useState([{ id: 1 }]);  // State for holding InvoiceItem components

    const handleDateFormatting = (value) => {
        if (!value) return "";
        const [year, month, day] = value.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    const printContent = () => {
        if (divRef.current) {
            const printWindow = window.open("", "_blank");
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Invoice</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                padding: 20px;
                            }
                            .form {
                                width: 1063px;
                                height: 1375px;
                                margin: 0 auto;
                                padding: 20px;
                                border: 1px solid #ccc;
                                font-size: 1.1em;
                            }
                            .display-item {
                                border-bottom: 1px solid black;
                                width: 100%;
                            }
                            .title-box {
                                text-align: center;
                                margin-bottom: 30px;
                            }
                            .name-date-box {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 20px;
                                align-items: center;
                                margin-bottom: 30px;
                            }
                            .name-field, .date-field {
                                display: flex;
                                align-items: center;
                            }
                            .description-box {
                                margin-bottom: 4%;
                            }
                            .invoice-info-box {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                align-items: center;
                            }
                            .approval-box {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 5px;
                                align-items: start;
                                margin-top: 4%;
                                font-size: 1em;
                            }
                            .checkboxes-box {
                                display: grid;
                                grid-template-columns: repeat(4, 1fr);
                                grid-auto-rows: auto;
                                gap: 10px;
                                font-size: 0.9em;
                                line-height: 1.2;
                                margin-top: 6%;
                            }
                            #total-amount {
                                color: green;
                                font-weight: bold;
                            }
                            @media print {
                                @page {
                                    margin: 0;
                                }
                                body {
                                    margin: 0;
                                }
                            }
                        </style>
                    </head>
                    <body>${divRef.current.innerHTML}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };

    const appendDescription = (value) => {
        setDescription((prevDescription) => {
            return prevDescription ? `${prevDescription}, ${value}` : value;
        });
    }

    const addTotal = (value) => {
        setTotal((prevTotal) => parseFloat(prevTotal) + parseFloat(value));
    }

    const addItem = () => {
        const newItemId = items.length + 1;
        setItems((prevItems) => [...prevItems, { id: newItemId }]);
    };

    return (
        <div>
            <div className="other-content-box">
                <button onClick={addItem}>Add Item</button>
                <button onClick={() => setIsNameInputVisible(true)}>Change Name</button>
                <button onClick={() => setIsDateInputVisible(true)}>Change Date</button>
                <button onClick={() => setIsInvoiceNumberInputVisible(true)}>Change Invoice Number</button>
                <button onClick={() => printContent("form")}>Download PDF/Print</button>
            </div>
            <div className="form" ref={divRef}>
                <div className="title-box">
                    <h3>WAYWAYSEECAPPO FIRST NATION</h3>
                    <h3>ADMINISTRATION OFFICE</h3>
                </div>

                <div className="name-date-box">
                    <div className="name-field">
                        <label htmlFor="name">NAME:</label>
                        {isNameInputVisible ? (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                onBlur={() => setIsNameInputVisible(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") setIsNameInputVisible(false);
                                }}
                                placeholder="Enter your name"
                            />
                        ) : (
                            <p className="display-item">{name}</p>
                        )}
                    </div>

                    <div className="date-field">
                        <label htmlFor="date">DATE:</label>
                        {isDateInputVisible ? (
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    setIsDateInputVisible(false);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") setIsDateInputVisible(false);
                                }}
                            />
                        ) : (
                            <p className="display-item">
                                {handleDateFormatting(date)}
                            </p>
                        )}
                    </div>
                </div>

                <div className="description-box">
                    <label htmlFor="description">DESCRIPTION:</label>
                    <div className="description">
                        <p id="description-text">{description}</p>
                        {items.map((item) => (
                            <InvoiceItem key={item.id} appendDescription={appendDescription} addTotal={addTotal}/>
                        ))}
                    </div>
                </div>

                <div className="invoice-info-box">
                    <div className="cheque-field">
                        <p>CHEQUE NO: ________________</p>
                    </div>
                    <div className="invoice-no-field">
                        <label htmlFor="invoiceNumber">INVOICE NO:</label>
                        {isInvoiceNumberInputVisible ? (
                            <input
                                type="text"
                                value={invoiceNumber}
                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                onBlur={() => setIsInvoiceNumberInputVisible(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") setIsInvoiceNumberInputVisible(false);
                                }}
                                placeholder="Enter invoice number"
                            />
                        ) : (
                            <p className="display-item">{invoiceNumber}</p>
                        )}
                    </div>
                    <div className="date-paid-field">
                        <p>DATE PAID: _________________</p>
                    </div>
                    <div className="amount-field">
                        <label htmlFor="amount">AMOUNT:</label>
                        <p className="display-item" id="total-amount">{`$${total.toFixed(2)}`}</p>
                    </div>
                </div>

                <div className="approval-box">
                    <p>APPROVAL:</p>
                    <p>_____________________</p>
                    <p>_____________________</p>
                    <p>_____________________</p>
                    <p>_____________________</p>
                    <p>_____________________</p>
                    <p>_____________________</p>
                    <p>_____________________</p>
                </div>

                <div className="checkboxes-box">
                    <p>ADMIN: ___</p>
                    <p>CMHC: ___</p>
                    <p>NEW HOUSING: ___</p>
                    <p>CONS CORP: ___</p>
                    <p>HEALTH: ___</p>
                    <p>PEACE HILLS: ___</p>
                    <p>INN: ___</p>
                    <p>SURRENDER: ___</p>
                    <p>HRDC: ___</p>
                    <p>WOLVERINES: ___</p>
                    <p>WAYWAY GAS BAR: ___</p>
                    <p>BRANDON GAS BAR: X</p>
                    <p>BINGO: ___</p>
                    <p>VLT: ___</p>
                    <p>REBATE ACCT: ___</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;
