import { useState } from "react";
import cx from "clsx";
import { ScrollArea, Table, Group, Tooltip } from "@mantine/core";

import {
  ActionIcon,
  Badge,
  Select,
  Text,
  useMantineTheme,
  Box,
  Paper,
  Title,
  Flex,
} from "@mantine/core";
import {
  IconDeviceFloppy,
  IconEdit,
  IconArrowBackUp,
  IconLink,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import classes from "./customTable.module.css";
import {
  Button,
  Modal,
  NumberInput,
  TextInput,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { DateTimePicker } from "@mantine/dates";

let data = [
  {
    id: "1a2b3c4d-1234-5678-9abc-def123456789",
    userId: "user-001",
    categoryId: "cat-001",
    amount: 25.5,
    type: "Expense",
    description: "Lunch at a cafe",
    date: "2025-03-01T12:30:00Z",
  },
  {
    id: "2b3c4d5e-2345-6789-abcd-ef1234567890",
    userId: "user-001",
    categoryId: "cat-002",
    amount: 1500.0,
    type: "Income",
    description: "Monthly salary",
    date: "2025-03-02T09:00:00Z",
  },
  {
    id: "3c4d5e6f-3456-789a-bcde-f12345678901",
    userId: "user-002",
    categoryId: "cat-003",
    amount: 50.0,
    type: "Expense",
    description: "Groceries",
    date: "2025-03-03T15:45:00Z",
  },
  {
    id: "4d5e6f7g-4567-89ab-cdef-123456789012",
    userId: "user-002",
    categoryId: "cat-004",
    amount: 10.0,
    type: "Expense",
    description:
      "Bus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fareBus fare ",
    date: "2025-03-04T08:15:00Z",
  },
  {
    id: "5e6f7g8h-5678-9abc-def1-234567890123",
    userId: "user-003",
    categoryId: "cat-005",
    amount: 200.0,
    type: "Income",
    description: "Freelance project",
    date: "2025-03-05T18:00:00Z",
  },
  {
    id: "6f7g8h9i-6789-abcd-ef12-345678901234",
    userId: "user-003",
    categoryId: "cat-006",
    amount: 30.0,
    type: "Expense",
    description: "Movie ticket",
    date: "2025-03-06T20:00:00Z",
  },
  {
    id: "7g8h9i0j-789a-bcde-f123-456789012345",
    userId: "user-004",
    categoryId: "cat-007",
    amount: 500.0,
    type: "Income",
    description: "Bonus",
    date: "2025-03-07T10:30:00Z",
  },
  {
    id: "8h9i0j1k-89ab-cdef-1234-567890123456",
    userId: "user-004",
    categoryId: "cat-008",
    amount: 15.75,
    type: "Expense",
    description: "Coffee",
    date: "2025-03-08T14:20:00Z",
  },
  {
    id: "9i0j1k2l-9abc-def1-2345-678901234567",
    userId: "user-005",
    categoryId: "cat-009",
    amount: 100.0,
    type: "Income",
    description: "Gift",
    date: "2025-03-09T16:00:00Z",
  },
  {
    id: "0j1k2l3m-abc1-2345-6789-012345678901",
    userId: "user-005",
    categoryId: "cat-010",
    amount: 40.0,
    type: "Expense",
    description: "Dinner with friends",
    date: "2025-03-10T19:45:00Z",
  },
];

data = [...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data];
const categories = Array.from(
  { length: 20 },
  (_, i) => `cat-${String(i + 1).padStart(3, "0")}`
);

export function TransactionCreator({ opened, setOpened }) {
  // Generate categories from 001-020

  const form = useForm({
    initialValues: {
      date: new Date(),
      type: "",
      category: [],
      amount: 0,
      description: "",
    },

    validate: {
      date: (value) => (!value ? "Date is required" : null),
      type: (value) => (!value ? "Transaction type is required" : null),
      category: (value) =>
        value.length === 0 ? "At least one category is required" : null,
      amount: (value) => (value <= 0 ? "Amount must be positive" : null),
      description: (value) => (!value ? "Description is required" : null),
    },
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    setOpened(false);
    form.reset();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Transaction"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <DateTimePicker
            label="Date"
            required
            // {...form.getInputProps("date")}
            mb="sm"
          />

          <Select
            label="Type"
            placeholder="Select type"
            data={["Income", "Expense"]}
            required
            {...form.getInputProps("type")}
            mb="sm"
          />

          <Select
            label="Categories"
            placeholder="Select categories"
            data={categories}
            required
            {...form.getInputProps("category")}
            mb="sm"
          />

          <NumberInput
            label="Amount"
            required
            min={0}
            precision={0}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            {...form.getInputProps("amount")}
            mb="sm"
          />

          <TextInput
            label="Description"
            required
            {...form.getInputProps("description")}
            mb="md"
          />

          <Button type="submit" fullWidth>
            Create Transaction
          </Button>
        </form>
      </Modal>
    </>
  );
}

const TransactionRow = ({ row, categories, onSave, onDelete }) => {
  const [editMode, setEditMode] = useState(false);

  const form = useForm({
    initialValues: {
      date: new Date(row.date),
      type: row.type,
      categoryId: row.categoryId,
      amount: row.amount,
      description: row.description,
    },

    validate: {
      amount: (value) => (value > 0 ? null : "Invalid amount"),
      description: (value) => (value.trim().length > 0 ? null : "Required"),
    },
  });

  const handleSave = () => {
    if (form.validate().hasErrors) return;

    const updatedData = {
      id: row.id,
      ...form.values,
      date: form.values.date.toISOString(),
    };

    // Call API through parent component
    onSave(updatedData);
    setEditMode(false);
  };

  return (
    <Table.Tr className="equal-width">
      <Table.Td style={{ width: "25%" }}>
        {editMode ? (
          <DateTimePicker {...form.getInputProps("date")} required mb="sm" />
        ) : (
          ConvertUtcToLocal(row.date)
        )}
      </Table.Td>

      <Table.Td>
        {editMode ? (
          <Select
            data={categories}
            {...form.getInputProps("categoryId")}
            required
          />
        ) : (
          row.categoryId
        )}
      </Table.Td>

      <Table.Td>
        {editMode ? (
          <Select
            data={["Income", "Expense"]}
            {...form.getInputProps("type")}
            required
          />
        ) : (
          <Badge
            variant="light"
            color={row.type === "Expense" ? "red" : "green"}
          >
            {row.type}
          </Badge>
        )}
      </Table.Td>

      <Table.Td>
        {editMode ? (
          <NumberInput
            {...form.getInputProps("amount")}
            min={0}
            precision={0}
            required
          />
        ) : (
          row.amount
        )}
      </Table.Td>

      <Table.Td style={{ width: "25%" }}>
        {editMode ? (
          <TextInput {...form.getInputProps("description")} required />
        ) : (
          row.description
        )}
      </Table.Td>

      <Table.Td>
        <Group gap="xs" wrap="nowrap">
          {editMode ? (
            <>
              <ActionIcon
                color="gray"
                variant="light"
                onClick={() => setEditMode(false)}
              >
                <IconArrowBackUp size="1rem" />
              </ActionIcon>

              <ActionIcon color="teal" variant="light" onClick={handleSave}>
                <IconDeviceFloppy size="1rem" />
              </ActionIcon>
            </>
          ) : (
            <ActionIcon
              variant="light"
              color="gray"
              onClick={() => setEditMode(true)}
            >
              <IconEdit size="1rem" />
            </ActionIcon>
          )}

          <ActionIcon
            variant="light"
            color="red"
            onClick={() => onDelete(row.id)}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

const ConvertUtcToLocal = (utcDate) => {
  const date = new Date(utcDate);
  return date.toLocaleString();
};

function CustomTable() {
  const [opened, setOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [rowDisabled, setRowDisabled] = useState(true);
  const handleSaveRow = async (updatedData) => {
    // try {
    //   const response = await fetch(`/api/transactions/${updatedData.id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(updatedData)
    //   });
    //   if (!response.ok) throw new Error('Update failed');
    //   // Update your local state here
    // } catch (error) {
    //   console.error('Update error:', error);
    // }
  };

  const handleDeleteRow = async (rowId) => {
    // Similar API call for deletion
  };
  const rows = data.map((row) => (
    <TransactionRow
      row={row}
      categories={categories}
      onSave={handleSaveRow}
      onDelete={handleDeleteRow}
    />
  ));

  return (
    <Box px="xs" my={"xs"} style={{ marginBottom: "80px", marginTop: "60px" }}>
      <TransactionCreator opened={opened} setOpened={setOpened} />
      <Paper withBorder mb={"md"} radius={0}>
        <Group
          justify={"space-between"}
          align={"center"}
          className={classes.header}
        >
          {/* <Group position="apart"> */}
          <Title order={3} style={{ marginLeft: "12px", padding: "10px" }}>
            Transactions
          </Title>
          <Button.Group>
            <Button
              leftSection={<IconPlus size={18} />}
              onClick={() => setOpened(true)}
            >
              Add Transaction
            </Button>
          </Button.Group>
        </Group>
        {/* </Flex> */}
        <ScrollArea
          h={"80vh"}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          style={{ padding: 20, border: "1px solid #f0f0f0" }}
        >
          <Table miw={700} style={{ marginTop: "10px" }}>
            <Table.Thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Box>
  );
}

export default CustomTable;
