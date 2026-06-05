# Security Rules for AI-Generated Apps

This project enforces strict security rules. Any AI tools generating or modifying code in this codebase must adhere to the following rules at all times.

## 1. Secrets & Environment Variables
* **Rule:** Never expose secrets in client-side / frontend code.
* All API keys, database connection strings, credentials, and private configs must live in `.env` files.
* `.env` files must always be listed in `.gitignore` (e.g., `.env`, `.env.local`, `.env.*.local`).
* For Vite, only variables prefixed with `VITE_` can be exposed in the frontend. Ensure these do NOT contain secret keys (e.g., only public URLs or public keys).
* Backend secrets are accessed via `process.env.VAR_NAME` only and must never be sent to the client in API responses.
* Keep a `.env.example` file updated with all required variable names (with empty/placeholder values).

## 2. Rate Limiting
* **Rule:** Apply rate limiting on all public API routes.
* Auth routes (login, registration, password resets): limit to 5 requests per 15 minutes per IP.
* General API routes: limit to 60 requests per minute per IP.
* AI/LLM proxy routes: limit to 10 requests per minute per user.
* Return `429 Too Many Requests` with a `Retry-After` header when limits are reached. Ensure the frontend handles 429 errors gracefully.

## 3. Input Validation & Sanitization
* **Rule:** Validate and sanitize all user input on the server.
* Never trust client-side validation as a security measure; server-side validation is mandatory.
* Use schema validation libraries (e.g., Zod or Joi for JS/TS, Pydantic for Python).
* Sanitize all string inputs before saving to database or rendering in UI to prevent XSS.
* Validate data types, lengths, allowed characters, and enum values.

## 4. Authentication & Authorization
* **Rule:** Use established auth libraries and check permissions on every request.
* Do not write custom authentication protocols from scratch. Use established libraries (e.g., Passport.js, Clerk, Auth0, Supabase Auth).
* Passwords must never be stored in plain text. Use bcrypt (minimum cost factor 12) or argon2.
* JWTs must be signed with a strong secret stored in environment variables (minimum 32 characters) and have short expiries (15-60 mins).
* Refresh tokens must be stored in `httpOnly` secure cookies, never in localStorage/sessionStorage.
* Verify user ownership and permissions for the targeted resource on every request (do not assume authentication equals authorization).

## 5. SQL & Database Security
* **Rule:** Always use an ORM or parameterized queries.
* Do not build database queries via string concatenation using user input. Use Prisma, Drizzle, Sequelize, or Mongoose.
* Use the principle of least privilege for the database user.
* Never return raw database error messages to the client (they leak schema details).

## 6. CORS Configuration
* **Rule:** Never use wildcard CORS (`*`) in production.
* Explicitly whitelist only allowed origins in production.
* Limit CORS methods (`GET`, `POST`, etc.) to only what is necessary.
* Use the `credentials: true` flag only when required (e.g., for cookie-based sessions).

## 7. HTTP Security Headers
* **Rule:** Always set HTTP security headers.
* Use `helmet` in Node.js/Express to configure critical security headers:
  * `Content-Security-Policy` (CSP)
  * `X-Frame-Options: DENY` (prevents clickjacking)
  * `X-Content-Type-Options: nosniff`
  * `Strict-Transport-Security` (forces HTTPS)
  * `Referrer-Policy: strict-origin-when-cross-origin`
* Ensure the `X-Powered-By` header is disabled/removed.

## 8. File Upload Security
* **Rule:** Validate, rename, and store uploads securely.
* Validate MIME type and file extension on the server (never trust client-provided headers).
* Set strict file size limits (e.g., 5MB for images, 25MB for documents).
* Store files outside the web root or use cloud storage (S3, Cloudinary, etc.) with executable permissions disabled.
* Rename files to secure random strings (e.g., UUIDs) to prevent path traversal or target file overwriting.

## 9. Error Handling & Logging
* **Rule:** Never return internal stack traces or database errors to the client.
* Return generic user-friendly messages for 5xx errors (e.g., "Something went wrong").
* Log errors on the server with full context: timestamp, user ID, route, and sanitized inputs.
* Return appropriate HTTP status codes (e.g., 400 for client validation failures, 401 for unauthorized, 403 for forbidden, 429 for rate-limited, 500 for server errors).

## 10. Dependency Security
* **Rule:** Audit dependencies and pin versions.
* Run audits regularly (e.g., `npm audit`) and fix high/critical vulnerabilities.
* Avoid using obsolete or unmaintained packages.
* Pin dependencies in lockfiles (`package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`).

## 11. XSS Prevention
* **Rule:** Never render dynamic user-generated content as raw HTML.
* In React, do not use `dangerouslySetInnerHTML` unless the content is thoroughly sanitized using DOMPurify.
* Avoid inline script tags; move scripts to external files.
* Do not use `eval()` or `new Function()` with dynamic inputs.

## 12. Deployment Checklist
* Ensure `.env` is listed in `.gitignore` and not committed.
* Ensure all secrets are set in the hosting platform's dashboard.
* Verify debug/development logs are disabled in production.
* Enforce HTTPS redirect.
* Verify rate limiting and CORS policies are active.

## 13. AI & LLM-Specific Rules
* **Rule:** Treat LLM inputs and outputs as untrusted data.
* Sanitize user input before sending to LLM APIs to prevent prompt injection.
* Always enforce a `max_tokens` limit on LLM calls to prevent cost exhaustion attacks.
* Run all LLM queries through backend proxies; never call LLM APIs directly from the client side.
* Implement per-user or per-session token/cost budgets to prevent runaway costs.
* Validate and sanitize LLM output before rendering it in the UI (since LLMs can generate malicious HTML/scripts).
