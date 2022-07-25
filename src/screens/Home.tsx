import { useNavigation } from "@react-navigation/native";
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useState } from "react";
import Logo from "../assets/logo_secondary.svg";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";

export function Home() {
  const { colors } = useTheme();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">("open");
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "teste 123",
      patrimony: "123456",
      when: "23/07/2022 ás 10:00",
      status: "open"
    }
  ]);

  const navigation = useNavigation();

  function handleOpenNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  return (
    <VStack
      flex={1}
      pb={6}
      bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        pt={12}
        pb={5}
        px={6}
        bg={colors.gray[600]}>
        <Logo />
        <IconButton
          icon={
            <SignOut
              size={26}
              color={colors.gray[300]}
            />
          }
        />
      </HStack>

      <VStack
        flex={1}
        px={6}
        space={4}>
        <HStack
          w="full"
          mt={8}
          justifyContent="space-between"
          alignItems="center">
          <Heading
            color="gray.100"
            fontSize={20}
            fontWeight={700}>
            Solicitações
          </Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          space={3}>
          <Filter
            title="Em Andamento"
            type="open"
            isActive={statusSelected === "open"}
            onPress={() => setStatusSelected("open")}
          />
          <Filter
            title="Finalizados"
            type="closed"
            isActive={statusSelected === "closed"}
            onPress={() => setStatusSelected("closed")}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Order
              data={item}
              onPress={() => handleOpenDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center pt={38}>
              <ChatTeardropText
                color={colors.gray[300]}
                size={40}
              />
              <Text
                color="gray.300"
                fontSize="xl"
                textAlign="center"
                mt={6}>
                Você ainda não tem {"\n"}
                solicitações {statusSelected === "open" ? "em andamento" : "finalizadas"}
              </Text>
            </Center>
          )}
        />

        <Button
          title="Nova Solicitação"
          onPress={handleOpenNewOrder}
        />
      </VStack>
    </VStack>
  );
}
