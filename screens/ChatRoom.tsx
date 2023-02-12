import { SafeAreaView, ScrollView } from "react-native";
import BubbleMessage from "../components/BubbleMessage";

const ChatRoom = () => {
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" />
            </ScrollView>
        </SafeAreaView>
    );
}

export default ChatRoom;