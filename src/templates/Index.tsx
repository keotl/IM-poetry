import React from "react";
import { Link } from "gatsby";

const IndexPage = (props: { pageContext: { links: string[] } }) => (
  <div>
    <h1>Available pages</h1>
    {props.pageContext.links.map(l => (
      <Link key={l} to={l}>
        {l}
      </Link>
    ))}
  </div>
);

export default IndexPage;
