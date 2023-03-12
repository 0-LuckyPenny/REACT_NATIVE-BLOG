import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { colors } from "../../../helpers/colors";

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log(posts);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.userImage}
          source={require("../../../assets/images/user.jpg")}
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
          <View style={styles.post}>
            <Image sourse={{ uri: item.photo }} style={styles.postImg} />
            <Text style={styles.namePost}>{item.name}</Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
                justifyContent: "space-between",
              }}>
              <View style={styles.commentCont}>
                <FontAwesome name='comment' size={24} color={colors.orange} />
                <Text style={styles.commentQuant}>8</Text>
              </View>

              <View style={styles.locationCont}>
                <SimpleLineIcons
                  name='location-pin'
                  size={24}
                  color={colors.textColor}
                />
                <Text style={styles.locationName}>{item.location}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
  post: {
    marginTop: 32,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  postImg: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  namePost: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginTop: 8,
    color: colors.black,
  },
  commentCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentBtn: {},
  commentQuant: {
    marginLeft: 8,
    fontSize: 16,
  },
  locationCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    marginLeft: 4,
    fontSize: 16,
    color: colors.black,
    textDecorationLine: "underline",
  },
});
