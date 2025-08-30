import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, View } from "react-native";
import { Text } from "~/components/nativewindui/Text";

export const IconButton = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  label?: string;
  color: string;
  onPress: () => void;
  className?: string;
}) => {
  return (
    <Pressable
      className={`px-4 py-2 rounded-full items-center justify-center ${props.className ?? ""}`}
      onPress={props.onPress}
      android_ripple={{ color: "rgba(0,0,0,0.1)", borderless: true }}
    >
      {({ pressed }) => (
        <View
          className="rounded-full flex-row items-center justify-center px-2 py-1"
          style={{
            backgroundColor: pressed ? "rgba(0,0,0,0.05)" : "#1f52dfff",
          }}
        >
          <FontAwesome
            name={props.name}
            size={20}
            color={props.color}
          />
          <Text className="ml-2 text-center font-semibold text-white">{props.label ?? "Icon Button"}</Text>
        </View>
      )}
    </Pressable>
  );
};
