@echo off
setlocal enabledelayedexpansion

set sourceDir=C:\Users\Administrator\Documents\GitHub\chess\images
set outputDir=C:\Users\Administrator\Documents\GitHub\cdsc\images

if not exist "%outputDir%" mkdir "%outputDir%"

set counter=1
for %%f in ("%sourceDir%\*") do (
    set "fileName=%%~nxf"
    set /a "newCounter=counter+1"
    set /a "newCounter=newCounter*2-1"
    copy "%%f" "%outputDir%\card!newCounter!.jpg"
    set /a "newCounter+=1"
    copy "%%f" "%outputDir%\card!newCounter!.jpg"
    set /a "counter+=1"
)

endlocal
