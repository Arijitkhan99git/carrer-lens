import { AppText } from "@/components/AppText";
import { Check, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useThemeColors } from "../../../../constants/color-pallette";
import { fonts } from "../../../../constants/typography";

import { UserProfileData } from "../../../../store/profileData-store";

export type { UserProfileData };

interface UserDetailsModalProps {
  visible: boolean;
  initialData: UserProfileData;
  onClose: () => void;
  onSave: (updated: UserProfileData) => void;
}

const STATUS_OPTIONS = [
  "Open to Offers",
  "Casually Looking",
  "Actively Applying",
  "Not Looking",
];

function UserDetailsForm({
  initialData,
  onClose,
  onSave,
}: {
  initialData: UserProfileData;
  onClose: () => void;
  onSave: (updated: UserProfileData) => void;
}) {
  const colors = useThemeColors();
  const isDark = colors.isDarkMode;

  const [nameInput, setNameInput] = useState(initialData.name);
  const [designationInput, setDesignationInput] = useState(
    initialData.designation,
  );
  const [statusInput, setStatusInput] = useState(initialData.status);

  const handleSave = () => {
    if (nameInput.trim()) {
      onSave({
        name: nameInput.trim(),
        designation: designationInput.trim() || "Professional",
        status: statusInput.trim() || "Open to Offers",
      });
    }
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.modalKeyboardAvoid}
          >
            <View
              style={[
                styles.modalContainer,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View>
                  <AppText style={[styles.modalTitle, { color: colors.text }]}>
                    Edit Profile
                  </AppText>
                  <AppText
                    style={[
                      styles.modalSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Update your profile attributes
                  </AppText>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={[
                    styles.modalCloseButton,
                    { backgroundColor: colors.muted },
                  ]}
                >
                  <X size={18} color={colors.text} />
                </TouchableOpacity>
              </View>

              {/* Input: Full Name */}
              <View style={styles.inputGroup}>
                <AppText style={[styles.inputLabel, { color: colors.text }]}>
                  Full Name
                </AppText>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: colors.input,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  value={nameInput}
                  onChangeText={setNameInput}
                  placeholder="e.g. Arijit Khan"
                  placeholderTextColor={colors.mutedText}
                />
              </View>

              {/* Input: Designation */}
              <View style={styles.inputGroup}>
                <AppText style={[styles.inputLabel, { color: colors.text }]}>
                  Designation
                </AppText>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: colors.input,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  value={designationInput}
                  onChangeText={setDesignationInput}
                  placeholder="e.g. Senior AI & Full-Stack Developer"
                  placeholderTextColor={colors.mutedText}
                />
              </View>

              {/* Input: Job Status */}
              <View style={styles.inputGroup}>
                <AppText style={[styles.inputLabel, { color: colors.text }]}>
                  Job Status
                </AppText>
                <View style={styles.statusChipsContainer}>
                  {STATUS_OPTIONS.map((status) => {
                    const isSelected = statusInput === status;
                    return (
                      <TouchableOpacity
                        key={status}
                        onPress={() => setStatusInput(status)}
                        style={[
                          styles.statusChip,
                          {
                            backgroundColor: isSelected
                              ? isDark
                                ? "rgba(91, 130, 255, 0.2)"
                                : "#EEF2FF"
                              : colors.input,
                            borderColor: isSelected
                              ? colors.primary
                              : colors.border,
                          },
                        ]}
                      >
                        {isSelected && (
                          <Check
                            size={14}
                            color={colors.primary}
                            style={{ marginRight: 4 }}
                          />
                        )}
                        <AppText
                          style={[
                            styles.statusChipText,
                            {
                              color: isSelected
                                ? colors.primary
                                : colors.textSecondary,
                              fontFamily: isSelected
                                ? fonts.semibold
                                : fonts.regular,
                            },
                          ]}
                        >
                          {status}
                        </AppText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Modal Action Buttons */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={onClose}
                  style={[
                    styles.actionButton,
                    styles.cancelButton,
                    { borderColor: colors.border },
                  ]}
                >
                  <AppText
                    style={[
                      styles.cancelButtonText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Cancel
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSave}
                  style={[
                    styles.actionButton,
                    styles.saveButton,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <AppText style={styles.saveButtonText}>Save Changes</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

export function UserDetailsModal({
  visible,
  initialData,
  onClose,
  onSave,
}: UserDetailsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {visible && (
        <UserDetailsForm
          initialData={initialData}
          onClose={onClose}
          onSave={onSave}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalKeyboardAvoid: {
    width: "100%",
    maxWidth: 420,
  },
  modalContainer: {
    width: "100%",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  modalSubtitle: {
    fontSize: 12,
    fontFamily: fonts.regular,
    marginTop: 2,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: fonts.medium,
    marginBottom: 6,
  },
  textInput: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  statusChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 2,
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: 12,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  saveButton: {
    elevation: 2,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: fonts.semibold,
  },
});
