import ROUTES from "../../routes/ROUTES";

const alwaysButtons = [{ to: ROUTES.ABOUT, children: "About Us" }];

const loggedInButtons = [{ to: ROUTES.FAV, children: "FavCards 🌟" }];

const bizButtons = [{ to: ROUTES.MYCARDS, children: "MYCARDS" }];

const adminButtons = [{ to: ROUTES.SANDBOX, children: "UserManage" }];

export { alwaysButtons, loggedInButtons, bizButtons, adminButtons };
