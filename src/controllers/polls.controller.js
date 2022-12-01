import dayjs from "dayjs"
import { polls } from "../database/db.js"
import { dateTimeFormat, daysToSeconds } from "../library/miscellanous.js"

export async function createPoll(req, res){
    const poll = req.body

    const hasExpirationDate = poll.expireAt

    if(!hasExpirationDate){
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


export async function getPolls(req, res){

    try {
        const poll = await polls
            .find({}).toArray()

        res.status(200).send(poll)

    } catch (error) {
        res.sendStatus(500);
    }
}