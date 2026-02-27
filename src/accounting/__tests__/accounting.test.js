const readline = require('readline-sync');
const {
    readBalance,
    writeBalance,
    resetBalance,
    handleTotal,
    handleCredit,
    handleDebit
} = require('../index');

describe('Accounting application business logic', () => {
    beforeEach(() => {
        resetBalance();
        jest.restoreAllMocks();
    });

    test('initial balance is 1000.00', () => {
        expect(readBalance()).toBe(1000);
    });

    test('view total logs current balance', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        handleTotal();
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Current balance'));
    });

    test('credit account with valid amount', () => {
        jest.spyOn(readline, 'question').mockReturnValue('250.00');
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        handleCredit();
        expect(readBalance()).toBeCloseTo(1250);
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Amount credited. New balance'));
    });

    test('credit with invalid amount leaves balance unchanged', () => {
        jest.spyOn(readline, 'question').mockReturnValue('abc');
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        handleCredit();
        expect(readBalance()).toBe(1000);
        expect(logSpy).toHaveBeenCalledWith('Invalid amount.');
    });

    test('debit account with sufficient funds', () => {
        jest.spyOn(readline, 'question').mockReturnValue('500.00');
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        handleDebit();
        expect(readBalance()).toBeCloseTo(500);
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Amount debited. New balance'));
    });

    test('debit account with insufficient funds', () => {
        resetBalance(100);
        jest.spyOn(readline, 'question').mockReturnValue('200.00');
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        handleDebit();
        expect(readBalance()).toBeCloseTo(100);
        expect(logSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });

    test('debit with invalid amount leaves balance unchanged', () => {
        jest.spyOn(readline, 'question').mockReturnValue('-50');
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        handleDebit();
        expect(readBalance()).toBe(1000);
        expect(logSpy).toHaveBeenCalledWith('Invalid amount.');
    });
});