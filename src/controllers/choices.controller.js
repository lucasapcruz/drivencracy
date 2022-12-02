import { ObjectId } from "mongodb";
import { choices, votes } from "../database/db.js"
import { formatDateTime } from "../library/miscellanous.js";

export async function defineChoice(req, res) {
    const choice = req.body

    try {
        await choices
            .insertOne(choice)

        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function voteOnChoice(req, res) {
    const choiceId = req.params.id
    const vote = {
        createdAt: formatDateTime(Date.now()),
        choiceId
    }


    try {
        await votes
            .insertOne(vote)

        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function gteChoicesInPoll(req, res) {
    const pollId = req.params.id


    try {
        const choicesInPoll = await choices
            .find({ pollId: pollId })
            .toArray()

        res.status(200).send(choicesInPoll)

    } catch (error) {
        res.sendStatus(500);
    }
}