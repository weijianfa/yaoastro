const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
  }
};

// 打印带颜色的消息
function printMessage(message, color = colors.fg.white) {
  console.log(`${color}${message}${colors.reset}`);
}

// 打印标题
function printTitle(title) {
  console.log('\n');
  console.log(`${colors.fg.cyan}${colors.bright}=== ${title} ===${colors.reset}`);
}

// 执行命令
function runCommand(command) {
  try {
    printMessage(`执行命令: ${command}`, colors.fg.yellow);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    printMessage(`命令执行失败: ${error.message}`, colors.fg.red);
    return false;
  }
}

// 检查环境变量文件
function checkEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', '.env.example');
  
  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    printMessage('未找到 .env 文件，正在从 .env.example 创建...', colors.fg.yellow);
    fs.copyFileSync(envExamplePath, envPath);
    printMessage('.env 文件已创建，请根据需要修改配置', colors.fg.green);
  }
}

// 检查数据库连接
function checkDatabase() {
  try {
    printMessage('检查数据库连接...', colors.fg.yellow);
    execSync('npx prisma db pull', { stdio: 'pipe' });
    return true;
  } catch (error) {
    printMessage('数据库连接失败，请检查 .env 文件中的 DATABASE_URL 配置', colors.fg.red);
    return false;
  }
}

// 主函数
async function main() {
  printTitle('爻星阁项目启动');
  
  // 检查环境变量文件
  checkEnvFile();
  
  // 检查数据库连接
  if (!checkDatabase()) {
    printMessage('请修复数据库连接问题后重试', colors.fg.red);
    return;
  }
  
  // 启动开发服务器
  printTitle('启动开发服务器');
  printMessage('正在启动开发服务器...', colors.fg.green);
  runCommand('npm run dev');
}

// 执行主函数
main().catch(error => {
  printMessage(`启动过程中出错: ${error.message}`, colors.fg.red);
  process.exit(1);
}); 