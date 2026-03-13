# Contact Form Backend Specification

This document describes the backend implementation for the website contact form shown in the UI (fields: Full Name, Mobile Number, Work Email, Message).

---

## 1. Overview

**Goal:**  
Accept contact requests from the website, validate them, protect against spam/abuse, and deliver the data to both:
- A notification channel (email, Slack, etc.)
- A persistent store (database / CRM / ticketing system)

**Core requirements:**
- Secure, rate‑limited, and CSRF‑protected
- GDPR‑friendly (easy to delete/export a user’s submission)
- Environment‑based config (no secrets in code)
- Easy to instrument and monitor (logs + metrics)

---

## 2. API Design

### 2.1 Endpoint

- **Method**: `POST`
- **Path**: `/api/contact`
- **Content‑Type**: `application/json`
- **Authentication**: Not required (public), but protected by:
  - CSRF token (if same‑origin web app) OR
  - Origin/Referer checks + CORS restrictions.

### 2.2 Request Body

{
  "fullName": "John Doe",
  "mobileNumber": "9876543210",
  "workEmail": "john@company.com",
  "message": "Tell us about your needs..."
}

