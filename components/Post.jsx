import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { colors } from "../helpers/colors";

export default function Post({
  photo,
  name,
  comments,
  location,
  likes,
  toMap,
  toComment,
}) {
  return (
    <View style={styles.post}>
      <Image source={{ uri: photo }} style={styles.postImg} />
      <Text style={styles.postName}>{name}</Text>

      <View style={styles.description}>
        <View style={styles.commentCont}>
          <TouchableOpacity onPress={toComment}>
            <FontAwesome name="comment" size={24} color={colors.orange} />
          </TouchableOpacity>
          <Text style={styles.commentQuant}>{comments}</Text>
        </View>

        {likes && (
          <View style={styles.likes}>
            <AntDesign name="like2" size={24} color={colors.orange} />
            <Text style={{ marginLeft: 6 }}>{likes}</Text>
          </View>
        )}

        <View style={styles.locationCont}>
          <TouchableOpacity onPress={toMap}>
            <SimpleLineIcons
              name="location-pin"
              size={24}
              color={colors.textColor}
            />
          </TouchableOpacity>
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  postImg: {
    height: 240,
    width: 360,
    borderRadius: 8,
  },
  postName: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginTop: 8,
    color: colors.black,
  },
  description: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  commentCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentQuant: {
    marginLeft: 8,
    fontSize: 16,
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
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
