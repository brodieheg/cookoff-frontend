import Vote from "../vote";
import Submit from "../submit";
import Results from "../results";
import App from "../App";

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
];

export default mainRoutes;