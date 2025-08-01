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
  initialValue: string;
  onCancel: () => void;
  onSave: (editedText: string) => void;
}

const editComment: React.FC<Props> = ({ visible, initialValue, onCancel, onSave }) => {
  const [editedText, setEditedText] = useState(initialValue);

  useEffect(() => {
    if (visible) setEditedText(initialValue);
  }, [visible, initialValue]);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Editar comentário:</Text>

          <TextInput
            style={styles.input}
            value={editedText}
            onChangeText={setEditedText}
            multiline
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => onSave(editedText)}
            >
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default editComment;

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
