const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;
import { Mycalc } from "../target/types/mycalc";

describe("mycalc", () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.CalculatorDapp;

  it('Creates the calculator', async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.message  === "Welcome to Solana");
  });

  it('Adds two numbers', async () => {
    await program.rpc.add(1, 2, {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result === 3);
  });

  it('Subtracts two numbers', async () => {
    await program.rpc.subtract(2, 1, {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result === 1);
  });

  it('Multiplies two numbers', async () => {
    await program.rpc.multiply(2, 3, {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result === 6);
  });

  it('Divides two numbers', async () => {
    await program.rpc.divide(6, 3, {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result === 2);
  });
});
