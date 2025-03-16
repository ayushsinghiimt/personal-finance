import { useState, useEffect } from "react";
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
import useAssetLiabilityStore from "@/store/assetLiabilityStore/useAssetLiability";
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
  const [data, setData] = useState([]);
  const {
    assetsAndLiabilities,
    categories,
    fetchAssetsAndLiabilities,
    fetchAssetLiabilityCategories,
    createAssetOrLiability,
    updateAssetOrLiability,
    deleteAssetOrLiability,
    isLoading,
    error,
  } = useAssetLiabilityStore();

  useEffect(() => {
    fetchAssetsAndLiabilities();
    fetchAssetLiabilityCategories();
  }, [fetchAssetLiabilityCategories, fetchAssetsAndLiabilities]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.categoryId || !form.amount || !form.type || !form.description) {
      alert("All fields are required");
      return;
    }
    await createAssetOrLiability(form);
    setForm({ categoryId: "", amount: "", type: "ASSET", description: "" });
  };

  const handleSaveRow = async (id, data) => {
    await updateAssetOrLiability(id, data);
  };

  const handleDeleteRow = async (id) => {
    if (confirm("Are you sure you want to delete this?")) {
      await deleteAssetOrLiability(id);
    }
  };

  const handleCreateRow = async (data) => {
    await createAssetOrLiability(data);
  };

  // const handleDeleteRow = (id) => {
  //   setData((prevData) => prevData.filter((item) => item.id !== id));
  // };

  return (
    <>
      <Box
        px="xs"
        my={"xs"}
        style={{ marginBottom: "80px", marginTop: "60px" }}
      >
        <AssetLiabilityCreator
          opened={opened}
          setOpened={setOpened}
          handleCreateRow={handleCreateRow}
          categories={categories}
        />
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
            <Table striped highlightOnHover>
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
                {isLoading ? (
                  <Table.Tr>
                    <Table.Td colSpan={5}>Loading...</Table.Td>
                  </Table.Tr>
                ) : error ? (
                  <Table.Tr>
                    <Table.Td colSpan={5}>Error: {error}</Table.Td>
                  </Table.Tr>
                ) : assetsAndLiabilities.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      No assets or liabilities found
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  assetsAndLiabilities.map((item, index) => (
                    <AssetLiabilityRow
                      key={index}
                      data={item}
                      onSave={handleSaveRow}
                      onDelete={handleDeleteRow}
                      categories={categories}
                    />
                  ))
                )}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Box>
    </>
  );
};

export default AssetLiabilityTable;
