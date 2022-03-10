/*
    Wizard engine for managing config and steps/stages.
 */
const _ = require('lodash');

function getConfig(configId) {
    // TODO GET SOMEWHERE ELSE
    if (configId !== "fruit") return null;

    return {
        title: "Which fruit?",
        possibilities: [
            {
                result: "apple",
                stages: [ "red", "larger", "smooth" ]
            },
            {
                result: "cherry",
                stages: [ "red", "smaller", "smooth" ]
                // stages: [ "(red|orange)", "smaller" ]
            },
            {
                result: "orange",
                stages: [ "orange", "larger", "bumpy" ]
            }
        ],
        stages: [
            {
                id: "0",
                question: "Is it red?",
                answers: [
                    {
                        choice: "yes",
                        value: "red",
                        meaning: "Fruit is red.",
                        next: 1
                    },
                    {
                        choice: "no",
                        value: "not-red",
                        next: 2
                    }
                ]
            },
            {
                id: "1",
                question: "Is it larger than a silver dollar?",
                answers: [
                    {
                        choice: "yes",
                        value: "larger",
                        meaning: "Fruit is larger.",
                        next: -1
                    },
                    {
                        choice: "no",
                        value: "smaller",
                        meaning: "Fruit is smaller.",
                        next: -1
                    }
                ]
            },
            {
                id: "2",
                question: "Is it orange?",
                answers: [
                    {
                        choice: "yes",
                        value: "orange",
                        next: -1
                    },
                    {
                        choice: "no",
                        value: "not-orange",
                        next: -1
                    }
                ]
            }
        ]
    }
}

function getNextStage(configId, currentStageId, selectedAnswer) {
    const config = getConfig(configId);
    if (config === {}) {
        console.log("No config found for id: " + configId);
    }
    // TODO IF END
    const stageIdx = _.toInteger(currentStageId);
    if (!_.isInteger(stageIdx)) {
        return null;
    }
    const currentStage = config.stages[stageIdx];
    console.log(currentStage);
    if (_.isEmpty(currentStage)) {
        return null;
    }
    if (_.isNull(selectedAnswer)) {
        console.log("returning current stage (no answer)");
        return currentStage;
    }
    let nextStage = {};
    for (const answer of currentStage.answers) {
        if (answer.choice === selectedAnswer) {
            if (answer.next < 0) {
                // the end
                nextStage = { id: "END"}
            } else {
                nextStage = config.stages[answer.next];
            }
        }
    }
    return nextStage;
}

const engine = {getConfig, getNextStage };
export default engine;