import './Wizard.css';
import logo from "./logo.svg";

function Wizard() {
    return (
        <div className="WizApp">
            <header className="WizApp-header">
                <h1>
                <img src={logo} className="WizApp-logo" alt="logo" />
                    Wizard!

                </h1>
            </header>
            <main className="WizApp-main">
                <p>
                    <a className="WizApp-link"
                        href="https://en.wikipedia.org/wiki/Wizard_(software)"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn what a Wizard is.
                    </a><br />
                    Edit <code>src/Wizard.js</code> and save to reload. :-)
                </p>
            </main>
        </div>
    );
}

export default Wizard;