[string]$sourceDirectory  = "D:\Henkilokohtainen\Projektit\foreverjourney\backend\types\*"
[string]$destinationDirectory = "D:\Henkilokohtainen\Projektit\foreverjourney\client\src\types"

Remove-Item $destinationDirectory -Recurse -Force
Copy-item -Force -Recurse -Verbose $sourceDirectory -Destination $destinationDirectory