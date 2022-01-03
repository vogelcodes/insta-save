"use strict";
(() => {
var exports = {};
exports.id = 313;
exports.ids = [313];
exports.modules = {

/***/ 994:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "instagram-private-api"
const external_instagram_private_api_namespaceObject = require("instagram-private-api");
;// CONCATENATED MODULE: ./pages/api/profile/[username].ts

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
const ig = new external_instagram_private_api_namespaceObject.IgApiClient();
ig.state.generateDevice("acer-i7");
let allFollowers = [];
async function handler(req, res) {
    const { username  } = req.query;
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(process.env.USERNAME || "", process.env.PASSWORD || "");
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    // Create UserFeed instance to get loggedInUser's posts
    const targetUser = await ig.user.searchExact(username.toString());
    const followFeed = ig.feed.accountFollowers(targetUser.pk);
    const friendsFirstPage = await followFeed.items();
    allFollowers = allFollowers.concat(friendsFirstPage);
    console.log('P\xe1gina 1');
    var pageNumber = 2;
    while(followFeed.isMoreAvailable()){
        try {
            const nextPage = await followFeed.items();
            allFollowers = allFollowers.concat(nextPage);
            console.log(`Página ${pageNumber}`);
            pageNumber++;
        } catch (error) {
        }
    }
    // console.log(allFollowers)
    // const profiles = await prisma.profile.findMany()
    res.status(200).json(allFollowers);
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(994));
module.exports = __webpack_exports__;

})();