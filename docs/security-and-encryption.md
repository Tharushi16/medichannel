# Security and encryption checklist

- [ ] HTTPS and WSS in production (deployment responsibility)
- [x] BCrypt password hashes only
- [x] AES-256-GCM with fresh random IV for every protected value
- [x] HMAC-SHA256 utility for email and NIC lookup/uniqueness
- [x] Secrets loaded only from environment variables
- [x] JWT expiry and HTTP-only cookies (`AUTH_SECURE_COOKIE=true` in production)
- [x] REST role checks for authentication and administrative APIs
- [ ] Role and ownership checks for feature APIs and WebSocket operations (feature owners)
- [ ] ADMIN/MANAGER cannot access consultation content (must be enforced when consultation module is added)
- [x] No sensitive values in audit records
- [ ] Capture ciphertext database evidence and readable application evidence

See [member-1-authentication.md](member-1-authentication.md) for the implemented security controls and API contract.
