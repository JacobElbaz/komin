import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'

const ChatHeader = ({ username, picture }: any) => {
	type Nav = {
		[x: string]: any;
    }

    const navigation = useNavigation<Nav>(); 
    
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
				<Icon style={{color: 'white'}} name="angle-left" size={30} />
			</TouchableOpacity>
			<View style={styles.profileOptions}>
				<TouchableOpacity style={styles.profile}>
					<Image style={styles.image} source={{uri: picture}} />
					<View style={styles.usernameAndOnlineStatus}>
						<Text style={styles.username}>{username}</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: '#e32f45',
		padding: 15
	},
	backButton: {
		alignSelf: "center",
		paddingHorizontal: 10,
	},
	profileOptions: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	profile: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#fff",
		flex: 4,
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 32.5,
	},
	usernameAndOnlineStatus: {
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	username: {
		fontSize: 18,
		fontWeight: "500",
		color: 'white'
	},
	options: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
});

export default ChatHeader;