// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IgApiClient, AccountFollowersFeedResponseUsersItem } from 'instagram-private-api'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ig = new IgApiClient();
ig.state.generateDevice("acer-i7");
let allFollowers: AccountFollowersFeedResponseUsersItem[] = [];

// Optionally you can setup proxy url

type Data = AccountFollowersFeedResponseUsersItem[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username } = req.query;
  await ig.simulate.preLoginFlow();
const loggedInUser = await ig.account.login(process.env.USERNAME || "" ,process.env.PASSWORD || "");
// The same as preLoginFlow()
// Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
// Create UserFeed instance to get loggedInUser's posts
const targetUser = await ig.user.searchExact(username.toString());
const followFeed =  ig.feed.accountFollowers(targetUser.pk);
const friendsFirstPage = await followFeed.items();
allFollowers=(allFollowers.concat(friendsFirstPage));
console.log('Página 1')
var pageNumber = 2;
while (followFeed.isMoreAvailable()) {
    try {
        const nextPage = await followFeed.items();
        allFollowers=allFollowers.concat(nextPage);
        console.log(`Página ${pageNumber}`)
        pageNumber++
        
    } catch (error) {
        
    }
    
}
// console.log(allFollowers)


  const profiles = await prisma.profile.findMany()
  res.status(200).json(allFollowers)
}
