import './../style/Footer.css'; // Import the CSS file for styling

export default function Footer() {
    return (
      <footer className="Footer">
        <div className="Footer__inner page-container">
          <p className="Footer__text">&copy; {new Date().getFullYear()} Matthijs Holland. All rights reserved.</p>
        </div>
      </footer>
    );
  }
