import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMediumPost.edges')
    const mediumURL = `https://medium.com/@leelorz6/`

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Bio />
        {posts.map(({ node }) => {
          const title = get(node, 'title')
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
