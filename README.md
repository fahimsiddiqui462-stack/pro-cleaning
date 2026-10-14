# ProCleaning website

Completed static multi-page website. No framework or runtime dependencies.

## Preview and validate
Run `npm run check`, `npm run build`, then `npm start`. Open http://127.0.0.1:4173.

## Deploy to Netlify
Upload the generated dist folder through Netlify Drop, or connect a Git repository with this project. netlify.toml sets the build command and publish directory. Enable form detection in Netlify and redeploy if necessary. The quote form is named quote; submissions appear in Netlify Forms. Configure email notifications in Netlify. Submit a real test enquiry after deployment and confirm it appears in the dashboard. Other static hosts require a separate form backend; do not assume the form works there.

## Mandatory business checks before public launch
Existing source contains unverified prices, years of experience, client counts, staff identities, testimonials, ratings, insurance/vetting claims, New York service area, contact address, and an invalid-looking telephone number. Verify or replace these before publication. Pricing is illustrative on the pricing page. Replace phone and email across HTML files with real details. Finalise legal operator identity, retention period and privacy notice; confirm policies and image usage rights. Existing local images were reused; no new stock-photo licensing obligations were introduced.

## Files
index.html is the homepage. procleaning.html is a compatible copy. Dedicated services, about, pricing, contact, journal, three advice articles, privacy, thank-you and 404 pages are included. backup-original contains untouched source copies and is excluded from deployment.

## Accessibility and motion
Responsive layouts, keyboard focus, skip links, labelled fields, reduced-motion support, progressive-enhancement content visibility, Escape-to-close menu, native input validation, and submission error feedback are included. No analytics, payments or confirmed-booking system is included.

## Customer account screens
Sign-in, registration, and password reset screens are prepared, but authentication is not connected. They explicitly report that credentials are not sent and accounts are not created. A real authentication provider must be configured before account access is enabled.

## Demo login enabled
The user selected demonstration-only login. Sign in or register with any valid email and an 8-character demo password to view account.html. Passwords are discarded, never stored or sent. Name and email are held in sessionStorage for this tab only. Password reset only demonstrates feedback; no email is sent. This is not secure authentication or access control. Do not use real credentials or confidential data. Replace auth.js with a real authentication provider before production customer accounts.

## Live multi-device mockup
Open /mockup.html on the local server or deployed website. Actual pages load in fixed-size desktop (1440×900), laptop (1280×800), tablet (768×1024) and phone (390×844) iframes. Each viewport uses real responsive CSS; visual scaling only fits the preview to the frame. The deployment must include the updated frame-ancestors self policy to permit these previews.
