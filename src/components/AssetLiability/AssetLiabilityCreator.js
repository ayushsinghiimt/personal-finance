import { useState } from "react";
import { Modal, Button, Select, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const categories = Array.from(
  { length: 20 },
  (_, i) => `cat-${String(i + 1).padStart(3, "0")}`
);

export function AssetLiabilityCreator({ opened, setOpened }) {
  const form = useForm({
    initialValues: {
      name: "",
      value: 0,
      type: "",
      categoryId: "",
    },

    validate: {
      name: (value) => (!value ? "Name is required" : null),
      value: (value) => (value <= 0 ? "Value must be positive" : null),
      type: (value) => (!value ? "Type is required" : null),
      categoryId: (value) => (!value ? "Category is required" : null),
    },
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    setOpened(false);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add Asset/Liability"
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Name"
          {...form.getInputProps("name")}
          required
          mb="sm"
        />
        <NumberInput
          label="Value"
          {...form.getInputProps("value")}
          required
          min={0}
          precision={2}
          mb="sm"
        />
        <Select
          label="Type"
          placeholder="Select type"
          data={["Asset", "Liability"]}
          {...form.getInputProps("type")}
          required
          mb="sm"
        />
        <Select
          label="Category"
          placeholder="Select category"
          data={categories}
          {...form.getInputProps("categoryId")}
          required
          mb="sm"
        />
        <Button type="submit" fullWidth>
          Add Asset/Liability
        </Button>
      </form>
    </Modal>
  );
}
