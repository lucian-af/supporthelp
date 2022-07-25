import { Heading, Icon, KeyboardAvoidingView, ScrollView, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSigIn() {
    if (!name) return;
    alert(`Bem vindo(a), ${name}`);
  }

  const { colors } = useTheme();
  return (
    <ScrollView
      flex={1}
      bg="gray.600">
      <KeyboardAvoidingView
        h="100%"
        w="100%"
        behavior="padding"
        bg={colors.gray[600]}
        enabled>
        <VStack
          flex={1}
          alignItems="center"
          px={8}
          pt={24}>
          <Logo />
          <Heading
            color="gray.100"
            fontSize="xl"
            mt={20}
            mb={6}>
            Acesse sua conta
          </Heading>
          <Input
            placeholder="E-mail"
            mb={4}
            InputLeftElement={
              <Icon
                as={<Envelope color={colors.gray[300]} />}
                ml={4}
              />
            }
            onChangeText={setName}
          />
          <Input
            placeholder="Senha"
            InputLeftElement={
              <Icon
                as={<Key color={colors.gray[300]} />}
                ml={4}
              />
            }
            secureTextEntry
          />
          <Button
            title="Entrar"
            w="full"
            mt={8}
            onPress={handleSigIn}
          />
        </VStack>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
