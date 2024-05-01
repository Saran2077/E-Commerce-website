import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { RecoilRoot } from "recoil";

const defaultTheme = createTheme();

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <RecoilRoot>
      <BrowserRouter>
        <div className="p-0 m-0 w-full">
          <ToastContainer />
          <CssBaseline />
          <App />
        </div>
      </BrowserRouter>
    </RecoilRoot>
  </ThemeProvider>,
  document.getElementById("root")
);
