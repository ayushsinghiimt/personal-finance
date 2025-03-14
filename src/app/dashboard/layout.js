"use client";
import ProtectedRoute from "../../components/ProtectedRoute";
import { supabase } from "../../../superbaseClient";
import {
  IconBulb,
  IconCheckbox,
  IconPlus,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Box,
  Code,
  Group,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  Button,
  Flex,
} from "@mantine/core";
import { UserButton } from "../../components/UserButton";
import classes from "./dashboard.module.css";

const collections = [
  { emoji: "📊", label: "Dashboard", redirect: "/dashboard" },
  { emoji: "💸", label: "Transactions", redirect: "/dashboard/transactions" },
  { emoji: "💰", label: "Assets & Liabilities", redirect: "/dashboard/assets" },

  { emoji: "🤑", label: "Net Worth", redirect: "/dashboard/net-worth" },
];

export default function DashboardLayout({ children }) {
  const collectionLinks = collections.map((collection) => (
    <a
      href={collection.redirect}
      // onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
      style={{ marginTop: "10px" }}
    >
      <Box component="span" mr={9} fz={16} mt={10}>
        {collection.emoji}
      </Box>{" "}
      {collection.label}
    </a>
  ));
  return (
    <ProtectedRoute>
      <div className={classes.container}>
        <nav className={classes.navbar}>
          <Flex justify={"flex-end"} direction={"column"}>
            <div>
              <div className={classes.section}>
                <UserButton />
              </div>

              <TextInput
                placeholder="Search"
                size="xs"
                leftSection={<IconSearch size={12} stroke={1.5} />}
                rightSectionWidth={70}
                rightSection={
                  <Code className={classes.searchCode}>Ctrl + K</Code>
                }
                styles={{ section: { pointerEvents: "none" } }}
                mb="sm"
              />

              <div className={classes.section}>
                <Group
                  className={classes.collectionsHeader}
                  justify="space-between"
                >
                  <Text size="xs" fw={500} c="dimmed">
                    Collections
                  </Text>
                </Group>
                <div className={classes.collections}>{collectionLinks}</div>
              </div>
            </div>

            <Button
              variant="light"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              Signout
            </Button>
          </Flex>
        </nav>

        <div className={classes.content}>{children}</div>
      </div>
    </ProtectedRoute>
  );
}
