# Email Verification Flow Cheatsheet

This guide covers the verification link and OTP fallback for the CSE Projector Management System backend.

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a new user and trigger verification email |
| `GET` | `/api/auth/verify-email?token=...` | Consume verification link (supports optional `redirect=true`) |
| `POST` | `/api/auth/resend-verification` | Resend verification link (rate-limited to 3/hour) |
| `POST` | `/api/auth/request-verification-otp` | Request OTP fallback for email verification |
| `POST` | `/api/auth/verify-email-otp` | Verify email using a 6-digit OTP |

## cURL Examples

Replace `{{BASE_URL}}` with your API host (e.g., `http://localhost:5000`).

```bash
# 1) Register a new user (email will receive verification link)
curl -X POST "{{BASE_URL}}/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Faculty",
    "email": "test.faculty@cse.edu",
    "password": "StrongPass!1",
    "role": "faculty"
  }'

# 2) Resend verification email (max 3/hour)
curl -X POST "{{BASE_URL}}/api/auth/resend-verification" \
  -H "Content-Type: application/json" \
  -d '{ "email": "test.faculty@cse.edu" }'

# 3) Request verification OTP fallback (development/testing)
curl -X POST "{{BASE_URL}}/api/auth/request-verification-otp" \
  -H "Content-Type: application/json" \
  -d '{ "email": "test.faculty@cse.edu" }'

# 4) Verify email with OTP code
curl -X POST "{{BASE_URL}}/api/auth/verify-email-otp" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.faculty@cse.edu",
    "otp": "123456"
  }'
```

## Postman Collection Tips

1. **Register** – POST `/api/auth/register` with JSON body `{ name, email, password }`.
2. **Verification Link** – After registration, check console/logs (dev) or mailbox for `verify-email?token=...` URL. Trigger via GET request in Postman or open in browser.
3. **Resend** – POST `/api/auth/resend-verification` with `{ email }` if the original link expired. Observe `429` when exceeding 3/hour.
4. **OTP Fallback** – POST `/api/auth/request-verification-otp`; in development the response body will include `otpPreview` and the console logs the full OTP.
5. **Verify via OTP** – POST `/api/auth/verify-email-otp` with the 6-digit code.
6. **Login** – Once verified, use `/api/auth/login` or OTP login endpoints to authenticate.

> **Note:** In production the API never returns the raw verification link or OTP in responses. Configure `EMAIL_USER`, `EMAIL_PASSWORD`, and `EMAIL_FROM` to send real mail.
