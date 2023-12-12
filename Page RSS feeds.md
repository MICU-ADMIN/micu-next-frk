![[Screenshot 2023-11-17 at 14.44.28.png]]

```js
import { type Metadata } from 'next'

  

import { Providers } from '@/app/providers'

import { Layout } from '@/components/Layout'

  

import '@/styles/tailwind.css'

  

export const metadata: Metadata = {

title: {

template: '%s - Spencer Sharp',

default:

'Spencer Sharp - Software designer, founder, and amateur astronaut',

},

description:

'I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.',

alternates: {

types: {

'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,

},

},

}

  

export default function RootLayout({

children,

}: {

children: React.ReactNode

}) {

return (

<html lang="en" className="h-full antialiased" suppressHydrationWarning>

<body className="flex h-full bg-zinc-50 dark:bg-black">

<Providers>

<div className="flex w-full">

<Layout>{children}</Layout>

</div>

</Providers>

</body>

</html>

)

}
```

this may not mean much but inside of this code the page offers a rss file as a alternative to the current page this is important because that link can host the rss feed elsewhere for our client 