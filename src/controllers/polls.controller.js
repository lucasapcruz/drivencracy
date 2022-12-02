import dayjs from "dayjs"
import { ObjectId } from "mongodb"
import { polls, votes, choices } from "../database/db.js"
import { dateTimeFormat, daysToSeconds } from "../library/miscellanous.js"

export async function createPoll(req, res) {
    const poll = req.body

    const hasExpirationDate = poll.expireAt

    if (!hasExpirationDate) {
        const expireDateInMills = Date.now() + daysToSeconds(30)
        poll.expireAt = dayjs(expireDateInMills).format(dateTimeFormat)
    }

    try {
        const insertedPoll = await polls
            .insertOne(poll)

        const result = {
            _id: insertedPoll.insertedId.toString(),
            ...poll
        }

        res.status(201).send(result)

    } catch (error) {
        res.sendStatus(500);
    }
}


export async function getPolls(req, res) {

    try {
        const poll = await polls
            .find({}).toArray()

        res.status(200).send(poll)

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getPollResult(req, res) {
    const pollId = req.params.id

    try {
        const poll = await polls
            .findOne({ _id: new ObjectId(pollId) })

        const choicesForPoll = await choices.find({ pollId: pollId }).toArray()

        const choicesIdsForPoll = choicesForPoll.map((choice) => choice._id.toString())
        
        const votesForChoices = await votes.aggregate([
            {
                $match: { choiceId: { $in: choicesIdsForPoll } }
            },
            {
                $group: {
                    _id: "$choiceId",
                    numberOfVotes: {
                        $count: {}
                    }
                }
            },
            {
                $sort: { numberOfVotes: -1 }
            }
        ]).toArray()

        const mostVotedChoiceResult = votesForChoices[0]

        const mostVotedChoice = choicesForPoll.filter((choice) => choice._id.toString() === mostVotedChoiceResult._id)[0]

        const result = {
            title: mostVotedChoice.title,
            votes: mostVotedChoiceResult.numberOfVotes
        }

        const resultForPoll = {
            ...poll,
            result
        }

        res.status(200).send(resultForPoll)

    } catch (error) {
        res.sendStatus(500);
    }
}