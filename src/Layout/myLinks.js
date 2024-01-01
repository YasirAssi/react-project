import ROUTES from "../routes/ROUTES";
const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUT, children: "About Us" },
];

const loggedInLinks = [
  { to: "/profile", children: "Profile page" },
  { to: ROUTES.CREATECARD, children: "Create page" },
];

const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks };

// const myLinks = [
//   { to: ROUTES.HOME, children: "Home page" },
//   { to: ROUTES.REGISTER, children: "Register page" },
//   { to: ROUTES.LOGIN, children: "Login page" },
// ];

// export default myLinks;
