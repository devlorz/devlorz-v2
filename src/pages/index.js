import React from 'react'
import styled from 'react-emotion'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import Footer from '../components/Footer'
import { rhythm } from '../utils/typography'

const Image = ({ link }) => styled('div')`
  background-image: url(link);
`

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMediumPost.edges')
    const mediumURL = `https://medium.com/@leelorz6/`
    const imageURL = `https://cdn-images-1.medium.com/max/750/`

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Bio />
        {posts.map(({ node }) => {
          const title = get(node, 'title')
          const previewImage = get(node.virtuals.previewImage, 'imageId')
          return (
            <a
              target="_blank"
              href={`${mediumURL}${node.id}`}
              key={node.id}
              style={{ color: '#000' }}
            >
              <div>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  {/* <Link style={{ boxShadow: 'none' }} to={node.fields.slug}> */}
                  {title}
                  {/* </Link> */}
                </h3>
                <img src={imageURL + previewImage} />
                <div />
                {node.virtuals.tags.map(({ name }) => {
                  return <small>#{name + ' '}</small>
                })}
                <br />
                <small>
                  {node.latestPublishedAt} by {node.author.name}
                </small>
                <p
                  dangerouslySetInnerHTML={{ __html: node.virtuals.subtitle }}
                />
              </div>
            </a>
          )
        })}
        <Footer />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMediumPost(sort: { fields: [latestPublishedAt], order: DESC }) {
      edges {
        node {
          id
          title
          virtuals {
            subtitle
            previewImage {
              imageId
            }
            tags {
              name
            }
          }
          createdAt
          latestPublishedAt
          author {
            name
          }
        }
      }
    }
  }
`
