import React from "react";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Button from "@mui/material/Button";  
import Menu from "@mui/material/Menu";      
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="flex p-4 bg-yellow-300 justify-between">
        <div className="flex items-center">
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ fontSize: '25px', color:'black',  padding: '0', margin: '0'  }}>
          {/* &#10507;  */}
          &#128317;
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/CreditDashboard">
              Credit Dashboard
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/ViewMarksheet">
              View Marksheet
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/UploadMarksheet">
              Upload Marksheet
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/SheetList">
              Sheet List
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/UniversityApply">
              University apply
              </Link>
            </MenuItem>
            
            
          </Menu>
        </div>
        <div className="cursor-pointer font-semibold text-slate-600 text-md ml-2">
          <Link to="/">
            <SchoolIcon /> Institute Registration
          </Link>
        </div>
        <div className="cursor-pointer font-semibold text-slate-600 text-md mr-2">
          <Link to="/student">
            Student Registration <LocalLibraryIcon />
          </Link>{" "}
        </div>
        <div>
          <Link to="/institutelogin">
            <SchoolIcon /> Institute Login
          </Link>
        </div>
        <div>
          <Link to="/studentlogin">
            Student Login <LocalLibraryIcon />
          </Link>
        </div>
        <div>
          <Link to="/universitylist">
            <SchoolIcon /> Institute List
          </Link>
        </div>
        <div>
          <Link to="/studentlist">
            Student List <LocalLibraryIcon />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
