# Speaks every line of narration.json with the voice that comes with Windows and writes voice/<id>.wav (44.1 kHz, 16-bit, mono),
# then voice/durations.json with the length of each line in seconds.
#   powershell -ExecutionPolicy Bypass -File artwork\demo\make_voice.ps1
Add-Type -AssemblyName System.Speech
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$cfg = Get-Content (Join-Path $root 'narration.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$out = Join-Path $root 'voice'
New-Item -ItemType Directory -Force $out | Out-Null
$fmt = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(44100, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
$durations = [ordered]@{}
foreach ($p in $cfg.lines.PSObject.Properties) {
  $path = Join-Path $out ($p.Name + '.wav')
  $s = New-Object System.Speech.Synthesis.SpeechSynthesizer
  $s.SelectVoice($cfg.voice)
  $s.Rate = [int]$cfg.rate
  $s.SetOutputToWaveFile($path, $fmt)
  $s.Speak($p.Value)
  $s.Dispose()
  $bytes = (Get-Item $path).Length - 44
  $durations[$p.Name] = [math]::Round($bytes / (44100 * 2), 2)
}
($durations | ConvertTo-Json) | Set-Content (Join-Path $out 'durations.json') -Encoding UTF8
"{0} lines, total {1:N1} s" -f $durations.Count, (($durations.Values | Measure-Object -Sum).Sum)
