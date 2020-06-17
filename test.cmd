@ECHO OFF
SET MC_APPX_FAMILY=Microsoft.MinecraftUWP_8wekyb3d8bbwe
SET MC_DIR=%LOCALAPPDATA%\Packages\%MC_APPX_FAMILY%\LocalState\games\com.mojang

ECHO Copying resource pack...
SET RESOURCE_DIR=%MC_DIR%\development_resource_packs\brices-resources
RMDIR /S /Q %RESOURCE_DIR%
XCOPY /S /I resources %RESOURCE_DIR%

ECHO Copying behavior pack...
SET BEHAVIOR_DIR=%MC_DIR%\development_behavior_packs\brices-behaviors
RMDIR /S /Q %BEHAVIOR_DIR%
XCOPY /S /I behaviors %BEHAVIOR_DIR%

ECHO Starting Minecraft...
START shell:AppsFolder\%MC_APPX_FAMILY%!App
