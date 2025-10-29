import Vote from "../vote";
import Submit from "../submit";
import Results from "../results";
import App from "../App";
import Login from "../login";

const mainRoutes = [
  {
    path: "/",
    element: App,
  },
  {
    path: "/vote",
    element: Vote,
  },
  {
    path: "/submit",
    element: Submit,
  },
  {
    path: "/results",
    element: Results,
  },
  {
    path: "/login",
    element: Login,
  }
];

export default mainRoutes; ``