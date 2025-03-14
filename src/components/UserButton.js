"use client";
import { useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import {
  Avatar,
  Group,
  Text,
  UnstyledButton,
  Button,
  Modal,
  TextInput,
  Select,
} from "@mantine/core";
import classes from "./UserButton.module.css";
import { useForm } from "@mantine/form";

function EditUserModal({ opened, setOpened }) {
  // Form setup using Mantine's useForm hook
  const form = useForm({
    initialValues: {
      fullName: "",
      gender: "",
      mobileNumber: "",
    },
    validate: {
      fullName: (value) => (value ? null : "Full name is required"),
      gender: (value) => (value ? null : "Gender is required"),
      mobileNumber: (value) =>
        /^\d{10}$/.test(value) ? null : "Mobile number must be 10 digits",
    },
  });

  const handleSubmit = (values) => {
    console.log("Updated user details:", values);
    setOpened(false); // Close modal after submission
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit User Details"
        overlayProps={{ blur: 2 }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* Full Name Input */}
          <TextInput
            label="Full Name"
            placeholder="Enter full name"
            {...form.getInputProps("fullName")}
            required
          />

          {/* Gender Select */}
          <Select
            label="Gender"
            placeholder="Select gender"
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            {...form.getInputProps("gender")}
            required
            mt="md"
          />

          {/* Mobile Number Input */}
          <TextInput
            label="Mobile Number"
            placeholder="Enter mobile number"
            {...form.getInputProps("mobileNumber")}
            required
            mt="md"
          />

          {/* Submit Button */}
          <Button type="submit" mt="xl" fullWidth>
            Save Changes
          </Button>
        </form>
      </Modal>
    </>
  );
}

export function UserButton() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <UnstyledButton className={classes.user}>
        <Group>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Harriette Spoonlicker
            </Text>

            <Text c="dimmed" size="xs">
              hspoonlicker@outlook.com
            </Text>
          </div>
        </Group>
      </UnstyledButton>
      <Button
        variant="light"
        style={{ width: "100%" }}
        onClick={() => setOpened(true)}
      >
        Edit User
      </Button>
      <EditUserModal opened={opened} setOpened={setOpened} />
    </>
  );
}
