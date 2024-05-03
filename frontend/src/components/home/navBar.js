import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../../atom/userAtom.js";
import { toast } from "react-toastify";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder.js";

const navLinkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontFamily: "proxima",
  paddingLeft: "10px",
  paddingRight: "10px",
  cursor: "pointer",
  width: "fit-content",
  display: "inline-block",
  fontSize: "16px",
};

const activeNavLinkStyle = {
  ...navLinkStyle,
  textAlign: "center",
  fontWeight: "bold",
  borderBottom: "2px solid",
  animation: "underlineAnimation 0.3s forwards",
};

const NavBar = () => {
  const location = useLocation();
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useRecoilState(userAtom);
  const user = useRecoilValue(userAtom)

  const isCategoryMenuOpen = Boolean(categoryAnchorEl);
  const isAvatarMenuOpen = Boolean(avatarAnchorEl);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch(`/api/category`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        toast.error(error);
      }
    };
    getCategory();
  }, []);

  const handleCategoryMenuOpen = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuOpen = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setCategoryAnchorEl(null);
    setAvatarAnchorEl(null);
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/users/logout");
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      localStorage.removeItem("user");
      setUserLoggedIn(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="sticky" style={{ padding: "10px", height: "80px",background:'#F6D94F',boxShadow:'none' ,color:'black'}}>
      <Toolbar
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography fontWeight={700} fontSize={30} variant="h6">My Store</Typography>
        <div>
          <Typography
            component={Link}
            to="/"
            sx={location.pathname === "/" ? activeNavLinkStyle : navLinkStyle}
          >
            Home
          </Typography>
          <Typography
            aria-haspopup="true"
            onClick={handleCategoryMenuOpen}
            sx={
              location.pathname === "/products"
                ? activeNavLinkStyle
                : navLinkStyle
            }
          >
            Category
          </Typography>
          <Typography
            component={Link}
            to="/wishlist"
            sx={
              location.pathname === "/wishlist" ? activeNavLinkStyle : navLinkStyle
            }
          >
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
            >
              <FavoriteBorder sx={{ color: "black" }} />
            </IconButton>
          </Typography>
          <Typography
            component={Link}
            to="/cart"
            sx={
              location.pathname === "/cart" ? activeNavLinkStyle : navLinkStyle
            }
          >
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
            >
              <ShoppingCartCheckoutIcon sx={{ color: "black" }} />
            </IconButton>
          </Typography>
          {userLoggedIn ? (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleAvatarMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <Typography
              component={Link}
              to="/login"
              sx={
                location.pathname === "/login"
                  ? activeNavLinkStyle
                  : navLinkStyle
              }
            >
              Sign In
            </Typography>
          )}
          <Menu
            anchorEl={categoryAnchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            id="category-menu"
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={isCategoryMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
                
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} onClick={handleMenuClose}>
                <Typography
                  component={Link}
                  to={`/category/${category._id}`}
                  sx={navLinkStyle}
                >
                  {category.title}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <Menu
            anchorEl={avatarAnchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            id="avatar-menu"
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={isAvatarMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={logout}>
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                Logout
                <LogoutRoundedIcon />
              </Box>
            </MenuItem>
            <MenuItem component={Link} to={"/order"}>
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                My orders 
              </Box>
            </MenuItem>
            {user && user.role === 1 && <MenuItem component={Link} to={"/dashboard"}>
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                DashBoard 
              </Box>
            </MenuItem>}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
