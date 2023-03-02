    import { Client, Message, GroupChat } from "whatsapp-web.js";
    import { getUser } from "../queries/getUser";
import { requestManager } from "../queries/requestManager";

    type Props = {
        msg: Message,
        client: Client
    }

    const checkUserState = async (props: Props) => {
        const group = await props.msg.getChat()
        const user = await getUser(props.msg.from.split('@')[0])
    
        if(group.isGroup){
            const groupChat = await props.msg.getChat() as GroupChat
            await props.client.sendMessage(groupChat.id._serialized, "Sorry, I can't work in groups yet")
            await groupChat.leave()
        }
        else if(user.isValid){
            requestManager(props.msg)
        }
        else{
            await props.client.sendMessage(props.msg.from, "Sorry, you are not registered yet")
        }
        
    }

    export { checkUserState }