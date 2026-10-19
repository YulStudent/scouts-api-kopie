param([string]$File = "schema.erd", [string]$Format = "svg")
$body = Get-Content $File -Raw -Encoding UTF8
$out = [IO.Path]::ChangeExtension($File, $Format)
Invoke-RestMethod -Method Post -Uri "http://localhost:8000/erd/$Format" `
  -ContentType "text/plain; charset=utf-8" `
  -Body ([Text.Encoding]::UTF8.GetBytes($body)) -OutFile $out
"Gemaakt: $out ($((Get-Item $out).Length) bytes)"