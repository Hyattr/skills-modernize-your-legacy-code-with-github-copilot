# Test Plan for COBOL Student Account System

This document outlines test cases for validating the business logic of the existing COBOL application. Use it with stakeholders to confirm behavior before and during the migration to Node.js.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|---------------|--------------------|----------|
| TC-01 | View current balance | Application started with default balance (1000.00) | 1. Start program
2. Select option 1 (View Balance) | Current balance displayed as 001000.00 |  |  |  |
| TC-02 | Credit account with valid amount | Application started with known balance (e.g., 1000.00) | 1. Start program
2. Select option 2 (Credit)
3. Enter amount 250.00 | Balance increases by 250.00 and new balance shown (001250.00) |  |  |  |
| TC-03 | Debit account with sufficient funds | Balance must be >= requested debit (e.g., 1000.00) | 1. Start program
2. Select option 3 (Debit)
3. Enter amount 500.00 | Balance decreases by 500.00 and new balance shown (000500.00) |  |  |  |
| TC-04 | Debit account with insufficient funds | Balance less than debit amount (e.g., 100.00) | 1. Start program
2. Select option 3 (Debit)
3. Enter amount 200.00 | Message "Insufficient funds for this debit." displayed and balance unchanged |  |  |  |
| TC-05 | Invalid menu choice handling | Application started normally | 1. Start program
2. Enter choice outside 1-4 (e.g., 9) | Error message shown and menu redisplayed |  |  |  |
| TC-06 | Exit application | Application running | 1. Start program
2. Select option 4 (Exit) | Program displays exit message and terminates |  |  |  |


Each case should be executed enough times to verify the business rule across different starting balances. For automation later, the "Actual Result" and "Status" columns will be filled by test scripts.

> **Note:** the initial balance is always built as 1000.00 in the COBOL version; tests may override or simulate different balances when porting to Node.js.