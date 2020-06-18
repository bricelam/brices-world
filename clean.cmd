@ECHO OFF
SET MC_DIR=%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang

ECHO Cleaning up...
RMDIR /S /Q %MC_DIR%\development_resource_packs\resources
RMDIR /S /Q %MC_DIR%\development_behavior_packs\behaviors