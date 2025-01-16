@ECHO OFF
SET MC_APPX_FAMILY=Microsoft.MinecraftUWP_8wekyb3d8bbwe
REM SET MC_DIR=%LOCALAPPDATA%\Packages\%MC_APPX_FAMILY%\LocalState\games\com.mojang
SET MC_DIR=C:\Users\brice\Downloads\bedrock-server-1.18.0.02

ECHO Copying behavior pack...
SET BEHAVIOR_DIR=%MC_DIR%\development_behavior_packs\brices_world_behaviors
RMDIR /S /Q %BEHAVIOR_DIR%
XCOPY /S /I behaviors %BEHAVIOR_DIR%

ECHO Starting Minecraft...
REM START shell:AppsFolder\%MC_APPX_FAMILY%!App
