import db from "../db";

export const getUser = (phoneNumber: string) => {
    return db.user.findFirstOrThrow({
        where: {
            phone: phoneNumber
        }
    })
}
