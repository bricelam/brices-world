@ECHO OFF

ECHO Cleaning up...
SET MC_DIR=%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang
RMDIR /S /Q %MC_DIR%\development_resource_packs\brices-resources
RMDIR /S /Q %MC_DIR%\development_behavior_packs\brices-behaviors

ECHO Building resource pack...
powershell Compress-Archive resources\* resources
RENAME resources.zip resources.mcpack

ECHO Building behavior pack...
powershell Compress-Archive behaviors\* behaviors
RENAME behaviors.zip behaviors.mcpack
