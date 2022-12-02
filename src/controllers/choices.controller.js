import { ObjectId } from "mongodb";
import { choices, votes , polls} from "../database/db.js"
import { formatDateTime } from "../library/miscellanous.js";

export async function defineChoice(req, res) {
    const {title, pollId} = req.body

    const choice = {
        title,
        pollId: new ObjectId(pollId)
    }

    try {
        const pollExists = await polls.findOne({_id: new ObjectId(pollId)})

        if(!pollExists){
            res.sendStatus(404)
            return
        }

        const titleAlreadyExists = await polls.find({title}).toArray()

        if(titleAlreadyExists){
            res.sendStatus(409)
            return
        }

        const hasPollExpired = dayjs(pollExists.expireAt).valueOf() < Date.now()

        if(hasPollExpired){
            res.sendStatus(403)
            return
        }

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
        choiceId: new ObjectId(choiceId)
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
            .find({ pollId: new ObjectId(pollId) })
            .toArray()

        res.status(200).send(choicesInPoll)

    } catch (error) {
        res.sendStatus(500);
    }
}