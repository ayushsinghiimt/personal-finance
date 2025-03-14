import { useState } from "react";
import {
  Table,
  ScrollArea,
  Paper,
  Title,
  Group,
  Button,
  Box,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { AssetLiabilityCreator } from "./AssetLiabilityCreator";
import { AssetLiabilityRow } from "./AssetLiabilityRow";
import classes from "../customTable.module.css";
let dummyData = [
  {
    id: "1",
    userId: "user-001",
    name: "Car",
    value: 15000.0,
    type: "Asset",
    categoryId: "cat-001",
  },
  {
    id: "2",
    userId: "user-002",
    name: "Loan",
    value: -5000.0,
    type: "Liability",
    categoryId: "cat-002",
  },
];

dummyData = [
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
  ...dummyData,
];

const AssetLiabilityTable = () => {
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState(dummyData);

  const handleSaveRow = (updatedData) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
  };

  const handleDeleteRow = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <>
      <Box
        px="xs"
        my={"xs"}
        style={{ marginBottom: "80px", marginTop: "60px" }}
      >
        <AssetLiabilityCreator opened={opened} setOpened={setOpened} />
        <Paper withBorder mb={"md"} radius={0}>
          <Group
            justify={"space-between"}
            align={"center"}
            className={classes.header}
          >
            <Title order={3} style={{ marginLeft: "12px", padding: "10px" }}>
              Assets & Liabilities
            </Title>
            <Button leftSection={<IconPlus />} onClick={() => setOpened(true)}>
              Add Asset/Liability
            </Button>
          </Group>
          <ScrollArea
            style={{
              height: "80vh",
              marginTop: "10px",
              border: "1px solid #f0f0f0",
              padding: 20,
            }}
          >
            <Table striped highlightOnHover withBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Value</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.map((row) => (
                  <AssetLiabilityRow
                    key={row.id}
                    row={row}
                    onSave={handleSaveRow}
                    onDelete={handleDeleteRow}
                  />
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Box>
    </>
  );
};

export default AssetLiabilityTable;
