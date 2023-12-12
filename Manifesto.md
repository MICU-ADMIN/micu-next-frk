

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

and is advantageous due to the fact that fetching an array of images for example can render all images in a list of all present on the page


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

Authentication Middleware


```mermaid

sequenceDiagram
    participant web as Web Browser
    participant blog as Blog Service
    participant account as Account Service
    participant mail as Mail Service
    participant db as Storage

    Note over web,db: The user must be logged in to submit blog posts
    web->>+account: Logs in using credentials
    account->>db: Query stored accounts
    db->>account: Respond with query result

    alt Credentials not found
        account->>web: Invalid credentials
    else Credentials found
        account->>-web: Successfully logged in

        Note over web,db: When the user is authenticated, they can now submit new posts
        web->>+blog: Submit new post
        blog->>db: Store post data

        par Notifications
            blog--)mail: Send mail to blog subscribers
            blog--)db: Store in-site notifications
        and Response
            blog-->>-web: Successfully posted
        end
    end
    
    
    
```

    


This platform offers users the ability to create an account, unlocking a myriad of features. Upon registration, users can either establish their own organization or explore existing ones housed in nearby establishments. The process is streamlined, complete with confirmation emails to ensure security.  they can craft a comprehensive CV file by seamlessly integrating in-house and external data. The platform facilitates communication through acceptance notifications or invitations, accessible both within the app and through email links.


Organization Middleware

```mermaid 
sequenceDiagram
    participant User as User
    participant Web as Web Platform
    participant Account as Account Service
    participant Org as Organization Service
    participant Mail as Mail Service
    participant DB as Database

    Note over User,Web: User registers and logs in
    User->>+Account: Register/Log in
    Account->>DB: Query user data
    DB->>Account: Respond with query result
    Account-->>-User: Confirmation (Success/Failure)

    Note over User,Web: User creates or joins an organization
    User->>+Org: Create/Join organization
    Org->>DB: Store organization data
    DB->>Org: Respond with query result
    Org-->>-User: Confirmation (Success/Failure)

    Note over User,Web: User interacts with organization (posts, events, tasks, etc.)
    User->>Org: Interact with organization
    Org->>DB: Update organization data
    DB->>Org: Respond with query result
    Org-->>User: Confirmation (Success/Failure)

    Note over User,Web: Notifications are sent to the user
    Org->>Mail: Send notification
    Mail-->>User: Notification
```


Once users are part of an organization, members gain access to a suite of tools, empowering them to create and view articles, peruse event timetables, request stewardship of prayers, contribute tickets, and even be assigned maintenance tasks. All these activities contribute to the development of a personal website for each member, enhancing their online presence.

For users operating in organization owner mode, they can navigate to their organization website, mirroring the organization's information onto a website users and organisations alike have the option to add custom domains, tailoring their online presence.

Administrators of mosques hold a distinct set of capabilities, enabling them to create events, manage prayer times, approve articles (this allows the article writers to gain a approved tick on their articles as their group agrees, oversee organization information, handle uploads (iframes) + tag members within those uploads hence them too gaining the upload on their personal site, and add buildings. The building addition process involves submission for approval, with data stored in a MongoDB database and spatially queried to enhance local organization searches.

A unique feature is the perspective incorporated into the mobile app, which extracts relevant data such as local buildings that would gender-specific perspectives. For instance, if there are four nearby buildings, the app could focus on the closest one, housing two organizations—one catering to males and the other to females.

The spatial query system further refines the user experience by displaying only the most pertinent local organizations at retreiving their data from the sql database. This dynamic approach enhances user engagement with a map and ensures that the platform remains user-centric but affordable.

```mermaid
flowchart TD
  subgraph User
    UserAccountCreation((Create Account))
    UserOrganizationCreation((Create Organization))
    UserExploreOrganizations((Explore Organizations))
    UserCreateCV((Create CV File))
    UserConfirmationEmails((Confirmation Emails))
    UserApplicationAcceptance((Application Accepted))
    UserInviteAcceptance((Invite Accepted))
    UserPersonalWebsite((Personal Website))
    UserCustomDomains((Custom Domains))
  end

  subgraph Organization
    OrgMemberActivities((Member Activities))
    OrgArticlesEvents((View/Create Articles, View Event Timetables))
    OrgPrayerStewardship((Request Stewardship of Prayers))
    OrgContributeTickets((Contribute Tickets))
    OrgMaintenanceTasks((Assigned Maintenance))
    OrgWebsite((Organization Website))
  end

  subgraph Admin
    AdminMosqueCapabilities((Mosque Administration))
    AdminEventCreation((Create Events))
    AdminPrayerManagement((Manage Prayer Times))
    AdminArticleApproval((Approve Articles))
    AdminOrgManagement((Manage Organization Info))
    AdminUploadManagement((Manage Uploads - iframes))
    AdminBuildingApproval((Add Building - Subject to Approval))
  end

  subgraph Database
    MongoDB((MongoDB))
  end

  subgraph MobileApp
    MobileDataExtraction((Extract Local Building and Gender-Specific Data))
    MobileDisplay((Display Relevant Data))
  end

  UserAccountCreation --> UserOrganizationCreation
  UserOrganizationCreation --> UserExploreOrganizations
  UserExploreOrganizations --> OrgArticlesEvents
  UserExploreOrganizations --> AdminMosqueCapabilities
  UserExploreOrganizations --> MobileDataExtraction
  UserCreateCV --> OrgMemberActivities
  UserConfirmationEmails --> UserApplicationAcceptance
  UserConfirmationEmails --> UserInviteAcceptance
  UserApplicationAcceptance --> OrgMemberActivities
  UserInviteAcceptance --> OrgMemberActivities
  OrgMemberActivities --> OrgArticlesEvents
  OrgMemberActivities --> OrgPrayerStewardship
  OrgMemberActivities --> OrgContributeTickets
  OrgMemberActivities --> OrgMaintenanceTasks
  OrgMemberActivities --> UserPersonalWebsite
  UserPersonalWebsite --> UserCustomDomains
  AdminMosqueCapabilities --> AdminEventCreation
  AdminMosqueCapabilities --> AdminPrayerManagement
  AdminMosqueCapabilities --> AdminArticleApproval
  AdminMosqueCapabilities --> AdminOrgManagement
  AdminMosqueCapabilities --> AdminUploadManagement
  AdminMosqueCapabilities --> AdminBuildingApproval
  AdminBuildingApproval --> Database
  Database --> OrgArticlesEvents
  Database --> MobileDataExtraction
  MobileDataExtraction --> MobileDisplay

```




**User Activities:**
- Create/view articles
- Peruse event timetables
- Request stewardship of prayers
- Contribute tickets
- Be assigned maintenance tasks
- Develop personal accolade website

**Organization Owner Mode:**
- Navigate organization website
- Mirror organization information
- Add custom domains
- Add buildings (submission for approval) Spatially queried MongoDB for local organization searches

**Mosque Administrators:**
- Create events
- Manage prayer times
- Approve articles
- Oversee organization info
- Handle uploads (iframes)
- Tag members in uploads


**Unique Features:**
- Mobile app's gender-specific perspective
- Extracts relevant data (local buildings)
- Focus on closest building
- Displays most pertinent local organisations
- Affordable, list-based user engagement


```mermaid
graph TD
  A[Start] -->|Extract relevant data| B[Focus on closest building]
  B -->|Interactions with nearby buildings| C[Building 1]
  C -->|Engage with male organizations| D[Male Organization]
  C --> D
  C -->|Connect with female organizations| E[Female Organization]
  B -->|Display gender-specific perspectives| F[Enhance user experience]

  style A fill:#77DD77
  style B fill:#77DD77
  style C fill:#77DD77
  style D fill:#FFD700
  style E fill:#FF69B4
  style F fill:#77DD77

```



**Task** 

Imagine i am a mosque who wants to have a website for my organization 

```mermaid


journey
    title Visiting product site
    section Frontend
      Product info: 5
      Contact: 5
      Mission statement: 1
      Styling: 1
    %% section Backend
      Tos: 5
      Careers: 5
      
      
```


```mermaid


journey
    title Creating a account
    section Desk
      Compliance: 0
    section Frontend
      Page: 3
      Token storage: 1
      Remember me: 1 
    section Backend
      Create operation: 5: Contingent
      Issue token: 5: Contingent

```







```mermaid


journey
    title Authenticating with account
    section Frontend
      Page: 0: Contigent
      Token storage: 0: Global
    section Backend
      Validate token: 5
      Auth middleware: 5
      
```


```mermaid


journey
    title Refreshing token
    section Frontend
      Expiration handler: 5
    section Backend
      Refresh token: 5
      
```



```mermaid


journey
    title Missing organization
    section Frontend
      Explore organizations: 5
      Accept invite: 3
      Resume builder: 3
    section Backend
      Accept invite: 5
      Request invite: 0
      Nearby organizations : 0
```


```mermaid


journey
    title Create an organization
    section Frontend
      Make tea: 5
      Go upstairs: 3
      Do work: 1
    section Backend
      Go downstairs: 5
      Sit down: 5
      
```
```mermaid

journey
    title Add an establishment
    section Frontend
      Make tea: 5
      Go upstairs: 3
      Do work: 1
    section Backend
      Go downstairs: 5
      Sit down: 5
      

```
The process of a user applying for an establishment, submitting documents, and the verification procedure on the admin side:

```mermaid
graph TD
  A[User Applies for Establishment] -->|Submits Documents| B[Admin Receives Documents]
  B -->|Verifies Documents| C[Approval Decision]
  C -->|Approved| D[Notify User: Approval Granted]
  C -->|Rejected| E[Notify User: Approval Denied]
```


# Establishment Application and Verification Process

## Process Overview

1. **User Applies for Establishment:**
   - The user initiates the application process for establishing their entity.

2. **Admin Receives Documents:**
   - The user submits the required documents for verification.
   - The admin receives the documents on the administrative side.

3. **Verification Process:**
   - The admin verifies the submitted documents to ensure they meet the establishment's criteria and any legal requirements.
   - If additional information or corrections are needed, the admin communicates with the user.

4. **Approval Decision:**
   - Based on the verification results, the admin makes a decision regarding approval or rejection of the establishment application.

5. **Notification to User: Approval Granted:**
   - If the documents are approved, the user is notified, and the establishment is granted approval.

6. **Notification to User: Approval Denied:**
   - If the documents are rejected, the user is notified, and the establishment application is denied.

```
Note: This process could be automised heavily as company fraud does exist and is a valid problem companies face its not neccarily our responsibility to shake down our customers

Ps leading to that we can just sift documents for key data such as address ect and store 
```

Now their establishment is confirmed all organizations who claim affiliation can be approved under this entity and become now globally and locally searchable


## Manifesto 2 

Organizations have changed to establishments and also the repo has moved to the old repo and now its a migration to the other side 

EstablishmentID will just superceede Organizations 
and the newly created BuildingID will take on what was formerly known as "a establishment housing multiple organizations"

Website schema will have to change but thats part of the migration

Creating a organization / building formerly known as org and establishment

![[Pasted image 20231119123513.png]]

![[Pasted image 20231119222420.png]

