# Analytics Setup Notes

This site now sends these `dataLayer` events into Google Tag Manager / GA4:

- `virtual_page_view`
- `landing_source`
- `section_view`
- `section_engagement`
- `scroll_depth`
- `element_click`
- `form_start`
- `form_submit`

Important limits:

- Do not send personally identifiable information like name, email, or phone to GA4.
- User region, city, country, device, and traffic source are available in GA4 reports automatically.
- If you need lead-level attribution with names, keep that inside your CRM or backend instead of Google Analytics.

Recommended GTM variables to create:

- Data Layer Variable: `section_name`
- Data Layer Variable: `element_label`
- Data Layer Variable: `element_type`
- Data Layer Variable: `link_url`
- Data Layer Variable: `scroll_percent`
- Data Layer Variable: `form_name`
- Data Layer Variable: `referrer_host`
- Data Layer Variable: `utm_source`
- Data Layer Variable: `utm_medium`
- Data Layer Variable: `utm_campaign`

Recommended GTM triggers:

- Custom Event equals `element_click`
- Custom Event equals `scroll_depth`
- Custom Event equals `section_view`
- Custom Event equals `section_engagement`
- Custom Event equals `form_start`
- Custom Event equals `form_submit`
- Custom Event equals `landing_source`

Recommended GA4 event tags:

- Tag name: `GA4 - element_click`, Event name: `element_click`
- Tag name: `GA4 - scroll_depth`, Event name: `scroll_depth`
- Tag name: `GA4 - section_view`, Event name: `section_view`
- Tag name: `GA4 - section_engagement`, Event name: `section_engagement`
- Tag name: `GA4 - form_start`, Event name: `form_start`
- Tag name: `GA4 - form_submit`, Event name: `form_submit`
- Tag name: `GA4 - landing_source`, Event name: `landing_source`
