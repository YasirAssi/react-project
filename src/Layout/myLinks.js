import ROUTES from "../routes/ROUTES";

const alwaysLinks = [{ to: ROUTES.ABOUT, children: "About Us" }];

const loggedInLinks = [{ to: ROUTES.FAV, children: "FavCards 🌟" }];

const bizLinks = [{ to: ROUTES.MYCARDS, children: "MYCARDS" }];

const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks };
