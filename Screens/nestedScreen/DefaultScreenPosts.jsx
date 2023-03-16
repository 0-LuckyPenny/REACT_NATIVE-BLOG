import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { colors } from "../../helpers/colors";
import Post from "../../components/Post";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.userImage}
          source={require("../../assets/images/user.jpg")}
        />
        <View style={styles.userData}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Post
            photo={item.photo}
            name={item.name}
            comments={10}
            location={item.location}
            toComment={() => navigation.navigate("Comments", { item })}
            toMap={() => navigation.navigate("Map", { item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  userImage: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userData: {
    position: "absolute",
    top: 16,
    left: 60,
    marginLeft: 8,
    color: colors.black,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
});
