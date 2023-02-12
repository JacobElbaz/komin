import { SafeAreaView, ScrollView } from "react-native";
import BubbleMessage from "../components/BubbleMessage";

const ChatRoom = () => {
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Chloe'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Mike'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Max'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Jym'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Clark'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Stephany'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Suzy'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Stan'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Joe'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Samantha'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Wendy'/>
                <BubbleMessage mine={true} text="Hello world" />
                <BubbleMessage mine={false} text="Hello world" sender='Alex'/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ChatRoom;