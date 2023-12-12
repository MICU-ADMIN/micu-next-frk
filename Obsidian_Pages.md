
Pages will undergo processing by examining search parameters, subdomains, and custom URLs. Subsequently, API calls will be made to retrieve the specified data based on these criteria.

```mermaid 

graph TD
  A[User arrives on page] -->|Triggers onload function| B(Determine current URL and subdomain)
  B -->|Make API call| C[Fetch page data based on subdomain]
  C -->|Process and render| D(Render page with retrieved data)


 style A fill:#006600,stroke:#00331a
style B fill:#006633,stroke:#00331a
style C fill:#006633,stroke:#00331a
style D fill:#006633,stroke:#00331a




```



 Upon a user's page arrival, an `onload` function is activated. This function examines the current URL for a subdomain, searching for page data linked to the organization's username. The objective is to enhance page content uniqueness, prioritizing data over design improvements.

```mermaid
classDiagram
  class PageTable {
    + id: random
    + pageId: int
    + Images: []string
    + Iframe: []string
    + H1: []string
    + H2: []string
    + P: []string
    + Template: int
  }

```


This management approach enables efficient and diverse saving of website data. Individual pages will be rendered conditionally based on the specified route, allowing for flexibility in presenting content as per the given conditions.


```mermaid
graph TD
  organization -->|yes| organizationHomepage
  personal -->|yes| personalHomepage
  else -->|no| 404

```



use cases 

```mermaid
graph TB
  subgraph BasePath
    subdomain(Subdomain / Custom URL)
    organizationData{Check for Organization Data}
    userSearchParams{Search Params for User}
    personalData{Check for Personal Website Data}
  end

  subdomain --> organizationData
  organizationData --> userSearchParams
  userSearchParams --> personalData

```




**Home
# Organization 
- [x] backdrop photo
- [x] services overview
- [ ] donation 
- [ ] videos
- [ ] mission & objective
- [ ] mailing list
- [ ] 



