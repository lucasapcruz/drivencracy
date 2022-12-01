import { choices } from "../database/db.js"

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