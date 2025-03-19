@echo off
echo 开始将UI组件文件转换为UTF-8编码...
echo.

set UI_DIR=%CD%\components\ui

echo UI组件目录: %UI_DIR%
echo.

echo 创建备份目录...
mkdir %UI_DIR%\backup 2>nul

echo 处理文件...
for %%F in (%UI_DIR%\*.tsx) do (
    echo 处理文件: %%~nxF
    copy "%%F" "%UI_DIR%\backup\%%~nxF.bak" /Y >nul
    
    REM 使用PowerShell将文件转换为UTF-8编码
    powershell -Command "$content = Get-Content -Path '%%F' -Encoding Unicode -Raw -ErrorAction SilentlyContinue; if ($content) { $utf8NoBom = New-Object System.Text.UTF8Encoding $false; [System.IO.File]::WriteAllText('%%F', $content, $utf8NoBom); Write-Host '  已将文件转换为UTF-8编码' -ForegroundColor Green; } else { Write-Host '  无法读取文件内容，跳过' -ForegroundColor Red; }"
)

echo.
echo 转换完成!
echo 备份文件保存在 %UI_DIR%\backup 目录中
echo. 