const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// 打印检查结果
function printCheckResult(name, status, message = '') {
  const statusColor = status ? colors.fg.green : colors.fg.red;
  const statusText = status ? '✓ 通过' : '✗ 失败';
  console.log(`${statusColor}${statusText}${colors.reset} ${name}${message ? ': ' + message : ''}`);
  return status;
}

// 执行命令
function runCommand(command, silent = false) {
  try {
    if (!silent) {
      printMessage(`执行命令: ${command}`, colors.fg.yellow);
    }
    return { success: true, output: execSync(command, { encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' }) };
  } catch (error) {
    if (!silent) {
      printMessage(`命令执行失败: ${error.message}`, colors.fg.red);
    }
    return { success: false, error: error.message };
  }
}

// 检查文件是否存在
function checkFileExists(filePath, displayPath = null) {
  const exists = fs.existsSync(filePath);
  return printCheckResult(displayPath || filePath, exists);
}

// 检查目录是否存在
function checkDirExists(dirPath, displayPath = null) {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  return printCheckResult(displayPath || dirPath, exists);
}

// 检查环境变量文件
function checkEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', '.env.example');
  
  const envExists = fs.existsSync(envPath);
  const envExampleExists = fs.existsSync(envExamplePath);
  
  if (!envExists && envExampleExists) {
    printMessage('未找到 .env 文件，但存在 .env.example 文件', colors.fg.yellow);
    printMessage('建议: 复制 .env.example 到 .env 并配置环境变量', colors.fg.yellow);
    return false;
  } else if (!envExists) {
    printMessage('未找到 .env 文件和 .env.example 文件', colors.fg.red);
    printMessage('建议: 创建 .env 文件并配置必要的环境变量', colors.fg.yellow);
    return false;
  }
  
  return printCheckResult('.env 文件', true);
}

// 检查数据库连接
function checkDatabase() {
  printMessage('检查数据库连接...', colors.fg.yellow);
  const result = runCommand('npx prisma db pull --force', true);
  return printCheckResult('数据库连接', result.success, result.success ? '' : '请检查 .env 文件中的 DATABASE_URL 配置');
}

// 检查依赖
function checkDependencies() {
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  const nodeModulesExists = fs.existsSync(nodeModulesPath);
  
  if (!nodeModulesExists) {
    printMessage('未找到 node_modules 目录', colors.fg.yellow);
    printMessage('建议: 运行 npm install 安装依赖', colors.fg.yellow);
    return false;
  }
  
  return printCheckResult('项目依赖', true);
}

// 检查Prisma客户端
function checkPrismaClient() {
  const prismaClientPath = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
  const prismaClientExists = fs.existsSync(prismaClientPath);
  
  if (!prismaClientExists) {
    printMessage('未找到 Prisma 客户端', colors.fg.yellow);
    printMessage('建议: 运行 npx prisma generate 生成 Prisma 客户端', colors.fg.yellow);
    return false;
  }
  
  return printCheckResult('Prisma 客户端', true);
}

// 检查项目结构
function checkProjectStructure() {
  const rootDir = path.join(__dirname, '..');
  let allPassed = true;
  
  // 检查必要的目录
  const directories = [
    { path: path.join(rootDir, 'app'), display: 'app 目录' },
    { path: path.join(rootDir, 'components'), display: 'components 目录' },
    { path: path.join(rootDir, 'lib'), display: 'lib 目录' },
    { path: path.join(rootDir, 'prisma'), display: 'prisma 目录' },
    { path: path.join(rootDir, 'public'), display: 'public 目录' },
  ];
  
  for (const dir of directories) {
    if (!checkDirExists(dir.path, dir.display)) {
      allPassed = false;
    }
  }
  
  // 检查必要的文件
  const files = [
    { path: path.join(rootDir, 'package.json'), display: 'package.json' },
    { path: path.join(rootDir, 'next.config.js'), display: 'next.config.js' },
    { path: path.join(rootDir, 'tsconfig.json'), display: 'tsconfig.json' },
    { path: path.join(rootDir, 'prisma', 'schema.prisma'), display: 'prisma/schema.prisma' },
  ];
  
  for (const file of files) {
    if (!checkFileExists(file.path, file.display)) {
      allPassed = false;
    }
  }
  
  return allPassed;
}

// 检查脚本
function checkScripts() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return printCheckResult('脚本配置', false, '未找到 package.json 文件');
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const requiredScripts = ['dev', 'build', 'start', 'setup', 'start:dev', 'db:seed'];
    const missingScripts = requiredScripts.filter(script => !packageJson.scripts || !packageJson.scripts[script]);
    
    if (missingScripts.length > 0) {
      return printCheckResult('脚本配置', false, `缺少以下脚本: ${missingScripts.join(', ')}`);
    }
    
    return printCheckResult('脚本配置', true);
  } catch (error) {
    return printCheckResult('脚本配置', false, `解析 package.json 失败: ${error.message}`);
  }
}

// 主函数
async function main() {
  printTitle('爻星阁项目完整性检查');
  
  let allPassed = true;
  
  // 检查项目结构
  printTitle('检查项目结构');
  allPassed = checkProjectStructure() && allPassed;
  
  // 检查环境变量文件
  printTitle('检查环境变量');
  allPassed = checkEnvFile() && allPassed;
  
  // 检查依赖
  printTitle('检查依赖');
  allPassed = checkDependencies() && allPassed;
  
  // 检查Prisma客户端
  printTitle('检查Prisma客户端');
  allPassed = checkPrismaClient() && allPassed;
  
  // 检查脚本
  printTitle('检查脚本配置');
  allPassed = checkScripts() && allPassed;
  
  // 检查数据库连接
  printTitle('检查数据库连接');
  allPassed = checkDatabase() && allPassed;
  
  // 总结
  printTitle('检查结果');
  if (allPassed) {
    printMessage('恭喜！项目完整性检查通过。', colors.fg.green);
    printMessage('您可以使用以下命令启动项目：', colors.fg.cyan);
    printMessage('npm run dev', colors.fg.white);
    printMessage('或', colors.fg.cyan);
    printMessage('npm run start:dev', colors.fg.white);
  } else {
    printMessage('项目完整性检查未通过。请修复上述问题后重试。', colors.fg.yellow);
    printMessage('您可以使用以下命令初始化项目：', colors.fg.cyan);
    printMessage('npm run setup', colors.fg.white);
  }
}

// 执行主函数
main().catch(error => {
  printMessage(`检查过程中出错: ${error.message}`, colors.fg.red);
  process.exit(1);
}); 