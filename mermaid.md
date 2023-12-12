```mermaid
graph TD
    A[README.md] --> B[package.json]
    B --> C[app/dashboard/upload/[...slug]/FileSidebar.tsx]
    B --> D[app/dashboard/upload/[...slug]/UploadMobileSearch.tsx]
    B --> E[app/dashboard/settings/something/PrayersCrud.jsx]
    B --> F[app/dashboard/scheduling/something/PrayersCrud.jsx]
    B --> G[app/dashboard/analytics/something/PrayersCrud.jsx]
    B --> H[app/dashboard/account/something/PrayersCrud.jsx]
    B --> I[app/dashboard/reports/something/PrayersCrud.jsx]
    B --> J[app/dashboard/help/something/PrayersCrud.jsx]
    B --> K[app/dashboard/prayers/something/PrayersCrud.jsx]
    C --> D
    C --> E
    C --> F
    C --> G
    C --> H
    C --> I
    C --> J
    C --> K
```

```mermaid

graph TD
    A[README.md] --> B[package.json]
    B --> C[app/dashboard/upload/[...slug]/FileSidebar.tsx]
    B --> D[app/dashboard/upload/[...slug]/UploadMobileSearch.tsx]
    B --> E[app/dashboard/settings/something/PrayersCrud.jsx]
    B --> F[app/dashboard/scheduling/something/PrayersCrud.jsx]
    B --> G[app/dashboard/analytics/something/PrayersCrud.jsx]
    B --> H[app/dashboard/account/something/PrayersCrud.jsx]
    B --> I[app/dashboard/reports/something/PrayersCrud.jsx]
    B --> J[app/dashboard/help/something/PrayersCrud.jsx]
    B --> K[app/dashboard/prayers/something/PrayersCrud.jsx]
    C --> L[Function: FileSidebar]
    L --> M[Function: setCurrentFile]
    L --> N[Function: setUploads]
    D --> O[Function: UploadMobileSearch]
    E --> P[Function: useState]
    E --> Q[Function: Dialog]
    F --> R[Function: useState]
    F --> S[Function: Dialog]
    G --> T[Function: useState]
    G --> U[Function: Dialog]
    H --> V[Function: useState]
    H --> W[Function: Dialog]
    I --> X[Function: useState]
    I --> Y[Function: Dialog]
    J --> Z[Function: useState]
    J --> AA[Function: Dialog]
    K --> AB[Function: useState]
    K --> AC[Function: Dialog]

```
