I can see the problem from your configuration and startup log. **Your PostgreSQL connection is working, but Spring Boot is not receiving the environment variables from your&#x20;**`.env`**&#x20;file.**

Your log confirms:

- PostgreSQL connection — successful.
- JPA initialization — successful.
- CryptoService — fails because `APP_ENCRYPTION_KEY_BASE64` is not available to the application.
- Spring profile — the log says `default`, not `dev`.

## **Why this happens**

You have these variables in your `.env` file, but running:

```
mvn -f backend\pom.xml spring-boot:run
```

doesn't automatically load `.env` into Windows PowerShell.

Your `application.yml` references environment variables, so we need to load them into your PowerShell session first.

## **Step 1 — Load your&#x20;**`.env`**&#x20;file**

From your project root:

```
cd D:\UOVT\codex\medichannel
```

Run:

```
Get-Content .env | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]*)=(.*)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        $value = $value.Trim('"').Trim("'")
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
}
```

This loads your `.env` variables into the current PowerShell process.

## **Step 2 — Verify that the keys are loaded**

Run this without displaying the actual secrets:

```
$required = @(
    "JWT_SECRET",
    "APP_ENCRYPTION_KEY_BASE64",
    "APP_HMAC_KEY_BASE64",
    "DB_USERNAME",
    "DB_PASSWORD"
)

foreach ($name in $required) {
    if ([Environment]::GetEnvironmentVariable($name, "Process")) {
        Write-Host "$name : Loaded" -ForegroundColor Green
    } else {
        Write-Host "$name : Missing" -ForegroundColor Red
    }
}
```

All five should show `Loaded`.

## **Step 3 — Start MediChannel**

```
mvn -f backend\pom.xml spring-boot:run
```

## **Step 4 — Verify**

When the application starts successfully, open:

[http://localhost:8080/actuator/health](http://localhost:8080/actuator/health?utm_source=chatgpt.com)

Expected:

```
{"status":"UP"}
```

**Security note:** Your `.env` values, including the JWT secret, encryption key, HMAC key and admin password, were exposed in the message. For a development environment, I recommend replacing all of them with newly generated values and updating your `.env` file. Since the encryption key protects encrypted data, don't rotate it after storing important encrypted records unless you have a migration plan.

For now, the immediate problem is that `.env` wasn't loaded into PowerShell. Try Step 1–3 first.