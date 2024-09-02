#!/usr/bin/env node
import inquirer from 'inquirer';
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} is successful. Remaining balance is: $${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} is successful. Remaining balance is: $${this.balance}`);
    }
    // Check balance
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobilenumber;
    account;
    constructor(firstName, lastName, gender, age, mobilenumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobilenumber = mobilenumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// Create customers
const customers = [
    new Customer("Minahil", "Anwar", "Female", 35, 123456789, accounts[0]),
    new Customer("Bushra", "Sabir", "Female", 27, 987654321, accounts[1]),
    new Customer("Hamza", "Khan", "Male", 35, 1357910246, accounts[2]),
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "input", // Changed to 'input' as 'number' type might not be correctly handled
                message: "Enter your account number:"
            }
        ]);
        const accountNumber = parseInt(accountNumberInput.accountNumber, 10); // Parse the input to a number
        const customer = customers.find(customer => customer.account.accountNumber === accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation:",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "input", // Changed to 'input'
                            message: "Enter the amount:"
                        }
                    ]);
                    const deposit = parseFloat(depositAmount.amount); // Parse the input to a number
                    customer.account.deposit(deposit);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "input", // Changed to 'input'
                            message: "Enter the amount to withdraw:"
                        }
                    ]);
                    const withdraw = parseFloat(withdrawAmount.amount); // Parse the input to a number
                    customer.account.withdraw(withdraw);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting the bank program...");
                    console.log("\nThank you for using our bank services");
                    return;
                default:
                    console.log("Invalid selection. Please try again.");
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
