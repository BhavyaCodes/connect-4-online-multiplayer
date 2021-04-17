import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  IconButton,
} from "@material-ui/core";

import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  // const preventDefault = (event) => event.preventDefault();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Connect 4
          </Typography>

          <div>
            <Link
              href="https://github.com/BhavyaCodes/connect-4-online-multiplayer"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <IconButton
                aria-label="Github repository link"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
