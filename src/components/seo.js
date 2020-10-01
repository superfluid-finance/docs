import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import metaImage from "../images/social-card.png";
import { capitalize } from "lodash";

function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  image,
  timeToRead,
  categories
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: "description",
                content: metaDescription
              },
              {
                property: "og:title",
                content: title
              },
              {
                property: "og:description",
                content: metaDescription
              },
              {
                property: "og:type",
                content: "website"
              },
              {
                name: "twitter:card",
                content: "summary_large_image"
              },
              {
                name: "twitter:creator",
                content: data.site.siteMetadata.author
              },
              {
                name: "twitter:title",
                content: title
              },
              {
                name: "twitter:description",
                content: metaDescription
              },
              {
                name: "twitter:image",
                content:
                  image || `${data.site.siteMetadata.baseURL}${metaImage}`
              },
              {
                name: "image",
                content:
                  image || `${data.site.siteMetadata.baseURL}${metaImage}`
              },
              {
                name: "og:image",
                content:
                  image || `${data.site.siteMetadata.baseURL}${metaImage}`
              },
              {
                name: "twitter:label1",
                content: `${
                  categories && categories.length > 1
                    ? "Categories"
                    : "Category"
                }`
              },
              {
                name: "twitter:data1",
                content: `${
                  categories
                    ? categories.map(
                        (category, i) =>
                          `${i !== 0 ? " " : ""}${capitalize(
                            category.replace("-", " ")
                          )}`
                      )
                    : "docs.superfluid.finance"
                }`
              }
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", ")
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: []
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        baseURL
      }
    }
  }
`;
