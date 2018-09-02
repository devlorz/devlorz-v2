/* global tw */
import React from 'react'
import styled from 'react-emotion'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

const Name = styled('h1')`
  ${tw('my-0 text-xl leading-tight')};
`

const Avatar = styled('img')`
  ${tw('block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0')};
`

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        {/* <img
          src={profilePic}
          alt={`Nutti Saelor`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        /> */}
        <Avatar src={profilePic} alt="Nutti Saelor" />
        <p>
          Written by <Name>Nutti Saelor</Name> who lives and works in Bangkok,
          Thailand.{' '}
          <a href="https://twitter.com/JessHolicz">
            You should follow him on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
