[string]$sourceDirectory  = "D:\Henkilokohtainen\Projektit\foreverjourney\backend\interfaces\*"
[string]$destinationDirectory = "D:\Henkilokohtainen\Projektit\foreverjourney\client\src\interfaces\"

Remove-Item "$destinationDirectory*" -Recurse -Force
Copy-item -Force -Recurse -Verbose $sourceDirectory -Destination $destinationDirectory