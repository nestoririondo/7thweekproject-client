import "../styles/Footer.css";

const Footer = () => {
  const goUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const date = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-container">
        <p>© {date} Foodie Network</p>
        <button onClick={goUp} className="go-up-btn">
          Go Up!
        </button>
      </div>
    </footer>
  );
};

export default Footer;
