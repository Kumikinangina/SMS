import axios from 'axios';
import qs from 'qs';
import readline from 'readline';
import UserAgent from 'user-agents';
import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear;
  
clear();

console.log(chalk.green(figlet.textSync('SMS', { horizontalLayout: 'full' })));
console.log(chalk.green('───────────────────────────────────────────────'));
console.log(chalk.green('  ⚡ SMS SENDER - CLI TOOL ⚡'));
console.log(chalk.green('  Author  : siarli_0'));
console.log(chalk.green('  GitHub  : github.com/Kumikinangina'));
console.log(chalk.green('───────────────────────────────────────────────\n'));

function randomId() {
  return Array.from({ length: 16 }, () => 'abcdef0123456789'[Math.floor(Math.random() * 16)]).join('');
}

function randomToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  return 'cLjBqxTHR8edNkAP7GG4R-:APA91b' + Array.from({ length: 152 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function randomModel() {
  const models = [
    'TECNO LH8n', 'Samsung Galaxy S21', 'iPhone 13 Pro', 'Google Pixel 6',
    'Xiaomi Redmi Note 10', 'OnePlus 9', 'Huawei P40', 'Oppo Reno 5', 
    'Vivo V21', 'Realme 8 Pro'
  ];
  return models[Math.floor(Math.random() * models.length)];
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => rl.question(chalk.green(query), answer => {
    rl.close();
    resolve(answer);
  }));
}

async function sendSMS() {
  try {
    const number = await askQuestion('📲 Enter phone number (e.g., +639123456789): ');
    const message = await askQuestion('💬 Enter message: ');

    console.log(chalk.green(`\n🚀 Sending message: "${message}" to ${number}...\n`));

    const deviceId = randomId();
    const firebaseToken = randomToken();
    const deviceModel = randomModel();
    const userAgent = new UserAgent({ deviceCategory: 'mobile' }).toString();

    const data = qs.stringify({
      '$Oj0O%K7zi2j18E': `["free.text.sms","4123","${number}","${deviceModel}","${firebaseToken}","${message} ",""]`,
      device_id: deviceId,
      humottae: 'Processing'
    });

    const config = {
      method: 'POST',
      url: 'https://sms.m2techtronix.com/v13/sms.php',
      headers: {
        'User-Agent': userAgent,
        Connection: 'Keep-Alive',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Charset': 'UTF-8'
      },
      data: data
    };

    const response = await axios.request(config);
    console.log(chalk.green('\n✅ Response:'), JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error.message);
  }
}

async function runSMSLoop() {
  while (true) {
    await sendSMS();
    const again = await askQuestion('\n📱 Do you want to send another message? (y/n): ');
    if (again.toLowerCase() !== 'y') {
      console.log(chalk.green('\n✨ Program finished!'));
      break;
    }
    console.log('\n');
  }
}

runSMSLoop();
  
