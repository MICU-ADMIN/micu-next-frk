```tsx

import { getSession } from '@/app/_helpers/api/helpers';
import {
	getServerCacheValue,
	addServerCacheValue,
} from '@/app/_helpers/api/servercache';
import React from 'react';
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import PrayersPage from './Reports';
import SettingsPage from './Reports';
import AssetsPage from './Reports';
import ReportsPage from './Reports';

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

	return <ReportsPage data={data} />;
}


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + Go File
    +-----------------------+
    | Import Statements |
    +-----------------------+
    | getSession, getServerCacheValue, addServerCacheValue |
    +-----------------------+
    | React, NextResponse |
    +-----------------------+
    | MySQL, mysql2/promise |
    +-----------------------+
    | PrayersPage, SettingsPage, AssetsPage, ReportsPage |

    +-----------------------+
    | Function Declarations |
    +-----------------------+
    | getData() |
        |- Try catch block |
        |- Execute SQL query |
        |- Get cached data |
        |- Return data |

    +-----------------------+
    | Data Returned |
    +-----------------------+
    | const sites = await getData(); |
    +-----------------------+
    | Return sites |

```
This Mermaid Markdown overview shows the structure of the Go file, including the import statements, function declarations, and the

```
