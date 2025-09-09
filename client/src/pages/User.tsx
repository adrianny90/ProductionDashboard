import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router";

const User = () => {
  return (
    <div>
      <Sidebar>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem component={<Link to="/charts" />}> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default User;
