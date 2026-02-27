// Simple Node.js translation of the legacy COBOL student account system
// business logic. Designed to mirror the data flow and rules exactly.

const readline = require('readline-sync');

let storageBalance = 1000.00; // initial balance as in COBOL's DataProgram

function readBalance() {
    return storageBalance;
}

function writeBalance(amount) {
    storageBalance = amount;
}

// exported helpers for tests
function resetBalance(amount = 1000.00) {
    storageBalance = amount;
}

function displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
}

function handleTotal() {
    const bal = readBalance();
    console.log('Current balance: ' + bal.toFixed(2).padStart(9, '0'));
}

function handleCredit() {
    const amt = parseFloat(readline.question('Enter credit amount: '));
    if (isNaN(amt) || amt < 0) {
        console.log('Invalid amount.');
        return;
    }
    let bal = readBalance();
    bal += amt;
    writeBalance(bal);
    console.log('Amount credited. New balance: ' + bal.toFixed(2).padStart(9, '0'));
}

function handleDebit() {
    const amt = parseFloat(readline.question('Enter debit amount: '));
    if (isNaN(amt) || amt < 0) {
        console.log('Invalid amount.');
        return;
    }
    let bal = readBalance();
    if (bal >= amt) {
        bal -= amt;
        writeBalance(bal);
        console.log('Amount debited. New balance: ' + bal.toFixed(2).padStart(9, '0'));
    } else {
        console.log('Insufficient funds for this debit.');
    }
}

function main() {
    let continueFlag = true;
    while (continueFlag) {
        displayMenu();
        const choice = readline.question('Enter your choice (1-4): ');
        switch (choice.trim()) {
            case '1':
                handleTotal();
                break;
            case '2':
                handleCredit();
                break;
            case '3':
                handleDebit();
                break;
            case '4':
                continueFlag = false;
                break;
            default:
                console.log('Invalid choice, please select 1-4.');
        }
    }
    console.log('Exiting the program. Goodbye!');
}

if (require.main === module) {
    main();
}

module.exports = {
    readBalance,
    writeBalance,
    resetBalance,
    handleTotal,
    handleCredit,
    handleDebit,
    displayMenu
};
