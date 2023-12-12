```tsx

import { getSession } from '@/app/_helpers/api/helpers';
import {
	getServerCacheValue,
	addServerCacheValue,
} from '@/app/_helpers/api/servercache';
import React from 'react';
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import PrayersPage from './Settings';
import SettingsPage from './Settings';

//@ts-expect-error
const conn = mysql.createConnection(
	process.env.DATABASE_URL
);

//This function is server side only.
async function getData() {
	try {
		const session = await getSession(
			conn
		);
		if (!session?.establishmentId)
			return NextResponse.redirect(
				process.env
					.NEXT_PUBLIC_APP_URL +
					'/login?unathorised=true'
			);

		const cachedData =
			await getServerCacheValue(
				'prayers' +
					session.establishmentId
			);
		if (cachedData) return cachedData;

		const [sites] = await (
			await conn
		).execute(
			' SELECT `id`, `description`, `title`, `userId`, `timesData`, `createdAt`, `updatedAt` FROM `Prayer` WHERE `establishmentId` = ? ORDER BY `id` DESC LIMIT 30 ',
			[session.establishmentId]
		);

		addServerCacheValue(
			sites,
			'prayers' +
				session.establishmentId
		);
		return sites;
	} catch (err) {
		console.log(err);
		return [];
	}
}

export default async function Page() {
	const data = await getData();

	return <SettingsPage data={data} />;
}


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + Go File (${file})
    + Import (${import})
    + Functions (${function})
    + MySQL (${mysql})
    + React (${React})
    + Next (${NextResponse})
    + Session (${session})
    + Cache (${getServerCacheValue})
    + Establishment ID (${session.establishmentId})
    + Prayer Data (${sites})
    + Error Handling (${err})
    + Return (${return})
```
This overview shows the relationships between the different components in the file, including the Go file itself, imports, functions, databases, and React components. It also highlights the error handling and return statements in the `getData()` function.
Note that Mermaid Markdown is a visual language for explaining complex systems, and the overview is meant to provide a high-level view of the file's structure and relationships. For a more detailed understanding of the code, you may need to consult the actual Go file or consult with

```
