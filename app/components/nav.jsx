import { Link } from 'react-router-dom';

export const Nav = () => (
  <nav>
    <div className="container">
      <Link to="/"><span>rmj.io</span></Link>
      <Link to="/regex"><span>regex</span></Link>
      <Link to="/takuzu"><span>takuzu</span></Link>
      <Link to="/blog/"><span>blog</span></Link>
    </div>
  </nav>
);
