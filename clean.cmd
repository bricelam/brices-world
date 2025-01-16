@ECHO OFF
SET MC_DIR=%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang
REM SET MC_DIR=C:\Users\brice\Downloads\bedrock-server-1.18.0.02

ECHO Cleaning up...
RMDIR /S /Q %MC_DIR%\development_behavior_packs\brices_world_behaviors