$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToBase64String($bytes)


hmac:
  key-base64: ${APP_HMAC_KEY_BASE64:}

$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$env:APP_HMAC_KEY_BASE64 = [Convert]::ToBase64String($bytes)