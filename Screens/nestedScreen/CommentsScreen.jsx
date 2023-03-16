import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "../../helpers/colors";
import { AntDesign } from "@expo/vector-icons";
import Comment from "../../components/Comment";

export default function CommentsScreen({ route }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.commentList}>
          <Image
            style={styles.postImage}
            source={{ uri: route.params.item.photo }}
          />
          <Comment
            userAva={require("../../assets/images/avaComent.jpg")}
            comment={5454}
            date={55454}
          />

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder={"Comment..."}
              placeholderTextColor={colors.textColor}
            />
            <TouchableOpacity style={styles.sendBtn} activeOpacity={0.6}>
              <AntDesign name="arrowup" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  commentList: {
    marginHorizontal: 16,
  },
  postImage: {
    marginVertical: 32,
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  inputBox: {
    marginBottom: 16,
  },
  input: {
    paddingLeft: 16,
    paddingVertical: 16,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: colors.background,
    borderColor: colors.borderColor,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    end: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    backgroundColor: colors.orange,
    borderRadius: 50,
  },
});
