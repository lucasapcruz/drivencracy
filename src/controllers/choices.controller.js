import { choices, votes } from "../database/db.js"
import { formatDateTime } from "../library/miscellanous.js";

export async function defineChoice(req, res){
    const choice = req.body

    try {
        await choices
            .insertOne(choice)

        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function voteOnChoice(req, res){
    const pollId = req.params.id
    const vote = {
        createdAt: formatDateTime(Date.now()),
        pollId
    }


    try {
        await votes
            .insertOne(vote)

        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500);
    }
}