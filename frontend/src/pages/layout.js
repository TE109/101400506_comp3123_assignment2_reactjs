import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="login">login</Link>
          </li>
          <li>
            <Link to="SignUp">SignUp</Link>
          </li>
          <li>
            <Link to="EmployeeComponents">Employee components</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;