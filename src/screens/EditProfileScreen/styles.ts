import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";

export default StyleSheet.create({
    page: {
      alignItems: 'center',
      padding: 10,
    },
    avatar: {
      width: '30%',
      aspectRatio: 1,
      borderRadius: 100,
    },
    textButton: {
      color: colors.primary,
      fontSize: fonts.size.md,
      fontWeight: fonts.weight.semi,
      margin: 10,
    },
    textButtonDanger: {
      color: colors.accent,
      fontSize: fonts.size.md,
      fontWeight: fonts.weight.semi,
      margin: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
      padding: 10,
    },
    label: {
      width: 75,
      color: colors.grey,
    },
    input: {
      borderBottomWidth: 1,
      height: 50,
    },
  });