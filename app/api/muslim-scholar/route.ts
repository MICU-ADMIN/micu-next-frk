//muslimscholars.info/manage.php?ylist=-1&yfield=0&yoption=0&yorder=0&ysource=0&scholarSearch=3&submit=Find

import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Response) => {
  try {
    // get site query param
    const searchParams = new URL(req.url).searchParams;

    const id = searchParams.get('id');
    if (!id)
      return NextResponse.json({ errors: 'incorrect params' }, { status: 400 });

    //fetch scholar
    const scholar = await fetch(
      `https://muslimscholars.info/manage.php?ylist=-1&yfield=0&yoption=0&yorder=0&ysource=0&scholarSearch=${id}&submit=Find`
    ).then((res) => res.text());

    return new Response(scholar, { headers: { 'content-type': 'text/html' } });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ errors: 'Server Error' }, { status: 500 });
  }
};
