import ROUTES from "../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUT, children: "About Us" },
];

const loggedInLinks = [{ to: ROUTES.FAV, children: "LikedCards" }];

const bizLinks = [
  { to: ROUTES.MYCARDS, children: "MYCARDS" },
  { to: ROUTES.CREATECARD, children: "Create Your Card" },
];

const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks };
