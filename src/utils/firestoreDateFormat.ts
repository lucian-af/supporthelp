import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    const day = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);

    const hour = new Intl.DateTimeFormat("pt-BR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    return `${day} às ${hour}`;
  }
}
