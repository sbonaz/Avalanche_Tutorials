const { newKit } = require('@celo/contractkit');

require('dotenv').config();

const main = async () => {
  // Create connection to DataHub Celo Network node
  const client = newKit(process.env.REST_URL);
  const web3 = client.web3;

  // Initialize account from our private key
  const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

  // We need to add address to ContractKit in order to sign transactions
  client.addAccount(account.privateKey);

  // Specify recipient Address
  const recipientAddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d'

  // Specify an amount to send
  const amount = 100000

  // Get contract wrappers
  const goldtoken = await kit.contracts.getGoldToken()
  const stabletoken = await kit.contracts.getStableToken()

  // Transfer CELO and cUSD from your account to anAddress
  // Specify cUSD as the feeCurrency when sending cUSD
  const celotx = await goldtoken.transfer(recipientAddress, amount).send({from: account.address})
  const cUSDtx = await stabletoken.transfer(recipientAddress, amount).send({from: account.address, feeCurrency: stabletoken.address})

  // Wait for the transactions to be processed
  const celoReceipt = await celotx.waitReceipt()
  const cUSDReceipt = await cUSDtx.waitReceipt()

  // Print receipts
  console.log('CELO Transaction receipt:', celoReceipt)
  console.log('cUSD Transaction receipt:', cUSDReceipt)
};

main().catch((err) => {
  console.error(err);
});