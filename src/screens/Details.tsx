import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text, TextArea, useTheme, VStack } from "native-base";
import { CircleWavyCheck, ClipboardText, DesktopTower, Hourglass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CardDetails } from "../components/CardDetails";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { OrderProps } from "../components/Order";
import { OrderFirestoreDTO } from "../DTOs/OrderFirestoreDTO";
import { dateFormat } from "../utils/firestoreDateFormat";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const [solution, setSolution] = useState("");

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleOrderClosed() {
    if (!solution) {
      return Alert.alert("Detalhes", "Informe a solução do problema.");
    }

    setIsLoading(true);

    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .update({
        solution,
        status: "closed",
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert("Detalhes", "Solicitação finalizada.");
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        Alert.alert("Detalhes", "Não foi possível finalizar a solicitação.");
      });
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then(doc => {
        const { patrimony, description, status, created_at, closed_at, solution } = doc.data();

        const closed = dateFormat(closed_at);

        setOrder({
          id: doc.id,
          patrimony,
          description,
          solution,
          status,
          when: dateFormat(created_at),
          closed
        });

        setIsLoadingPage(false);
      });
  }, []);

  if (isLoadingPage) return <Loading />;

  return (
    <VStack
      flex={1}
      bg="gray.700">
      <Box
        px={6}
        bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack
        bg="gray.500"
        justifyContent="center"
        alignItems="center"
        p={4}
        space={2}>
        {order.status === "closed" ? (
          <CircleWavyCheck
            size={22}
            color={colors.green[300]}
          />
        ) : (
          <Hourglass
            size={22}
            color={colors.secondary[700]}
          />
        )}
        <Text
          fontSize="md"
          fontWeight={700}
          textTransform="uppercase"
          color={order.status === "closed" ? colors.green[300] : colors.secondary[700]}>
          {order.status === "closed" ? "Finalizado" : "Em andamento"}
        </Text>
      </HStack>

      <ScrollView
        mx={5}
        mb={8}
        showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="Descrição do Problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order.status === "closed" && order.solution}
          children={
            order.status === "open" && (
              <Input
                placeholder="Descrição da solução"
                multiline
                flex={1}
                bg="gray.500"
                color={isLoading ? colors.gray[200] : colors.gray[100]}
                textAlignVertical="top"
                p={4}
                h={{
                  base: 200,
                  xl: 400
                }}
                isDisabled={isLoading}
                onChangeText={setSolution}
              />
            )
          }
          footer={order.closed && `Encerrado em ${order.closed}`}
        />
      </ScrollView>

      {order.status === "open" && (
        <Button
          mx={5}
          mb={4}
          title="Finalizar"
          isLoading={isLoading}
          onPress={handleOrderClosed}
        />
      )}
    </VStack>
  );
}
