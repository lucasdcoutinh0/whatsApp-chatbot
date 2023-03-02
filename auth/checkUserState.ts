    import { Client, Message, GroupChat } from "whatsapp-web.js";
    import { getUser } from "../queries/getUser";
import { requestManager } from "../requestManager";

    type Props = {
        msg: Message,
        client: Client
    }

    const checkUserState = async (props: Props) => {
        const chat = await props.msg.getChat()
        const user = await getUser(props.msg.from.split('@')[0])
    
        if(chat.isGroup){
            const groupChat = await props.msg.getChat() as GroupChat
            await props.client.sendMessage(groupChat.id._serialized, "Sorry, I can't work in groups yet")
            await groupChat.leave()
        }
        else if(user.isValid){
            const response = await requestManager(props.msg)
            await props.client.sendMessage(props.msg.from, response)
        }
        else{
            await props.client.sendMessage(props.msg.from, "Sorry, you are not registered yet")
        }
        
    }

    export { checkUserState }