import { useState } from "react";
import {
  Table,
  Select,
  NumberInput,
  TextInput,
  Badge,
  ActionIcon,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconEdit,
  IconDeviceFloppy,
  IconArrowBackUp,
  IconTrash,
} from "@tabler/icons-react";

const categories = Array.from(
  { length: 20 },
  (_, i) => `cat-${String(i + 1).padStart(3, "0")}`
);

export function AssetLiabilityRow({ row, onSave, onDelete }) {
  const [editMode, setEditMode] = useState(false);

  const form = useForm({
    initialValues: {
      name: row.name,
      value: row.value,
      type: row.type,
      categoryId: row.categoryId,
    },

    validate: {
      name: (value) => (!value ? "Name is required" : null),
      value: (value) => (value <= 0 ? "Value must be positive" : null),
    },
  });

  const handleSave = () => {
    if (form.validate().hasErrors) return;

    const updatedData = { id: row.id, ...form.values };
    onSave(updatedData);
    setEditMode(false);
  };

  return (
    <Table.Tr>
      <Table.Td>
        {editMode ? <TextInput {...form.getInputProps("name")} /> : row.name}
      </Table.Td>
      <Table.Td>
        {editMode ? (
          <NumberInput {...form.getInputProps("value")} min={0} precision={2} />
        ) : (
          `$${row.value.toFixed(2)}`
        )}
      </Table.Td>
      <Table.Td>
        {editMode ? (
          <Select
            data={["Asset", "Liability"]}
            {...form.getInputProps("type")}
          />
        ) : (
          <Badge variant="light" color={row.type === "Asset" ? "green" : "red"}>
            {row.type}
          </Badge>
        )}
      </Table.Td>
      <Table.Td>
        {editMode ? (
          <Select data={categories} {...form.getInputProps("categoryId")} />
        ) : (
          row.categoryId
        )}
      </Table.Td>
      <Table.Td>
        <Group spacing={"xs"}>
          {editMode ? (
            <>
              <ActionIcon
                color="gray"
                variant="light"
                onClick={() => setEditMode(false)}
              >
                <IconArrowBackUp size={"1rem"} />
              </ActionIcon>
              <ActionIcon color="teal" variant="light" onClick={handleSave}>
                <IconDeviceFloppy size={"1rem"} />
              </ActionIcon>
            </>
          ) : (
            <ActionIcon
              variant="light"
              color="gray"
              onClick={() => setEditMode(true)}
            >
              <IconEdit size={"1rem"} />
            </ActionIcon>
          )}
          {!editMode && (
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => onDelete(row.id)}
            >
              <IconTrash size={"1rem"} />
            </ActionIcon>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
