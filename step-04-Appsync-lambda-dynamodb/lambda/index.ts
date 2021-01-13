import { DynamoDB } from 'aws-sdk';
const docClient = new DynamoDB.DocumentClient();

type AppsyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        user: UserData
        userID: string
    }
}

type UserData = {
    id: string
    name: string
    cnic: number
}

exports.handler = async (event: AppsyncEvent) => {
    if (event.info.fieldName == "welcome") {
        return "Its Welcome Query..."
    }
    else if (event.info.fieldName == "message") {
        return "Its Message Query..."
    }
    else if (event.info.fieldName == "addUser") {
        event.arguments.user.id = "muh" + Math.random();
        const params = {
            TableName: process.env.TABLE_NAME || "",
            Item: event.arguments.user
        }
        const data = await docClient.put(params).promise();
        console.log("AFTER ADDED = ", data);
        return event.arguments.user;
    }
    else if (event.info.fieldName == "deleteUser") {
        const params = {
            TableName: process.env.TABLE_NAME || "",
            Key: { id: event.arguments.userID }
        }
        const data = await docClient.delete(params).promise();
        console.log("AFTER ADDED = ", data);
        return "Deleted"
    }
    else {
        return "Not Found..."
    }
}

    // switch (event.info.fieldName) {
    //     case "welcome":
    //         return "Welcome from welcome Query"

    //     case "addUser":
    //         event.arguments.user.id = "muh" + Math.random();
    //         const add_params = {
    //             TableName: process.env.TABLE_NAME || "",
    //             Item: event.arguments.user
    //         }
    //         const data = await docClient.put(add_params).promise();
    //         console.log("AFTER ADDED = ", data);
    //         return event.arguments.user;

    //     case "deleteUser":
    //         const delete_params = {
    //             TableName: process.env.TABLE_NAME || "",
    //             Key: { id: event.arguments.userID }
    //         }
    //         const data_delete = await docClient.delete(delete_params).promise();
    //         console.log("AFTER ADDED = ", data_delete);
    //         return "Deleted"
    //     default:
    //         return "Not Found"
    // }