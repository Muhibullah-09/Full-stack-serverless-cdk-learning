type AppsyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        user: UserData
    }
}

type UserData = {
    name: string
    cnic: number
}

exports.handler = async (event: AppsyncEvent) => {
    switch (event.info.fieldName) {
        case "welcome":
            return "Welcome from Welcome Query"
        case "message":
            return "Welcome from message Query"
        case "addUser":
            console.log('Event ', event.arguments.user);
            return event.arguments.user
        default:
            return null
    }
}