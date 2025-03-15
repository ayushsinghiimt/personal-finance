import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { Group, Paper, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import classes from "./Stats.module.css";

export function StatsGridIcons({ data }) {
  if (!data) return null;
  const stats = data.map((stat) => {
    if (stat.diff) stat.diff = parseInt(stat.diff);
    let DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    if (stat.title == "NET WORTH") {
      DiffIcon = IconArrowUpRight;
    }
    if (stat.title == "TOTAL EXPENSE") {
      DiffIcon = stat.value > 0 ? IconArrowDownRight : IconArrowUpRight;
    }
    console.log("stat", stat);
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="apart">
          <div>
            <Text
              c="dimmed"
              tt="uppercase"
              fw={700}
              fz="xs"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color:
                stat.title === "TOTAL EXPENSE"
                  ? stat.value > 0
                    ? "var(--mantine-color-red-6)"
                    : "var(--mantine-color-teal-6)"
                  : stat.title === "NET WORTH"
                  ? "var(--mantine-color-teal-6)"
                  : stat.diff > 0
                  ? "var(--mantine-color-teal-6)"
                  : "var(--mantine-color-red-6)",
            }}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} stroke={1.5} />
          </ThemeIcon>
        </Group>
        {stat.diff && (
          <Text c="dimmed" fz="sm" mt="md">
            <Text
              component="span"
              c={
                stat.title == "TOTAL EXPENSE"
                  ? stat.diff > 0
                    ? "red"
                    : "teal"
                  : stat.diff > 0
                  ? "teal"
                  : "red"
              }
              fw={700}
            >
              {stat.diff}%
            </Text>{" "}
            {stat.diff > 0 ? "increase" : "decrease"} compared to last month
          </Text>
        )}
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}
