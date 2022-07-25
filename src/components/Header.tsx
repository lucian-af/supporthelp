import { useNavigation } from "@react-navigation/native";
import { Heading, HStack, IconButton, StyledProps, useTheme } from "native-base";
import { ArrowUUpLeft } from "phosphor-react-native";

type Props = StyledProps & {
  title: string;
};

export function Header({ title, ...rest }: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack
      w="full"
      justifyContent="center"
      alignItems="center"
      pt={12}
      pb={6}
      {...rest}>
      <IconButton
        icon={
          <ArrowUUpLeft
            size={24}
            color={colors.gray[200]}
          />
        }
        onPress={handleGoBack}
      />
      <Heading
        flex={1}
        textAlign="center"
        ml={-6}
        color="gray.100"
        fontSize="lg"
        fontWeight={700}>
        {title}
      </Heading>
    </HStack>
  );
}
