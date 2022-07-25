import { useTheme, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Register() {
  const { colors } = useTheme();
  return (
    <VStack
      flex={1}
      bg="gray.600"
      p={6}>
      <Header title="Nova Solicitação" />

      <Input
        placeholder="Número do Patrimônio"
        bg="gray.700"
        p={4}
      />

      <Input
        mt={5}
        placeholder="Descrição do problema"
        bg="gray.700"
        flex={1}
        textAlignVertical="top"
        p={4}
        multiline
      />

      <Button
        title="Cadastrar"
        mt={5}
      />
    </VStack>
  );
}
