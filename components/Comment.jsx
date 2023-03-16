import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../helpers/colors";
import { Dimensions } from "react-native-web";

export default function Comment({ userAva, comment, date }) {
  return (
    <View style={styles.commentContainer}>
      <Image style={styles.userAva} source={userAva} />

      <View style={styles.textContainer}>
        <Text style={styles.comment}>{comment}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    marginBottom: 24,
    color: colors.black,
  },
  userAva: {
    borderRadius: 14,
    height: 28,
    width: 28,
  },
  textContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
    fontFamily: "Roboto-Regular",
    marginLeft: 16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  comment: {
    fontSize: 13,
    color: colors.black,
    lineHeight: 18,
  },
  date: {
    fontSize: 10,
    marginTop: 8,
    color: colors.textColor,
    textAlign: "right",
  },
});
