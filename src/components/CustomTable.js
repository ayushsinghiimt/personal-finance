import { useState, useEffect } from "react";
import cx from "clsx";
import { ScrollArea, Table, Group, Tooltip } from "@mantine/core";
import useTransactionStore from "@/store/transactionStore/useTransaction";

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

export function TransactionCreator({
  opened,
  setOpened,
  createTransaction,
  categories,
}) {
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
    createTransaction(values);
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
            {...form.getInputProps("date")}
            mb="sm"
          />

          <Select
            label="Type"
            placeholder="Select type"
            data={["INCOME", "EXPENSE"]}
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

const TransactionRow = ({ row, categories, deleteTransaction }) => {
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

  console.log("Row:", row);
  console.log("Form:", form.values);

  const handleSave = async () => {
    if (form.validate().hasErrors) return;
    console.log("Form values:", form.values);

    const updatedData = {
      id: row.id,
      ...form.values,
      date: form.values.date.toISOString(),
    };

    // Call API through parent component
    await useTransactionStore.getState().updateTransaction(row.id, updatedData);
    setEditMode(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this?")) {
      await deleteTransaction(id);
    }
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
          categories.find((category) => category.value === row.categoryId)
            ?.label
        )}
      </Table.Td>

      <Table.Td>
        {editMode ? (
          <Select
            data={["INCOME", "EXPENSE"]}
            {...form.getInputProps("type")}
            required
          />
        ) : (
          <Badge
            variant="light"
            color={row.type === "EXPENSE" ? "red" : "green"}
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
            onClick={() => handleDelete(row.id)}
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
  const {
    transactions,
    isLoading,
    error,
    fetchTransactions,
    deleteTransaction,
    createTransaction,
    isCategoriesLoading,
    categories,
    fetchTransactionCategories,
  } = useTransactionStore();
  console.log("Transactions:", transactions);
  const [newTransaction, setNewTransaction] = useState({
    categoryId: "",
    amount: "",
    type: "INCOME", // or "EXPENSE"
    description: "",
  });

  useEffect(() => {
    fetchTransactions();
    fetchTransactionCategories();
  }, []);

  const handleCreate = async () => {
    if (!newTransaction.amount || !newTransaction.categoryId) return;
    await useTransactionStore.getState().createTransaction(newTransaction);
    setNewTransaction({
      categoryId: "",
      amount: "",
      type: "INCOME",
      description: "",
    });
  };

  const rows = transactions.map((row, index) => (
    <TransactionRow
      key={index}
      row={row}
      categories={categories}
      // onSave={handleUpdate}
      deleteTransaction={deleteTransaction}
    />
  ));

  return (
    <Box px="xs" my={"xs"} style={{ marginBottom: "80px", marginTop: "60px" }}>
      <TransactionCreator
        opened={opened}
        setOpened={setOpened}
        createTransaction={createTransaction}
        categories={categories}
      />
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
            {isLoading ? <></> : <Table.Tbody>{rows}</Table.Tbody>}
          </Table>
        </ScrollArea>
      </Paper>
    </Box>
  );
}

export default CustomTable;
