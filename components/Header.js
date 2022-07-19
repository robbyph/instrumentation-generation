import { Jumbotron } from "react-bootstrap";
import headerStyles from "../styles/Header.module.scss";

const Header = () => {
  return (
    <a href="/">
      <Jumbotron className={headerStyles.container}></Jumbotron>
    </a>
  );
};

export default Header;

//<img className={headerStyles.img} src="/images/header.jpg" alt="Robby's Instrumentation Generation" draggable="false"/>
