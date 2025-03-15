"use client";
import { useEffect, useState } from "react";
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
import userStore from "@/store/userStore/userStore";

function EditUserModal({ opened, setOpened }) {
  const { user, updateUser } = userStore();
  // Form setup using Mantine's useForm hook
  const form = useForm({
    initialValues: {
      firstName: user?.firstName || null,
      lastName: user?.lastName || null,
      gender: user?.gender || null,
      mobileNo: user?.mobileNo || null,
      currency: user?.currency || null,
    },
    validate: {
      fullName: (value) => (value ? null : "Full name is required"),
    },
  });

  useEffect(() => {
    form.setValues({
      firstName: user?.firstName || null,
      lastName: user?.lastName || null,
      gender: user?.gender || null,
      mobileNo: user?.mobileNo || null,
      currency: user?.currency || null,
    });
  }, [user]);

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");

  // });

  const handleSubmit = () => {
    const payload = Object.fromEntries(
      Object.entries(form.values).filter(([_, value]) => value !== null)
    );
    updateUser(user.id, payload);
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
        <TextInput
          label="First Name"
          placeholder="Enter First name"
          {...form.getInputProps("firstName")}
          required
        />
        <TextInput
          label="Last Name"
          placeholder="Enter Last name"
          {...form.getInputProps("lastName")}
          mt="md"
        />

        <Select
          label="Currency"
          placeholder="Select Currency"
          defaultValue="RUPEE"
          data={[
            { value: "RUPEE", label: "₹" },
            { value: "DOLLAR", label: "$" },
          ]}
          {...form.getInputProps("currency")}
          mt="md"
        />

        <Select
          label="Gender"
          placeholder="Select gender"
          data={[
            { value: "MALE", label: "Male" },
            { value: "FEMALE", label: "Female" },
            { value: "OTHER", label: "Other" },
          ]}
          {...form.getInputProps("gender")}
          mt="md"
        />

        {/* Mobile Number Input */}
        <TextInput
          label="Mobile Number"
          placeholder="Enter mobile number"
          {...form.getInputProps("mobileNo")}
          mt="md"
        />

        {/* Submit Button */}
        <Button type="submit" mt="xl" fullWidth onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal>
    </>
  );
}

export function UserButton({ opened, setOpened }) {
  const { user } = userStore();
  const getFullName = (user) => {
    const firstName = user?.firstName?.trim();
    const lastName = user?.lastName?.trim();

    if (!firstName && !lastName) return "Unknown";

    return `${firstName || ""} ${lastName || ""}`.trim();
  };
  const getEmail = (user) => {
    const email = user?.email?.trim();

    return email || "Unknown";
  };
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
              {getFullName(user)}
            </Text>

            <Text c="dimmed" size="xs">
              {getEmail(user)}
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
