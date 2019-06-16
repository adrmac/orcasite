import React, { Component } from "react"

import { gql } from "apollo-boost"
import { Query } from "react-apollo"

import IconButton from "@material-ui/core/IconButton"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"

import FeedPageV2 from "./FeedPageV2"
import PlayerV2 from "./PlayerV2"
import SiteMenu from "./SiteMenu"
import About from "./AboutV2"
import AudioPlayerV2 from "./AudioPlayerV2"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { StylesProvider } from "@material-ui/styles"

const theme = createMuiTheme({
  /* change default theme options below */
  /* gets merged into custom style objects */
  /* using latest version of typography */
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#2196f3"
    },
    secondary: {
      main: "#009688"
    }
  }
})

// ---------------------------------------
// Ordering style sheets in the <head>
// ---------------------------------------
export default class HomeV2 extends Component {
  state = {}

  componentDidMount() {
    if (["beta", "dev", "staging"].indexOf(ENV.ENV_NAME) >= 0) {
      document.title = `Orcasound ${ENV.ENV.NAME}`
    } else {
      document.title = `Orcasound`
    }
  }

  changeFeed = currentFeed => this.setState({ currentFeed, autoplay: true })

  render() {
    const { feedSlug } = this.props.match.params

    return (
      <>
        <StylesProvider>
          <MuiThemeProvider theme={theme}>
            <Paper square elevation={0}>
              <SiteMenu />
              {!feedSlug && (
                <div>
                  <About />
                  <AudioPlayerV2 />
                </div>
              )}
              {feedSlug && (
                <div>
                  <FeedPageV2
                    feedSlug={feedSlug}
                    onChangeFeed={this.changeFeed}
                  />
                  <PlayerV2
                    currentFeed={this.state.currentFeed}
                    key={
                      this.state.currentFeed && this.state.currentFeed.nodeName
                    }
                    autoplay={this.state.autoplay}
                  />
                </div>
              )}
            </Paper>
          </MuiThemeProvider>
        </StylesProvider>
      </>
    )
  }
}
