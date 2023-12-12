```ts

import { contactSectionData } from './contactSections'
import { homeSectionData } from './homeSections'

export const sectionData = {
  Home: homeSectionData,
  About: [],
  Contact: contactSectionData,
  Donations: [],
  Articles: [],
  PrayerTimes: [],
  Blog: [],
  Shop: [],
  FAQ: [],
  Cart: [],
}


```

```mermaid

Here is the Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
  A[Home] --> B[Home Section Data]
  A --> C[About]
  A --> D[Contact]
  A --> E[Donations]
  A --> F[Articles]
  A --> G[Prayer Times]
  A --> H[Blog]
  A --> I[Shop]
  A --> J[FAQ]
  A --> K[Cart]
```
Explanation:

* The graph represents a hierarchical structure of the Go file, with the `Home` section at the top and the other sections branching off from it.
* The arrows represent the relationships between the sections, with each section connected to its parent `Home` section.
* The labels on the arrows indicate the type of relationship between the sections, such as `Home Section Data`, `About`, `Contact`, etc.
* The `Home Section Data` section is the parent of all the other sections, and is connected to each of them through an arrow.
* The `About` section is a

```
