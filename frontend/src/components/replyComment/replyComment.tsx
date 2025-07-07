import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  visible: boolean;
  message: string;
  onCancel: () => void;
  onSave: (replyText: string) => void;
}

const replyComment: React.FC<Props> = ({ visible, message, onCancel, onSave }) => {
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (visible) setReplyText(""); // limpa o campo ao abrir
  }, [visible]);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Responder comentário:</Text>
          <Text style={styles.message}>{message}</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua resposta..."
            value={replyText}
            onChangeText={setReplyText}
            multiline
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => onSave(replyText)}
            >
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default replyComment;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    width: "85%",
    borderRadius: 8,
    elevation: 5,
  },
  title: {
    color: "#2563eb",
    fontSize: 16,
    fontFamily: "RobotoSerif_700Bold",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    fontFamily: "RobotoSerif_400Regular",
    marginBottom: 12,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    minHeight: 60,
    textAlignVertical: "top",
    fontFamily: "RobotoSerif_400Regular",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 4,
  },
  cancelText: {
    fontFamily: "RobotoSerif_700Bold",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#60a5fa",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 4,
  },
  saveText: {
    fontFamily: "RobotoSerif_700Bold",
    color: "#fff",
  },
});
