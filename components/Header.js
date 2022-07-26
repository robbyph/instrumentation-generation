import { Jumbotron } from "react-bootstrap";
import headerStyles from "../styles/Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <Link href="/" passHref>
      <a>
        <Jumbotron className={headerStyles.container}></Jumbotron>
      </a>
    </Link>
  );
};

export default Header;

//<img className={headerStyles.img} src="/images/header.jpg" alt="Robby's Instrumentation Generation" draggable="false"/>
