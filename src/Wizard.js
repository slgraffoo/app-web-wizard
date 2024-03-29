import React, {Component} from 'react';
import './Wizard.css';
import logo from "./logo.svg";
import engine from './engine.js'

function WizAppHeader(props) {
    return (
        <header className="WizApp-header v-layout">
            <h1 className="h-layout"><img src={logo} className="WizApp-logo" alt="logo" />Wizard!</h1>
            <div className="breadcrumb h-layout">
                {props.trail}
            </div>
        </header>
    );
}

class WizardMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: props.config,
            stage: engine.getNextStage(props.config.configId, props.config.startId, null),
            selectedAnswer: null
        }
        this.state.config.title =
            engine.getConfig(this.state.config.configId).title;
    }
    handleAnswerClick(e) {
        console.log('answer event is:', e.currentTarget.value);
        this.setState({selectedAnswer: e.currentTarget.value});
    }
    handleNextClick(e) {
        console.log('this is:', this);
        console.log('next event is:', e.currentTarget.id);
        this.updateStage();
    }
    updateStage() {
        const next = engine.getNextStage(this.state.config.configId, this.state.stage.id, this.state.selectedAnswer);
        if (next !== null) {
            this.setState({
                stage: next
            });
        }
    }
    // TODO ERROR BOUNDARIES
    // TODO WHEN STAGE IS THE END
    // TODO RESET RADIO CHECKED WHEN RENDERED
    render() {
        return (
            <main className="WizApp-main">
                <h2>{this.state.config.title}</h2>
                <p>
                    Stage: {this.state.stage.id}<br />
                </p>
                    <p>{this.state.stage.question}</p>
                    <div>
                        <input type="radio" id="contactChoice1"
                               name="answer" value={this.state.stage.answers[0].value}
                               onChange={(e) => this.handleAnswerClick(e)}/>
                        <label htmlFor="contactChoice1">{this.state.stage.answers[0].choice}</label>
                        <br />
                        <input type="radio" id="contactChoice2"
                               name="answer" value={this.state.stage.answers[1].value}
                                onChange={(e) => this.handleAnswerClick(e)}/>
                        <label htmlFor="contactChoice2">{this.state.stage.answers[1].choice}</label>
                    </div>
                    <div>
                        <button id="nextStage" onClick={(e) => this.handleNextClick(e)}>Next</button>
                    </div>
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
        );
    }
}

class Wizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {
                configId: props.configId,
                startId: 0
            }
        }
    }
    render() {
        return (
            <div className="WizApp">
                <WizAppHeader
                    trail={"here > there > make-this-an-array"}
                />
                <WizardMain
                    config={this.state.config}
                />
            </div>
        );
    }
}

export default Wizard;