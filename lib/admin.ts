import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2lFAMxZHgRUK2cWrweUd20im6tf",
]

export const isAdmin =  () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;

}