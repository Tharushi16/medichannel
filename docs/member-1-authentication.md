# Member 1: authentication and security

This module owns account authentication, account administration and the baseline REST security controls.

## Security design

- Passwords are stored only as BCrypt hashes (cost 12).
- Email addresses are encrypted with AES-256-GCM. Every encryption creates a fresh 96-bit IV; the IV and ciphertext are stored Base64 encoded.
- Email lookup/uniqueness uses a normalized HMAC-SHA256 digest, so the application can locate an account without decrypting every row.
- A signed HS256 JWT is issued in an HTTP-only, `SameSite=Lax` cookie. Set `AUTH_SECURE_COOKIE=true` behind HTTPS in production.
- The API is stateless. The filter re-loads the account for every request, so a deactivated account immediately loses access.
- Five consecutive failed login attempts lock the account for 15 minutes by default. Both settings are environment configurable.
- Audit entries deliberately contain only action, actor, target identifier, source IP and time - never credentials, tokens, email, NIC, or clinical data.

## Required secrets

`JWT_SECRET` must be at least 32 random characters. `APP_ENCRYPTION_KEY_BASE64` and `APP_HMAC_KEY_BASE64` must each decode to at least 32 random bytes. Generate local values with a secure secret manager or:

```text
openssl rand -base64 32
```

Never use example placeholders outside a local disposable environment. All production traffic must use HTTPS, set `AUTH_SECURE_COOKIE=true`, and restrict `FRONTEND_URL` to the deployed frontend origin.

## API contract

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Create a CUSTOMER account and issue a session cookie. |
| POST | `/api/auth/login` | Public | Authenticate and issue a session cookie. |
| POST | `/api/auth/logout` | Public | Clear the session cookie. |
| GET | `/api/auth/me` | Any signed-in user | Read current account metadata. |
| POST | `/api/auth/change-password` | Any signed-in user | Change own password. |
| POST | `/api/admin/users` | ADMIN | Create a DOCTOR or MANAGER account. |
| GET | `/api/admin/users` | ADMIN | Page accounts, optionally filtered by role. |
| PATCH | `/api/admin/users/{id}/active?value=true` | ADMIN | Activate/deactivate an account. |
| POST | `/api/admin/users/{id}/reset-password` | ADMIN | Set temporary password and force change. |
| GET | `/api/admin/audit-logs` | ADMIN | Page non-sensitive audit history. |

Registration input is `{ "email": "person@example.test", "password": "at-least-12-characters" }`. Login uses the same payload. Staff creation uses `{ "email", "temporaryPassword", "role" }`, where `role` is `DOCTOR` or `MANAGER`.

## Ownership guidance

Controllers use role guards for entry. Feature owners must also enforce resource ownership (for example, a patient can access only their own appointments and a doctor only their own sessions). Never expose consultation or chat content to ADMIN or MANAGER. WebSocket authentication must reuse the same JWT validation before Member 3 enables subscriptions.
